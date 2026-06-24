/**
 * ClarityChart — AI Generation Edge Function
 *
 * Supabase Edge Function (Deno) that calls the Anthropic API on behalf of
 * authenticated users. Invoked directly from the browser via the Supabase
 * Functions URL, bypassing Amplify's 29-second Lambda timeout.
 *
 * Security:
 *  - Requires a valid Supabase Bearer token in the Authorization header.
 *  - CORS is restricted via Supabase project settings (or open wildcard for
 *    cross-origin browser calls when AllowedOrigin isn't restricted here).
 *  - No PHI is logged — only metadata (model, token counts, user email).
 *
 * Deployed with:
 *   supabase functions deploy generate
 * Environment variables (set in Supabase project secrets):
 *   ANTHROPIC_API_KEY   — Anthropic secret key
 */

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, apikey, x-client-info',
};

Deno.serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: { message: 'Method not allowed' } }), {
      status: 405,
      headers: { 'Content-Type': 'application/json', ...corsHeaders },
    });
  }

  // Authenticate via Supabase JWT
  const authHeader = req.headers.get('Authorization') || '';
  const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : '';

  if (!token) {
    return new Response(JSON.stringify({ error: { message: 'Unauthorized' } }), {
      status: 401,
      headers: { 'Content-Type': 'application/json', ...corsHeaders },
    });
  }

  const supabaseUrl = Deno.env.get('SUPABASE_URL') ?? '';
  const supabaseAnonKey = Deno.env.get('SUPABASE_ANON_KEY') ?? '';
  const supabase = createClient(supabaseUrl, supabaseAnonKey, {
    global: { headers: { Authorization: `Bearer ${token}` } },
  });

  const { data: { user }, error: authError } = await supabase.auth.getUser(token);
  if (authError || !user) {
    return new Response(JSON.stringify({ error: { message: 'Unauthorized' } }), {
      status: 401,
      headers: { 'Content-Type': 'application/json', ...corsHeaders },
    });
  }

  // Parse request body
  let body: { model?: string; max_tokens?: number; system?: string; messages?: unknown[] };
  try {
    body = await req.json();
  } catch {
    return new Response(JSON.stringify({ error: { message: 'Invalid JSON body' } }), {
      status: 400,
      headers: { 'Content-Type': 'application/json', ...corsHeaders },
    });
  }

  const { model, max_tokens, system, messages } = body;
  if (!model || !messages) {
    return new Response(JSON.stringify({ error: { message: 'Missing required fields: model, messages' } }), {
      status: 400,
      headers: { 'Content-Type': 'application/json', ...corsHeaders },
    });
  }

  const anthropicKey = Deno.env.get('ANTHROPIC_API_KEY');
  if (!anthropicKey) {
    return new Response(JSON.stringify({ error: { message: 'Server configuration error' } }), {
      status: 500,
      headers: { 'Content-Type': 'application/json', ...corsHeaders },
    });
  }

  console.log(JSON.stringify({
    event: 'generation_attempt',
    userId: user.email,
    model,
    max_tokens,
    systemLength: (system ?? '').length,
  }));

  try {
    const anthropicRes = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': anthropicKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({ model, max_tokens, system, messages }),
    });

    if (!anthropicRes.ok) {
      const errText = await anthropicRes.text();
      let errMsg = 'Anthropic API error';
      try { errMsg = JSON.parse(errText).error?.message || errMsg; } catch { /* ok */ }
      console.error(JSON.stringify({ event: 'anthropic_error', userId: user.email, status: anthropicRes.status }));
      return new Response(JSON.stringify({ error: { message: errMsg } }), {
        status: anthropicRes.status,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      });
    }

    const data = await anthropicRes.json();
    const text = data.content?.[0]?.text ?? '';

    console.log(JSON.stringify({
      event: 'generation_success',
      userId: user.email,
      model,
      inputTokens: data.usage?.input_tokens,
      outputTokens: data.usage?.output_tokens,
      stop_reason: data.stop_reason,
    }));

    return new Response(JSON.stringify({ text }), {
      status: 200,
      headers: { 'Content-Type': 'application/json', ...corsHeaders },
    });

  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error(JSON.stringify({ event: 'generation_error', userId: user.email, error: message }));
    return new Response(JSON.stringify({ error: { message } }), {
      status: 500,
      headers: { 'Content-Type': 'application/json', ...corsHeaders },
    });
  }
});
