
// src/lib/flows/schema.ts
export type FlowStepType =
  | 'ingest.pdf'
  | 'ingest.images'
  | 'creative.edit'
  | 'landing.generate'
  | 'video.hero'
  | 'deploy.dns'
  | 'listing.sync'
  | 'ai.search'
  | 'ai.plan';

export type FlowStep = {
  id: string;
  type: FlowStepType;
  title: string;
  input?: Record<string, any>;
  output?: Record<string, any>;
};

export type Flow = {
  id: string;
  name: string;
  description?: string;
  steps: FlowStep[];
  version?: string;
  enabled?: boolean;
};

export const sampleFlows: Flow[] = [
  {
    id: 'brochure-to-launch',
    name: 'Brochure → Landing → Video → DNS',
    description: 'Edit brochure → create landing page → render hero video → deploy.',
    steps: [
      { id: 's1', type: 'ingest.pdf', title: 'Upload/Parse Brochure', input: { pdfUrl: 'https://example.com/brochure.pdf' } },
      { id: 's2', type: 'creative.edit', title: 'Creative Editing', input: { removeDevLogos: true, keepLegal: true } },
      { id: 's3', type: 'landing.generate', title: 'Landing Page Builder', input: { theme: 'entrestate' } },
      { id: 's4', type: 'video.hero', title: 'Hero Video', input: { duration: 30 } },
      { id: 's5', type: 'deploy.dns', title: 'DNS Deploy', input: { domain: 'project.example.com' } },
    ],
    version: '0.1.0',
    enabled: true
  },
  {
    id: 'listing-sync-loop',
    name: 'Listing Portal Sync & Renew',
    description: 'Sync tuned listing to portals and set renewal plan.',
    steps: [
      { id: 'a1', type: 'listing.sync', title: 'Initial Sync', input: { portal: 'Bayut' } },
      { id: 'a2', type: 'ai.plan', title: 'Renewal Strategy', input: { cadence: 'daily' } }
    ],
    version: '0.1.0',
    enabled: true
  }
];
