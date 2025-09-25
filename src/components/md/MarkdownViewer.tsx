
'use client';
import React from 'react';
import ReactMarkdown from 'react-markdown';

export default function MD({ source }: { source: string }){
  return (
    <article className="prose prose-zinc max-w-none">
      <ReactMarkdown>{source}</ReactMarkdown>
    </article>
  );
}
