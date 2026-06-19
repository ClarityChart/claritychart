// Generate utility - handles both streaming and JSON responses
export async function streamGenerate({ system, messages, max_tokens = 4000 }) {
  const response = await fetch('/api/generate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: 'claude-sonnet-4-5-20251001',
      max_tokens,
      system,
      messages,
    }),
  });

  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(err.error?.message || 'Generation failed');
  }

  const contentType = response.headers.get('content-type') || '';
  
  if (contentType.includes('application/json')) {
    // Standard JSON response (Anthropic API)
    const data = await response.json();
    if (data.error) throw new Error(data.error.message || 'Generation failed');
    return (data.content?.[0]?.text || '').replace(/\*\*/g, '').replace(/\*/g, '');
  } else {
    // Streaming response (Bedrock)
    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let fullText = '';
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      fullText += decoder.decode(value, { stream: true });
    }
    return fullText.replace(/\*\*/g, '').replace(/\*/g, '');
  }
}
