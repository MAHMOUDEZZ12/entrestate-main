import Link from 'next/link';
import { useMemo, useState } from 'react';
import { LinkIcon, Upload, Wand2, Gauge, Rocket, ClipboardList, Sliders } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { PlatformHero } from '@/components/platform/PlatformHero';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

type ToolCategory = 'marketing' | 'listing' | 'brand' | 'pricing';

type WorkspaceTool = {
  slug: string;
  name: string;
  description: string;
  category: ToolCategory;
  duration: string;
  icon: LucideIcon;
  status?: 'Beta' | 'Alpha';
  docLink?: string;
};

const categoryLabels: Record<ToolCategory, string> = {
  marketing: 'Marketing intelligence',
  listing: 'Listing performance',
  brand: 'Brand studio',
  pricing: 'Pricing intelligence',
};

const tools: WorkspaceTool[] = [
  {
    slug: 'meta-audit',
    name: 'Meta Audit',
    description: 'Instantly surface creative, placement, and targeting gaps for your Meta campaigns.',
    icon: Wand2,
    category: 'marketing',
    duration: '≈ 90 seconds',
  },
  {
    slug: 'listing-health',
    name: 'Listing Health',
    description: 'Benchmark any portal listing and receive AI-powered optimization prompts.',
    icon: Gauge,
    category: 'listing',
    duration: '≈ 2 minutes',
  },
  {
    slug: 'brochure-rebrand',
    name: 'Brochure Rebrand',
    description: 'Drop in your brochure and logo; receive a refreshed brand pack automatically.',
    icon: Upload,
    category: 'brand',
    duration: '≈ 5 minutes',
  },
  {
    slug: 'price-estimator',
    name: 'Price Estimator',
    description: 'Generate conversational pricing narratives ready to ship via WhatsApp.',
    icon: LinkIcon,
    category: 'pricing',
    duration: '≈ 3 minutes',
  },
];

export default function WorkspaceToolsPage() {
  const [categoryFilter, setCategoryFilter] = useState<ToolCategory | 'all'>('all');
  const [search, setSearch] = useState('');

  const filteredTools = useMemo(() => {
    const term = search.trim().toLowerCase();
    return tools.filter((tool) => {
      const matchesCategory = categoryFilter === 'all' || tool.category === categoryFilter;
      if (!matchesCategory) return false;
      if (!term) return true;
      return [tool.name, tool.description].some((value) => value.toLowerCase().includes(term));
    });
  }, [categoryFilter, search]);

  const categories = useMemo(() => ['all', ...Object.keys(categoryLabels)] as (ToolCategory | 'all')[], []);

  return (
    <div className="space-y-10">
      <PlatformHero
        eyebrow="Tooling"
        title="Launch-ready AI copilots for every handoff"
        subtitle="Each workspace tool slots into your Entrestate shell. Drop data in, ship polished outputs, and measure lift without leaving the platform."
        className="bg-gradient-to-br from-indigo-950 via-purple-950 to-slate-950"
        actions={
          <Button asChild size="sm" variant="secondary">
            <Link href="/docs/cloud">View developer docs</Link>
          </Button>
        }
      />

      <section className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="space-y-1">
            <h2 className="text-lg font-semibold">Choose a tool to get started</h2>
            <p className="text-sm text-muted-foreground">
              Free usage is included in every plan. Upgrade only when you need deeper automation or higher run caps.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category}
                size="sm"
                variant={categoryFilter === category ? 'secondary' : 'outline'}
                onClick={() => setCategoryFilter(category as ToolCategory | 'all')}
              >
                {category === 'all' ? 'All categories' : categoryLabels[category as ToolCategory]}
              </Button>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search tools by name or description"
            className="w-full max-w-md"
          />
          <Badge variant="outline" className="ml-auto text-xs">
            {filteredTools.length} {filteredTools.length === 1 ? 'tool' : 'tools'} available
          </Badge>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {filteredTools.map((tool) => {
            const Icon = tool.icon;
            return (
              <Link key={tool.slug} href={`/(platform)/workspace/tools/${tool.slug}`} prefetch>
                <Card className="group h-full overflow-hidden border-2 border-transparent transition hover:-translate-y-1 hover:border-primary/30 hover:shadow-xl">
                  <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-r from-primary/10 via-transparent to-primary/10 opacity-0 transition group-hover:opacity-100" />
                  <CardHeader className="space-y-4">
                    <div className="flex items-center gap-3">
                      <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                        <Icon className="h-5 w-5" />
                      </span>
                      <div>
                        <CardTitle className="text-xl">{tool.name}</CardTitle>
                        <CardDescription className="text-[13px]">{categoryLabels[tool.category]}</CardDescription>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">{tool.description}</p>
                  </CardHeader>
                  <CardContent className="flex items-center justify-between border-t pt-3 text-sm">
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" className="bg-primary/10 text-primary">
                        {tool.duration}
                      </Badge>
                      {tool.status ? (
                        <Badge variant="outline" className="text-[11px] uppercase tracking-wide">
                          {tool.status}
                        </Badge>
                      ) : null}
                    </div>
                    <span className="text-primary">Open tool →</span>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
          {filteredTools.length === 0 ? (
            <Card className="border-dashed">
              <CardHeader>
                <CardTitle>No tools match your filters</CardTitle>
                <CardDescription>Try clearing the search query or selecting a different category.</CardDescription>
              </CardHeader>
            </Card>
          ) : null}
        </div>

        <Card className="border-primary/15 bg-primary/5">
          <CardHeader className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Rocket className="h-4 w-4 text-primary" /> Ideas for your next module
              </CardTitle>
              <CardDescription>Design your own workspace tool with Genkit, then mount it here.</CardDescription>
            </div>
            <Button asChild variant="outline" size="sm">
              <Link href="/me/flows">Open flow designer</Link>
            </Button>
          </CardHeader>
          <CardContent className="grid gap-3 md:grid-cols-3 text-sm text-muted-foreground">
            <div className="flex items-start gap-2">
              <ClipboardList className="mt-1 h-4 w-4 text-primary" />
              <p>Turn bespoke flows into workspace tools by exporting a flow runner via `/api/run`.</p>
            </div>
            <div className="flex items-start gap-2">
              <Sliders className="mt-1 h-4 w-4 text-primary" />
              <p>Expose configuration fields with the new App Form registry to give teammates guardrails.</p>
            </div>
            <div className="flex items-start gap-2">
              <Sparkles className="mt-1 h-4 w-4 text-primary" />
              <p>Ship previews fast — every tool inherits theme tokens, nav, and platform telemetry automatically.</p>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
