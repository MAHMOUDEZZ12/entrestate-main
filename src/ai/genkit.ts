
import { genkit } from 'genkit';
import { googleAI } from '@genkit-ai/googleai';
import { enableFirebaseTelemetry } from '@genkit-ai/firebase';

const TELEMETRY_DISABLED = process.env.GENKIT_DISABLE_TELEMETRY === '1';

function hasGcpProject(): boolean {
  return Boolean(
    process.env.GOOGLE_CLOUD_PROJECT ||
    process.env.GCLOUD_PROJECT ||
    process.env.FIREBASE_PROJECT_ID
  );
}

function hasApplicationCreds(): boolean {
  return Boolean(process.env.GOOGLE_APPLICATION_CREDENTIALS);
}

if (!TELEMETRY_DISABLED && hasGcpProject() && hasApplicationCreds()) {
  try {
    enableFirebaseTelemetry();
  } catch (error) {
    // Silently ignore telemetry failures in local/dev environments.
    console.warn('[genkit] telemetry disabled - unable to initialize', error);
  }
}

export const ai = genkit({
  plugins: [
    googleAI({
      apiVersion: 'v1',
    }),
  ],
});
