type EnvCheck = {
  key: string;
  doc?: string;
  optional?: boolean;
};

const ENV_VARS: EnvCheck[] = [
  { key: "NEXT_PUBLIC_APP_URL" },
  { key: "NEXT_PUBLIC_PAYPAL_CLIENT_ID", doc: "https://developer.paypal.com/" },
  { key: "PAYPAL_CLIENT_SECRET", doc: "https://developer.paypal.com/" },
  { key: "FIREBASE_PROJECT_ID", doc: "https://console.firebase.google.com/" },
  { key: "GOOGLE_APPLICATION_CREDENTIALS", doc: "https://cloud.google.com/docs/authentication", optional: true },
  { key: "GENKIT_DISABLE_TELEMETRY", optional: true },
];

function redact(value?: string | null) {
  if (!value) return "";
  if (value.length <= 6) return "●".repeat(value.length);
  return value.slice(0, 3) + "●".repeat(Math.max(0, value.length - 6)) + value.slice(-3);
}

export default function DebugEnvPage() {
  const rows = ENV_VARS.map(({ key, doc, optional }) => {
    const raw = process.env[key];
    const ok = Boolean(raw);
    return { key, value: ok ? redact(raw) : "", ok, doc, optional };
  });

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-semibold">Debug / Env</h1>
        <p className="text-white/70">Quick visibility into critical environment variables (values redacted).</p>
      </header>
      <div className="rounded-xl border border-white/10 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-white/5">
            <tr>
              <th className="text-left px-4 py-2">Key</th>
              <th className="text-left px-4 py-2">Set?</th>
              <th className="text-left px-4 py-2">Value (redacted)</th>
              <th className="text-left px-4 py-2">Docs</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.key} className="border-t border-white/10">
                <td className="px-4 py-2 font-mono">{row.key}</td>
                <td
                  className={`px-4 py-2 ${row.ok ? "text-emerald-400" : row.optional ? "text-amber-300" : "text-rose-400"}`}
                >
                  {row.ok ? "yes" : row.optional ? "optional" : "missing"}
                </td>
                <td className="px-4 py-2 font-mono">{row.value || "—"}</td>
                <td className="px-4 py-2">
                  {row.doc ? (
                    <a className="underline" href={row.doc} target="_blank" rel="noreferrer">
                      docs
                    </a>
                  ) : (
                    "—"
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="text-xs text-white/50">
        Tip: set <span className="font-mono">GENKIT_DISABLE_TELEMETRY=1</span> locally to silence GCP telemetry.
      </p>
    </div>
  );
}
