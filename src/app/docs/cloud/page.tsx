import fs from 'node:fs';
import path from 'node:path';
import Markdown from '@/components/md/MarkdownViewer';
import { PlatformHero } from '@/components/platform/PlatformHero';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export const dynamic = 'force-static';

export default function CloudPage() {
  const docPath = path.join(process.cwd(), 'docs', 'entrestate-cloud.md');
  const source = fs.readFileSync(docPath, 'utf-8');

  return (
    <main className="mx-auto flex max-w-5xl flex-col gap-10 px-6 py-10">
      <PlatformHero
        eyebrow="Documentation"
        title="Entrestate Cloud & Data Intelligence"
        subtitle="Wire Vertex + Gemini flows into your workspace. Stream data from portals, CRM, and AI agents with a single shell."
        className="bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950"
        actions={
          <Button asChild size="sm" variant="secondary">
            <Link href="/workspace">Open workspace</Link>
          </Button>
        }
        achievements={[
          { label: 'Managed connectors', value: '12 ready-made' },
          { label: 'Latency targets', value: '< 3s round-trip' },
          { label: 'Telemetry events', value: '1.2M / month' },
        ]}
      />

      <Card>
        <CardHeader>
          <CardTitle>Platform architecture</CardTitle>
          <CardDescription>Infrastructure, flows, and adapters that power the Entrestate Cloud engine.</CardDescription>
        </CardHeader>
        <CardContent className="prose prose-slate max-w-none dark:prose-invert">
          <Markdown source={source} />
        </CardContent>
      </Card>

      <Card className="border-primary/20 bg-primary/5">
        <CardHeader>
          <CardTitle>AI Market Search (Demo)</CardTitle>
          <CardDescription>
            Point this demo at Vertex AI Search or any custom index. No keys are captured in this example UI.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <form action="/api/ai/search" method="GET" className="flex flex-col gap-3 md:flex-row">
            <input
              name="q"
              placeholder="Try: Dubai Marina offplan yields"
              className="flex-1 rounded-lg border px-3 py-2"
            />
            <Button type="submit" variant="outline">
              Run demo search
            </Button>
          </form>
          <p className="text-xs text-muted-foreground">
            Wire it by editing <code>src/app/api/ai/search/route.ts</code> and <code>src/lib/ai/vertex.ts</code>.
          </p>
        </CardContent>
      </Card>
    </main>
  );
}
