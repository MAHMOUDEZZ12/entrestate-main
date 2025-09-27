import { NextRequest } from 'next/server';
import { v4 as uuid } from 'uuid';
import { ok, readJson } from '@/lib/api';
import { getDb } from '@/lib/firebaseAdmin';

function normalizeEntries(entries: Iterable<[string, FormDataEntryValue]>) {
  return Object.fromEntries(
    [...entries].filter(([, value]) => typeof value === 'string'),
  );
}

export async function POST(req: NextRequest) {
  const contentType = req.headers.get('content-type') || '';
  const db = getDb();
  let data: Record<string, unknown> = {};

  if (contentType.includes('multipart/form-data')) {
    const form = await req.formData();
    data = normalizeEntries(form.entries());
  } else {
    data = await readJson<Record<string, unknown>>(req);
  }

  const id = uuid();
  await db.collection('free_tools_submissions').doc(id).set({
    ...data,
    ts: new Date(),
  });

  return ok({ id });
}
