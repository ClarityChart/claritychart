import { BedrockRuntimeClient, InvokeModelCommand } from '@aws-sdk/client-bedrock-runtime';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

export const maxDuration = 300;

export async function POST(request) {
  const body = await request.json();
  const timestamp = new Date().toISOString();

  // Initialize Bedrock client inside the function so env vars are available at runtime
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

  // Debug — log credential status (not the actual values)
  console.log(JSON.stringify({
    event: 'credential_check',
    hasAccessKey: !!process.env.BEDROCK_ACCESS_KEY_ID,
    hasSecretKey: !!process.env.BEDROCK_SECRET_ACCESS_KEY,
    region: process.env.BEDROCK_REGION || 'us-east-1',
    accessKeyLength: (process.env.BEDROCK_ACCESS_KEY_ID || '').length,
  }));

  try {
    const bedrockBody = {
      anthropic_version: 'bedrock-2023-05-31',
      max_tokens: body.max_tokens || 8000,
      messages: body.messages,
    };
    if (body.system) bedrockBody.system = body.system;

    const command = new InvokeModelCommand({
      modelId: 'us.anthropic.claude-sonnet-4-6',
      contentType: 'application/json',
      accept: 'application/json',
      body: JSON.stringify(bedrockBody),
    });

    const response = await bedrock.send(command);
    const data = JSON.parse(new TextDecoder().decode(response.body));

    console.log(JSON.stringify({
      event: 'generation_success',
      timestamp,
      userId,
      model: 'claude-sonnet-4-6-bedrock',
      inputTokens: data.usage?.input_tokens || 0,
      outputTokens: data.usage?.output_tokens || 0,
    }));

    return Response.json(data);
  } catch (err) {
    console.error(JSON.stringify({
      event: 'generation_error',
      timestamp,
      userId,
      error: err.message,
    }));
    return Response.json({ error: { message: err.message } }, { status: 500 });
  }
}
