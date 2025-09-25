import fs from 'node:fs';
import path from 'node:path';
import Markdown from '@/components/md/MarkdownViewer';

export const dynamic = 'force-static';

export default function CloudPage(){
  const docPath = path.join(process.cwd(), 'docs', 'entrestate-cloud.md');
  const source = fs.readFileSync(docPath, 'utf-8');

  return (
    <main className="px-6 py-10 max-w-5xl mx-auto space-y-10">
      <header className="space-y-2">
        <h1 className="text-4xl font-bold tracking-tight">Entrestate Cloud & Data Intelligence</h1>
        <p className="text-muted-foreground">Vertex + Gemini ready architecture, flows, and market library.</p>
      </header>

      <section className="grid gap-6">
        <Markdown source={source} />
      </section>

      <section className="border rounded-2xl p-6 shadow-sm">
        <h2 className="text-2xl font-semibold mb-3">AI Market Search (Demo)</h2>
        <p className="text-sm text-muted-foreground mb-4">This calls a server route that you can wire to Vertex Search / Gemini. No keys stored here.</p>
        <form action="/api/ai/search" method="GET" className="flex gap-3">
          <input name="q" placeholder="Try: Dubai Marina offplan yields" className="flex-1 border px-3 py-2 rounded-lg"/>
          <button className="px-4 py-2 rounded-lg border">Search</button>
        </form>
        <p className="text-xs text-muted-foreground mt-3">Wire it by editing <code>src/app/api/ai/search/route.ts</code> and <code>src/lib/ai/vertex.ts</code>.</p>
      </section>
    </main>
  );
}