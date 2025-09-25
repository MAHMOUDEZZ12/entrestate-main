
// tests/apps-validation.test.js
// Run this with `node tests/apps-validation.test.js` while `npm run dev` is running.

import assert from 'node:assert';
import fetch from 'node-fetch';

const ORIGIN = process.env.TEST_ORIGIN || 'http://localhost:3000';

async function post(path, body){
  const res = await fetch(ORIGIN + path, {
    method: 'POST',
    headers: {'content-type':'application/json'},
    body: JSON.stringify(body)
  });
  const json = await res.json();
  return { status: res.status, json };
}

(async () => {
  // Happy path
  let r = await post('/api/apps/validate', { appId: 'campaign-creator-meta', payload: { objective: 'Leads', dailyBudget: 100, audience: 'Dubai investors' } });
  assert.equal(r.status, 200, 'Expected 200 OK');
  assert.equal(r.json.ok, true, 'Expected ok=true');

  // Missing required
  r = await post('/api/apps/validate', { appId: 'campaign-creator-meta', payload: { dailyBudget: 100 } });
  assert.equal(r.status, 400, 'Expected 400');
  assert.equal(r.json.ok, false, 'Expected ok=false');
  assert(r.json.errors.some(e => e.includes('audience')), 'Should mention missing audience');

  console.log('✅ Apps validation tests passed.');
})().catch(e => {
  console.error('❌ Test failed:', e);
  process.exit(1);
});
