"use client";
import { useState } from "react";
import { postJSON } from "@/lib/api";
import { toast } from "@/hooks/use-toast";

export default function PriceEstimatorTool() {
  const [address, setAddress] = useState("");
  const [beds, setBeds] = useState("1");
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setResult(null);
    try {
      const res = await postJSON("/api/tools/submit", { toolId: "price-estimator", inputs: { address, beds } });
      toast({ title: "Estimate ready", description: "Result generated (mock)." });
      setResult(res.result);
    } catch (e: any) {
      toast({ title: "Error", description: e?.message || "Unknown error" });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-semibold">Price Estimator</h1>
      <form onSubmit={onSubmit} className="space-y-4 max-w-xl">
        <input
          className="w-full rounded-md border border-white/10 bg-transparent px-3 py-2"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Community / Address"
        />
        <input
          className="w-full rounded-md border border-white/10 bg-transparent px-3 py-2"
          value={beds}
          onChange={(e) => setBeds(e.target.value)}
          placeholder="Bedrooms"
        />
        <button className="rounded-md bg-white text-black px-4 py-2.5 text-sm font-medium" disabled={loading}>
          {loading ? "Estimating..." : "Estimate"}
        </button>
      </form>
      {result && (
        <div className="rounded-xl border border-white/10 p-5 text-sm text-white/80">
          <div className="font-medium">{result.summary}</div>
          <pre className="mt-2 whitespace-pre-wrap text-xs text-white/50">{JSON.stringify(result, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}
