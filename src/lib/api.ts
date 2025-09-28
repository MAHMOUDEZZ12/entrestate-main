export function ok<T>(data: T, status = 200) {
  return Response.json({ ok: true, data }, { status });
}

export function bad(message: string, status = 400) {
  return Response.json({ ok: false, error: message }, { status });
}

export async function readJson<T = unknown>(req: Request): Promise<T> {
  try {
    return (await req.json()) as T;
  } catch {
    return {} as T;
  }
}

export async function postJSON<T = any>(url: string, data: any): Promise<T> {
  const res = await fetch(url, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw Object.assign(new Error(err?.error || `Request failed: ${res.status}`), { status: res.status, err });
  }
  return (await res.json()) as T;
}
