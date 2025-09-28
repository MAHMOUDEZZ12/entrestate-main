"use client";
import { useState } from "react";
import { bayut } from "@/lib/portals/adapters";

export default function BayutSyncPage() {
  const [listingId, setListingId] = useState("");
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  async function onSync(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setResult(null);
    try {
      if (!bayut.syncListing) return;
      const res = await bayut.syncListing({ listingId, auth: null });
      setResult(res);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Sync to Bayut</h1>
      <form onSubmit={onSync} className="space-y-3 max-w-xl">
        <input
          className="w-full rounded-md border border-white/10 bg-transparent px-3 py-2"
          placeholder="Listing ID"
          value={listingId}
          onChange={(e) => setListingId(e.target.value)}
        />
        <button
          className="rounded-md bg-white text-black px-4 py-2.5 text-sm font-medium disabled:opacity-60"
          disabled={!listingId || loading}
        >
          {loading ? "Syncing..." : "Sync"}
        </button>
      </form>

      {result && (
        <div className="rounded-xl border border-white/10 p-5 text-sm">
          <div className="font-medium">Status: {result.ok ? "OK" : "Failed"}</div>
          <div>Portal: {result.portal}</div>
          <div>Listing: {result.listingId}</div>
          <div>Synced @ {result.syncedAt}</div>
          {result.note && <div className="text-white/60">Note: {result.note}</div>}
        </div>
      )}
    </div>
  );
}
