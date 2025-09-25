
'use client';

import { Button } from './button';
import { cn } from '@/lib/utils';

export function ProviderTile({ name, status='connect', onClick }: {
  name: string; status?: 'connect'|'connected'|'learn'; onClick: () => void;
}) {
  return (
    <Button 
      onClick={onClick}
      variant="outline"
      className="flex items-center justify-between rounded-xl px-4 py-6 text-base"
    >
      <span>{name}</span>
      <span className={cn("text-sm capitalize", status === 'connected' ? 'text-green-500' : 'text-muted-foreground')}>
        {status}
      </span>
    </Button>
  );
}
