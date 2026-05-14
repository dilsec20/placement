# 04 — REST API Design (FAANG Interview Guide)

## 🎯 What They Ask
- What makes an API RESTful?
- Explain HTTP methods and when to use each.
- What status codes should you return and when?
- How do you handle pagination, filtering, and sorting?
- How do you version your API?
- What is idempotency? Which HTTP methods are idempotent?

---

## 1. REST Principles

| Principle | Meaning |
|-----------|---------|
| **Client-Server** | Frontend and backend are separate, communicate via HTTP |
| **Stateless** | Each request contains ALL info needed; server stores no session state |
| **Cacheable** | Responses can be cached (GET should be cacheable) |
| **Uniform Interface** | Consistent URLs, methods, and response format |
| **Resource-based** | URLs represent resources (nouns), not actions (verbs) |

```
❌ BAD (verb-based):
POST /api/getUsers
POST /api/createUser
POST /api/deleteUser/5

✅ GOOD (resource-based):
GET    /api/users          → List users
POST   /api/users          → Create user
GET    /api/users/5        → Get user 5
PUT    /api/users/5        → Replace user 5
PATCH  /api/users/5        → Partially update user 5
DELETE /api/users/5        → Delete user 5
```

---

## 2. HTTP Methods

| Method | Purpose | Idempotent? | Safe? | Request Body? |
|--------|---------|:-----------:|:-----:|:-------------:|
| GET | Read | ✅ Yes | ✅ Yes | ❌ No |
| POST | Create | ❌ No | ❌ No | ✅ Yes |
| PUT | Replace (full) | ✅ Yes | ❌ No | ✅ Yes |
| PATCH | Update (partial) | ❌ No* | ❌ No | ✅ Yes |
| DELETE | Remove | ✅ Yes | ❌ No | ❌ No |

**Idempotent** = calling it 1 time or 100 times produces the same result.
- `DELETE /users/5` → first call deletes, subsequent calls return 404. State doesn't change further.
- `POST /users` → each call creates a NEW user. NOT idempotent.

---

## 3. Status Codes

### Must-Know Codes

```
2xx — SUCCESS
  200 OK              → GET, PUT, PATCH succeeded
  201 Created         → POST created a new resource
  204 No Content      → DELETE succeeded (nothing to return)

3xx — REDIRECTION
  301 Moved Permanently → URL changed permanently
  304 Not Modified      → Cached version is still valid

4xx — CLIENT ERROR
  400 Bad Request     → Invalid input (missing fields, wrong format)
  401 Unauthorized    → Not authenticated (no token / invalid token)
  403 Forbidden       → Authenticated but not allowed (wrong role)
  404 Not Found       → Resource doesn't exist
  409 Conflict        → Duplicate (e.g., email already registered)
  422 Unprocessable   → Validation error (correct format but invalid data)
  429 Too Many Req.   → Rate limit exceeded

5xx — SERVER ERROR
  500 Internal Error  → Unhandled server exception
  502 Bad Gateway     → Upstream server failed
  503 Service Unavail → Server overloaded / maintenance
```

### 🔥 Scenario Question
> **Q: "User registers with an email that already exists. What status code?"**

**Answer:** `409 Conflict` — the request was understood and valid, but conflicts with existing state.

---

## 4. Pagination, Filtering, Sorting

### 💻 Code

```
GET /api/products?page=2&limit=20&sort=-price&category=electronics&minPrice=100

URL breakdown:
  page=2         → Page number
  limit=20       → Items per page
  sort=-price    → Sort by price descending (- prefix = DESC)
  category=elec  → Filter by category
  minPrice=100   → Filter minimum price
```

```javascript
// Express implementation
app.get('/api/products', async (req, res) => {
  const {
    page = 1,
    limit = 20,
    sort = '-createdAt',
    category,
    minPrice,
    maxPrice,
    search
  } = req.query;

  // Build filter
  const filter = {};
  if (category) filter.category = category;
  if (minPrice || maxPrice) {
    filter.price = {};
    if (minPrice) filter.price.$gte = Number(minPrice);
    if (maxPrice) filter.price.$lte = Number(maxPrice);
  }
  if (search) filter.name = { $regex: search, $options: 'i' };

  // Build sort
  const sortField = sort.startsWith('-') ? sort.slice(1) : sort;
  const sortOrder = sort.startsWith('-') ? -1 : 1;

  // Execute query
  const skip = (Number(page) - 1) * Number(limit);
  const [products, total] = await Promise.all([
    Product.find(filter)
      .sort({ [sortField]: sortOrder })
      .skip(skip)
      .limit(Number(limit)),
    Product.countDocuments(filter)
  ]);

  res.json({
    success: true,
    data: products,
    pagination: {
      page: Number(page),
      limit: Number(limit),
      total,
      pages: Math.ceil(total / Number(limit))
    }
  });
});
```

### Response Format (Consistent)

```json
{
  "success": true,
  "data": [
    { "id": 1, "name": "Laptop", "price": 999 },
    { "id": 2, "name": "Phone", "price": 699 }
  ],
  "pagination": {
    "page": 2,
    "limit": 20,
    "total": 150,
    "pages": 8
  }
}
```

Error format:
```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid email format",
    "details": [
      { "field": "email", "message": "Must be a valid email address" }
    ]
  }
}
```

---

## 5. API Versioning

```
# Strategy 1: URL path (most common)
GET /api/v1/users
GET /api/v2/users

# Strategy 2: Header
GET /api/users
Header: Accept: application/vnd.myapi.v2+json

# Strategy 3: Query parameter
GET /api/users?version=2
```

**Interview answer:** "URL versioning (`/v1/`, `/v2/`) is the most widely used because it's simple, explicit, and easy to route. Header versioning is cleaner but harder to test in a browser."

---

## 6. Rate Limiting

```javascript
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,  // 15 minutes
  max: 100,                   // 100 requests per window
  message: { error: "Too many requests, please try again later" },
  standardHeaders: true,      // Return rate limit info in headers
});

app.use('/api/', limiter);

// Response headers:
// X-RateLimit-Limit: 100
// X-RateLimit-Remaining: 95
// X-RateLimit-Reset: 1620000000
```

---

## 7. Complete API Design Example

### 🔥 Scenario: "Design the API for a blog platform"

```
USERS
  POST   /api/v1/users              → Register
  POST   /api/v1/auth/login         → Login (returns JWT)
  GET    /api/v1/users/me           → Get current user profile
  PATCH  /api/v1/users/me           → Update profile

POSTS
  GET    /api/v1/posts              → List posts (with pagination)
  POST   /api/v1/posts              → Create post (auth required)
  GET    /api/v1/posts/:id          → Get single post
  PATCH  /api/v1/posts/:id          → Update post (author only)
  DELETE /api/v1/posts/:id          → Delete post (author/admin)
  GET    /api/v1/users/:id/posts    → Get posts by user

COMMENTS
  GET    /api/v1/posts/:id/comments → List comments for a post
  POST   /api/v1/posts/:id/comments → Add comment (auth required)
  DELETE /api/v1/comments/:id       → Delete comment (author/admin)

LIKES
  POST   /api/v1/posts/:id/like    → Like a post (toggle)
  GET    /api/v1/posts/:id/likes   → Get users who liked

SEARCH
  GET    /api/v1/search?q=nodejs&type=posts&sort=-date&page=1
```

---

## ⚡ Quick Revision

| Concept | One-liner |
|---------|-----------|
| REST | Resource-based URLs + HTTP methods + stateless + JSON |
| Idempotent | GET, PUT, DELETE = safe to retry; POST = not idempotent |
| 401 vs 403 | 401 = "Who are you?" (not logged in); 403 = "You can't do this" (wrong role) |
| Pagination | `?page=1&limit=20`; return total count + page info |
| Versioning | `/api/v1/` in URL is most common approach |
| Rate limiting | Prevent abuse; return 429 when exceeded |
| HATEOAS | Response includes links to related actions (rarely used in practice) |
| Content negotiation | `Accept: application/json` header tells server what format client wants |
