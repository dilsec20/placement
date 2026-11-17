# 🛡️ Stage 4 — Platform Engineering, SRE & Developer Operations (DevEx)

> **Focus Roles:**  
> • Software Engineering Intern – Developer Operations & Experience (DevEx)  
> • Engineering Intern – SR&I Engineering (Platform & Infrastructure)  
> **Target Round:** Technical Interview Round 2  
> **Mindset:** "Automate instead of repeating. Measure before optimizing. Design for failure."

---

## 📋 The DevEx & Platform Ecosystem at ACKO

```
[Developer Desktop] ──► Git Push ──► [GitHub Actions CI Pipeline]
                                            │
                             ┌──────────────┴──────────────┐
                             ▼                             ▼
                    [Lint & Security Scan]        [Multi-Stage Docker Build]
                             │                             │
                             └──────────────┬──────────────┘
                                            ▼
                               [Container Registry (ECR/GCR)]
                                            │
                                            ▼
                            [Kubernetes Cluster (EKS/GKE)]
                   ┌────────────────────────┼────────────────────────┐
                   ▼                        ▼                        ▼
           [Pod Replicas]          [Ingress Controller]      [Prometheus / Grafana]
        (Auto-scaled by HPA)      (TLS, Route53, Envoy)    (Metrics, SLIs, Alerts)
```

---

# 🐧 Part 1: Linux Command Line & Process Diagnostics (Must-Know)

In interview scenarios, you will be given production incidents like: *"A service port 8080 is unresponsive and CPU is pegged at 100%. Walk me through your command-line investigation step by step."*

### 1. The Incident Response Triage Sequence
1. **Identify the Process:**
   ```bash
   # Check who is listening on port 8080
   lsof -i :8080
   # OR
   ss -tulpn | grep 8080

   # Find top CPU/Memory consumers
   top -b -n 1 | head -n 20
   # OR
   ps aux --sort=-%cpu | head -n 10
   ```

2. **Inspect Process Metadata in `/proc`:**
   ```bash
   # View process environment, working directory, and file descriptors
   ls -l /proc/<PID>/fd
   cat /proc/<PID>/status | grep -E "VmSize|VmRSS|Threads"
   cat /proc/<PID>/cmdline
   ```

3. **Trace Live System Calls with `strace`:**
   ```bash
   # Attach to running process to see what system call it is stuck on (e.g. read/poll/epoll)
   strace -p <PID> -f -s 100
   ```

4. **Network Connectivity & Latency:**
   ```bash
   # Measure TCP handshake latency
   curl -w "@curl-format.txt" -o /dev/null -s "http://localhost:8080/health"
   # Verify DNS resolution steps
   dig +trace api.acko.com
   ```

---

### 2. Unix Signals: `SIGTERM` vs. `SIGKILL` vs. `SIGINT`

| Signal | Number | Can be Caught/Handled? | Proper Use Case in Platform / Kubernetes |
|---|:---:|:---:|---|
| **`SIGINT`** | 2 | ✅ Yes | Terminal interrupt (`Ctrl + C`). |
| **`SIGTERM`** | 15 | ✅ Yes | **Graceful Shutdown:** Sent by Kubernetes before pod termination. The app should stop accepting new connections, finish in-flight requests, flush buffers, and exit cleanly within `terminationGracePeriodSeconds` (default 30s). |
| **`SIGKILL`** | 9 | ❌ **No** | **Forced Termination:** Kernel immediately destroys the process. In-flight transactions are aborted; memory is freed instantly. Used only when `SIGTERM` times out. |

---

# 🐙 Part 2: Git Internals & Collaborative Workflows

### 1. `git merge` vs. `git rebase`
* **`git merge`:** Creates a non-destructive merge commit with two parent commits.
  * *Advantage:* Preserves exact historical chronology.
  * *Disadvantage:* Generates cluttered commit graphs in large teams.
* **`git rebase`:** Moves the feature branch base to the tip of main by replaying commits sequentially.
  * *Advantage:* Produces a clean, linear commit history.
  * *Golden Rule:* **Never rebase a shared public branch** (rewrites commit hashes and breaks teammates' working copies).

### 2. Git Hooks for Platform Quality (`.git/hooks/pre-commit`)
A script that executes before a commit is recorded. If it exits with non-zero status, the commit is aborted.
```bash
#!/bin/bash
# .git/hooks/pre-commit: Block accidental AWS credentials or private keys
if grep -rE "AKIA[0-9A-Z]{16}" .; then
    echo "🚨 ERROR: Hardcoded AWS Access Key detected! Commit rejected."
    exit 1
fi
exit 0
```

---

# 🐳 Part 3: Docker & Multi-Stage Production Builds

### Why Amateur Dockerfiles are Rejected:
* Single-stage builds carry build tools (compilers, npm, maven, JDK) into production images, ballooning image sizes to $>1\text{ GB}$ and expanding attack surfaces.
* Running containers as `root` grants full kernel privileges if container escape vulnerabilities exist.

### ACKO Production Multi-Stage Dockerfile (Go / C++ / Python Example)
```dockerfile
# -------------------------------------------------------------
# STAGE 1: Build Environment
# -------------------------------------------------------------
FROM golang:1.21-alpine AS builder

WORKDIR /app

# Cache dependencies layer
COPY go.mod go.sum ./
RUN go mod download

COPY . .

# Compile statically linked binary without debug symbols
RUN CGO_ENABLED=0 GOOS=linux go build -ldflags="-w -s" -o /app/acko-service .

# -------------------------------------------------------------
# STAGE 2: Distroless Minimal Production Image
# -------------------------------------------------------------
FROM alpine:3.18

# Security: Create non-root user and group
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

WORKDIR /home/appuser

# Copy ONLY the compiled binary from builder stage
COPY --from=builder /app/acko-service /home/appuser/acko-service

# Switch to non-root user
USER appuser

EXPOSE 8080

# Healthcheck configuration
HEALTHCHECK --interval=30s --timeout=3s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:8080/health || exit 1

ENTRYPOINT ["./acko-service"]
```
* **Result:** Image size reduced from $850\text{ MB} \to 18\text{ MB}$; zero compiler tools in production; non-root execution.

---

# ☸️ Part 4: Kubernetes (K8s) Architecture & Core Concepts

### 1. Control Plane vs. Worker Node Components

| Component | Location | Role & Responsibility |
|---|---|---|
| **`kube-apiserver`** | Control Plane | Central hub; exposes the REST API; validates and configures data for pods, services, etc. |
| **`etcd`** | Control Plane | Consistent, highly available distributed key-value store using the **Raft consensus algorithm**. Stores the entire cluster state. |
| **`kube-scheduler`** | Control Plane | Watches for newly created pods with no assigned node and selects the optimal node based on resource requests (CPU/RAM) and constraints. |
| **`kube-controller-manager`** | Control Plane | Runs controller loops (DeploymentController, NodeController) to reconcile current state with desired state. |
| **`kubelet`** | Worker Node | Primary agent running on each node. Ensures containers described in PodSpecs are running and healthy. |
| **`kube-proxy`** | Worker Node | Maintains network rules on nodes; translates Service IP/port into Pod IPs using `iptables` or `IPVS`. |

---

### 2. Kubernetes Service Types
* **`ClusterIP` (Default):** Exposes service on an internal cluster IP. Accessible ONLY from within the cluster.
* **`NodePort`:** Exposes service on each node’s IP at a static port ($30000–32767$).
* **`LoadBalancer`:** Provisions an external cloud load balancer (e.g. AWS NLB/ALB) routing directly to the service.

---

# 📈 Part 5: Site Reliability Engineering (SRE) & Resilience Patterns

---

### 1. The SRE Holy Trinity: SLA vs. SLO vs. SLI

| Term | Full Name | Definition | Example in ACKO Insurance |
|---|---|---|---|
| **SLI** | Service Level Indicator | The actual measurement of a service's performance. | *"Percentage of successful policy purchase API requests over the past 30 days."* ($99.95\%$) |
| **SLO** | Service Level Objective | The internal target set by the engineering team. | *"Policy purchase API must succeed $99.9\%$ of the time."* |
| **SLA** | Service Level Agreement | The contractual promise to customers with financial penalties. | *"If API uptime drops below $99.0\%$, customer receives a $10\%$ refund."* |
| **Error Budget** | $100\% - \text{SLO}$ | The allowable downtime/failures used for feature releases. | $0.1\%$ error budget per month ($\approx 43\text{ minutes}$). If exhausted, all feature releases freeze! |

---

### 2. The Circuit Breaker Pattern (State Machine)
Prevents cascading failures when a downstream third-party service (e.g., Payment Gateway or SMS vendor) is unresponsive.

```
                  ┌──────────────────────┐
                  │        CLOSED        │  (Normal Operation: Requests flow through)
                  └──────────────────────┘
                             │
                  Failure Rate > 50%
                             │
                             ▼
                  ┌──────────────────────┐
                  │         OPEN         │  (Tripped: Requests immediately fail fast
                  └──────────────────────┘   without calling downstream service)
                             │
                     Sleep Window (30s)
                             │
                             ▼
                  ┌──────────────────────┐
                  │      HALF-OPEN       │  (Trial: Allow 3 canary requests through)
                  └──────────────────────┘
                     │                │
            All 3 Succeed       Any Request Fails
                     │                │
                     ▼                ▼
                  [CLOSED]          [OPEN]
```

---

### 3. Exponential Backoff with Jitter (Preventing Thundering Herd)
When thousands of clients retry a failed server simultaneously, they create a **Thundering Herd** that crashes the recovering system. Adding randomized **Jitter** spreads the load evenly:

```cpp
#include <iostream>
#include <cmath>
#include <random>
#include <thread>
#include <chrono>

using namespace std;

// Calculates backoff duration with full jitter
int calculateBackoffWithJitter(int attempt, int baseDelayMs = 100, int maxDelayMs = 5000) {
    // Exponential formula: base * 2^attempt
    int exponentialDelay = min(maxDelayMs, baseDelayMs * (1 << attempt));
    
    // Full Jitter: Uniform random between 0 and exponentialDelay
    random_device rd;
    mt19937 gen(rd());
    uniform_int_distribution<> dis(0, exponentialDelay);
    
    return dis(gen);
}
```

---

### 4. Idempotency Keys in Payment & Claim Issuance
* **Problem:** A network timeout occurs after a user clicks *"Pay ₹5,000 Premium"*. The client retries. If non-idempotent, the customer is billed twice!
* **Solution:** 
  1. Client generates a unique UUID `Idempotency-Key: e82b-4fa...`.
  2. Server uses Redis `SET key value NX EX 120` (atomic insert with TTL).
  3. If key already exists in Redis, server returns the cached response of the initial request instead of processing the transaction again.

---

> **Next Step:** Master OS, Networks, DBMS, and System Design in [05_Core_CS_and_System_Design.md](./05_Core_CS_and_System_Design.md)!
