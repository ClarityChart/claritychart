// Generate utility
export async function streamGenerate({ system, messages, max_tokens = 4000, model = 'claude-sonnet-4-6' }) {
  const response = await fetch('/api/generate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ model, max_tokens, system, messages }),
  });

  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(err.error?.message || 'Generation failed');
  }

  const data = await response.json();
  if (data.error) throw new Error(data.error.message || 'Generation failed');
  return (data.content?.[0]?.text || '').replace(/\*\*/g, '').replace(/\*/g, '');
}
