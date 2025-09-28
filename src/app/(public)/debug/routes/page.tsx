"use client";

import { useState } from "react";

type RouteItem = { path: string; label?: string };

type StatusValue = number | "…";

type StatusMap = Record<string, StatusValue>;

const groups: { title: string; items: RouteItem[] }[] = [
  {
    title: "Public",
    items: [
      { path: "/" },
      { path: "/solutions" },
      { path: "/solutions/meta-suite" },
      { path: "/solutions/listing-portal" },
      { path: "/solutions/reality-designer" },
      { path: "/solutions/whatsmap" },
      { path: "/marketplace" },
      { path: "/pricing" },
      { path: "/academy" },
      { path: "/community" },
    ],
  },
  {
    title: "Workspace",
    items: [
      { path: "/workspace" },
      { path: "/workspace/tools" },
      { path: "/workspace/tools/meta-audit" },
      { path: "/workspace/tools/listing-health" },
      { path: "/workspace/tools/price-estimator" },
      { path: "/workspace/tools/brochure-rebrand" },
      { path: "/workspace/orders" },
      { path: "/workspace/settings" },
    ],
  },
  {
    title: "Cloud",
    items: [
      { path: "/cloud" },
      { path: "/cloud/market-data" },
      { path: "/cloud/agents" },
      { path: "/cloud/reports" },
    ],
  },
  {
    title: "Admin",
    items: [
      { path: "/admin" },
      { path: "/admin/plans" },
      { path: "/admin/orders" },
      { path: "/admin/agents" },
    ],
  },
];

export default function DebugRoutesPage() {
  const [status, setStatus] = useState<StatusMap>({});
  const [busy, setBusy] = useState(false);

  async function ping(path: string) {
    setStatus((prev) => ({ ...prev, [path]: "…" }));
    try {
      const res = await fetch(path, { method: "GET" });
      setStatus((prev) => ({ ...prev, [path]: res.status }));
    } catch {
      setStatus((prev) => ({ ...prev, [path]: 0 }));
    }
  }

  async function pingAll() {
    if (busy) return;
    setBusy(true);
    const all = groups.flatMap((group) => group.items.map((item) => item.path));
    for (const path of all) {
      // eslint-disable-next-line no-await-in-loop
      await ping(path);
    }
    setBusy(false);
  }

  function statusClass(code: StatusValue | undefined) {
    if (code === 200) return "text-emerald-400";
    if (code === 0) return "text-rose-400";
    if (code === 302 || code === 307) return "text-amber-300";
    if (code === "…") return "text-white/60";
    if (typeof code === "number") return "text-amber-400";
    return "text-white/40";
  }

  function setActivationCookie() {
    document.cookie = "activated=1; path=/;";
  }

  function setAdminCookie() {
    document.cookie = "demo-user=admin; path=/;";
  }

  return (
    <div className="space-y-8">
      <header className="space-y-3">
        <h1 className="text-2xl font-semibold">Debug / Routes</h1>
        <p className="text-white/70">
          Ping core routes and see status codes. Set the required cookies first if a route needs special access.
        </p>
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={pingAll}
            disabled={busy}
            className="rounded-md bg-white text-black px-4 py-2.5 text-sm font-medium disabled:opacity-60"
          >
            {busy ? "Pinging…" : "Ping All"}
          </button>
          <button
            onClick={setActivationCookie}
            className="rounded-md border border-white/10 px-4 py-2.5 text-sm hover:bg-white/5"
          >
            Set Activation Cookie
          </button>
          <button
            onClick={setAdminCookie}
            className="rounded-md border border-white/10 px-4 py-2.5 text-sm hover:bg-white/5"
          >
            Set Admin Cookie
          </button>
          <a
            href="/pricing"
            className="rounded-md border border-white/10 px-4 py-2.5 text-sm hover:bg-white/5"
          >
            Open Pricing
          </a>
        </div>
      </header>

      <div className="grid gap-6 md:grid-cols-2">
        {groups.map((group) => (
          <div key={group.title} className="rounded-xl border border-white/10 p-5">
            <div className="font-medium mb-3">{group.title}</div>
            <ul className="space-y-2 text-sm">
              {group.items.map((item) => {
                const code = status[item.path];
                return (
                  <li key={item.path} className="flex items-center gap-3">
                    <a className="underline" href={item.path} target="_blank" rel="noreferrer">
                      {item.label || item.path}
                    </a>
                    <button
                      onClick={() => ping(item.path)}
                      className="rounded border border-white/10 px-2 py-1 hover:bg-white/5"
                    >
                      Ping
                    </button>
                    <span className={`text-xs ${statusClass(code)}`}>
                      {code !== undefined ? code : ''}
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
