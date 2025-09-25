
// src/lib/auth/roles.ts
export type Role = 'visitor' | 'member' | 'pro' | 'admin';

export function getRoleFromEnv(): Role {
  const r = (process.env.NEXT_PUBLIC_DEFAULT_ROLE || 'visitor').toLowerCase();
  if (r === 'member' || r === 'pro' || r === 'admin') return r as Role;
  return 'visitor';
}
