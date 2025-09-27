export type PlanId = 'starter' | 'designer' | 'meta' | 'listing' | 'whatsmap';

export const PLAN_PRICES: Record<PlanId, string> = {
  starter: '19.00',
  designer: '20.00',
  meta: '25.00',
  listing: '35.00',
  whatsmap: '20.00',
};

export function normalizeEmail(email?: string) {
  return (email || '').toLowerCase();
}
