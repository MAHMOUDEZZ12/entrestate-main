
'use client';
import Link from 'next/link';

export function ServiceCard({
  title, description, href, guideHref,
}: { title:string; description:string; href:string; guideHref?:string; }) {
  return (
    <div className="flex h-full flex-col justify-between rounded-2xl border border-neutral-800 bg-neutral-950 p-5 hover:border-neutral-700">
      <div>
        <h4 className="text-lg font-semibold">{title}</h4>
        <p className="mt-2 text-sm text-neutral-400">{description}</p>
      </div>
      <div className="mt-4 flex items-center gap-3">
        <Link href={href} className="rounded-md bg-lime-400 px-3 py-2 text-sm font-medium text-black hover:bg-lime-300">
          Use Tool
        </Link>
        {guideHref && (
          <Link href={guideHref} className="text-sm text-neutral-400 underline-offset-4 hover:underline">
            Read Guide
          </Link>
        )}
      </div>
    </div>
  );
}
