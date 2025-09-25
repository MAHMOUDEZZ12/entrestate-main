# Apps Input/Output Registry (Overview)

This document mirrors the **single source of truth** for app contracts:
`src/lib/apps/io.ts`.

Use `/apps/io` in the UI to browse I/O, and POST to `/api/apps/validate`
with `{ appId, payload }` to validate inputs at runtime.

> Keep this file and the TypeScript registry in sync.
