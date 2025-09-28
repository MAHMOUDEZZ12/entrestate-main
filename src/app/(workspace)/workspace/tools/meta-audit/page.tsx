"use client";
import { useState } from "react";
import { postJSON } from "@/lib/api";
import { toast } from "@/hooks/use-toast";

export default function MetaAuditTool() {
  const [accountId, setAccountId] = useState("");
  const [pageUrl, setPageUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setResult(null);
    try {
      const res = await postJSON<{ ok: boolean; result: any }>("/api/tools/submit", {
        toolId: "meta-audit",
        inputs: { accountId, pageUrl },
      });
      if (res.ok) {
        toast({ title: "Audit queued", description: "Your audit was processed (mock)." });
        setResult(res.result);
      }
    } catch (err: any) {
      toast({ title: "Submission failed", description: err?.message || "Unknown error" });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-2xl font-semibold">Meta Audit</h1>
        <p className="text-white/70">Run a quick health check on your Meta setup.</p>
      </header>

      <form onSubmit={onSubmit} className="space-y-4 max-w-xl">
        <div>
          <label className="block text-sm mb-1">Ad Account ID</label>
          <input
            className="w-full rounded-md border border-white/10 bg-transparent px-3 py-2"
            value={accountId}
            onChange={(e) => setAccountId(e.target.value)}
            placeholder="e.g. 123456789"
          />
        </div>
        <div>
          <label className="block text-sm mb-1">Facebook Page URL (optional)</label>
          <input
            className="w-full rounded-md border border-white/10 bg-transparent px-3 py-2"
            value={pageUrl}
            onChange={(e) => setPageUrl(e.target.value)}
            placeholder="https://facebook.com/yourpage"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="rounded-md bg-white text-black px-4 py-2.5 text-sm font-medium disabled:opacity-60"
        >
          {loading ? "Running..." : "Run Audit"}
        </button>
      </form>

      {result && (
        <div className="rounded-xl border border-white/10 p-5 space-y-2">
          <div className="font-medium">{result.summary}</div>
          {Array.isArray(result.findings) && (
            <ul className="list-disc list-inside text-sm text-white/70 space-y-1">
              {result.findings.map((f: string) => <li key={f}>{f}</li>)}
            </ul>
          )}
          <pre className="mt-2 whitespace-pre-wrap text-xs text-white/50">{JSON.stringify(result, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}
