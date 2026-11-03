# 06 — AI/LLM Integration & RAG

> **JD Match:** "AI Agents" • "LLMs, AI-first frameworks" • "RAG or vector databases"

---

## 🎯 What Superfone Will Ask
- How would you build an AI receptionist that handles calls?
- What is RAG? When would you use it vs fine-tuning?
- How do you prevent AI hallucination in customer conversations?
- How do you handle latency with LLM APIs during live calls?
- What is a vector database and how does it work?

---

## 1. LLM Integration Architecture at Superfone

```
CUSTOMER SPEAKS → [Speech-to-Text] → TEXT
                                       │
                                       ▼
                            ┌─────────────────────┐
                            │   AI AGENT PIPELINE  │
                            │                     │
                            │  1. Retrieve context│──→ Vector DB
                            │     (RAG)           │    (business FAQ,
                            │                     │     product info,
                            │  2. Build prompt    │     call history)
                            │     (system +       │
                            │      context +      │
                            │      user message)  │
                            │                     │
                            │  3. LLM generates   │──→ OpenAI / Claude
                            │     response        │
                            │                     │
                            │  4. Safety check    │
                            │     (no halluc.)    │
                            └──────────┬──────────┘
                                       │
                                       ▼
                            [Text-to-Speech] → CUSTOMER HEARS
```

---

## 2. OpenAI API Integration

```javascript
// src/services/ai.service.js
const OpenAI = require('openai');

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

class AIService {
  // ─── Generate AI agent response for a call ───
  async generateCallResponse(businessContext, conversation, customerMessage) {
    const systemPrompt = this.buildSystemPrompt(businessContext);

    const messages = [
      { role: 'system', content: systemPrompt },
      ...conversation.map(msg => ({
        role: msg.from === 'customer' ? 'user' : 'assistant',
        content: msg.text,
      })),
      { role: 'user', content: customerMessage },
    ];

    const response = await openai.chat.completions.create({
      model: 'gpt-4',
      messages,
      temperature: 0.3,    // Low = more consistent, less creative
      max_tokens: 200,     // Keep responses concise for calls
      presence_penalty: 0.1,
    });

    return response.choices[0].message.content;
  }

  buildSystemPrompt(business) {
    return `You are an AI ${business.agentType} for ${business.name}.

ROLE: ${business.agentRole}
BUSINESS: ${business.description}
PRODUCTS/SERVICES: ${business.products}
OPERATING HOURS: ${business.hours}
LOCATION: ${business.address}

RULES:
- Be professional, friendly, and concise
- NEVER make up information you don't know
- If asked something outside your knowledge, say "Let me connect you with a team member"
- Always try to capture: name, contact number, reason for calling
- For pricing questions, quote only the prices listed above
- Do NOT discuss competitor products`;
  }

  // ─── Streaming response (for real-time calls) ───
  async streamCallResponse(businessContext, conversation, customerMessage, onChunk) {
    const systemPrompt = this.buildSystemPrompt(businessContext);

    const stream = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        { role: 'system', content: systemPrompt },
        ...conversation,
        { role: 'user', content: customerMessage },
      ],
      stream: true,       // Enable streaming!
      max_tokens: 200,
    });

    let fullResponse = '';
    for await (const chunk of stream) {
      const content = chunk.choices[0]?.delta?.content || '';
      fullResponse += content;
      onChunk(content);   // Send each chunk to TTS immediately
    }

    return fullResponse;
  }

  // ─── Summarize a completed call ───
  async summarizeCall(transcript) {
    const response = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        { role: 'system', content: `Summarize this business call in 2-3 bullet points.
Include: caller intent, key information shared, any action items.
Be concise and factual.` },
        { role: 'user', content: transcript },
      ],
      temperature: 0.1,
    });

    return response.choices[0].message.content;
  }
}

module.exports = new AIService();
```

---

## 3. RAG (Retrieval-Augmented Generation)

```
WHY RAG? LLMs don't know YOUR business data!

WITHOUT RAG:
  Customer: "What are your pricing plans?"
  AI: "I don't have that information." (or worse, hallucinated answer!)

WITH RAG:
  Customer: "What are your pricing plans?"
     │
     ▼
  1. Convert question to embedding vector
  2. Search vector DB for similar business docs
  3. Find: "Basic: ₹499/mo, Pro: ₹999/mo, Enterprise: ₹2499/mo"
  4. Feed retrieved context + question to LLM
  5. AI: "We have three plans: Basic at ₹499, Pro at ₹999, and Enterprise at ₹2499!"
     (Accurate, grounded in real data!)
```

### 💻 RAG Implementation

```javascript
const { OpenAI } = require('openai');
const { Pinecone } = require('@pinecone-database/pinecone');

const openai = new OpenAI();
const pinecone = new Pinecone({ apiKey: process.env.PINECONE_API_KEY });
const index = pinecone.index('superfone-knowledge');

// ─── Step 1: Ingest business documents into vector DB ───
async function ingestDocuments(businessId, documents) {
  for (const doc of documents) {
    // Split into chunks (LLMs have token limits)
    const chunks = splitText(doc.content, 500); // 500 chars per chunk

    for (let i = 0; i < chunks.length; i++) {
      // Convert text to embedding vector
      const embedding = await openai.embeddings.create({
        model: 'text-embedding-3-small',
        input: chunks[i],
      });

      // Store in vector DB
      await index.namespace(businessId).upsert([{
        id: `${doc.id}_chunk_${i}`,
        values: embedding.data[0].embedding,   // 1536-dim vector
        metadata: {
          text: chunks[i],
          source: doc.title,
          businessId,
        },
      }]);
    }
  }
}

// ─── Step 2: Query with RAG ───
async function ragQuery(businessId, question) {
  // 1. Embed the question
  const queryEmbedding = await openai.embeddings.create({
    model: 'text-embedding-3-small',
    input: question,
  });

  // 2. Search vector DB for similar chunks
  const results = await index.namespace(businessId).query({
    vector: queryEmbedding.data[0].embedding,
    topK: 5,               // Top 5 most relevant chunks
    includeMetadata: true,
  });

  // 3. Build context from retrieved documents
  const context = results.matches
    .map(m => m.metadata.text)
    .join('\n\n');

  // 4. Generate answer with context
  const response = await openai.chat.completions.create({
    model: 'gpt-4',
    messages: [
      {
        role: 'system',
        content: `Answer based ONLY on the following context. If the answer is not in the context, say "I don't have that information."

CONTEXT:
${context}`
      },
      { role: 'user', content: question },
    ],
    temperature: 0.1,   // Very low — stick to facts
  });

  return {
    answer: response.choices[0].message.content,
    sources: results.matches.map(m => m.metadata.source),
  };
}
```

---

## 4. Preventing Hallucination

```
TECHNIQUES:

1. GROUNDING: "Answer ONLY based on the provided context"
2. TEMPERATURE: Use 0.1-0.3 (less creative = less hallucination)
3. RAG: Feed real data as context instead of relying on LLM's training
4. GUARDRAILS: Post-process check — did response mention anything not in context?
5. FALLBACK: "I'm not sure, let me connect you with a team member"
6. STRUCTURED OUTPUT: Force JSON response with specific fields
```

```javascript
// Structured output to prevent hallucination
async function extractCallInfo(transcript) {
  const response = await openai.chat.completions.create({
    model: 'gpt-4',
    messages: [
      {
        role: 'system',
        content: `Extract structured information from this call transcript.
Return ONLY valid JSON. If a field is unknown, use null.`
      },
      { role: 'user', content: transcript },
    ],
    response_format: { type: 'json_object' },  // Force JSON output
    temperature: 0,
  });

  return JSON.parse(response.choices[0].message.content);
  // { callerName: "Raj", intent: "pricing inquiry", product: "Pro plan", followUp: true }
}
```

---

## 5. Handling LLM Latency in Live Calls

```
PROBLEM: GPT-4 takes 2-5 seconds. Users expect instant responses in calls!

SOLUTIONS:

1. STREAMING: Send partial response to TTS as it generates
   "The price..." → TTS plays "The price" → "...is ₹999" → TTS plays rest

2. FILLER RESPONSES: "Let me check that for you..." while AI processes

3. CACHING: Cache common questions/answers
   "What are your hours?" → cached answer (no LLM needed)

4. FASTER MODELS: Use GPT-3.5 for simple queries, GPT-4 for complex

5. PRECOMPUTE: Generate likely responses during ring time
```

---

## ⚡ Quick Revision

| Concept | What to Say |
|---------|-------------|
| RAG | Retrieve relevant docs → add as context → LLM generates grounded answer |
| Vector DB | Stores embeddings; semantic search using cosine similarity |
| Embedding | Text → high-dimensional number vector; similar text = close vectors |
| Hallucination | LLM invents facts; prevent with RAG + low temperature + guardrails |
| Streaming | Get LLM response word-by-word; essential for real-time call responses |
| Prompt engineering | System prompt defines agent persona, rules, and boundaries |
| Fine-tuning vs RAG | Fine-tune for style/format; RAG for dynamic, up-to-date knowledge |
