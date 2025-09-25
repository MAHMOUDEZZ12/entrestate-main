'use client';
import React from 'react';

export function SearchResults({ results }: { results: { title: string; snippet: string; url?: string; }[] }){
  return (
    <div className="mt-4 grid gap-3">
      {results?.map((r, i) => (
        <div key={i} className="border rounded-xl p-4">
          <div className="font-semibold">{r.title}</div>
          <div className="text-sm text-muted-foreground">{r.snippet}</div>
          {r.url && <a href={r.url} className="text-xs underline">Open</a>}
        </div>
      ))}
    </div>
  );
}