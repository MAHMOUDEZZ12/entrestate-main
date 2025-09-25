
'use client';
import React, { useEffect, useMemo, useState } from 'react';
import { appsRegistry } from '@/lib/apps/io';

type Props = { params: { appId: string } };

export default function AppFormPage({ params }: Props){
  const app = appsRegistry.find(a => a.id === params.appId);
  const [payload, setPayload] = useState<Record<string, any>>({});
  const [result, setResult] = useState<any>(null);

  useEffect(() => { setResult(null); }, [params.appId]);

  if(!app) return <div className="p-6">Unknown app: {params.appId}</div>;

  function setField(k: string, v: any){
    setPayload(prev => ({ ...prev, [k]: v }));
  }

  async function validate(){
    const r = await fetch('/api/apps/validate', {
      method: 'POST', headers: {'content-type':'application/json'},
      body: JSON.stringify({ appId: app.id, payload })
    }).then(r => r.json());
    setResult(r);
  }

  return (
    <main className="p-6 max-w-3xl mx-auto space-y-4">
      <h1 className="text-2xl font-bold">Form: {app.name}</h1>
      <p className="text-sm text-muted-foreground">{app.description}</p>

      <form className="grid gap-4" onSubmit={e=>{e.preventDefault(); validate();}}>
        {app.inputs.map(f => (
          <div key={f.key} className="grid gap-1">
            <label className="text-sm font-medium">{f.label} {f.required ? <span className="text-red-500">*</span> : null}</label>
            {renderField(f, payload[f.key], (v)=>setField(f.key, v))}
            <div className="text-xs text-muted-foreground">
              {f.description || ''} {f.example !== undefined ? <> • e.g., <code>{Array.isArray(f.example)? JSON.stringify(f.example): String(f.example)}</code></> : null}
            </div>
          </div>
        ))}
        <div>
          <button className="border rounded-lg px-3 py-2 text-sm">Validate</button>
        </div>
      </form>

      {result ? (
        <pre className="text-xs bg-gray-50 border rounded p-3 overflow-x-auto">{JSON.stringify(result, null, 2)}</pre>
      ) : null}
    </main>
  );
}

function renderField(f: any, value: any, onChange: (v:any)=>void){
  const c = f.constraints || {};
  if(f.type === 'string' || f.type === 'email' || f.type === 'url' || f.type === 'phone' || f.type === 'markdown'){
    if(c.enum){
      return (
        <select value={value || ''} onChange={e=>onChange(e.target.value)} className="border rounded px-2 py-1">
          <option value="">Select…</option>
          {c.enum.map((v: string)=> <option key={v} value={v}>{v}</option>)}
        </select>
      );
    }
    return <input value={value || ''} onChange={e=>onChange(e.target.value)} className="border rounded px-2 py-1"/>;
  }
  if(f.type === 'number'){
    return <input type="number" min={c.min} max={c.max} value={value ?? ''} onChange={e=>onChange(e.target.value===''?undefined:Number(e.target.value))} className="border rounded px-2 py-1"/>;
  }
  if(f.type === 'boolean'){
    return <input type="checkbox" checked={!!value} onChange={e=>onChange(e.target.checked)} />;
  }
  if(f.type === 'json'){
    return <textarea rows={4} value={JSON.stringify(value || {}, null, 2)} onChange={e=>{ try{ onChange(JSON.parse(e.target.value||'{}')); }catch{} }} className="border rounded p-2 text-xs font-mono"/>;
  }
  return <input value={value || ''} onChange={e=>onChange(e.target.value)} className="border rounded px-2 py-1"/>;
}
