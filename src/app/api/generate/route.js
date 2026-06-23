import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

export const maxDuration = 300;

export async function POST(request) {
  const body = await request.json();

  let userId = 'unauthenticated';
  try {
    const cookieStore = cookies();
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      {
        cookies: {
          getAll() { return cookieStore.getAll(); },
          setAll() {},
        },
      }
    );
    const { data: { session } } = await supabase.auth.getSession();
    if (session?.user?.email) userId = session.user.email;
  } catch (e) {}

  console.log(JSON.stringify({
    event: 'generation_attempt',
    userId,
    model: body.model,
    max_tokens: body.max_tokens,
    systemLength: body.system?.length ?? 0,
  }));

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const errText = await response.text();
      let errMsg = 'API error';
      try { errMsg = JSON.parse(errText).error?.message || 'API error'; } catch (_) {}
      console.error(JSON.stringify({ event: 'anthropic_error', userId, status: response.status, body: errText.slice(0, 500) }));
      return Response.json({ error: { message: errMsg } }, { status: response.status });
    }

    const data = await response.json();
    const text = data.content?.[0]?.text || '';
    console.log(JSON.stringify({ event: 'generation_success', userId, model: body.model, outputLength: text.length, stop_reason: data.stop_reason }));
    return Response.json({ text });
  } catch (err) {
    console.error(JSON.stringify({ event: 'generation_error', userId, error: err.message }));
    return Response.json({ error: { message: err.message } }, { status: 500 });
  }
}
