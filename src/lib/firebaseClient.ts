import { initializeApp, getApps, getApp } from 'firebase/app';
import {
  connectAuthEmulator,
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from 'firebase/auth';
import { connectFirestoreEmulator, getFirestore } from 'firebase/firestore';

const config = {
  apiKey: process.env.NEXT_PUBLIC_FB_API_KEY || process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FB_AUTH_DOMAIN || process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FB_PROJECT_ID || process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket:
    process.env.NEXT_PUBLIC_FB_STORAGE_BUCKET || process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId:
    process.env.NEXT_PUBLIC_FB_MSG_SENDER_ID || process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FB_APP_ID || process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const app = getApps().length ? getApp() : initializeApp(config);
export const auth = getAuth(app);
export const db = getFirestore(app);

if (typeof window !== 'undefined' && process.env.NEXT_PUBLIC_FIREBASE_EMU === 'true') {
  try {
    connectAuthEmulator(auth, 'http://localhost:9099');
  } catch (error) {
    console.warn('Auth emulator connection failed', error);
  }

  try {
    connectFirestoreEmulator(db, 'localhost', 8080);
  } catch (error) {
    console.warn('Firestore emulator connection failed', error);
  }
}

export async function loginWithGoogle() {
  const provider = new GoogleAuthProvider();
  return signInWithPopup(auth, provider);
}

export async function logout() {
  return signOut(auth);
}
