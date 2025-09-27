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
