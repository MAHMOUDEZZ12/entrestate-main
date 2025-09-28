import Link from 'next/link'
export default function WorkspaceHome() {
  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-white/10 p-5">
        <div className="font-medium">Welcome back!</div>
        <p className="text-white/70 text-sm mt-1">Quick actions to get moving.</p>
        <div className="mt-4 flex gap-3">
          <Link href="/workspace/tools/meta-audit" className="rounded-md border border-white/10 px-3 py-2 text-sm hover:bg-white/5">Meta Audit</Link>
          <Link href="/workspace/tools/listing-health" className="rounded-md border border-white/10 px-3 py-2 text-sm hover:bg-white/5">Listing Health</Link>
          <Link href="/workspace/tools/price-estimator" className="rounded-md border border-white/10 px-3 py-2 text-sm hover:bg-white/5">Price Estimator</Link>
        </div>
      </div>
    </div>
  )
}
