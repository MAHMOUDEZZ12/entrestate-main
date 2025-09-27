
// src/lib/firebaseAdmin.ts
import * as admin from 'firebase-admin';
import type { Firestore } from 'firebase-admin/firestore';
import type { Auth } from 'firebase-admin/auth';

let app: admin.app.App | null = null;

export function getAdminApp() {
  if (app) return app;
  try {
    // Prefer ADC (Cloud Functions / Cloud Run)
    app = admin.initializeApp();
  } catch (e:any) {
    // If ADC not available, try explicit service account JSON path
    const jsonPath = process.env.FIREBASE_SERVICE_ACCOUNT;
    if (!jsonPath) throw e;
    const svc = require(jsonPath);
    app = admin.initializeApp({ credential: admin.credential.cert(svc) });
  }
  return app!;
}

export function getDb(): Firestore {
  return getAdminApp().firestore();
}

export async function verifyIdToken(authHeader?: string) {
  if(!authHeader) return null;
  const m = authHeader.match(/^Bearer\s+(.+)/i);
  if(!m) return null;
  try{
    const token = m[1];
    const decoded = await getAdminApp().auth().verifyIdToken(token);
    return decoded;
  }catch{
    return null;
  }
}

export const adminApp = getAdminApp();
export const adminDb: Firestore = getDb();
export const adminAuth: Auth = adminApp.auth();
