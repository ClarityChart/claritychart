export async function POST(request) {
  const body = await request.json();
  const apiKey = process.env.ANTHROPIC_API_KEY;
  
  console.log('API key present:', !!apiKey);
  console.log('API key length:', apiKey ? apiKey.length : 0);
  console.log('API key prefix:', apiKey ? apiKey.substring(0, 10) : 'none');

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    if (data.error) {
      console.error('Anthropic API error:', JSON.stringify(data.error));
      return Response.json({ error: data.error, keyPresent: !!apiKey, keyLength: apiKey?.length }, { status: 500 });
    }

    return Response.json(data);
  } catch (err) {
    console.error('Route error:', err.message);
    return Response.json({ error: { message: err.message } }, { status: 500 });
  }
}
