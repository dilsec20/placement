# 05 — WhatsApp Business API

> **JD Match:** "WhatsApp follow-ups" • "CRM interactions" • "Real business workflows"

---

## 🎯 What Superfone Will Ask
- How does the WhatsApp Business API work?
- How do you handle incoming messages and respond programmatically?
- What are message templates and when are they required?
- How would you design a WhatsApp chatbot for business?

---

## 1. WhatsApp Business API Architecture

```
                    ┌─────────────────────┐
                    │   META / WhatsApp   │
                    │   Cloud API         │
                    └──────────┬──────────┘
                               │
                    Webhooks (incoming messages)
                    API calls (send messages)
                               │
                    ┌──────────┴──────────┐
                    │   SUPERFONE         │
                    │   BACKEND           │
                    │                     │
                    │  • Receive webhooks │
                    │  • Route to AI/human│
                    │  • Send responses   │
                    │  • Track in CRM     │
                    └──────────┬──────────┘
                               │
              ┌────────────────┼────────────────┐
              ▼                ▼                ▼
        ┌──────────┐    ┌──────────┐    ┌──────────┐
        │ AI Agent │    │  Human   │    │   CRM    │
        │ (auto    │    │  Agent   │    │  Update  │
        │  reply)  │    │ (manual) │    │          │
        └──────────┘    └──────────┘    └──────────┘

KEY RULES:
  • 24-hour window: Free-form messages only within 24hr of user's last message
  • Outside 24hr: Must use pre-approved TEMPLATES
  • Webhooks: WhatsApp sends events (message received, delivered, read)
```

---

## 2. Webhook Handler

```javascript
// src/modules/whatsapp/wa.webhook.js
const router = require('express').Router();
const WhatsAppService = require('./wa.service');

// Webhook verification (WhatsApp sends GET to verify your endpoint)
router.get('/', (req, res) => {
  const mode = req.query['hub.mode'];
  const token = req.query['hub.verify_token'];
  const challenge = req.query['hub.challenge'];

  if (mode === 'subscribe' && token === process.env.WA_VERIFY_TOKEN) {
    res.status(200).send(challenge);  // Return challenge to verify
  } else {
    res.status(403).send('Verification failed');
  }
});

// Receive messages
router.post('/', async (req, res) => {
  res.status(200).send('OK');  // Respond immediately!

  try {
    const { entry } = req.body;

    for (const e of entry) {
      for (const change of e.changes) {
        if (change.field !== 'messages') continue;

        const { messages, contacts, metadata } = change.value;
        if (!messages) continue;

        for (const msg of messages) {
          await WhatsAppService.handleIncoming({
            from: msg.from,                    // Customer phone
            businessPhoneId: metadata.phone_number_id,
            messageId: msg.id,
            timestamp: msg.timestamp,
            type: msg.type,                    // text, image, audio, document
            content: extractContent(msg),
            contactName: contacts?.[0]?.profile?.name,
          });
        }
      }
    }
  } catch (err) {
    console.error('WhatsApp webhook error:', err);
  }
});

function extractContent(msg) {
  switch (msg.type) {
    case 'text':     return { text: msg.text.body };
    case 'image':    return { mediaId: msg.image.id, caption: msg.image.caption };
    case 'audio':    return { mediaId: msg.audio.id };
    case 'document': return { mediaId: msg.document.id, filename: msg.document.filename };
    case 'button':   return { text: msg.button.text, payload: msg.button.payload };
    default:         return { raw: msg };
  }
}

module.exports = router;
```

---

## 3. Sending Messages

```javascript
// src/services/whatsapp.service.js
const axios = require('axios');

class WhatsAppService {
  constructor() {
    this.apiUrl = `https://graph.facebook.com/v18.0`;
    this.token = process.env.WA_ACCESS_TOKEN;
  }

  // ─── Send text message (within 24hr window) ───
  async sendText(phoneNumberId, to, text) {
    await axios.post(
      `${this.apiUrl}/${phoneNumberId}/messages`,
      {
        messaging_product: 'whatsapp',
        to,
        type: 'text',
        text: { body: text },
      },
      { headers: { Authorization: `Bearer ${this.token}` } }
    );
  }

  // ─── Send template message (outside 24hr window) ───
  async sendTemplate(phoneNumberId, to, templateName, params) {
    await axios.post(
      `${this.apiUrl}/${phoneNumberId}/messages`,
      {
        messaging_product: 'whatsapp',
        to,
        type: 'template',
        template: {
          name: templateName,          // Pre-approved template
          language: { code: 'en' },
          components: [{
            type: 'body',
            parameters: params.map(p => ({ type: 'text', text: p })),
          }],
        },
      },
      { headers: { Authorization: `Bearer ${this.token}` } }
    );
  }

  // ─── Send interactive buttons ───
  async sendButtons(phoneNumberId, to, bodyText, buttons) {
    await axios.post(
      `${this.apiUrl}/${phoneNumberId}/messages`,
      {
        messaging_product: 'whatsapp',
        to,
        type: 'interactive',
        interactive: {
          type: 'button',
          body: { text: bodyText },
          action: {
            buttons: buttons.map((btn, i) => ({
              type: 'reply',
              reply: { id: `btn_${i}`, title: btn },
            })),
          },
        },
      },
      { headers: { Authorization: `Bearer ${this.token}` } }
    );
  }

  // ─── Handle incoming message (route to AI or human) ───
  async handleIncoming(message) {
    const { from, businessPhoneId, content, type } = message;

    // 1. Find or create conversation
    const conversation = await Conversation.findOneAndUpdate(
      { customerPhone: from, businessPhoneId, status: 'active' },
      { $push: { messages: message }, lastMessageAt: new Date() },
      { upsert: true, new: true }
    );

    // 2. Route based on business config
    const business = await Business.findOne({ phoneNumberId: businessPhoneId });

    if (business.whatsappAIEnabled && conversation.assignedTo === 'ai') {
      // AI handles the conversation
      const aiResponse = await AIService.generateWhatsAppReply({
        conversation: conversation.messages,
        businessContext: business.aiContext,
        customerMessage: content.text,
      });

      await this.sendText(businessPhoneId, from, aiResponse);
    } else {
      // Notify human agent via WebSocket
      broadcastToAgents(business._id, 'new-whatsapp-message', message);
    }
  }
}

module.exports = new WhatsAppService();
```

---

## 4. Call → WhatsApp Follow-up Flow

```
REAL SUPERFONE WORKFLOW:

Customer calls business number
        │
        ▼
AI Receptionist answers, takes info
        │
        ▼
Call ends → AI generates summary
        │
        ▼
After 5 minutes (queue delay):
  WhatsApp template sent to customer:
  "Hi {name}! Thanks for calling {business}.
   Here's a summary of our conversation: {summary}.
   Reply here if you need anything else!"
        │
        ▼
Customer replies on WhatsApp
        │
        ▼
AI or human agent continues conversation on WhatsApp
        │
        ▼
All interactions tracked in CRM under same customer profile
```

---

## ⚡ Quick Revision

| Concept | Key Point |
|---------|-----------|
| 24-hour rule | Free-form messages only within 24hr of user's last message |
| Templates | Pre-approved by Meta; required outside 24hr window |
| Webhook verification | GET with challenge; POST for incoming messages |
| Respond 200 first | Always acknowledge webhook immediately, process async |
| Interactive messages | Buttons, lists, quick replies for structured responses |
| Media handling | Download media using media ID, then process/store |
