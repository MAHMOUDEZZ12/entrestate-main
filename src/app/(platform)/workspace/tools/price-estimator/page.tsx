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
import { MessageSquare } from 'lucide-react';

const TOOL_NAME = 'Price Estimator';

type SubmissionState = 'idle' | 'submitting' | 'success' | 'error';

export default function PriceEstimatorToolPage() {
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
        title="Price Estimator"
        subtitle="Craft a data-backed pricing narrative ready to drop into WhatsApp, email, or proposal decks."
      />

      <ToolLayout
        form={
          state === 'success' ? (
            <Card className="border-emerald-200 bg-emerald-50">
              <CardHeader className="flex flex-row items-center gap-3">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/20 text-emerald-700">
                  <MessageSquare className="h-5 w-5" />
                </span>
                <div>
                  <CardTitle className="text-lg text-emerald-800">Estimate on the way</CardTitle>
                  <CardDescription className="text-emerald-700">
                    We'll deliver the WhatsApp narrative and PDF attachments to your inbox shortly.
                  </CardDescription>
                </div>
              </CardHeader>
              <CardContent className="flex items-center gap-3">
                <Button size="sm" onClick={() => setState('idle')} variant="secondary">
                  Generate another pack
                </Button>
                <Button size="sm" variant="outline" asChild>
                  <a href="/(platform)/workspace/tools/brochure-rebrand">Refresh your brochure →</a>
                </Button>
              </CardContent>
            </Card>
          ) : (
            <Card className="border-primary/20 shadow-md">
              <CardHeader className="space-y-2">
                <CardTitle className="text-xl">Request details</CardTitle>
                <CardDescription>We merge portal comps, trend data, and persona messaging into a single thread.</CardDescription>
                <Badge variant="secondary" className="w-max">Turnaround ≈ 3 minutes</Badge>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid gap-2">
                    <Label htmlFor="phone">WhatsApp number</Label>
                    <Input
                      id="phone"
                      name="phone"
                      placeholder="+971 50 000 0000"
                      inputMode="tel"
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="city">City</Label>
                    <Input id="city" name="city" placeholder="e.g. Dubai" required />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="community">Community</Label>
                    <Input id="community" name="community" placeholder="e.g. Dubai Marina" required />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="unit">Unit type / size</Label>
                    <Input id="unit" name="unit" placeholder="e.g. 2BR, 1,250 sqft" required />
                  </div>
                  {state === 'error' ? (
                    <Alert variant="destructive">
                      <AlertTitle>Submission failed</AlertTitle>
                      <AlertDescription>{error}</AlertDescription>
                    </Alert>
                  ) : null}
                  <div className="flex flex-wrap justify-end gap-2">
                    <Button type="submit" disabled={state === 'submitting'}>
                      {state === 'submitting' ? 'Generating…' : 'Run estimate'}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          )
        }
        helpPanel={
          <ToolHelpPanel
            title="What's inside"
            description="Each price pack arrives as a WhatsApp-ready script and PDF appendix."
            tips={[
              { label: 'Story-driven narrative', detail: 'Explain pricing logic with comparable data, absorption, and ROI signals.' },
              { label: 'Suggested next steps', detail: 'Include CTAs and follow-up prompts tailored to your persona.' },
              { label: 'Shareable assets', detail: 'Receive a PDF summary with charts and bullet-point insights.' },
            ]}
            footer="Want real-time comps? Connect SuperSearch in the Workspace home to sync live data."
          />
        }
      />
    </div>
  );
}
