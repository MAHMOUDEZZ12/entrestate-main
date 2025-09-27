
'use client';

import { useMemo, useState } from 'react';
import { CopyButton } from '@/components/ui/CopyButton';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { getRoleFromEnv } from '@/lib/auth/roles';
import { appsRegistry, type AppContract } from '@/lib/apps/io';
type AppField = AppContract['inputs'][number];

export default function AppsIOPage() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('all');
  const [status, setStatus] = useState('all');
  const [availability, setAvailability] = useState<'all' | 'enabled' | 'disabled'>('all');
  const role = getRoleFromEnv();

  const categories = useMemo(() => {
    const values = new Set<string>();
    appsRegistry.forEach((app) => values.add(app.category));
    return Array.from(values).sort();
  }, []);

  const statuses = useMemo(() => {
    const values = new Set<string>();
    appsRegistry.forEach((app) => app.status && values.add(app.status));
    return Array.from(values).sort();
  }, []);

  const filteredApps = useMemo(() => {
    const term = query.trim().toLowerCase();
    return appsRegistry.filter((app) => {
      if (app.allowedRoles && !app.allowedRoles.includes(role)) return false;
      if (category !== 'all' && app.category !== category) return false;
      if (status !== 'all' && app.status !== status) return false;
      if (availability === 'enabled' && !app.enabled) return false;
      if (availability === 'disabled' && app.enabled) return false;
      if (!term) return true;
      const haystack = [app.name, app.id, app.description]
        .filter(Boolean)
        .map((value) => value!.toLowerCase());
      return haystack.some((value) => value.includes(term));
    });
  }, [availability, category, query, role, status]);

  const aggregate = useMemo(() => {
    const totals = filteredApps.reduce(
      (acc, app) => {
        acc.inputs += app.inputs.length;
        acc.outputs += app.outputs.length;
        if (app.enabled) acc.enabled += 1;
        return acc;
      },
      { inputs: 0, outputs: 0, enabled: 0 },
    );

    return {
      total: filteredApps.length,
      enabled: totals.enabled,
      avgInputs: filteredApps.length ? Math.round((totals.inputs / filteredApps.length) * 10) / 10 : 0,
      avgOutputs: filteredApps.length ? Math.round((totals.outputs / filteredApps.length) * 10) / 10 : 0,
    };
  }, [filteredApps]);

  return (
    <main className="mx-auto flex max-w-6xl flex-col gap-6 p-6">
      <header className="space-y-4 rounded-3xl border bg-card/60 p-6 shadow-sm">
        <div className="space-y-2">
          <h1 className="text-3xl font-semibold tracking-tight">Apps Input/Output Registry</h1>
          <p className="text-sm text-muted-foreground">
            Browse the canonical contracts that power automations and internal tooling. Validate payloads with
            <code> /api/apps/validate</code> before shipping to production.
          </p>
        </div>
        <dl className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Metric label="Visible apps" value={aggregate.total.toString()} />
          <Metric label="Avg. inputs" value={aggregate.avgInputs.toString()} />
          <Metric label="Avg. outputs" value={aggregate.avgOutputs.toString()} />
          <Metric label="Enabled today" value={`${aggregate.enabled} / ${filteredApps.length || 0}`} />
        </dl>
      </header>

      <Card>
        <CardContent className="flex flex-wrap items-center gap-3 p-4">
          <Input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search by name, ID, or description"
            className="w-full max-w-sm"
          />

          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All categories</SelectItem>
              {categories.map((cat) => (
                <SelectItem key={cat} value={cat}>
                  {cat}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={status} onValueChange={setStatus}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All statuses</SelectItem>
              {statuses.map((state) => (
                <SelectItem key={state} value={state}>
                  {state.toUpperCase()}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={availability} onValueChange={(value) => setAvailability(value as typeof availability)}>
            <SelectTrigger className="w-[170px]">
              <SelectValue placeholder="Availability" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All apps</SelectItem>
              <SelectItem value="enabled">Enabled only</SelectItem>
              <SelectItem value="disabled">Disabled only</SelectItem>
            </SelectContent>
          </Select>

          <div className="ml-auto flex flex-wrap gap-2">
            <Button asChild variant="outline" size="sm">
              <a href="/api/apps/export?format=json" target="_blank" rel="noreferrer">
                Export JSON
              </a>
            </Button>
            <Button asChild variant="outline" size="sm">
              <a href="/api/apps/export?format=csv" target="_blank" rel="noreferrer">
                Export CSV
              </a>
            </Button>
          </div>
        </CardContent>
      </Card>

      <section className="grid gap-6">
        {filteredApps.map((app) => (
          <AppCard key={app.id} app={app} />
        ))}
        {filteredApps.length === 0 ? (
          <Card className="border-dashed">
            <CardHeader>
              <CardTitle>No matches found</CardTitle>
              <CardDescription>Try adjusting your search keywords or check role permissions.</CardDescription>
            </CardHeader>
          </Card>
        ) : null}
      </section>
    </main>
  );
}

function AppCard({ app }: { app: AppContract }) {
  return (
    <Card className="border-primary/15 shadow-sm">
      <CardHeader className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <CardTitle className="text-xl">{app.name}</CardTitle>
          <CardDescription>{app.description}</CardDescription>
          <div className="mt-2 flex flex-wrap gap-2 text-xs text-muted-foreground/80">
            <Badge variant="outline">{app.category}</Badge>
            {app.status ? <Badge variant="secondary">{app.status.toUpperCase()}</Badge> : null}
            <Badge variant={app.enabled ? 'secondary' : 'outline'}>{app.enabled ? 'Enabled' : 'Disabled'}</Badge>
          </div>
        </div>
        <div className="space-y-1 text-xs text-muted-foreground">
          <div>
            ID: <code>{app.id}</code>
          </div>
          <div>
            v{app.version || '0.0.0'} • {app.status || 'alpha'} • {app.enabled ? 'Enabled' : 'Disabled'}
          </div>
          {app.category ? <div>{app.category}</div> : null}
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <h3 className="mb-3 font-semibold">Inputs</h3>
            <FieldTable fields={app.inputs} emptyLabel="No inputs declared" />
          </div>
          <div>
            <h3 className="mb-3 font-semibold">Outputs</h3>
            <FieldTable fields={app.outputs} emptyLabel="No outputs declared" />
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 text-sm">
          <div className="flex items-center gap-3">
            <Button asChild variant="link" size="sm" className="px-0">
              <a href={`/api/apps/sample?appId=${app.id}`} target="_blank" rel="noreferrer">
                View sample payload
              </a>
            </Button>
            <CopyButton text={JSON.stringify({ appId: app.id, payload: {} }, null, 2)} label="Copy POST template" />
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {app.allowedRoles ? (
              <Badge variant="outline">Roles: {app.allowedRoles.join(', ')}</Badge>
            ) : (
              <Badge variant="secondary">Open to all roles</Badge>
            )}
            <Badge variant="outline">Inputs: {app.inputs.length}</Badge>
            <Badge variant="outline">Outputs: {app.outputs.length}</Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function FieldTable({ fields, emptyLabel }: { fields: AppField[] | undefined; emptyLabel: string }) {
  if (!fields || fields.length === 0) {
    return <p className="text-sm text-muted-foreground">{emptyLabel}</p>;
  }

  return (
    <div className="overflow-x-auto rounded-xl border">
      <table className="w-full text-sm">
        <thead className="bg-muted/50 text-xs uppercase tracking-wide text-muted-foreground">
          <tr>
            <th className="px-3 py-2 text-left">Key</th>
            <th className="px-3 py-2 text-left">Label</th>
            <th className="px-3 py-2 text-left">Type</th>
            <th className="px-3 py-2 text-left">Required</th>
            <th className="px-3 py-2 text-left">Description / Example</th>
          </tr>
        </thead>
        <tbody>
          {fields.map((field) => (
            <tr key={field.key} className="border-t">
              <td className="px-3 py-2 font-mono text-xs">{field.key}</td>
              <td className="px-3 py-2">{field.label}</td>
              <td className="px-3 py-2 text-muted-foreground">{field.type}</td>
              <td className="px-3 py-2">{field.required ? 'Yes' : 'No'}</td>
              <td className="px-3 py-2 text-muted-foreground">
                {field.description}
                {field.example ? (
                  <div className="mt-1 text-xs text-muted-foreground/80">
                    e.g. {Array.isArray(field.example) ? JSON.stringify(field.example) : String(field.example)}
                  </div>
                ) : null}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-primary/15 bg-card p-4 shadow-sm">
      <dt className="text-xs uppercase tracking-wide text-muted-foreground">{label}</dt>
      <dd className="mt-1 text-2xl font-semibold text-foreground">{value}</dd>
    </div>
  );
}
