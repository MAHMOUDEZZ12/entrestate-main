'use client';

import { FormEvent, useState } from 'react';
import { PageHeading } from '@/components/platform/PageHeading';
import { ToolLayout } from '@/components/platform/ToolLayout';
import { ToolHelpPanel } from '@/components/platform/ToolHelpPanel';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Sparkles } from 'lucide-react';

const TOOL_NAME = 'Meta Audit';

type SubmissionState = 'idle' | 'submitting' | 'success' | 'error';

export default function MetaAuditToolPage() {
  const [state, setState] = useState<SubmissionState>('idle');
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState('submitting');
    setError(null);

    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = Object.fromEntries(formData.entries());

    try {
      const response = await fetch('/api/tools/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tool: TOOL_NAME, ...payload }),
      });

      const json = await response.json();
      if (!response.ok || !json?.ok) {
        throw new Error(json?.error || 'Unable to submit request.');
      }

      form.reset();
      setState('success');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unexpected error.');
      setState('error');
    }
  }

  return (
    <div className="space-y-8">
      <PageHeading
        title="Meta Audit"
        subtitle="Plug in your ad account and receive a curated punch list for creatives, audience coverage, and pacing."
      />

      <ToolLayout
        form={
          state === 'success' ? (
            <Card className="border-emerald-200 bg-emerald-50">
              <CardHeader className="flex flex-row items-center gap-3">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/20 text-emerald-700">
                  <Sparkles className="h-5 w-5" />
                </span>
                <div>
                  <CardTitle className="text-lg text-emerald-800">Audit queued</CardTitle>
                  <CardDescription className="text-emerald-700">
                    We'll email the full breakdown and recommended campaigns shortly.
                  </CardDescription>
                </div>
              </CardHeader>
              <CardContent className="flex items-center gap-3">
                <Button size="sm" onClick={() => setState('idle')} variant="secondary">
                  Run another audit
                </Button>
                <Button size="sm" variant="outline" asChild>
                  <a href="/(platform)/workspace/tools/listing-health">Check listing health →</a>
                </Button>
              </CardContent>
            </Card>
          ) : (
            <Card className="border-primary/20 shadow-md">
              <CardHeader className="space-y-2">
                <CardTitle className="text-xl">Account details</CardTitle>
                <CardDescription>We'll scan creatives, delivery, pacing, and learning phases.</CardDescription>
                <Badge variant="secondary" className="w-max">Turnaround ≈ 90 seconds</Badge>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid gap-2">
                    <Label htmlFor="email">Work email</Label>
                    <Input id="email" name="email" type="email" placeholder="you@company.com" required />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="adAccount">Meta ad account ID</Label>
                    <Input id="adAccount" name="adAccount" placeholder="e.g. 1234567890" required />
                  </div>
                  {state === 'error' ? (
                    <Alert variant="destructive">
                      <AlertTitle>Submission failed</AlertTitle>
                      <AlertDescription>{error}</AlertDescription>
                    </Alert>
                  ) : null}
                  <div className="flex flex-wrap justify-end gap-2">
                    <Button type="submit" disabled={state === 'submitting'}>
                      {state === 'submitting' ? 'Scanning…' : 'Run audit'}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          )
        }
        helpPanel={
          <ToolHelpPanel
            title="What you get"
            description="Actionable recommendations across creative, audiences, and budget pacing."
            tips={[
              { label: 'Creative lift', detail: 'Receive top 5 improvements for your highest-spend ad sets.' },
              { label: 'Delivery guardrails', detail: 'Spot limited learning, frequency spikes, and fatigue early.' },
              { label: 'Audience coverage', detail: 'See audience overlap scores and missing segments at a glance.' },
            ]}
            footer="Need continuous monitoring? Upgrade to automations in the Workspace home."
          />
        }
      />
    </div>
  );
}
