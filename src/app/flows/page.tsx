
'use client';
import React, { useMemo, useState } from 'react';
import { sampleFlows, Flow } from '@/lib/flows/schema';

export default function FlowsPage(){
  const [q, setQ] = useState('');
  const flows = useMemo(() => {
    const t = q.toLowerCase().trim();
    if(!t) return sampleFlows;
    return sampleFlows.filter(f => f.name.toLowerCase().includes(t) || (f.description||'').toLowerCase().includes(t));
  }, [q]);

  return (
    <main className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-2">Flows</h1>
      <p className="text-muted-foreground mb-4">Plan and document cross-suite automations (PDF → Creative → Landing → Video → DNS, etc.).</p>
      <div className="mb-6">
        <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search flows…" className="w-full max-w-md border rounded-lg px-3 py-2"/>
      </div>
      <div className="grid gap-6">
        {flows.map(f => <FlowCard key={f.id} flow={f} />)}
      </div>
    </main>
  );
}

function FlowCard({ flow }: { flow: Flow }){
  return (
    <section className="border rounded-2xl p-5">
      <header className="flex items-center justify-between mb-3">
        <div>
          <h2 className="text-xl font-semibold">{flow.name}</h2>
          <p className="text-sm text-muted-foreground">{flow.description}</p>
        </div>
        <span className="text-xs px-2 py-1 rounded bg-gray-100 border">{flow.enabled ? 'Enabled' : 'Disabled'}</span>
      </header>
      <ol className="list-decimal pl-6 space-y-2">
        {flow.steps.map(s => (
          <li key={s.id}>
            <div className="font-medium">{s.title}</div>
            <div className="text-xs text-muted-foreground">{s.type}</div>
            {s.input ? <pre className="text-xs bg-gray-50 border p-2 rounded mt-1 overflow-x-auto">{JSON.stringify(s.input, null, 2)}</pre> : null}
          </li>
        ))}
      </ol>
    </section>
  );
}
