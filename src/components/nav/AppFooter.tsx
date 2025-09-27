const year = new Date().getFullYear();

export function AppFooter() {
  return (
    <footer className="border-t py-8 text-sm text-muted-foreground">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 md:flex-row">
        <div>© {year} Entrestate — By Google AI</div>
        <div className="flex items-center gap-4">
          <a href="/privacy">Privacy</a>
          <a href="/terms">Terms</a>
          <a href="/sitemap.xml">Sitemap</a>
        </div>
      </div>
    </footer>
  );
}
