interface PageHeadingProps {
  title: string;
  subtitle?: string;
}

export function PageHeading({ title, subtitle }: PageHeadingProps) {
  return (
    <div className="mb-8">
      <h1 className="text-2xl font-semibold tracking-tight md:text-3xl">{title}</h1>
      {subtitle ? <p className="mt-1 text-muted-foreground">{subtitle}</p> : null}
    </div>
  );
}
