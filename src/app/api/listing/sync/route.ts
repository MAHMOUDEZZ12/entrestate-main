
import { NextRequest, NextResponse } from 'next/server';
import { toBayut, toPropertyFinder } from '@/lib/portals/adapters';

export async function POST(req: NextRequest){
  const body = await req.json().catch(()=> ({}));
  const { portal, listing } = body || {};
  if(!portal || !listing){
    return NextResponse.json({ ok:false, error: 'portal and listing required' }, { status: 400 });
  }
  let payload: any = null;
  if(portal.toLowerCase().includes('bayut')) payload = toBayut(listing);
  else if(portal.toLowerCase().includes('finder')) payload = toPropertyFinder(listing);
  else return NextResponse.json({ ok:false, error:'Unknown portal' }, { status: 400 });

  // Simulate queue id
  const jobId = 'job_' + Math.random().toString(36).slice(2,10);
  return NextResponse.json({ ok:true, portal, jobId, payload });
}
