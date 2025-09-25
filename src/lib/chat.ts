
import { track } from '@/lib/events';

export type ChatAction =
  | { type: "createProject"; name: string; city: string; developer?: string }
  | { type: "addBrand"; name: string; primary: string; accent: string }
  | { type: "scanProjects"; city: string; developers: string[]; limit?: number }
  | { type: "savePaymentMethodStart" } // handled client->stripe then server
  | { type: "logMetric"; name: string; props?: Record<string, any> };

export type ChatEvent = {
  uid: string;
  eventId: string;           // uuid v4 (client-generated for idempotency)
  role: "user" | "assistant";
  text: string;
  action?: ChatAction | null;
  meta?: Record<string, any>;
};

export async function ingestChat(e: ChatEvent) {
  // This now uses the centralized event tracking system
  // which posts to our secure API endpoint.
  await track('chat_message', {
    uid: e.uid,
    eventId: e.eventId,
    role: e.role,
    text: e.text,
    action: e.action,
    meta: e.meta,
  });
}
