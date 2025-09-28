export default function AdminOrders() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Orders</h1>
      <p className="text-white/70">Shows captured PayPal orders (persist later to Firestore/DB).</p>
      <div className="rounded-xl border border-white/10 p-5 text-sm text-white/70">
        Stub table. Read from your /orders collection when wired.
      </div>
    </div>
  )
}
