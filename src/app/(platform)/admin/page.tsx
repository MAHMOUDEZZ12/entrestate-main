import { ShieldCheck, Users2, CreditCard, LockKeyhole, ClipboardCheck, BarChart3 } from 'lucide-react';
import Link from 'next/link';
import { PlatformHero } from '@/components/platform/PlatformHero';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

const controls = [
  {
    title: 'Workspace roles',
    description: 'Assign granular access to tools, flows, and data connectors.',
    icon: <Users2 className="h-5 w-5" />,
    badge: 'Role-based',
  },
  {
    title: 'Billing & usage',
    description: 'Track plan limits, invoices, credits, and automation runtime in real time.',
    icon: <CreditCard className="h-5 w-5" />,
    badge: 'Live metrics',
  },
  {
    title: 'Compliance center',
    description: 'Manage audit logs, content retention policies, and jurisdictional guardrails.',
    icon: <ShieldCheck className="h-5 w-5" />,
    badge: 'Audit-ready',
  },
  {
    title: 'SSO & directory sync',
    description: 'Connect Google Workspace or Azure AD for automatic user provisioning.',
    icon: <LockKeyhole className="h-5 w-5" />,
    badge: 'Enterprise',
  },
];

export default function AdminPage() {
  return (
    <div className="space-y-10">
      <PlatformHero
        eyebrow="Admin & Security"
        title="Full control over teams, billing, and compliance"
        subtitle="Bring your own identity provider, define granular permissions, and keep audit trails for every action inside Entrestate."
      />

      <section className="space-y-4">
        <div>
          <h2 className="text-lg font-semibold">Control surface</h2>
          <p className="text-sm text-muted-foreground">
            Admin tools are available to owners and delegated security leads. Everything is versioned and exportable.
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {controls.map((control) => (
            <Card key={control.title} className="h-full border-primary/15 transition hover:-translate-y-1 hover:border-primary/30 hover:shadow-lg">
              <CardHeader className="flex flex-row items-start gap-3">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  {control.icon}
                </span>
                <div className="space-y-1">
                  <CardTitle className="text-xl">{control.title}</CardTitle>
                  <CardDescription>{control.description}</CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                <Badge variant="secondary">{control.badge}</Badge>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
