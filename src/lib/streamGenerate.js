export async function streamGenerate({ system, messages, max_tokens = 4000, model = 'claude-sonnet-4-6' }) {
  const response = await fetch('/api/generate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ model, max_tokens, system, messages }),
  });

  const data = await response.json();
  if (!response.ok) throw new Error(data.error?.message || 'Generation failed');
  return (data.text || '').replace(/\*\*/g, '').replace(/\*/g, '');
}
