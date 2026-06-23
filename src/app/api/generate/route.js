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
      const err = await response.json().catch(() => ({}));
      return Response.json({ error: { message: err.error?.message || 'API error' } }, { status: response.status });
    }

    const data = await response.json();
    const text = data.content?.[0]?.text || '';
    return Response.json({ text });
  } catch (err) {
    console.error(JSON.stringify({ event: 'generation_error', userId, error: err.message }));
    return Response.json({ error: { message: err.message } }, { status: 500 });
  }
}
