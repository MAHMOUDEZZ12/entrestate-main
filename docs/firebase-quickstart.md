
# Firebase Project Quickstart (Next.js + Frameworks)

## 1) Install CLI
```bash
npm i -g firebase-tools
firebase login
```

## 2) Initialize
From the project root:
```bash
firebase init
# Select: Hosting: Configure files for Firebase Hosting
# Select: Web Frameworks (Next.js)
# Choose your project
```

The CLI will auto-detect Next.js and set up framework-aware config (no custom functions needed).

## 3) Deploy
```bash
firebase deploy
```

> If you prefer Cloud Run or Vercel, you can keep Firebase for Auth/Firestore only.
