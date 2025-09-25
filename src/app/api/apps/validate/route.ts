
import { NextRequest, NextResponse } from 'next/server';
import { validateData } from '@/lib/apps/io';

export async function POST(req: NextRequest){
  const body = await req.json().catch(() => ({}));
  const { appId, payload } = body || {};
  const result = validateData(appId, payload || {});
  return NextResponse.json(result, { status: result.ok ? 200 : 400 });
}
