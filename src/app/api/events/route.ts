
import { adminDb } from "@/lib/firebaseAdmin";
import { ok, bad, fail } from "@/lib/api-helpers";

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const { event, uid, props } = body || {};
    if (!event) return bad("event required");

    await adminDb.collection("events").add({
      event, uid: uid || "anon", props: props || {}, ts: new Date(), v: 1
    });

    return ok({ logged: true });
  } catch (e) {
    return fail(e);
  }
}
