'use client';

import React, { useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import type { AppContract } from '@/lib/apps/io';

interface AppFormClientProps {
  app: AppContract;
}

export function AppFormClient({ app }: AppFormClientProps) {
  const [payload, setPayload] = useState<Record<string, unknown>>({});
  const [result, setResult] = useState<unknown>(null);

  useEffect(() => {
    setResult(null);
    setPayload({});
  }, [app.id]);

  function setField(key: string, value: unknown) {
    setPayload((prev) => ({ ...prev, [key]: value }));
  }

  async function validate() {
    const response = await fetch('/api/apps/validate', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ appId: app.id, payload }),
    });
    const json = await response.json();
    setResult(json);
  }

  return (
    <main className="mx-auto flex max-w-3xl flex-col gap-4 p-6">
      <header className="space-y-2">
        <h1 className="text-2xl font-bold">Form: {app.name}</h1>
        <p className="text-sm text-muted-foreground">{app.description}</p>
      </header>

      <form
        className="grid gap-4"
        onSubmit={(event) => {
          event.preventDefault();
          void validate();
        }}
      >
        {app.inputs.map((field) => (
          <div key={field.key} className="grid gap-1">
            <label className="text-sm font-medium">
              {field.label}{' '}
              {field.required ? <span className="text-red-500">*</span> : null}
            </label>
            {renderField(field, payload[field.key], (value) => setField(field.key, value))}
            <div className="text-xs text-muted-foreground">
              {field.description || ''}{' '}
              {field.example !== undefined ? (
                <>
                  • e.g.,{' '}
                  <code>
                    {Array.isArray(field.example)
                      ? JSON.stringify(field.example)
                      : String(field.example)}
                  </code>
                </>
              ) : null}
            </div>
          </div>
        ))}
        <div>
          <Button type="submit" size="sm">
            Validate
          </Button>
        </div>
      </form>

      {result ? (
        <pre className="overflow-x-auto rounded border bg-muted/40 p-3 text-xs">
          {JSON.stringify(result, null, 2)}
        </pre>
      ) : null}
    </main>
  );
}

type Field = AppContract['inputs'][number];

type ChangeHandler = (value: unknown) => void;

function renderField(field: Field, value: unknown, onChange: ChangeHandler) {
  const constraints = field.constraints || {};
  if (
    field.type === 'string' ||
    field.type === 'email' ||
    field.type === 'url' ||
    field.type === 'phone' ||
    field.type === 'markdown'
  ) {
    if (constraints.enum) {
      return (
        <select
          value={typeof value === 'string' ? value : ''}
          onChange={(event) => onChange(event.target.value)}
          className="rounded border px-2 py-2 text-sm"
        >
          <option value="">Select…</option>
          {constraints.enum.map((option: string) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      );
    }
    return (
      <Input
        value={typeof value === 'string' ? value : ''}
        onChange={(event) => onChange(event.target.value)}
      />
    );
  }

  if (field.type === 'number') {
    return (
      <Input
        type="number"
        min={constraints.min}
        max={constraints.max}
        value={typeof value === 'number' ? value : ''}
        onChange={(event) =>
          onChange(event.target.value === '' ? undefined : Number(event.target.value))
        }
      />
    );
  }

  if (field.type === 'boolean') {
    return (
      <input
        type="checkbox"
        checked={Boolean(value)}
        onChange={(event) => onChange(event.target.checked)}
      />
    );
  }

  if (field.type === 'json') {
    return (
      <Textarea
        rows={4}
        value={safeStringify(value)}
        onChange={(event) => {
          try {
            const parsed = JSON.parse(event.target.value || '{}');
            onChange(parsed);
          } catch {
            onChange(event.target.value);
          }
        }}
        className="text-xs font-mono"
      />
    );
  }

  return (
    <Input
      value={typeof value === 'string' ? value : ''}
      onChange={(event) => onChange(event.target.value)}
    />
  );
}

function safeStringify(value: unknown) {
  try {
    return JSON.stringify(value ?? {}, null, 2);
  } catch {
    return String(value ?? '');
  }
}
