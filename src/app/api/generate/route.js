import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

export const maxDuration = 300;

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
      body: JSON.stringify({ ...body, stream: true }),
    });

    const stream = new ReadableStream({
      async start(controller) {
        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let fullText = '';
        let inputTokens = 0;
        let outputTokens = 0;

        try {
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            
            const chunk = decoder.decode(value, { stream: true });
            const lines = chunk.split('\n');
            
            for (const line of lines) {
              if (line.startsWith('data: ')) {
                const data = line.slice(6).trim();
                if (data === '[DONE]') continue;
                try {
                  const parsed = JSON.parse(data);
                  if (parsed.type === 'content_block_delta' && parsed.delta?.text) {
                    fullText += parsed.delta.text;
                    controller.enqueue(new TextEncoder().encode(parsed.delta.text));
                  }
                  if (parsed.type === 'message_start') {
                    inputTokens = parsed.message?.usage?.input_tokens || 0;
                  }
                  if (parsed.type === 'message_delta') {
                    outputTokens = parsed.usage?.output_tokens || 0;
                  }
                } catch (e) {}
              }
            }
          }

          console.log(JSON.stringify({
            event: 'generation_success',
            timestamp,
            userId,
            model: body.model,
            inputTokens,
            outputTokens,
          }));
          controller.close();
        } catch (err) {
          console.error(JSON.stringify({ event: 'stream_error', timestamp, userId, error: err.message }));
          controller.error(err);
        }
      }
    });

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Transfer-Encoding': 'chunked',
        'X-Accel-Buffering': 'no',
      },
    });

  } catch (err) {
    console.error(JSON.stringify({ event: 'generation_exception', timestamp, userId, error: err.message }));
    return Response.json({ error: { message: err.message } }, { status: 500 });
  }
}
