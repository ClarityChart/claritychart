// Generate utility - calls Anthropic API directly from browser
export async function streamGenerate({ system, messages, max_tokens = 4000, model = 'claude-sonnet-4-6' }) {
  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': process.env.NEXT_PUBLIC_ANTHROPIC_API_KEY,
      'anthropic-version': '2023-06-01',
      'anthropic-dangerous-direct-browser-access': 'true',
    },
    body: JSON.stringify({
      model,
      max_tokens,
      system,
      messages,
    }),
  });

  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(err.error?.message || 'Generation failed');
  }

  const data = await response.json();
  if (data.error) throw new Error(data.error.message || 'Generation failed');
  return (data.content?.[0]?.text || '').replace(/\*\*/g, '').replace(/\*/g, '');
}
