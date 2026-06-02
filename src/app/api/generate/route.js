import { BedrockRuntimeClient, InvokeModelWithResponseStreamCommand } from '@aws-sdk/client-bedrock-runtime';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

export const maxDuration = 300;

export async function POST(request) {
  const body = await request.json();
  const timestamp = new Date().toISOString();

  const bedrock = new BedrockRuntimeClient({
    region: process.env.BEDROCK_REGION || 'us-east-1',
    credentials: {
      accessKeyId: process.env.BEDROCK_ACCESS_KEY_ID,
      secretAccessKey: process.env.BEDROCK_SECRET_ACCESS_KEY,
    },
  });

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
    const bedrockBody = {
      anthropic_version: 'bedrock-2023-05-31',
      max_tokens: body.max_tokens || 4000,
      messages: body.messages,
    };
    if (body.system) bedrockBody.system = body.system;

    const command = new InvokeModelWithResponseStreamCommand({
      modelId: 'us.anthropic.claude-haiku-4-5',
      contentType: 'application/json',
      accept: 'application/json',
      body: JSON.stringify(bedrockBody),
    });

    const response = await bedrock.send(command);

    let fullText = '';
    let inputTokens = 0;
    let outputTokens = 0;

    const stream = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of response.body) {
            if (chunk.chunk?.bytes) {
              const decoded = JSON.parse(new TextDecoder().decode(chunk.chunk.bytes));
              if (decoded.type === 'content_block_delta' && decoded.delta?.text) {
                fullText += decoded.delta.text;
                controller.enqueue(new TextEncoder().encode(decoded.delta.text));
              }
              if (decoded.type === 'message_delta' && decoded.usage) {
                outputTokens = decoded.usage.output_tokens || 0;
              }
              if (decoded.type === 'message_start' && decoded.message?.usage) {
                inputTokens = decoded.message.usage.input_tokens || 0;
              }
            }
          }
          console.log(JSON.stringify({
            event: 'generation_success',
            timestamp,
            userId,
            model: 'claude-sonnet-4-6-bedrock-stream',
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
    console.error(JSON.stringify({ event: 'generation_error', timestamp, userId, error: err.message }));
    return Response.json({ error: { message: err.message } }, { status: 500 });
  }
}
