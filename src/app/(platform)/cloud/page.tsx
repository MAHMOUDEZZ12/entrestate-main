import { Bot, BarChart3, Globe, FolderSearch2 } from 'lucide-react';
import { PlatformHero } from '@/components/platform/PlatformHero';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const modules = [
  {
    title: 'Pro Search X3',
    description: 'Fuse marketplace, CRM, and external datasets into a single semantic search interface.',
    icon: <FolderSearch2 className="h-5 w-5" />,
    status: 'Live',
  },
  {
    title: 'ESTChat Copilot',
    description: 'Deploy Gemini-powered chat agents that answer portfolio, pricing, and compliance queries.',
    icon: <Bot className="h-5 w-5" />,
    status: 'Beta',
  },
  {
    title: 'Mega Listing Graph',
    description: 'Continuous listing intelligence with velocity signals and cross-portal normalization.',
    icon: <Globe className="h-5 w-5" />,
    status: 'Coming soon',
  },
  {
    title: 'AI Reports',
    description: 'Generate investor-grade market reports with narrative, charts, and export templates.',
    icon: <BarChart3 className="h-5 w-5" />,
    status: 'Live',
  },
];

export default function CloudPage() {
  return (
    <div className="space-y-10">
      <PlatformHero
        eyebrow="Cloud Intelligence"
        title="Your data lattice for market, listing, and client intelligence"
        subtitle="Activate federated search, conversational copilots, and predictive insights on top of Entrestate's unified data model."
        actions={
          <Badge variant="secondary" className="bg-white/15 text-white">
            Vertex + Gemini inside
          </Badge>
        }
      />

      <section className="space-y-4">
        <div>
          <h2 className="text-lg font-semibold">Modules & rollouts</h2>
          <p className="text-sm text-muted-foreground">
            Cloud modules can be toggled per workspace. Provision access once, inherit branding everywhere.
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {modules.map((module) => (
            <Card key={module.title} className="h-full border-primary/15 transition hover:-translate-y-1 hover:border-primary/30 hover:shadow-lg">
              <CardHeader className="flex flex-row items-start gap-3">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  {module.icon}
                </span>
                <div className="space-y-1">
                  <CardTitle className="text-xl">{module.title}</CardTitle>
                  <CardDescription>{module.description}</CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                <Badge variant={module.status === 'Live' ? 'secondary' : 'outline'}>{module.status}</Badge>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
