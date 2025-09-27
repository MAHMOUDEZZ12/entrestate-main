import Link from 'next/link';
import { useMemo, useState, type ReactNode } from 'react';
import { Sparkles, Workflow, LayoutDashboard, LineChart, Wand2, ShieldCheck, Rocket } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardDescription, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { PlatformHero } from '@/components/platform/PlatformHero';
import { PlatformMetricCard } from '@/components/platform/PlatformMetricCard';
import { cn } from '@/lib/utils';

type QuickStart = {
  title: string;
  description: string;
  href: string;
  icon: ReactNode;
  cta?: string;
  status?: 'Beta' | 'Coming soon' | 'Private';
  badgeTone?: 'default' | 'outline';
};

const quickStarts: QuickStart[] = [
  {
    title: 'Free Tools',
    description: 'Run audits, rebrand collateral, and generate pricing packs in minutes.',
    href: '/(platform)/workspace/tools',
    icon: <Sparkles className="h-5 w-5" />,
    cta: 'Open tooling suite',
  },
  {
    title: 'Flows & Playbooks',
    description: 'Blueprint your AI-assisted campaigns, automations, and nurture sequences.',
    href: '#',
    icon: <Workflow className="h-5 w-5" />,
    status: 'Coming soon',
  },
  {
    title: 'Dashboards',
    description: 'Monitor funnels, campaigns, and listing performance with live data.',
    href: '#',
    icon: <LayoutDashboard className="h-5 w-5" />,
    status: 'Coming soon',
  },
];

const metrics = [
  {
    title: 'Automations deployed',
    value: '24',
    trend: '+6 this week',
    description: 'Across nurture flows, listing refreshes, and campaign launchers.',
    icon: <Workflow className="h-5 w-5" />,
  },
  {
    title: 'Insights delivered',
    value: '132',
    trend: '+18% efficiency',
    description: 'Audit highlights and price guidance packets generated this month.',
    icon: <LineChart className="h-5 w-5" />,
  },
  {
    title: 'Active teammates',
    value: '12',
    description: 'Give collaborators tailored access to flows, dashboards, and automations.',
    icon: <Sparkles className="h-5 w-5" />,
  },
];

export default function WorkspacePage() {
  const [activeQuickStart, setActiveQuickStart] = useState('all');

  const filteredQuickStarts = useMemo(() => {
    if (activeQuickStart === 'all') return quickStarts;
    if (activeQuickStart === 'available') return quickStarts.filter((item) => !item.status);
    return quickStarts.filter((item) => item.status);
  }, [activeQuickStart]);

  return (
    <div className="space-y-10">
      <PlatformHero
        eyebrow="Entrestate Workspace"
        title="Command center for every revenue workflow"
        subtitle="Spin up AI flows, launch campaign dashboards, and turn insights into client-ready outputs — all inside your branded shell."
        className="bg-gradient-to-br from-slate-950 via-indigo-900 to-slate-950"
        actions={
          <>
            <Button asChild size="sm" variant="secondary">
              <Link href="/(platform)/workspace/tools">Launch free tools</Link>
            </Button>
            <Button asChild size="sm" variant="outline">
              <Link href="/docs/cloud">Explore platform docs</Link>
            </Button>
          </>
        }
        achievements={[
          { label: 'Time saved per agent', value: '7.5 hrs/week' },
          { label: 'AI flows on deck', value: '18 templates' },
          { label: 'Average rollout time', value: '<3 minutes' },
        ]}
      />

      <section className="grid gap-6 md:grid-cols-3">
        {metrics.map((metric) => (
          <PlatformMetricCard key={metric.title} {...metric} />
        ))}
      </section>

      <section className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-semibold">Build your next launch</h2>
            <p className="text-sm text-muted-foreground">
              Choose a starting point below. Each module inherits your brand shell, permissions, and telemetry.
            </p>
          </div>
          <div className="flex gap-2 rounded-full border bg-background/60 p-1">
            {[
              { key: 'all', label: 'All' },
              { key: 'available', label: 'Available now' },
              { key: 'upcoming', label: 'In roadmap' },
            ].map((filter) => (
              <Button
                key={filter.key}
                size="sm"
                variant={activeQuickStart === filter.key ? 'secondary' : 'ghost'}
                onClick={() => setActiveQuickStart(filter.key)}
              >
                {filter.label}
              </Button>
            ))}
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {filteredQuickStarts.map((section) => {
            const body = (
              <Card
                className={cn(
                  'group relative h-full overflow-hidden border-2 transition',
                  section.status
                    ? 'border-dashed opacity-75'
                    : 'border-transparent hover:-translate-y-1 hover:border-primary/30 hover:shadow-lg',
                )}
              >
                <div className="absolute -top-16 right-0 h-40 w-40 rounded-full bg-primary/10 blur-3xl transition group-hover:bg-primary/20" />
                <CardHeader className="relative space-y-3">
                  <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    {section.icon}
                  </div>
                  <div className="space-y-1">
                    <CardTitle className="text-xl">{section.title}</CardTitle>
                    <CardDescription>{section.description}</CardDescription>
                  </div>
                  {section.status ? (
                    <Badge variant="outline" className="w-max text-xs">
                      {section.status}
                    </Badge>
                  ) : (
                    <span className="text-sm text-primary">{section.cta}</span>
                  )}
                </CardHeader>
              </Card>
            );

            if (section.status) {
              return <div key={section.title}>{body}</div>;
            }

            return (
              <Link key={section.title} href={section.href} prefetch>
                {body}
              </Link>
            );
          })}
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex items-center gap-3">
          <h2 className="text-lg font-semibold">Workspace playbook</h2>
          <Badge variant="outline" className="text-xs">
            Updated weekly
          </Badge>
        </div>
        <div className="grid gap-4 lg:grid-cols-3">
          <Card className="h-full">
            <CardHeader className="space-y-1">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Rocket className="h-4 w-4 text-primary" /> Launch templates
              </CardTitle>
              <CardDescription>Kickstart with curated flows for campaigns, listings, and onboarding sequences.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-muted-foreground">
              <p>Duplicate and customize battle-tested automations in minutes.</p>
              <Button asChild variant="secondary" size="sm">
                <Link href="/me/flows">Browse flow library</Link>
              </Button>
            </CardContent>
          </Card>
          <Card className="h-full">
            <CardHeader className="space-y-1">
              <CardTitle className="flex items-center gap-2 text-lg">
                <ShieldCheck className="h-4 w-4 text-primary" /> Governance-ready
              </CardTitle>
              <CardDescription>Every module inherits audit logging, environment tokens, and workspace roles.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-muted-foreground">
              <p>Grant granular access across marketing, sales, and operations teams from the Admin panel.</p>
              <Button asChild variant="outline" size="sm">
                <Link href="/(platform)/admin">Configure roles</Link>
              </Button>
            </CardContent>
          </Card>
          <Card className="h-full">
            <CardHeader className="space-y-1">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Wand2 className="h-4 w-4 text-primary" /> Extend with flows
              </CardTitle>
              <CardDescription>Compose custom AI flows and surface them inside the workspace shell.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-muted-foreground">
              <p>Use Genkit recipes or bring your own functions — everything lands under the same theme.</p>
              <Button asChild variant="outline" size="sm">
                <Link href="/docs/cloud">View developer guide</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
