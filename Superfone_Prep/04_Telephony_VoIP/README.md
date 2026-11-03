# 04 — Telephony & VoIP Architecture

> **JD Match:** "Build and scale core communication infrastructure, including telephony"

---

## 🎯 What Superfone Will Ask
- How does a VoIP call work?
- What is SIP? How does call signaling work?
- How would you design a call routing system for multiple businesses?
- How do you handle call recording and transcription at scale?

---

## 1. How VoIP Works

```
TRADITIONAL PHONE:
  Analog signal → Copper wire → Phone exchange → Copper wire → Phone
  (Dedicated circuit for each call — expensive, limited)

VoIP (Voice over IP):
  Voice → Digitize → Compress → IP Packets → Internet → Decompress → Voice
  (Shared network — cheap, scalable, programmable!)

SUPERFONE'S STACK:
┌─────────────┐     ┌──────────────┐     ┌─────────────────┐
│ Customer's  │────→│  PSTN/SIP    │────→│  Superfone      │
│ Phone       │     │  Gateway     │     │  VoIP Server    │
└─────────────┘     └──────────────┘     └────────┬────────┘
                                                   │
                    ┌──────────────────────────────┤
                    │                              │
              ┌─────┴──────┐              ┌───────┴────────┐
              │ AI Agent   │              │ Human Agent    │
              │ (answers)  │              │ (if escalated) │
              └────────────┘              └────────────────┘
```

---

## 2. SIP (Session Initiation Protocol)

```
SIP = The "HTTP of telephony" — it sets up, modifies, and tears down calls.
RTP = Carries the actual audio/video data.

CALL FLOW:

Caller                  Superfone SIP Server              AI Agent
  │                           │                              │
  │  INVITE (I want to call)  │                              │
  │ ─────────────────────────→│                              │
  │                           │  Route to AI agent           │
  │                           │ ─────────────────────────────→│
  │  100 Trying               │                              │
  │ ←─────────────────────────│                              │
  │  180 Ringing              │  200 OK                      │
  │ ←─────────────────────────│←─────────────────────────────│
  │                           │                              │
  │  200 OK (call accepted)   │                              │
  │ ←─────────────────────────│                              │
  │                           │                              │
  │  ACK                      │                              │
  │ ─────────────────────────→│                              │
  │                           │                              │
  │  ══════ RTP AUDIO STREAM (direct between endpoints) ═════│
  │                           │                              │
  │  BYE (hang up)            │                              │
  │ ─────────────────────────→│  BYE                         │
  │                           │ ─────────────────────────────→│
  │  200 OK                   │  200 OK                      │
  │ ←─────────────────────────│←─────────────────────────────│
```

---

## 3. Call Routing System Design

```
INCOMING CALL to Superfone number
        │
        ▼
┌───────────────────┐
│  IVR / Greeting   │  "Press 1 for Sales, 2 for Support"
└───────┬───────────┘
        │
        ▼
┌───────────────────┐     ┌──────────────────┐
│  Route Decision   │────→│  Business Rules  │
│                   │     │  • Time of day   │
│  Check:           │     │  • Agent avail.  │
│  1. Business hours│     │  • Call history  │
│  2. AI or Human?  │     │  • Customer tier │
│  3. Queue status  │     └──────────────────┘
└───────┬───────────┘
        │
   ┌────┴────┐
   ▼         ▼
┌──────┐  ┌──────┐
│  AI  │  │Human │
│Agent │  │Agent │
└──┬───┘  └──┬───┘
   │         │
   ▼         ▼
┌──────────────────┐
│  Call Recording   │
│  Transcription    │
│  CRM Update       │
│  WhatsApp Followup│
└──────────────────┘
```

### 💻 Call Router Implementation

```javascript
// src/services/call-router.js
class CallRouter {
  constructor(businessConfig, agentService, aiService) {
    this.config = businessConfig;
    this.agents = agentService;
    this.ai = aiService;
  }

  async route(incomingCall) {
    const { businessId, callerPhone, calledNumber } = incomingCall;

    // 1. Get business configuration
    const business = await this.config.get(businessId);

    // 2. Check business hours
    if (!this.isBusinessHours(business)) {
      return {
        action: 'ai_agent',
        agentType: 'after_hours',
        greeting: business.afterHoursGreeting,
      };
    }

    // 3. Check if repeat caller (personalize experience)
    const callHistory = await this.getCallerHistory(callerPhone, businessId);
    if (callHistory.length > 0) {
      const lastAgent = callHistory[0].agentId;
      if (await this.agents.isAvailable(lastAgent)) {
        return { action: 'connect_agent', agentId: lastAgent, reason: 'returning_caller' };
      }
    }

    // 4. AI-first routing (Superfone's core value prop)
    if (business.aiEnabled) {
      return {
        action: 'ai_agent',
        agentType: business.defaultAIAgent,  // 'receptionist' | 'sales' | 'support'
        context: { callerHistory: callHistory, businessInfo: business },
      };
    }

    // 5. Fallback: route to available human agent
    const agent = await this.agents.findAvailable(businessId);
    if (agent) {
      return { action: 'connect_agent', agentId: agent.id };
    }

    // 6. No one available: voicemail or queue
    return { action: 'voicemail', greeting: business.voicemailGreeting };
  }

  isBusinessHours(business) {
    const now = new Date();
    const hour = now.getHours();
    return hour >= business.openHour && hour < business.closeHour;
  }
}
```

---

## 4. Call Recording & Transcription Pipeline

```
CALL ENDS
    │
    ▼
┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│ Recording    │────→│ Upload to    │────→│ Transcription│
│ (Raw Audio)  │     │ S3/Cloud     │     │ (Whisper/    │
│              │     │ Storage      │     │  Deepgram)   │
└──────────────┘     └──────────────┘     └──────┬───────┘
                                                  │
                     ┌────────────────────────────┤
                     │                            │
               ┌─────┴──────┐            ┌───────┴────────┐
               │ Sentiment  │            │ AI Summary     │
               │ Analysis   │            │ (GPT/Claude)   │
               └─────┬──────┘            └───────┬────────┘
                     │                            │
                     └────────────┬───────────────┘
                                  │
                           ┌──────┴───────┐
                           │ Store in DB  │
                           │ Update CRM   │
                           │ Notify team  │
                           └──────────────┘
```

```javascript
// src/services/call-processing.js
async function processCompletedCall(callId) {
  const call = await Call.findById(callId);

  // 1. Upload recording to S3
  const recordingUrl = await s3.upload({
    Bucket: 'superfone-recordings',
    Key: `${call.businessId}/${callId}.wav`,
    Body: call.recordingBuffer,
  }).promise();

  // 2. Transcribe (using Deepgram / Whisper API)
  const transcript = await transcriptionService.transcribe(recordingUrl);

  // 3. AI Summary
  const summary = await aiService.summarizeCall(transcript, {
    businessContext: call.businessId,
  });

  // 4. Sentiment analysis
  const sentiment = await aiService.analyzeSentiment(transcript);

  // 5. Update call record
  await Call.findByIdAndUpdate(callId, {
    recordingUrl,
    transcript,
    summary,
    sentiment,
    processedAt: new Date(),
  });

  // 6. Update CRM contact
  await CRM.updateContact(call.callerPhone, call.businessId, {
    lastCallDate: call.startedAt,
    lastCallSummary: summary,
    sentiment,
  });

  // 7. Send WhatsApp follow-up if configured
  if (call.business.autoFollowUp) {
    await whatsappQueue.add('send-followup', {
      phone: call.callerPhone,
      businessId: call.businessId,
      summary,
    }, { delay: 5 * 60 * 1000 }); // 5 min delay
  }
}
```

---

## 5. WebRTC (Browser-based Calling)

```
WebRTC allows voice/video calls DIRECTLY in the browser.
No plugins, no downloads.

SIGNALING (via WebSocket):
  Browser A                  Server              Browser B
     │  "I want to call B"     │                     │
     │ ────────────────────→   │  "A is calling you" │
     │                         │ ───────────────────→ │
     │                         │  "I accept"          │
     │  "B accepted"           │ ←─────────────────── │
     │ ←────────────────────   │                     │

MEDIA (direct P2P):
  Browser A ═══════ RTP Audio/Video ═══════ Browser B
                 (peer-to-peer, encrypted)

STUN/TURN servers help establish connection through firewalls/NAT.
```

---

## ⚡ Quick Revision

| Concept | What to Say in Interview |
|---------|------------------------|
| VoIP | Voice converted to IP packets; cheaper, scalable, programmable |
| SIP | Signaling protocol (setup/teardown calls); RTP carries actual audio |
| Call routing | Business rules engine: time, availability, AI-first, history-based |
| Recording pipeline | Record → S3 → Transcribe → AI Summary → CRM Update → WhatsApp |
| WebRTC | Browser-based real-time communication; P2P with signaling server |
| PSTN Gateway | Bridges traditional phone network to VoIP |
