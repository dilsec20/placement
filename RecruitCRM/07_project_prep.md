# Project Deep-Dive — Interview Preparation (Recruit CRM)

> 🎯 **This is your biggest differentiator!** Interviewers at Recruit CRM will pick projects from your resume and ask deep technical questions. Prepare to explain architecture, design choices, and optimizations.

---

## 🔗 Project 1: TinyLink — URL Shortener

### Quick Overview
| Detail | Value |
| :--- | :--- |
| **Tech Stack** | Java, Spring Boot, Maven, REST APIs, H2 Database, Docker |
| **GitHub** | [Link](https://github.com/dilsec20/) |
| **Key Features** | URL shortening, Base62 encoding, HTTP 302 redirects |

---

### Architecture Diagram (Draw this on whiteboard!)

```
Client (Browser/Postman)
        │
        │ POST /shorten  { "url": "https://example.com" }
        │ GET  /redirect/{code}
        ▼
┌─────────────────────────────────────┐
│          UrlController              │  @RestController
│  ┌──────────────────────────────┐   │
│  │ POST /shorten                │   │  → Receives URL, returns short code
│  │ GET  /redirect/{code}        │   │  → Returns HTTP 302 redirect
│  └──────────────┬───────────────┘   │
└─────────────────┼───────────────────┘
                  │
                  ▼
┌─────────────────────────────────────┐
│          UrlService                 │  @Service
│  ┌──────────────────────────────┐   │
│  │ shortenUrl(originalUrl)      │   │  → Validate URL
│  │ getOriginalUrl(shortCode)    │   │  → Generate ID (AtomicLong)
│  │ base62Encode(id)             │   │  → Base62 encode → short code
│  └──────────────┬───────────────┘   │
└─────────────────┼───────────────────┘
                  │
                  ▼
┌─────────────────────────────────────┐
│          UrlRepository              │  @Repository (JPA)
│  ┌──────────────────────────────┐   │
│  │ save(UrlEntity)              │   │  → CRUD on H2 database
│  │ findByShortCode(code)        │   │
│  └──────────────┬───────────────┘   │
└─────────────────┼───────────────────┘
                  │
                  ▼
┌─────────────────────────────────────┐
│          H2 Database (In-Memory)    │
│  ┌──────────────────────────────┐   │
│  │ id | original_url | short_code│  │
│  │ 1  | https://ex.. | b        │  │
│  │ 2  | https://go.. | c        │  │
│  └──────────────────────────────┘   │
└─────────────────────────────────────┘
```

---

### Frequently Asked Questions

**Q1: "How does the URL shortening work?"**

> We use **Base62 encoding** on auto-incrementing IDs.
> 1. Each new URL gets a unique numeric ID from `AtomicLong.incrementAndGet()`
> 2. The ID is converted to a Base62 string using chars `[a-zA-Z0-9]`
> 3. Example: ID `1` → `"b"`, ID `62` → `"ba"`, ID `3844` → `"baa"`
> 4. This guarantees **collision-free** short URLs because IDs are unique

**Q2: "Why Base62 and not Base64?"**

> Base64 includes `+`, `/`, `=` which are NOT URL-safe and need encoding.
> Base62 uses only `[a-zA-Z0-9]` — all URL-safe characters.

**Q3: "How did you ensure thread safety?"**

> Used `AtomicLong` which uses **Compare-And-Swap (CAS)** operations.
> CAS is a lock-free, thread-safe approach — no `synchronized` blocks needed.
> Multiple threads can simultaneously request IDs without conflicts.

**Q4: "Why HTTP 302 and not 301?"**

> - **301 (Moved Permanently)**: Browser caches the redirect. Future requests won't hit our server → we lose analytics/tracking.
> - **302 (Found/Temporary)**: Browser always hits our server first → we can track clicks, update URLs, or disable links.

**Q5: "How did you apply SOLID principles?"**

> - **SRP**: Controller handles HTTP only, Service handles business logic only, Repository handles data only
> - **DIP**: Controller depends on `UrlService` interface, not the concrete implementation. Spring DI injects the implementation.
> - This makes the code testable — we can mock `UrlService` in unit tests.

**Q6: "What would you change to make it production-ready?"**

> 1. Replace H2 (in-memory) with **PostgreSQL/MySQL** for persistence
> 2. Add **Redis cache** for frequently accessed URLs (O(1) lookup)
> 3. Add **rate limiting** to prevent abuse
> 4. Add **URL validation** (check if URL is reachable)
> 5. Add **expiry** — short URLs expire after a configurable period
> 6. Use **distributed ID generation** (Snowflake/UUID) for multi-server deployment

**Q7: "How would you handle 1 million requests per second?"**

> 1. **Load Balancer** → distribute across multiple servers
> 2. **Redis Cache** → cache hot URLs (99% reads, 1% writes)
> 3. **Database Sharding** → partition data by hash of short code
> 4. **CDN** → for static redirects
> 5. **Async Processing** → queue writes, serve reads from cache

---

## 🗣️ Project 2: SpeakUp — English Communication Coach

### Quick Overview
| Detail | Value |
| :--- | :--- |
| **Tech Stack** | HTML, CSS, JavaScript, Gemini AI API, Web Speech API, Chart.js |
| **Type** | Progressive Web App (PWA) |
| **Key Features** | AI mock interviews, Speech analytics, Progress tracking |

---

### Architecture Diagram

```
┌───────────────────────────────────────────────────┐
│                   Browser (PWA)                    │
│                                                    │
│  ┌──────────┐  ┌──────────┐  ┌──────────────────┐ │
│  │ Roadmap  │  │ AI Mock  │  │ Speech Analytics │ │
│  │ Module   │  │ Interview│  │ Module           │ │
│  │          │  │          │  │                  │ │
│  │ XP, Streaks│ │ Gemini API│ │ Web Speech API  │ │
│  │ Progress │  │ CV-based │  │ WPM, Fillers    │ │
│  └──────────┘  └──────────┘  └──────────────────┘ │
│                                                    │
│  ┌──────────────────────────────────────────────┐  │
│  │              Local Storage / IndexedDB        │  │
│  │        (Progress, Streaks, Achievements)      │  │
│  └──────────────────────────────────────────────┘  │
└───────────────────────────────────────────────────┘
         │                        │
         ▼                        ▼
   Google Gemini API         Web Speech API
   (AI Interview)            (Speech Recognition)
```

---

### Frequently Asked Questions

**Q1: "What makes this a PWA?"**

> - **Service Worker** for offline caching
> - **Web App Manifest** for installability (add to home screen)
> - **Responsive design** — works on mobile and desktop
> - Works offline for roadmap content; AI features need internet

**Q2: "How does the AI interview simulator work?"**

> 1. User uploads their CV
> 2. We send CV content to **Google Gemini AI API** with a system prompt
> 3. Gemini acts as an interviewer — asks questions based on CV projects, DSA topics, CS fundamentals
> 4. User speaks their answer (Web Speech API converts speech → text)
> 5. Answer text is sent to Gemini for evaluation
> 6. Gemini provides feedback: score, areas of improvement, better answers

**Q3: "How does speech analytics work?"**

> - **Web Speech API** (SpeechRecognition) converts speech to text in real-time
> - We calculate: WPM (words per minute), filler word count ("um", "uh", "like"), pause duration
> - **Chart.js** visualizes these metrics over time
> - Users can track improvement across practice sessions

**Q4: "What was the biggest challenge?"**

> Handling speech recognition accuracy across different accents and environments.
> Solution: Added a confidence threshold — only process results above 70% confidence.
> Also added manual correction option for misrecognized words.

---

## 💻 Project 3: AceCoder — Placement Prep Platform

### Quick Overview
| Detail | Value |
| :--- | :--- |
| **Tech Stack** | Node.js, Express.js, PostgreSQL, REST APIs, JWT |
| **Users** | 200+ active users across 5+ countries |
| **Live** | [acecoder.site](https://acecoder.site) |
| **Key Features** | Problem bank, Code execution (C++), Contests, User profiles |

---

### Architecture Diagram

```
┌──────────────────┐         ┌─────────────────────────────────────┐
│   Frontend       │  HTTP   │         Backend (Node.js)           │
│   (Client)       │────────►│                                     │
│                  │         │  ┌────────────────────────────────┐  │
│                  │         │  │     Express.js Router           │  │
│                  │         │  │  /api/users                     │  │
│                  │         │  │  /api/problems                  │  │
│                  │         │  │  /api/submissions               │  │
│                  │         │  │  /api/contests                  │  │
│                  │         │  └────────┬───────────────────────┘  │
│                  │         │           │                          │
│                  │         │  ┌────────▼───────────────────────┐  │
│                  │         │  │     Middleware                  │  │
│                  │         │  │  JWT Auth │ Error Handler       │  │
│                  │         │  └────────┬───────────────────────┘  │
│                  │         │           │                          │
│                  │         │  ┌────────▼───────────────────────┐  │
│                  │         │  │     Controllers                 │  │
│                  │         │  │  UserController                 │  │
│                  │         │  │  ProblemController              │  │
│                  │         │  │  SubmissionController           │  │
│                  │         │  └────────┬───────────────────────┘  │
│                  │         │           │                          │
│                  │         │  ┌────────▼───────────────────────┐  │
│                  │         │  │     PostgreSQL (Managed)        │  │
│                  │         │  │  users, problems, submissions   │  │
│                  │         │  └────────────────────────────────┘  │
│                  │         └─────────────────────────────────────┘
└──────────────────┘                    │
                                        │ API Call
                                        ▼
                              ┌──────────────────────┐
                              │  External Code       │
                              │  Execution API       │
                              │  (C++ compilation)   │
                              └──────────────────────┘
```

---

### Frequently Asked Questions

**Q1: "How does the code execution work?"**

> We integrate with an **external code execution API** (like Judge0).
> 1. User writes code and submits
> 2. Our backend sends code + test cases to the execution API
> 3. Execution API compiles and runs in a **sandboxed environment** (Docker container)
> 4. Returns output: status (Accepted/WA/TLE/RE), output, execution time, memory used
> 5. We store the result in our PostgreSQL database

**Q2: "How does JWT authentication work?"**

> 1. User registers/logs in → server creates a JWT token containing `{ userId, role, exp }`
> 2. Token is signed with a secret key using HMAC-SHA256
> 3. Client stores token in localStorage/cookie
> 4. Every request includes token in `Authorization: Bearer <token>` header
> 5. Server middleware verifies token signature and expiry before processing

```javascript
// Token creation
const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '7d' });

// Token verification middleware
const decoded = jwt.verify(token, process.env.JWT_SECRET);
```

**Q3: "How did you handle 200+ concurrent users?"**

> 1. **Connection Pooling** → Reuse PostgreSQL connections instead of creating new ones
> 2. **Indexed queries** → Added indexes on frequently queried columns (user_id, problem_id)
> 3. **Pagination** → `/api/problems?page=1&limit=20` instead of fetching all
> 4. **Deployed on Render** → Managed infrastructure with auto-scaling
> 5. **Stateless architecture** → JWT means no server-side session storage

**Q4: "What would you improve?"**

> 1. Add **Redis caching** for problem data (rarely changes)
> 2. Add **WebSocket** for real-time contest leaderboards
> 3. Support more languages beyond C++
> 4. Add **rate limiting** to prevent API abuse
> 5. Implement **horizontal scaling** with load balancer

---

## 🎯 General Project Discussion Tips

### The STAR Method for Behavioral Project Questions

| Step | Meaning | Example |
| :--- | :--- | :--- |
| **S**ituation | Context/Background | "During my AceCoder project, we had 200+ users..." |
| **T**ask | What needed to be done | "I needed to optimize database queries that were timing out..." |
| **A**ction | What YOU did specifically | "I analyzed slow queries, added indexes, implemented pagination..." |
| **R**esult | Measurable outcome | "Query response time reduced from 2s to 50ms, supporting 3x more users" |

### Questions to Prepare For

- [ ] "Pick any project and explain its architecture"
- [ ] "What was the most challenging part? How did you solve it?"
- [ ] "If you had to redesign this from scratch, what would you change?"
- [ ] "How would you scale this to 1 million users?"
- [ ] "What design patterns did you use and why?"
- [ ] "How did you test your application?"
- [ ] "Walk me through a typical request-response cycle"
- [ ] "What did you learn from building this project?"
- [ ] "Why did you choose this tech stack over alternatives?"

### Tech Stack Justification Cheat Sheet

| Choice | Why |
| :--- | :--- |
| **Spring Boot** (TinyLink) | Java ecosystem, auto-config, embedded server, production-ready |
| **H2 Database** (TinyLink) | In-memory for demo/testing, zero setup, JPA compatible |
| **Node.js** (AceCoder) | Non-blocking I/O, great for API servers, JavaScript full-stack |
| **PostgreSQL** (AceCoder) | Relational data, complex queries, ACID compliance, scalable |
| **JWT** (AceCoder) | Stateless auth, works with REST, scalable across servers |
| **Docker** (TinyLink) | Consistent environments, easy deployment, portability |
| **Gemini AI** (SpeakUp) | Free tier available, strong language understanding, context-aware |
