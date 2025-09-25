
import { NextRequest, NextResponse } from 'next/server';
import { sampleFlows } from '@/lib/flows/schema';

export async function POST(req: NextRequest){
  const body = await req.json().catch(()=> ({}));
  const { flowId, input } = body || {};
  const flow = sampleFlows.find(f => f.id === flowId);
  if(!flow) return NextResponse.json({ ok:false, error: 'Unknown flowId' }, { status: 404 });

  // Simulate execution (no external calls)
  const timeline = flow.steps.map((s, i) => ({
    step: i+1,
    id: s.id,
    type: s.type,
    title: s.title,
    status: 'ok',
    notes: 'Simulated'
  }));

  return NextResponse.json({ ok:true, flow: flowId, timeline });
}
