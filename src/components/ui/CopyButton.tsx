
'use client';
import React from 'react';

export function CopyButton({ text, label='Copy'}: { text: string; label?: string }){
  return (
    <button
      onClick={() => navigator.clipboard.writeText(text)}
      className="border rounded-lg px-3 py-1 text-xs"
      type="button"
    >
      {label}
    </button>
  );
}
