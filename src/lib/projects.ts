
import { db } from "@/lib/firebase";
import { collection, query, where, getDocs, doc, getDoc, setDoc } from "firebase/firestore";
import { mk, splitMK } from "./market";

export async function getCatalogForMarket(country: string, city: string, devs?: string[], limit = 20) {
  const base = collection(db as any, "projects_catalog");
  const constraints:any[] = [ where("country","==",country), where("city","==",city) ];
  const snap = await getDocs(query(base, ...constraints));
  const all = snap.docs.map(d => ({ id: d.id, ...d.data() } as any));
  return devs?.length ? all.filter(p => devs.includes(p.developer)).slice(0, limit) : all.slice(0, limit);
}

export async function getLibrary(uid: string, marketKey: string) {
  const ref = doc(db as any, "projects_library", `${uid}_${marketKey}`);
  const s = await getDoc(ref);
  return s.exists() ? (s.data().items as any[]) : [];
}

export async function saveLibrary(uid: string, marketKey: string, items: any[]) {
  const ref = doc(db as any, "projects_library", `${uid}_${marketKey}`);
  await setDoc(ref, { uid, marketKey, items, ts: Date.now() }, { merge: true });
}
