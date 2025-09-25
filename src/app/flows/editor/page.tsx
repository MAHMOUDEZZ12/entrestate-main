
'use client';
import React, { useMemo, useState } from 'react';
import { sampleFlows, Flow, FlowStep } from '@/lib/flows/schema';
import { CopyButton } from '@/components/ui/CopyButton';
async function saveAll(flows:any[]){
  const res = await fetch('/api/flows', { method:'POST', headers:{'content-type':'application/json'}, body: JSON.stringify({ flows }) });
  const j = await res.json(); alert('Saved: '+JSON.stringify(j));
}

function uid(){ return Math.random().toString(36).slice(2,8); }

export default function FlowsEditorPage(){
  const [flows, setFlows] = useState<Flow[]>(sampleFlows.map(f => ({...f})));
  const [q, setQ] = useState('');

  const visible = useMemo(() => {
    const t = q.toLowerCase().trim();
    if(!t) return flows;
    return flows.filter(f => f.name.toLowerCase().includes(t) || (f.description||'').toLowerCase().includes(t));
  }, [flows, q]);

  function addFlow(){
    setFlows(prev => prev.concat([{ id: uid(), name: 'New Flow', description: '', steps: [], enabled: true }]));
  }

  function addStep(flowId: string){
    setFlows(prev => prev.map(f => f.id === flowId ? {
      ...f,
      steps: f.steps.concat([{ id: uid(), type: 'ai.plan', title: 'New Step', input: {} } as FlowStep])
    } : f));
  }

  function updateFlow(flowId: string, patch: Partial<Flow>){
    setFlows(prev => prev.map(f => f.id === flowId ? { ...f, ...patch } : f));
  }

  function updateStep(flowId: string, stepId: string, patch: Partial<FlowStep>){
    setFlows(prev => prev.map(f => {
      if(f.id !== flowId) return f;
      return { ...f, steps: f.steps.map(s => s.id === stepId ? { ...s, ...patch } : s) };
    }));
  }

  function removeStep(flowId: string, stepId: string){
    setFlows(prev => prev.map(f => f.id === flowId ? { ...f, steps: f.steps.filter(s => s.id !== stepId) } : f));
  }

  const json = JSON.stringify(flows, null, 2);

  return (
    <main className="p-6 max-w-6xl mx-auto space-y-4">
      <header className="flex items-center gap-3">
        <h1 className="text-3xl font-bold">Flows Editor</h1>
        <button className="border rounded-lg px-3 py-2 text-sm" onClick={addFlow}>Add Flow</button>
        <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search…" className="ml-auto border rounded-lg px-3 py-2"/>
        <CopyButton text={json} label="Copy JSON"/>
        <button className="border rounded-lg px-3 py-2 text-sm" onClick={()=>saveAll(flows)}>Save All</button>
      </header>

      <div className="grid gap-6">
        {visible.map(f => (
          <section key={f.id} className="border rounded-2xl p-4">
            <div className="flex items-center gap-3 mb-2">
              <input value={f.name} onChange={e=>updateFlow(f.id, { name: e.target.value })} className="font-semibold text-lg border rounded px-2 py-1"/>
              <label className="text-xs flex items-center gap-2">
                <input type="checkbox" checked={!!f.enabled} onChange={e=>updateFlow(f.id, { enabled: e.target.checked })}/>
                Enabled
              </label>
            </div>
            <textarea value={f.description || ''} onChange={e=>updateFlow(f.id, { description: e.target.value })} className="w-full border rounded p-2 text-sm mb-3" placeholder="Description"/>
            <ol className="list-decimal pl-6 space-y-2">
              {f.steps.map(s => (
                <li key={s.id}>
                  <div className="grid md:grid-cols-3 gap-2 items-start">
                    <input value={s.title} onChange={e=>updateStep(f.id, s.id, { title: e.target.value })} className="border rounded px-2 py-1"/>
                    <select value={s.type} onChange={e=>updateStep(f.id, s.id, { type: e.target.value as any })} className="border rounded px-2 py-1">
                      <option>ingest.pdf</option>
                      <option>ingest.images</option>
                      <option>creative.edit</option>
                      <option>landing.generate</option>
                      <option>video.hero</option>
                      <option>deploy.dns</option>
                      <option>listing.sync</option>
                      <option>ai.search</option>
                      <option>ai.plan</option>
                    </select>
                    <textarea value={JSON.stringify(s.input||{}, null, 2)} onChange={e=>{
                      try{ updateStep(f.id, s.id, { input: JSON.parse(e.target.value||'{}') }); }catch{}
                    }} className="border rounded p-2 text-xs font-mono" rows={3}/>
                  </div>
                  <div className="mt-1">
                    <button className="text-xs underline" onClick={()=>removeStep(f.id, s.id)}>Remove</button>
                  </div>
                </li>
              ))}
            </ol>
            <div className="mt-3">
              <button className="border rounded-lg px-3 py-1 text-sm" onClick={()=>addStep(f.id)}>Add Step</button>
              <a className="ml-3 text-sm underline" href={`/api/flows/execute`} onClick={(e)=>{e.preventDefault(); fetch('/api/flows/execute',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({flowId:f.id})}).then(r=>r.json()).then(j=>alert('Executed: '+JSON.stringify(j)));}}>Simulate</a>
            </div>
          </section>
        ))}
      </div>

      <section className="border rounded-2xl p-4">
        <h2 className="font-semibold mb-2">Export</h2>
        <p className="text-sm text-muted-foreground mb-2">Copy the JSON and commit to <code>docs/flows.custom.json</code> to keep versioned.</p>
        <pre className="text-xs bg-gray-50 border p-3 rounded overflow-x-auto">{json}</pre>
      </section>
    </main>
  );
}
