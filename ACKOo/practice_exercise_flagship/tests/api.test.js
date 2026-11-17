import { test, describe, before, after } from 'node:test';
import assert from 'node:assert';
import app from '../src/server.js';
import { db } from '../src/db.js';

let server;
const TEST_PORT = 7099;
const BASE_URL = `http://localhost:${TEST_PORT}/api/v1`;

before(() => {
  server = app.listen(TEST_PORT);
});

after(() => {
  server.close();
});

describe('Flagship API Integration Tests', () => {

  test('Missing user_id parameter returns HTTP 400 Bad Request', async () => {
    const res = await fetch(`${BASE_URL}/evaluate?flag_key=any-flag`);
    assert.strictEqual(res.status, 400);
    const body = await res.json();
    assert.ok(body.error.includes("'user_id' is required"));
  });

  test('Non-existent flag returns HTTP 200 with is_enabled=false (never crashes calling services)', async () => {
    const res = await fetch(`${BASE_URL}/evaluate?flag_key=non-existent-xyz&user_id=usr_1`);
    assert.strictEqual(res.status, 200);
    const body = await res.json();
    assert.strictEqual(body.is_enabled, false);
    assert.strictEqual(body.reason, 'unknown flag');
  });

  test('Full CRUD Lifecycle + Audit Log with X-User header', async () => {
    const flagKey = `test-flag-${Date.now()}`;

    // 1. Create
    const createRes = await fetch(`${BASE_URL}/flags`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'X-User': 'dilip-admin' },
      body: JSON.stringify({ key: flagKey, description: 'Test flow' })
    });
    assert.strictEqual(createRes.status, 201);
    const created = (await createRes.json()).data;
    assert.strictEqual(created.is_enabled, false);
    assert.strictEqual(created.rollout_percentage, 0);

    // 2. Update Rollout & Enable
    const updateRes = await fetch(`${BASE_URL}/flags/${flagKey}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json', 'X-User': 'dilip-admin' },
      body: JSON.stringify({ is_enabled: true, rollout_percentage: 100 })
    });
    assert.strictEqual(updateRes.status, 200);
    const updated = (await updateRes.json()).data;
    assert.strictEqual(updated.is_enabled, true);
    assert.strictEqual(updated.rollout_percentage, 100);

    // 3. Evaluate (Now 100% enabled)
    const evalRes = await fetch(`${BASE_URL}/evaluate?flag_key=${flagKey}&user_id=customer_42`);
    assert.strictEqual(evalRes.status, 200);
    const evalBody = await evalRes.json();
    assert.strictEqual(evalBody.is_enabled, true);
    assert.strictEqual(evalBody.reason, 'user in rollout');

    // 4. Verify Audit History
    const historyRes = await fetch(`${BASE_URL}/flags/${flagKey}/history`);
    const historyBody = await historyRes.json();
    assert.ok(historyBody.data.length >= 2);
    assert.strictEqual(historyBody.data[0].performed_by, 'dilip-admin');
    assert.strictEqual(historyBody.data[0].action, 'CREATE');
    assert.strictEqual(historyBody.data[1].action, 'UPDATE');
  });

  test('Latency SLA: Evaluation returns well under 50ms', async () => {
    const start = performance.now();
    const res = await fetch(`${BASE_URL}/evaluate?flag_key=any&user_id=usr_speed_test`);
    const elapsed = performance.now() - start;
    assert.strictEqual(res.status, 200);
    assert.ok(elapsed < 50, `Evaluation took ${elapsed}ms, exceeding 50ms SLA`);
  });
});
