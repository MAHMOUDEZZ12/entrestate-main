
'use client';

import React from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from './ui/sheet';
import { useCanvas } from '@/context/CanvasContext';

export function CreativeCanvas() {
  const { isOpen, closeCanvas, canvasContent, canvasTitle, canvasDescription } = useCanvas();

  return (
    <Sheet open={isOpen} onOpenChange={(open) => { if(!open) closeCanvas() }}>
      <SheetContent className="w-full sm:max-w-2xl p-0">
        <SheetHeader className="p-6 border-b">
          <SheetTitle>{canvasTitle || 'Creative Canvas'}</SheetTitle>
          {canvasDescription && <SheetDescription>{canvasDescription}</SheetDescription>}
        </SheetHeader>
        <div className="p-6 overflow-y-auto max-h-[calc(100vh-80px)]">
          {canvasContent}
        </div>
      </SheetContent>
    </Sheet>
  );
}
