# 09 — Git & DevOps (FAANG Interview Guide)

## 🎯 What They Ask
- Explain Git merge vs rebase. When to use which?
- What is a merge conflict and how do you resolve it?
- What is Docker? Containers vs VMs?
- Explain CI/CD pipeline.
- What are environment variables and why are they important?
- How do you deploy a Node.js app to production?

---

## 1. Git Workflow

### Branching Strategy

```
main (production)
  │
  ├── develop (integration)
  │     │
  │     ├── feature/login ──→ PR ──→ merge to develop
  │     ├── feature/cart  ──→ PR ──→ merge to develop
  │     │
  │     └── release/v1.2 ──→ testing ──→ merge to main + tag
  │
  └── hotfix/security-patch ──→ merge to main AND develop
```

### Essential Git Commands

```bash
# ─── DAILY WORKFLOW ───
git clone <url>                    # Clone repo
git checkout -b feature/login      # Create + switch to new branch
git add .                          # Stage all changes
git commit -m "feat: add login"    # Commit with message
git push origin feature/login      # Push branch to remote
# → Create Pull Request on GitHub

# ─── STAYING UPDATED ───
git fetch origin                   # Download remote changes (don't merge)
git pull origin main               # Fetch + merge main into current branch
git pull --rebase origin main      # Fetch + rebase (cleaner history)

# ─── UNDO MISTAKES ───
git stash                          # Save uncommitted changes temporarily
git stash pop                      # Restore stashed changes
git reset --soft HEAD~1            # Undo last commit (keep changes staged)
git reset --hard HEAD~1            # Undo last commit (DELETE changes!) ⚠️
git revert <commit-hash>           # Create new commit that undoes a commit (safe)

# ─── INSPECT ───
git log --oneline -10              # Last 10 commits (compact)
git diff                           # Show unstaged changes
git blame <file>                   # Who changed each line
git reflog                         # History of HEAD movements (recovery tool)
```

---

## 2. Merge vs Rebase

```
MERGE:                              REBASE:
main:    A──B──C──────M             main:    A──B──C
              \      /                              \
feature:       D──E─┘              feature:          D'──E'

Creates a merge commit (M)          Replays commits on top of main
Preserves full history              Linear history (cleaner)

✅ Safe, non-destructive            ✅ Clean, linear history
✅ Shows when branch was merged     ✅ Easier to read git log
❌ Messy history with many merges   ❌ Rewrites history (DON'T rebase shared branches!)
```

**Golden Rule:** Never rebase commits that have been pushed and shared with others.

```bash
# Merge workflow
git checkout main
git merge feature/login            # Creates merge commit

# Rebase workflow (for local feature branches)
git checkout feature/login
git rebase main                    # Replay my commits on top of latest main
git checkout main
git merge feature/login            # Fast-forward (no merge commit)
```

### Merge Conflict Resolution

```bash
git merge feature/cart
# CONFLICT in src/cart.js

# The file will contain:
<<<<<<< HEAD
  const tax = 0.08;          # Your version (main)
=======
  const tax = 0.10;          # Their version (feature/cart)
>>>>>>> feature/cart

# Fix: Choose one, or combine both, then:
git add src/cart.js
git commit -m "fix: resolve cart tax rate conflict"
```

---

## 3. Commit Message Convention

```
<type>(<scope>): <description>

Types:
  feat:     New feature
  fix:      Bug fix
  docs:     Documentation only
  style:    Formatting (no code change)
  refactor: Code change that neither fixes a bug nor adds a feature
  test:     Adding tests
  chore:    Build process, dependencies

Examples:
  feat(auth): add JWT refresh token endpoint
  fix(cart): resolve race condition in checkout
  docs(readme): update API documentation
  refactor(users): extract validation to middleware
```

---

## 4. Docker

### Containers vs VMs

```
VIRTUAL MACHINES:                    CONTAINERS:
┌────────┐ ┌────────┐               ┌────────┐ ┌────────┐
│  App A │ │  App B │               │  App A │ │  App B │
├────────┤ ├────────┤               ├────────┤ ├────────┤
│Guest OS│ │Guest OS│               │ Bins/  │ │ Bins/  │
│(Ubuntu)│ │(CentOS)│               │ Libs   │ │ Libs   │
├────────┴─┴────────┤               ├────────┴─┴────────┤
│    HYPERVISOR      │               │   DOCKER ENGINE    │
├────────────────────┤               ├────────────────────┤
│     HOST OS        │               │     HOST OS        │
├────────────────────┤               ├────────────────────┤
│    HARDWARE        │               │    HARDWARE        │
└────────────────────┘               └────────────────────┘

Heavy (GB each)                      Light (MB each)
Slow boot (minutes)                  Fast boot (seconds)
Full OS isolation                    Process-level isolation
```

### Dockerfile

```dockerfile
# ─── Dockerfile for Node.js app ───

# 1. Base image
FROM node:18-alpine

# 2. Set working directory
WORKDIR /app

# 3. Copy package files first (for layer caching)
COPY package*.json ./

# 4. Install dependencies
RUN npm ci --only=production

# 5. Copy source code
COPY . .

# 6. Expose port
EXPOSE 3000

# 7. Health check
HEALTHCHECK --interval=30s --timeout=3s \
  CMD curl -f http://localhost:3000/health || exit 1

# 8. Start command
CMD ["node", "server.js"]
```

```bash
# Build and run
docker build -t myapp:1.0 .
docker run -d -p 3000:3000 --name myapp myapp:1.0

# Docker Compose (multi-container)
```

### Docker Compose

```yaml
# docker-compose.yml
version: '3.8'
services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - DB_HOST=mongo
      - REDIS_HOST=redis
    depends_on:
      - mongo
      - redis

  mongo:
    image: mongo:6
    ports:
      - "27017:27017"
    volumes:
      - mongo_data:/data/db

  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"

volumes:
  mongo_data:
```

```bash
docker-compose up -d       # Start all services
docker-compose down        # Stop all services
docker-compose logs -f app # Follow app logs
```

---

## 5. CI/CD Pipeline

```
DEVELOPER                  CI/CD PIPELINE                    PRODUCTION
                    
git push ──→ ┌──────────────────────────────────────┐
             │ 1. BUILD                              │
             │    npm install                        │
             │    npm run build                      │
             ├───────────────────────────────────────┤
             │ 2. TEST                               │
             │    npm run test                       │
             │    npm run lint                       │
             │    Code coverage check (>80%)         │
             ├───────────────────────────────────────┤
             │ 3. SECURITY SCAN                      │
             │    npm audit                          │
             │    Docker image scan                  │
             ├───────────────────────────────────────┤
             │ 4. BUILD DOCKER IMAGE                 │
             │    docker build -t app:v1.2 .         │
             │    docker push registry/app:v1.2      │
             ├───────────────────────────────────────┤  ──→  ┌──────────┐
             │ 5. DEPLOY                             │       │Production│
             │    Deploy to staging → smoke tests    │       │ Server   │
             │    Deploy to production (blue/green)  │       └──────────┘
             └──────────────────────────────────────┘
```

### GitHub Actions Example

```yaml
# .github/workflows/ci.yml
name: CI/CD Pipeline

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm ci
      - run: npm test
      - run: npm run lint

  deploy:
    needs: test
    if: github.ref == 'refs/heads/main'
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Deploy to production
        run: |
          docker build -t myapp .
          # Push to registry and deploy
```

---

## 6. Environment Variables

```bash
# .env file (NEVER commit to git!)
NODE_ENV=production
PORT=3000
DATABASE_URL=mongodb://localhost:27017/myapp
JWT_SECRET=super-secret-key-change-in-prod
REDIS_URL=redis://localhost:6379
AWS_ACCESS_KEY=AKIA...
```

```javascript
// Load in Node.js
require('dotenv').config();

const dbUrl = process.env.DATABASE_URL;
const port = process.env.PORT || 3000;
```

```gitignore
# .gitignore — ALWAYS include
.env
.env.local
.env.production
node_modules/
```

---

## ⚡ Quick Revision

| Concept | One-liner |
|---------|-----------|
| Merge vs Rebase | Merge = safe, preserves history; Rebase = clean linear history, don't use on shared branches |
| `git reset --soft` | Undo commit, keep changes staged |
| `git revert` | Create new commit that undoes previous (safe for shared branches) |
| `git stash` | Temporarily save uncommitted changes |
| Docker | Lightweight containers sharing host OS kernel; Dockerfile defines image |
| Docker Compose | Multi-container orchestration; define services in YAML |
| Container vs VM | Container = process isolation (MB, seconds); VM = full OS (GB, minutes) |
| CI/CD | Automate: build → test → deploy on every push |
| `.env` | Store secrets/config; NEVER commit; use dotenv to load |
| Blue/Green deploy | Run old + new version; switch traffic; instant rollback |
