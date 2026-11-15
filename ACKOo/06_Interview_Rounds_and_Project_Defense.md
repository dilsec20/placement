# 🎯 Stage 6 — Technical Interview Mastery & Project Defense

> **Target Rounds:** Technical Interview Round 1 & Round 2 (November 19, 2026)  
> **Duration:** 45–60 Minutes each | **Format:** 1-on-1 Deep Technical Panel  
> **Bar for ₹19.8 LPA:** The interviewers are experienced Platform / DevEx engineers. They want to see **clear engineering thought processes, software craft, humble curiosity, and systems thinking**.

---

## 📋 The 2 Technical Rounds Breakdown

### Round 1: Coding, OOP & Project Architecture (45–60 mins)
* **Part 1 (15–20 mins):** Project Deep Dive — Architecture, trade-offs, bottlenecks, security.
* **Part 2 (20–25 mins):** Live DSA / Problem Solving (Think aloud, optimize from brute force to $O(N)$).
* **Part 3 (15 mins):** Machine Coding / OOP Design check (Classes, interfaces, design patterns).

### Round 2: Platform Engineering, Linux, Networks & SRE (45–60 mins)
* **Part 1 (20 mins):** Linux internals, system calls (`strace`, `lsof`), process states, signals (`SIGTERM` vs `SIGKILL`).
* **Part 2 (20 mins):** Networking & Distributed Systems (TCP handshake, HTTP/2 vs HTTP/3, DNS, Load balancers, Caching).
* **Part 3 (15 mins):** SRE & Resilience Mindset (SLOs, Circuit Breakers, Retries with Jitter, Incident Triage).

---

# 🚀 Defending Your Projects under a Platform Engineering Lens

If you present a project like **AceCoder** (a full-stack online code execution engine / platform):

### 1. The Architectural Flow (Explain this in 60 seconds)
```
[User Browser]
      │ (Monaco Editor code payload)
      ▼
[API Gateway / Backend Service]
      │ 1. Validate payload length & language ID
      │ 2. Authenticate user & check rate-limit (Redis Token Bucket)
      ▼
[Task Queue: RabbitMQ / Kafka] ──► Decouples burst traffic from sandbox execution
      │
      ▼
[Execution Worker Pool (Isolated Docker / Piston Sandbox)]
      │ 1. Write code to transient tmpfs ramdisk
      │ 2. Execute with Linux cgroups (limit: 256MB RAM, 1 CPU core)
      │ 3. Enforce timeout using alarm(2) / SIGKILL after 2.0s
      │ 4. Filter forbidden syscalls via seccomp profile
      ▼
[Capture stdout / stderr / exitCode] ──► Push response via WebSocket / REST
```

---

### 2. High-Yield Project Cross-Examination Questions & Answers

#### Q: "How do you prevent malicious user submissions from compromising the host server (e.g. `rm -rf /` or fork bombs `:(){ :|:& };:`)?"
* **High-Scoring Response:**
  "We implement multi-layered defense-in-depth:
  1. **Linux Namespaces:** The execution runs inside ephemeral, unprivileged Docker containers isolating the PID, Network, Mount, and IPC namespaces. The root filesystem is mounted strictly read-only (`--read-only`), with only a small `/tmp` directory mounted as `tmpfs` in RAM.
  2. **cgroups (Control Groups):** We enforce strict resource quotas to prevent denial-of-service: `pids.max = 64` (completely neutralizing fork bombs), `memory.max = 256M`, and `cpu.max = 100000 100000` (1 core limit).
  3. **seccomp (Secure Computing Mode):** We block dangerous system calls like `ptrace`, `clone` without restricted flags, `mount`, and socket creation if networking is disabled."

#### Q: "How would you scale this system from 100 concurrent executions to 10,000 concurrent executions during a college contest?"
* **High-Scoring Response:**
  "1. **Decouple via Message Queues:** Rather than synchronous HTTP threads blocking on compilation, incoming submissions are queued into an asynchronous message broker (RabbitMQ/Kafka) partitioned by language.
  2. **Stateless Autoscaling Workers:** Execution workers run as Kubernetes pods auto-scaled horizontally by **KEDA (Kubernetes Event-driven Autoscaling)** based on queue depth.
  3. **Compilation Caching:** For static libraries or identical boilerplate code, we cache intermediate binary artifacts using content-addressable hashes in Redis.
  4. **Dedicated Hot-Warm Sandbox Pools:** We keep pre-warmed, idle container environments ready so execution starts in $<15\text{ ms}$ without Docker cold-start overhead."

---

# 💬 Real ACKO Technical Interview Questions & Answers

---

### Q1. "What happens when you type `https://acko.com/buy-policy` into your browser and press Enter?"
* **High-Scoring Response (Cover all layers end-to-end):**
  1. **URL Parsing & HSTS Check:** Browser parses protocol, domain, and path. Checks HSTS cache to enforce HTTPS.
  2. **DNS Resolution:** Browser checks its internal DNS cache $\to$ OS hosts file $\to$ local resolver $\to$ Root $\to$ TLD (`.com`) $\to$ ACKO Authoritative Name Server $\to$ returns server IP (e.g. AWS CloudFront / Route53).
  3. **TCP 3-Way Handshake:** Client sends `SYN`, Server replies `SYN-ACK`, Client responds `ACK`.
  4. **TLS 1.3 Handshake:** Client sends `ClientHello` with supported ciphers and Diffie-Hellman public key share. Server responds with `ServerHello`, certificate, and finished message (1-RTT negotiation; forward secrecy guaranteed).
  5. **HTTP Request & Routing:** Browser sends `GET /buy-policy HTTP/2`. The request hits an Anycast CDN / Ingress Controller (Envoy/Nginx), which terminates TLS and forwards traffic to the internal frontend pod.
  6. **Rendering:** Browser receives HTML, builds DOM tree, fetches CSS/JS, builds CSSOM, runs layout, and paints pixels to screen.

---

### Q2. "A microservice in production has a sudden spike in latency (p99 increased from 50ms to 2.5s). How do you debug it?"
* **High-Scoring Response:**
  "I approach production incidents using an inside-out isolation methodology:
  1. **Check Dashboards (Grafana):** Is the latency localized to a single endpoint or cluster-wide? Is it correlated with a new deployment, traffic volume spike, or elevated error rates (5xx)?
  2. **Inspect Distributed Traces (Jaeger / OpenTelemetry):** Look at the flame graph of a slow trace. Where is the time spent?
     * Is time spent inside the service CPU/Memory?
     * Or is the service waiting on an external downstream call (Database query, Redis cache, third-party API)?
  3. **Check Database Metrics:** Look for database connection pool exhaustion, slow queries missing indexes, or lock contention in `pg_stat_activity`.
  4. **Check Host Resources:** Run `top`, `vmstat`, and check JVM/runtime garbage collection pauses (Stop-the-World GC pauses frequently cause p99 latency spikes).
  5. **Mitigation First:** If a recent deployment caused it, immediately roll back. If traffic spiked, scale replicas. Investigate root cause after stabilizing production."

---

### Q3. "Why would a platform team choose to build a CLI tool in Go or Python rather than Bash?"
* **High-Scoring Response:**
  "While Bash is great for simple 10-line sequential commands, it quickly becomes unmaintainable for production platform tooling:
  1. **Structured Error Handling:** Bash lacks structured exceptions and robust data types; error handling is reliant on exit codes and `set -e`.
  2. **Unit Testing:** Python (`pytest`) and Go have first-class, mature unit testing and mocking frameworks.
  3. **Portability & Distribution:** Go compiles into a single statically linked binary with zero runtime dependencies, making it trivial to run across macOS, Linux, and Windows without worrying about installed bash versions (`gnu-sed` vs `bsd-sed`).
  4. **Rich Ecosystem:** Go and Python have native SDKs for Docker, Kubernetes (`client-go`), AWS, and GitHub APIs."

---

# 🤝 Behavioral & ACKO Engineering Culture Questions

ACKO's culture values: **High Ownership, Curiosity, Bias for Action, and Zero Ego.**

---

### Q1. "Tell me about a time you broke something or encountered a major failure. How did you handle it?"
* **Situation:** During an update to my college portal, a change in an API route caused image uploads to fail silently.
* **Task:** Fix the issue without impacting users participating in an active photo submission contest.
* **Action:** I immediately owned the issue in our team chat rather than hiding it. I checked the server error logs, identified that an updated directory path was missing write permissions for the web server user, updated the `chmod` permissions, and pushed a patch within 15 minutes.
* **Result & Learning:** Once resolved, I wrote a post-mortem and created an automated pre-deployment smoke test script that verifies upload endpoints before every build.

---

### Q2. "Our JD mentions: 'When you do something twice by hand, you want to automate it.' Give an example of something you automated."
* **High-Scoring Response:**
  "In my development workflow, whenever we updated our database schema, teammates had to manually export SQL dumps, check for syntax errors, and notify each other on Slack. I wrote a simple Python CLI script integrated with Git pre-push hooks that automatically ran migrations in a local ephemeral Docker container, validated schema consistency, and generated mock test data. This saved each team member about 20 minutes daily and eliminated manual migration discrepancies."

---

### Q3. "Why do you want to join ACKO specifically?"
* **High-Scoring Response:**
  "Three main reasons:
  1. **The Platform is the Business:** In traditional companies, infrastructure is treated as an overhead cost. At ACKO, as a digital-first insurer, platform reliability and speed directly drive revenue and customer trust.
  2. **Developer Experience & AI-Native Tooling:** The role summary describes writing software that empowers both engineers and AI agents to ship code safely. Working on developer tooling and CI checks means my customers are fellow engineers, which accelerates technical growth.
  3. **High Ownership:** The emphasis on taking features from design to production and owning them live aligns with how I like to build software."

---

## ❓ 3 High-Impact Questions to Ask the Interviewer

When they ask *"Do you have any questions for us?"*:
1. *"How is the ACKO platform team currently structuring developer tooling to integrate AI coding agents safely into production CI/CD pipelines?"*
2. *"What has been the most interesting production resilience or scaling challenge the platform team encountered during high-traffic events like marketing launches or tax season?"*
3. *"For an intern starting on the DevEx / Platform team, what does a successful first milestone look like in the first 60 days?"*

---

> **Ready to Conquer!** You now have the complete end-to-end toolkit across all stages. Review your cheat sheets and give this drive your absolute best shot!
