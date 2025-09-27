'use client';

interface RunToolOptions {
  signal?: AbortSignal;
}

export async function runTool<T>(toolId: string, payload: unknown, options: RunToolOptions = {}): Promise<T> {
  const response = await fetch('/api/run', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ toolId, payload }),
    signal: options.signal,
  });

  let data: any = null;
  try {
    data = await response.json();
  } catch {
    // ignore JSON parse errors; will handle via status below
  }

  if (!response.ok) {
    const message = data?.error || `Request failed with status ${response.status}`;
    throw new Error(message);
  }

  return data as T;
}
