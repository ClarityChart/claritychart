import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

export const maxDuration = 300; // cache-bust-v2

export async function POST(request) {
  const body = await request.json();
  const timestamp = new Date().toISOString();

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

    const data = await response.json();

    if (data.error) {
      console.error(JSON.stringify({ event: 'generation_error', timestamp, userId, error: data.error.type }));
      return Response.json({ error: data.error }, { status: 500 });
    }

    console.log(JSON.stringify({
      event: 'generation_success',
      timestamp,
      userId,
      model: body.model,
      inputTokens: data.usage?.input_tokens || 0,
      outputTokens: data.usage?.output_tokens || 0,
    }));

    return Response.json(data);
  } catch (err) {
    console.error(JSON.stringify({ event: 'generation_exception', timestamp, userId, error: err.message }));
    return Response.json({ error: { message: err.message } }, { status: 500 });
  }
}
