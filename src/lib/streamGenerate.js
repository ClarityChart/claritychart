import { supabase } from './supabase';

// In production, NEXT_PUBLIC_GENERATE_URL points to the Lambda Function URL
// (5-minute timeout). In local dev it falls back to the Next.js API route.
const GENERATE_URL = process.env.NEXT_PUBLIC_GENERATE_URL || '/api/generate';

export async function streamGenerate({ system, messages, max_tokens = 4000, model = 'claude-sonnet-4-6' }) {
  const headers = { 'Content-Type': 'application/json' };

  // Attach the Supabase session token so the Lambda can authenticate the caller.
  // The Next.js fallback route ignores this header (it reads auth from cookies).
  try {
    const { data: { session } } = await supabase.auth.getSession();
    if (session?.access_token) {
      headers['Authorization'] = `Bearer ${session.access_token}`;
    }
  } catch (_) {}

  const response = await fetch(GENERATE_URL, {
    method: 'POST',
    headers,
    body: JSON.stringify({ model, max_tokens, system, messages }),
  });

  let data;
  try {
    data = await response.json();
  } catch (e) {
    throw new Error(`Server error (HTTP ${response.status}) — check CloudWatch logs`);
  }

  if (!response.ok) throw new Error(data.error?.message || `HTTP ${response.status}`);
  return (data.text || '').replace(/\*\*/g, '').replace(/\*/g, '');
}
