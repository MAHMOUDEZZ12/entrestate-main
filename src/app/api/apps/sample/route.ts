
import { NextRequest, NextResponse } from 'next/server';
import { buildSamplePayload, appsRegistry } from '@/lib/apps/io';

export async function GET(req: NextRequest){
  const { searchParams } = new URL(req.url);
  const appId = searchParams.get('appId') || '';
  const app = appsRegistry.find(a => a.id === appId);
  if(!app) return NextResponse.json({ ok:false, error:'Unknown appId' }, { status: 404 });
  const payload = buildSamplePayload(appId);
  return NextResponse.json({ ok:true, app: appId, sample: payload, required: app.inputs.filter(f=>f.required).map(f=>f.key) });
}
