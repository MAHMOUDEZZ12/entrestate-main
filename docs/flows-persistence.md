# Flows Persistence (Firestore)

API
- `GET  /api/flows?scope=all|me|public` (default: all)
- `POST /api/flows` with a single flow `{ id?, name, steps, ... }` or a batch `{ flows: [...] }`

Auth
- If an **Authorization: Bearer <Firebase ID token>** header is present, the server records `ownerUid`.
- Without a token, flows are stored with `ownerUid = 'public'`.

Setup
- Enable Firestore in your Firebase project.
- Deploy rules (example at `docs/firestore.rules.flows`).
- On Firebase Hosting (Web Frameworks), Admin SDK uses ADC automatically.
- Local dev: set `GOOGLE_APPLICATION_CREDENTIALS=/path/to/service-account.json`.

Notes
- Adjust rules to your privacy model (private by default, public read, etc.).
