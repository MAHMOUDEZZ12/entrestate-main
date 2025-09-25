
// src/lib/ai/vertex.ts
// Vertex AI Search (Enterprise Search) minimal client using google-auth-library.
// Requires ADC in production (Cloud Functions/Run) or GOOGLE_APPLICATION_CREDENTIALS locally.

import { GoogleAuth } from 'google-auth-library';

export type MarketSearchResult = {
  title: string;
  snippet: string;
  url?: string;
};

type SearchResponse = {
  results?: Array<{
    document?: {
      id?: string;
      structData?: any;
      derivedStructData?: any;
    },
    snippetInfo?: any;
  }>;
};

function getEnv(name: string, fallback?: string){
  const v = process.env[name] || fallback;
  if(!v) throw new Error(`Missing env ${name}`);
  return v;
}

export async function runMarketSearch(query: string): Promise<MarketSearchResult[]> {
  const project = getEnv('GCP_PROJECT');
  const location = getEnv('VERTEX_LOCATION', 'us-central1');
  const dataStore = getEnv('VERTEX_DATASTORE_ID'); // discoveryengine data store id
  const servingConfig = 'default_search';

  const url = `https://discoveryengine.googleapis.com/v1/projects/${project}/locations/${location}/collections/default_collection/dataStores/${dataStore}/servingConfigs/${servingConfig}:search`;

  const auth = new GoogleAuth({
    scopes: ['https://www.googleapis.com/auth/cloud-platform']
  });
  const client = await auth.getClient();
  const token = await (await client.getAccessToken()).token;
  if(!token) throw new Error('Unable to acquire access token');

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'authorization': `Bearer ${token}`,
      'content-type': 'application/json'
    },
    body: JSON.stringify({
      query: query || '',
      pageSize: 5,
      contentSearchSpec: {
        snippetSpec: { returnSnippet: true }
      }
    })
  });

  if(!res.ok){
    const text = await res.text();
    throw new Error(`Vertex search failed: ${res.status} ${text}`);
  }

  const json = await res.json() as SearchResponse;

  const items: MarketSearchResult[] = [];
  for(const r of (json.results || [])){
    const doc = r.document?.structData || r.document?.derivedStructData || {};
    const title = doc.title || doc.name || doc.url || 'Result';
    const snippet = (doc.snippet || doc.description || doc.excerpt || '').toString();
    items.push({
      title,
      snippet: snippet || '—',
      url: doc.url || doc.link
    });
  }
  return items;
}
