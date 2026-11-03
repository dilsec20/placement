# 07 — Database Design for CRM

> **JD Match:** "CRM interactions" • "Real business workflows"

---

## 🎯 What Superfone Will Ask
- Design a database schema for a CRM that tracks calls and WhatsApp messages.
- How do you model multi-tenant data (thousands of businesses on one platform)?
- How would you query "all interactions with a customer across calls and WhatsApp"?

---

## 1. Superfone Data Model

```
┌─────────────┐     ┌──────────────┐     ┌───────────────┐
│  Business   │────<│   Agent      │     │  AIConfig     │
│             │     │  (human)     │     │  (per biz)    │
└──────┬──────┘     └──────────────┘     └───────────────┘
       │ 1:many
       │
┌──────┴──────┐
│  Contact    │──────────────────────────────────┐
│ (customer)  │                                  │
└──────┬──────┘                                  │
       │ 1:many                                  │ 1:many
       │                                         │
┌──────┴──────┐                          ┌──────┴──────────┐
│  Call       │                          │  Conversation   │
│  Record     │                          │  (WhatsApp)     │
├─────────────┤                          ├─────────────────┤
│ duration    │                          │ messages[]      │
│ recording   │                          │ status          │
│ transcript  │                          │ assignedTo      │
│ aiSummary   │                          │ (ai/human)      │
│ sentiment   │                          └─────────────────┘
└─────────────┘
```

---

## 2. MongoDB Schema

```javascript
// Business (tenant)
const businessSchema = new Schema({
  name: { type: String, required: true },
  phoneNumbers: [{ type: String }],       // Superfone numbers assigned
  whatsappPhoneId: String,                 // WhatsApp Business phone ID
  plan: { type: String, enum: ['basic', 'pro', 'enterprise'] },
  agents: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  aiConfig: {
    enabled: Boolean,
    agentType: { type: String, enum: ['receptionist', 'sales', 'support'] },
    greeting: String,
    systemPrompt: String,
    knowledgeBaseId: String,              // Vector DB namespace
  },
  settings: {
    businessHours: { open: Number, close: Number },
    autoFollowUp: Boolean,
    recordCalls: { type: Boolean, default: true },
  },
}, { timestamps: true });

// Index for quick lookup
businessSchema.index({ phoneNumbers: 1 });

// Contact (customer of a business)
const contactSchema = new Schema({
  businessId: { type: Schema.Types.ObjectId, ref: 'Business', required: true },
  phone: { type: String, required: true },
  name: String,
  email: String,
  tags: [String],                          // ['hot-lead', 'vip', 'new']
  notes: String,
  stats: {
    totalCalls: { type: Number, default: 0 },
    totalMessages: { type: Number, default: 0 },
    lastContactDate: Date,
    sentiment: String,                     // overall sentiment trend
  },
}, { timestamps: true });

// Compound index: one contact per phone per business
contactSchema.index({ businessId: 1, phone: 1 }, { unique: true });

// Call Record
const callSchema = new Schema({
  businessId: { type: Schema.Types.ObjectId, ref: 'Business', required: true },
  contactId: { type: Schema.Types.ObjectId, ref: 'Contact' },
  direction: { type: String, enum: ['inbound', 'outbound'] },
  from: String,
  to: String,
  status: {
    type: String,
    enum: ['initiating', 'ringing', 'in-progress', 'completed', 'failed', 'voicemail'],
  },
  duration: Number,                        // seconds
  handledBy: { type: String, enum: ['ai', 'human'] },
  agentId: Schema.Types.ObjectId,
  recordingUrl: String,
  transcript: String,
  aiSummary: String,
  sentiment: { type: String, enum: ['positive', 'neutral', 'negative'] },
  metadata: Schema.Types.Mixed,            // Provider-specific data
}, { timestamps: true });

callSchema.index({ businessId: 1, createdAt: -1 });  // Latest calls per business
callSchema.index({ contactId: 1, createdAt: -1 });   // Call history per contact

// WhatsApp Conversation
const conversationSchema = new Schema({
  businessId: { type: Schema.Types.ObjectId, ref: 'Business', required: true },
  contactId: { type: Schema.Types.ObjectId, ref: 'Contact' },
  customerPhone: String,
  status: { type: String, enum: ['active', 'resolved', 'waiting'], default: 'active' },
  assignedTo: { type: String, enum: ['ai', 'human'], default: 'ai' },
  assignedAgentId: Schema.Types.ObjectId,
  messages: [{
    direction: { type: String, enum: ['inbound', 'outbound'] },
    type: { type: String, enum: ['text', 'image', 'audio', 'template', 'button'] },
    content: String,
    sentBy: String,                        // 'customer', 'ai', 'agent_name'
    timestamp: { type: Date, default: Date.now },
    status: { type: String, enum: ['sent', 'delivered', 'read'] },
  }],
  lastMessageAt: Date,
}, { timestamps: true });

conversationSchema.index({ businessId: 1, status: 1 });
conversationSchema.index({ customerPhone: 1, businessId: 1 });
```

---

## 3. Multi-Tenant Query Patterns

```javascript
// ⚠️ CRITICAL: EVERY query must filter by businessId!
// Otherwise business A sees business B's data.

// ❌ DANGEROUS — returns ALL calls
const calls = await Call.find({ status: 'completed' });

// ✅ SAFE — scoped to business
const calls = await Call.find({
  businessId: req.user.businessId,   // From auth middleware
  status: 'completed',
});

// ─── Unified customer timeline (calls + WhatsApp) ───
async function getCustomerTimeline(businessId, contactId) {
  const [calls, conversations] = await Promise.all([
    Call.find({ businessId, contactId })
      .sort({ createdAt: -1 })
      .limit(50)
      .lean(),
    Conversation.find({ businessId, contactId })
      .sort({ lastMessageAt: -1 })
      .limit(10)
      .lean(),
  ]);

  // Merge and sort by time
  const timeline = [
    ...calls.map(c => ({ type: 'call', date: c.createdAt, ...c })),
    ...conversations.flatMap(conv =>
      conv.messages.map(m => ({ type: 'whatsapp', date: m.timestamp, conversationId: conv._id, ...m }))
    ),
  ].sort((a, b) => new Date(b.date) - new Date(a.date));

  return timeline;
}

// ─── Dashboard analytics ───
async function getBusinessDashboard(businessId, dateRange) {
  const [callStats, messageStats] = await Promise.all([
    Call.aggregate([
      { $match: { businessId: new ObjectId(businessId), createdAt: { $gte: dateRange.start } } },
      { $group: {
          _id: null,
          totalCalls: { $sum: 1 },
          avgDuration: { $avg: '$duration' },
          aiHandled: { $sum: { $cond: [{ $eq: ['$handledBy', 'ai'] }, 1, 0] } },
          positive: { $sum: { $cond: [{ $eq: ['$sentiment', 'positive'] }, 1, 0] } },
        }
      },
    ]),
    Conversation.aggregate([
      { $match: { businessId: new ObjectId(businessId) } },
      { $group: { _id: null, activeConversations: { $sum: 1 }, totalMessages: { $sum: { $size: '$messages' } } } },
    ]),
  ]);

  return { calls: callStats[0], whatsapp: messageStats[0] };
}
```

---

## ⚡ Quick Revision

| Concept | Key Point |
|---------|-----------|
| Multi-tenant | ALWAYS filter by businessId; compound indexes include businessId |
| Embedding vs Referencing | Embed messages in conversation (read together); reference contacts |
| Compound index | `{ businessId: 1, createdAt: -1 }` for scoped time-sorted queries |
| Unified timeline | Merge calls + WhatsApp into single chronological view per contact |
| Aggregation | Use MongoDB `$group`, `$match`, `$sort` for dashboard analytics |
