import crypto from 'node:crypto';

/**
 * Calculates a deterministic bucket (0 - 99) for a (flagKey, userId) pair
 * using SHA-256 consistent hashing.
 * 
 * Properties:
 * 1. Deterministic: Same user always maps to the exact same bucket.
 * 2. Monotonic: If user is in bucket 24, they are enabled for any rollout >= 25.
 * 3. Independent: Salted with flagKey so two flags pick independent users.
 */
export function calculateBucket(flagKey, userId) {
  const hash = crypto
    .createHash('sha256')
    .update(`${flagKey}:${userId}`)
    .digest('hex');
  
  // Use first 8 characters (32 bits) for fast, uniform integer conversion
  const intVal = parseInt(hash.substring(0, 8), 16);
  return intVal % 100;
}

/**
 * Evaluates whether a flag is enabled for a given user.
 */
export function evaluateFlag(flag, userId) {
  if (!flag || flag.is_archived) {
    return {
      flag_key: flag ? flag.key : 'unknown',
      user_id: userId,
      is_enabled: false,
      reason: 'unknown flag'
    };
  }

  if (!flag.is_enabled) {
    return {
      flag_key: flag.key,
      user_id: userId,
      is_enabled: false,
      reason: 'flag off'
    };
  }

  if (flag.rollout_percentage === 0) {
    return {
      flag_key: flag.key,
      user_id: userId,
      is_enabled: false,
      reason: 'user not in rollout'
    };
  }

  if (flag.rollout_percentage === 100) {
    return {
      flag_key: flag.key,
      user_id: userId,
      is_enabled: true,
      reason: 'user in rollout'
    };
  }

  const bucket = calculateBucket(flag.key, userId);
  const isInRollout = bucket < flag.rollout_percentage;

  return {
    flag_key: flag.key,
    user_id: userId,
    is_enabled: isInRollout,
    reason: isInRollout ? 'user in rollout' : 'user not in rollout'
  };
}
