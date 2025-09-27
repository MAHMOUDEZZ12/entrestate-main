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
import { FolderDown } from 'lucide-react';

const TOOL_NAME = 'Brochure Rebrand';

type SubmissionState = 'idle' | 'submitting' | 'success' | 'error';

export default function BrochureRebrandToolPage() {
  const [state, setState] = useState<SubmissionState>('idle');
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState('submitting');
    setError(null);

    const form = event.currentTarget;
    const formData = new FormData(form);
    formData.set('tool', TOOL_NAME);

    try {
      const response = await fetch('/api/tools/submit', {
        method: 'POST',
        body: formData,
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
        title="Brochure Rebrand"
        subtitle="Hand off your brochure, logo, and brand voice. Receive a refreshed, on-brand deck ready for listings or investor updates."
      />

      <ToolLayout
        form={
          state === 'success' ? (
            <Card className="border-emerald-200 bg-emerald-50">
              <CardHeader className="flex flex-row items-center gap-3">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/20 text-emerald-700">
                  <FolderDown className="h-5 w-5" />
                </span>
                <div>
                  <CardTitle className="text-lg text-emerald-800">Rebrand in progress</CardTitle>
                  <CardDescription className="text-emerald-700">
                    We'll send your refreshed brochure and brand kit links in a few minutes.
                  </CardDescription>
                </div>
              </CardHeader>
              <CardContent className="flex items-center gap-3">
                <Button size="sm" onClick={() => setState('idle')} variant="secondary">
                  Upload another brochure
                </Button>
                <Button size="sm" variant="outline" asChild>
                  <a href="/(platform)/workspace/tools/price-estimator">Generate price packs →</a>
                </Button>
              </CardContent>
            </Card>
          ) : (
            <Card className="border-primary/20 shadow-md">
              <CardHeader className="space-y-2">
                <CardTitle className="text-xl">Brand inputs</CardTitle>
                <CardDescription>We convert your files into polished, brand-consistent PDFs and image assets.</CardDescription>
                <Badge variant="secondary" className="w-max">Turnaround ≈ 5 minutes</Badge>
              </CardHeader>
              <CardContent>
                <form
                  onSubmit={handleSubmit}
                  className="space-y-5"
                  encType="multipart/form-data"
                >
                  <div className="grid gap-2">
                    <Label htmlFor="email">Work email</Label>
                    <Input id="email" name="email" type="email" placeholder="you@company.com" required />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="company">Company name</Label>
                    <Input id="company" name="company" placeholder="Entrestate Realty" required />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="logo">Logo (PNG/SVG)</Label>
                    <Input id="logo" name="logo" type="file" accept="image/png,image/svg+xml" required />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="brochure">Brochure PDF</Label>
                    <Input id="brochure" name="brochure" type="file" accept="application/pdf" required />
                  </div>
                  {state === 'error' ? (
                    <Alert variant="destructive">
                      <AlertTitle>Upload failed</AlertTitle>
                      <AlertDescription>{error}</AlertDescription>
                    </Alert>
                  ) : null}
                  <div className="flex flex-wrap justify-end gap-2">
                    <Button type="submit" disabled={state === 'submitting'}>
                      {state === 'submitting' ? 'Uploading…' : 'Submit files'}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          )
        }
        helpPanel={
          <ToolHelpPanel
            title="Brand studio deliverables"
            description="Receive a downloadable package with ready-to-share assets."
            tips={[
              { label: 'Editable Canva link', detail: 'Keep iterating without re-uploading assets.' },
              { label: 'Social crops', detail: 'Square, story, and landscape thumbnails in your palette.' },
              { label: 'Email follow-up', detail: 'Add custom CTAs and disclaimers before sending to clients.' },
            ]}
            footer="Have multiple brochures? Zip them together or submit sequentially — turnaround stays under 10 minutes."
          />
        }
      />
    </div>
  );
}
