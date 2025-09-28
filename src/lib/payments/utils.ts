export type PlanId = 'free' | 'pro' | 'growth' | 'scale'

export const PLAN_PRICES: Record<PlanId, string> = {
  free: '0.00',
  pro: '25.00',
  growth: '39.00',
  scale: '59.00',
}

export function normalizeEmail(email?: string) {
  return (email || '').toLowerCase()
}
