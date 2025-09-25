
import { NextRequest, NextResponse } from 'next/server';
import { getDb, verifyIdToken } from '@/lib/firebaseAdmin';

type FlowDoc = {
  id?: string;
  name: string;
  description?: string;
  steps: any[];
  enabled?: boolean;
  ownerUid?: string | 'public';
  createdAt?: FirebaseFirestore.Timestamp;
  updatedAt?: FirebaseFirestore.Timestamp;
};

export async function GET(req: NextRequest){
  const { searchParams } = new URL(req.url);
  const scope = searchParams.get('scope') || 'all'; // 'all' | 'me' | 'public'
  const auth = await verifyIdToken(req.headers.get('authorization') || undefined);
  const db = getDb();

  let q = db.collection('flows') as FirebaseFirestore.Query;
  if(scope === 'me'){
    if(!auth) return NextResponse.json({ ok:false, error:'Auth required' }, { status: 401 });
    q = q.where('ownerUid', '==', auth.uid);
  }else if(scope === 'public'){
    q = q.where('ownerUid', '==', 'public');
  }

  const snap = await q.orderBy('updatedAt', 'desc').limit(200).get();
  const flows = snap.docs.map(d => ({ id: d.id, ...d.data() }));
  return NextResponse.json({ ok:true, flows });
}

export async function POST(req: NextRequest){
  const db = getDb();
  const auth = await verifyIdToken(req.headers.get('authorization') || undefined);
  const now = new Date();

  const body = await req.json().catch(()=> ({}));
  // Single upsert: { id?, name, steps, ... } OR batch: { flows: FlowDoc[] }
  if(Array.isArray(body.flows)){
    const batch = db.batch();
    for(const f of body.flows as FlowDoc[]){
      const id = f.id || db.collection('flows').doc().id;
      const ref = db.collection('flows').doc(id);
      const ownerUid = f.ownerUid || (auth?.uid || 'public');
      batch.set(ref, { ...f, ownerUid, updatedAt: now, createdAt: f.createdAt || now }, { merge: true });
    }
    await batch.commit();
    return NextResponse.json({ ok:true, count: body.flows.length });
  }else{
    const f = body as FlowDoc;
    const id = f.id || db.collection('flows').doc().id;
    const ref = db.collection('flows').doc(id);
    const ownerUid = f.ownerUid || (auth?.uid || 'public');
    await ref.set({ ...f, ownerUid, updatedAt: now, createdAt: f.createdAt || now }, { merge: true });
    return NextResponse.json({ ok:true, id });
  }
}
