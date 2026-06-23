/**
 * ClarityChart — AI Generation Lambda
 *
 * Standalone Lambda function that calls the Anthropic API with a 5-minute
 * timeout. Invoked directly via Lambda Function URL from the browser, bypassing
 * Amplify's 29-second Lambda limit.
 *
 * Security:
 *  - Every request must carry a valid Supabase Bearer token (validated against
 *    the Supabase /auth/v1/user endpoint before any Anthropic call is made).
 *  - CORS is restricted to ALLOWED_ORIGIN so browsers on other domains cannot
 *    invoke the endpoint.
 *  - No PHI is written to CloudWatch — only metadata (model, token counts,
 *    user email) is logged.
 *
 * Environment variables (set in Lambda console or CloudFormation):
 *   ANTHROPIC_API_KEY   — Anthropic secret key
 *   SUPABASE_URL        — e.g. https://xxxx.supabase.co
 *   SUPABASE_ANON_KEY   — Supabase public anon key
 *   ALLOWED_ORIGIN      — e.g. https://app.claritychart.com
 */

const {
  ANTHROPIC_API_KEY,
  SUPABASE_URL,
  SUPABASE_ANON_KEY,
  ALLOWED_ORIGIN,
} = process.env;

function corsHeaders(origin) {
  const allowed = ALLOWED_ORIGIN || '*';
  return {
    'Access-Control-Allow-Origin': allowed,
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Max-Age': '86400',
  };
}

function respond(statusCode, body, origin = '') {
  return {
    statusCode,
    headers: {
      'Content-Type': 'application/json',
      ...corsHeaders(origin),
    },
    body: typeof body === 'string' ? body : JSON.stringify(body),
  };
}

async function verifySupabaseToken(token) {
  if (!token || !SUPABASE_URL || !SUPABASE_ANON_KEY) return null;
  try {
    const res = await fetch(`${SUPABASE_URL}/auth/v1/user`, {
      headers: {
        Authorization: `Bearer ${token}`,
        apikey: SUPABASE_ANON_KEY,
      },
    });
    if (!res.ok) return null;
    const data = await res.json();
    return data?.email || null;
  } catch {
    return null;
  }
}

export const handler = async (event) => {
  const origin = event.headers?.origin || event.headers?.Origin || '';
  const method = event.requestContext?.http?.method || 'POST';

  // Handle CORS preflight
  if (method === 'OPTIONS') {
    return respond(200, '', origin);
  }

  // Authenticate
  const authHeader = event.headers?.authorization || event.headers?.Authorization || '';
  const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : '';
  const userId = await verifySupabaseToken(token);

  if (!userId) {
    return respond(401, { error: { message: 'Unauthorized' } }, origin);
  }

  // Parse request body
  let body;
  try {
    body = JSON.parse(event.body || '{}');
  } catch {
    return respond(400, { error: { message: 'Invalid JSON body' } }, origin);
  }

  const { model, max_tokens, system, messages } = body;

  if (!model || !messages) {
    return respond(400, { error: { message: 'Missing required fields: model, messages' } }, origin);
  }

  console.log(JSON.stringify({
    event: 'generation_attempt',
    userId,
    model,
    max_tokens,
    systemLength: system?.length ?? 0,
  }));

  try {
    const anthropicRes = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({ model, max_tokens, system, messages }),
    });

    if (!anthropicRes.ok) {
      const errText = await anthropicRes.text();
      let errMsg = 'Anthropic API error';
      try { errMsg = JSON.parse(errText).error?.message || errMsg; } catch (_) {}
      console.error(JSON.stringify({ event: 'anthropic_error', userId, status: anthropicRes.status }));
      return respond(anthropicRes.status, { error: { message: errMsg } }, origin);
    }

    const data = await anthropicRes.json();
    const text = data.content?.[0]?.text || '';

    console.log(JSON.stringify({
      event: 'generation_success',
      userId,
      model,
      inputTokens: data.usage?.input_tokens,
      outputTokens: data.usage?.output_tokens,
      stop_reason: data.stop_reason,
    }));

    return respond(200, { text }, origin);

  } catch (err) {
    console.error(JSON.stringify({ event: 'generation_error', userId, error: err.message }));
    return respond(500, { error: { message: err.message } }, origin);
  }
};
