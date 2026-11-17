import fs from 'node:fs';
import path from 'node:path';

const DATA_DIR = path.resolve('data');
const DATA_FILE = path.join(DATA_DIR, 'store.json');

// Initial state
const defaultState = {
  flags: {},
  history: [],
  metrics: {}
};

class Store {
  constructor() {
    this.state = { ...defaultState };
    this.init();
  }

  init() {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    if (fs.existsSync(DATA_FILE)) {
      try {
        const raw = fs.readFileSync(DATA_FILE, 'utf-8');
        this.state = JSON.parse(raw);
      } catch (err) {
        console.warn('[Store] Could not read existing store.json, reinitializing.', err.message);
        this.persist();
      }
    } else {
      this.persist();
    }
  }

  persist() {
    try {
      fs.writeFileSync(DATA_FILE, JSON.stringify(this.state, null, 2), 'utf-8');
    } catch (err) {
      console.error('[Store] Failed to persist data:', err.message);
    }
  }

  // --- FLAGS ---
  listFlags(includeArchived = false) {
    const all = Object.values(this.state.flags);
    return includeArchived ? all : all.filter(f => !f.is_archived);
  }

  getFlag(key) {
    return this.state.flags[key] || null;
  }

  createFlag({ key, description = '' }, user = 'anonymous') {
    // Validation
    if (!/^[a-z0-9-]{3,50}$/.test(key)) {
      throw new Error("Invalid key: Must be lowercase letters, numbers, hyphens, 3 to 50 chars.");
    }
    if (this.state.flags[key]) {
      throw new Error(`Flag '${key}' already exists or was previously archived.`);
    }

    const now = new Date().toISOString();
    const newFlag = {
      key,
      description,
      is_enabled: false,
      rollout_percentage: 0,
      is_archived: false,
      created_at: now,
      updated_at: now
    };

    this.state.flags[key] = newFlag;
    this.state.metrics[key] = { total: 0, on_count: 0 };

    this.logHistory(key, 'CREATE', null, newFlag, user);
    this.persist();
    return newFlag;
  }

  updateFlag(key, updates, user = 'anonymous') {
    const flag = this.getFlag(key);
    if (!flag || flag.is_archived) {
      throw new Error(`Cannot update: Flag '${key}' not found or archived.`);
    }

    const oldState = { ...flag };

    if ('is_enabled' in updates) {
      flag.is_enabled = Boolean(updates.is_enabled);
    }
    if ('rollout_percentage' in updates) {
      const pct = parseInt(updates.rollout_percentage, 10);
      if (isNaN(pct) || pct < 0 || pct > 100) {
        throw new Error("Rollout percentage must be a whole number between 0 and 100.");
      }
      flag.rollout_percentage = pct;
    }
    if ('description' in updates) {
      flag.description = String(updates.description);
    }

    flag.updated_at = new Date().toISOString();

    this.logHistory(key, 'UPDATE', oldState, flag, user);
    this.persist();
    return flag;
  }

  archiveFlag(key, user = 'anonymous') {
    const flag = this.getFlag(key);
    if (!flag) {
      throw new Error(`Flag '${key}' not found.`);
    }
    if (flag.is_archived) {
      return flag;
    }

    const oldState = { ...flag };
    flag.is_archived = true;
    flag.is_enabled = false;
    flag.updated_at = new Date().toISOString();

    this.logHistory(key, 'DELETE', oldState, flag, user);
    this.persist();
    return flag;
  }

  // --- HISTORY ---
  logHistory(flagKey, action, oldVal, newVal, user) {
    this.state.history.push({
      id: this.state.history.length + 1,
      flag_key: flagKey,
      action,
      old_value: oldVal ? { is_enabled: oldVal.is_enabled, rollout_percentage: oldVal.rollout_percentage } : null,
      new_value: newVal ? { is_enabled: newVal.is_enabled, rollout_percentage: newVal.rollout_percentage } : null,
      performed_by: user || 'anonymous',
      timestamp: new Date().toISOString()
    });
  }

  getHistory(flagKey = null) {
    if (flagKey) {
      return this.state.history.filter(h => h.flag_key === flagKey);
    }
    return this.state.history;
  }

  // --- METRICS ---
  recordEvaluation(key, isEnabled) {
    if (!this.state.metrics[key]) {
      this.state.metrics[key] = { total: 0, on_count: 0 };
    }
    this.state.metrics[key].total += 1;
    if (isEnabled) {
      this.state.metrics[key].on_count += 1;
    }
    // Periodic async persistence
    if (this.state.metrics[key].total % 10 === 0) {
      this.persist();
    }
  }

  getMetrics(key = null) {
    if (key) {
      return this.state.metrics[key] || { total: 0, on_count: 0 };
    }
    return this.state.metrics;
  }
}

export const db = new Store();
