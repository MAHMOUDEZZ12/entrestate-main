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
import { Stethoscope } from 'lucide-react';

const TOOL_NAME = 'Listing Health';

type SubmissionState = 'idle' | 'submitting' | 'success' | 'error';

export default function ListingHealthToolPage() {
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
        title="Listing Health"
        subtitle="Drop any portal link to receive an optimization checklist, creative recommendations, and engagement benchmarks."
      />

      <ToolLayout
        form={
          state === 'success' ? (
            <Card className="border-emerald-200 bg-emerald-50">
              <CardHeader className="flex flex-row items-center gap-3">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/20 text-emerald-700">
                  <Stethoscope className="h-5 w-5" />
                </span>
                <div>
                  <CardTitle className="text-lg text-emerald-800">Health check scheduled</CardTitle>
                  <CardDescription className="text-emerald-700">
                    We'll share your scorecard and quick wins in your inbox shortly.
                  </CardDescription>
                </div>
              </CardHeader>
              <CardContent className="flex items-center gap-3">
                <Button size="sm" onClick={() => setState('idle')} variant="secondary">
                  Analyse another listing
                </Button>
                <Button size="sm" variant="outline" asChild>
                  <a href="/(platform)/workspace/tools/meta-audit">Audit Meta campaigns →</a>
                </Button>
              </CardContent>
            </Card>
          ) : (
            <Card className="border-primary/20 shadow-md">
              <CardHeader className="space-y-2">
                <CardTitle className="text-xl">Listing details</CardTitle>
                <CardDescription>Benchmark visibility, conversion cues, and freshness across your portals.</CardDescription>
                <Badge variant="secondary" className="w-max">Turnaround ≈ 2 minutes</Badge>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid gap-2">
                    <Label htmlFor="email">Work email</Label>
                    <Input id="email" name="email" type="email" placeholder="you@company.com" required />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="portal">Portal</Label>
                    <Input id="portal" name="portal" placeholder="e.g. Bayut, Property Finder" required />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="listingUrl">Listing URL</Label>
                    <Input
                      id="listingUrl"
                      name="listingUrl"
                      type="url"
                      placeholder="https://..."
                      required
                    />
                  </div>
                  {state === 'error' ? (
                    <Alert variant="destructive">
                      <AlertTitle>Submission failed</AlertTitle>
                      <AlertDescription>{error}</AlertDescription>
                    </Alert>
                  ) : null}
                  <div className="flex flex-wrap justify-end gap-2">
                    <Button type="submit" disabled={state === 'submitting'}>
                      {state === 'submitting' ? 'Scanning…' : 'Run check'}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          )
        }
        helpPanel={
          <ToolHelpPanel
            title="Benchmark highlights"
            description="Every report includes shareable visuals you can drop into client updates."
            tips={[
              { label: 'Search rank', detail: 'Compare your placement vs. peers on Bayut, PF, Dubizzle, and Emaar.' },
              { label: 'Creative hygiene', detail: 'Spot missing floorplans, watermarks, or low-resolution galleries.' },
              { label: 'Renewal alerts', detail: 'Flag listings approaching expiry or losing featured placements.' },
            ]}
            footer="Connect your CRM to automate refresh triggers and assign owners."
          />
        }
      />
    </div>
  );
}
