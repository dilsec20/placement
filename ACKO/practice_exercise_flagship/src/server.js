import express from 'express';
import cors from 'cors';
import path from 'node:path';
import { db } from './db.js';
import { evaluateFlag } from './engine.js';

const app = express();
const PORT = process.env.PORT || 7001; // Uses port 7001 (one of the starter kit ports)

app.use(cors());
app.use(express.json());
app.use(express.static(path.resolve('public')));

// Helper to extract caller user from X-User header
const getUser = (req) => req.headers['x-user'] || 'anonymous';

// ---------------------------------------------------------------- API ROUTES

// 1. Manage Flags: List
app.get('/api/v1/flags', (req, res) => {
  const flags = db.listFlags();
  res.json({ status: 'success', data: flags });
});

// 1. Manage Flags: Create
app.post('/api/v1/flags', (req, res) => {
  try {
    const { key, description } = req.body;
    if (!key) {
      return res.status(400).json({ error: "Field 'key' is required" });
    }
    const flag = db.createFlag({ key, description }, getUser(req));
    res.status(201).json({ status: 'success', data: flag });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// 1. Manage Flags: Update
app.patch('/api/v1/flags/:key', (req, res) => {
  try {
    const flag = db.updateFlag(req.params.key, req.body, getUser(req));
    res.json({ status: 'success', data: flag });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// 1. Manage Flags: Archive (Delete)
app.delete('/api/v1/flags/:key', (req, res) => {
  try {
    const flag = db.archiveFlag(req.params.key, getUser(req));
    res.json({ status: 'success', message: `Flag '${req.params.key}' archived`, data: flag });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// 2. Evaluate Flag (High-Throughput Endpoint)
// Supports both GET query (/api/v1/evaluate?flag_key=X&user_id=Y) and POST body
const handleEvaluation = (req, res) => {
  const flagKey = req.query.flag_key || (req.body && req.body.flag_key);
  const userId = req.query.user_id || (req.body && req.body.user_id);

  if (!userId) {
    return res.status(400).json({
      error: "Missing mandatory parameter: 'user_id' is required"
    });
  }

  const flag = db.getFlag(flagKey);
  const result = evaluateFlag(flag, String(userId));

  // Record usage metrics
  if (flag && !flag.is_archived) {
    db.recordEvaluation(flag.key, result.is_enabled);
  }

  res.json(result);
};

app.get('/api/v1/evaluate', handleEvaluation);
app.post('/api/v1/evaluate', handleEvaluation);

// 3. Change History
app.get('/api/v1/flags/:key/history', (req, res) => {
  const history = db.getHistory(req.params.key);
  res.json({ status: 'success', data: history });
});

// 4. Usage Metrics
app.get('/api/v1/metrics', (req, res) => {
  const metrics = db.getMetrics();
  res.json({ status: 'success', data: metrics });
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'UP', service: 'Flagship Feature-Flag Service', timestamp: new Date() });
});

// Start Server
if (process.argv[1] && process.argv[1].endsWith('server.js')) {
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 [FLAGSHIP] Feature Flag Service running on http://localhost:${PORT}`);
    console.log(`📊 [FLAGSHIP UI] Dashboard accessible at http://localhost:${PORT}`);
  });
}

export default app;
