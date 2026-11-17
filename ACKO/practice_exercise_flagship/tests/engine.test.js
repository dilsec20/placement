import { test, describe } from 'node:test';
import assert from 'node:assert';
import { calculateBucket, evaluateFlag } from '../src/engine.js';

describe('Flagship Engine Unit Tests (Evaluation & Consistent Hashing)', () => {

  test('Deterministic Hashing: Same user always gets the exact same bucket', () => {
    const bucket1 = calculateBucket('new-claims-flow', 'user_1001');
    const bucket2 = calculateBucket('new-claims-flow', 'user_1001');
    assert.strictEqual(bucket1, bucket2, "Hashing must be 100% deterministic");
    assert.ok(bucket1 >= 0 && bucket1 < 100, "Bucket must be in range [0, 99]");
  });

  test('Flag Independence: Two different flags do not pick the same users', () => {
    // Collect buckets for 50 users across two different flags
    let identicalCount = 0;
    for (let i = 0; i < 50; i++) {
      const u = `user_${i}`;
      const b1 = calculateBucket('flag-alpha', u);
      const b2 = calculateBucket('flag-beta', u);
      if (b1 === b2) identicalCount++;
    }
    // Probability of all 50 matching is virtually zero
    assert.ok(identicalCount < 10, "Flags must have independent user distributions");
  });

  test('Monotonicity: Increasing rollout from 20% to 40% never evicts existing users', () => {
    const flag20 = { key: 'fast-checkout', is_enabled: true, rollout_percentage: 20 };
    const flag40 = { key: 'fast-checkout', is_enabled: true, rollout_percentage: 40 };

    for (let i = 0; i < 200; i++) {
      const u = `user_test_${i}`;
      const res20 = evaluateFlag(flag20, u);
      const res40 = evaluateFlag(flag40, u);

      if (res20.is_enabled) {
        assert.strictEqual(res40.is_enabled, true, 
          `Monotonicity violation for user ${u}! Was ON at 20%, but turned OFF at 40%`);
      }
    }
  });

  test('Boundary: 0% rollout enables 0 users, 100% rollout enables all users', () => {
    const flag0 = { key: 'zero-rollout', is_enabled: true, rollout_percentage: 0 };
    const flag100 = { key: 'full-rollout', is_enabled: true, rollout_percentage: 100 };

    for (let i = 0; i < 50; i++) {
      const u = `test_user_${i}`;
      assert.strictEqual(evaluateFlag(flag0, u).is_enabled, false);
      assert.strictEqual(evaluateFlag(flag0, u).reason, 'user not in rollout');

      assert.strictEqual(evaluateFlag(flag100, u).is_enabled, true);
      assert.strictEqual(evaluateFlag(flag100, u).reason, 'user in rollout');
    }
  });

  test('Flag Disabled: Returns is_enabled=false even if rollout is 100%', () => {
    const disabledFlag = { key: 'broken-feature', is_enabled: false, rollout_percentage: 100 };
    const res = evaluateFlag(disabledFlag, 'user_vip_99');

    assert.strictEqual(res.is_enabled, false);
    assert.strictEqual(res.reason, 'flag off');
  });

  test('Unknown or Archived Flag: Never crashes, answers off with reason=unknown flag', () => {
    const resUnknown = evaluateFlag(null, 'user_123');
    assert.strictEqual(resUnknown.is_enabled, false);
    assert.strictEqual(resUnknown.reason, 'unknown flag');

    const archivedFlag = { key: 'old-flag', is_archived: true, is_enabled: true, rollout_percentage: 100 };
    const resArchived = evaluateFlag(archivedFlag, 'user_123');
    assert.strictEqual(resArchived.is_enabled, false);
    assert.strictEqual(resArchived.reason, 'unknown flag');
  });
});
