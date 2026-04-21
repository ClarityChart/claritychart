export async function POST(request) {
  const body = await request.json();

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
      console.error('Anthropic API error:', JSON.stringify(data.error));
      return Response.json({ error: data.error }, { status: 500 });
    }

    return Response.json(data);
  } catch (err) {
    console.error('Route error:', err.message);
    return Response.json({ error: { message: err.message } }, { status: 500 });
  }
}
