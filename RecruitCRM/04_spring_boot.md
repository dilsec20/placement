# Spring Boot & REST API — Interview Questions (Recruit CRM + TCS)

> 🎯 **Why this matters for you:** Your TinyLink project uses Spring Boot + REST APIs.
> Interviewers WILL ask about your project architecture and Spring Boot concepts.

---

## SECTION 1: Spring Framework Basics

---

### Q1. What is Spring Framework?

Spring is a comprehensive **Java framework** that provides:
- **Inversion of Control (IoC)** — Framework manages object lifecycle
- **Dependency Injection (DI)** — Framework injects dependencies automatically
- **AOP (Aspect-Oriented Programming)** — Cross-cutting concerns (logging, security)
- **Transaction Management** — Declarative transaction handling

---

### Q2. What is Spring Boot? How is it different from Spring?

| Feature | Spring | Spring Boot |
| :--- | :--- | :--- |
| **Configuration** | Manual (XML/Java config) | Auto-configuration |
| **Server** | External (Tomcat separately) | Embedded (Tomcat built-in) |
| **Dependencies** | Manual dependency management | Starter dependencies |
| **Boilerplate** | Lots of boilerplate code | Minimal configuration |
| **Production-ready** | Manual setup | Actuator, health checks built-in |

**Spring Boot = Spring + Auto-configuration + Embedded Server + Starter Dependencies**

---

### Q3. What is `@SpringBootApplication`?

It's a **convenience annotation** that combines three annotations:

```java
@SpringBootApplication
// Is equivalent to:
@Configuration        // This class can define beans
@EnableAutoConfiguration  // Enable Spring Boot auto-configuration
@ComponentScan           // Scan current + sub-packages for components
public class MyApplication {
    public static void main(String[] args) {
        SpringApplication.run(MyApplication.class, args);
    }
}
```

---

## SECTION 2: Dependency Injection (DI)

---

### Q4. What is Inversion of Control (IoC) and Dependency Injection (DI)?

**IoC (Inversion of Control):**
- Traditional: Your code creates objects → `new Service()`
- IoC: The **framework** creates and manages objects for you

**DI (Dependency Injection):**
- The mechanism by which IoC is implemented
- Dependencies are "injected" into a class rather than created inside it

```java
// ❌ WITHOUT DI — tight coupling
class Controller {
    private Service service = new ServiceImpl();  // Controller creates its own dependency
}

// ✅ WITH DI — loose coupling
class Controller {
    private final Service service;
    
    @Autowired  // Spring injects the dependency
    Controller(Service service) {
        this.service = service;
    }
}
```

---

### Q5. Types of Dependency Injection

| Type | Syntax | Recommended? |
| :--- | :--- | :--- |
| **Constructor Injection** | Via constructor parameter | ✅ YES (Best practice) |
| **Setter Injection** | Via setter method | For optional dependencies |
| **Field Injection** | `@Autowired` on field | ❌ Not recommended |

```java
// ✅ Constructor Injection (PREFERRED)
@RestController
public class UrlController {
    private final UrlService urlService;

    public UrlController(UrlService urlService) {  // @Autowired optional when single constructor
        this.urlService = urlService;
    }
}
```

**Why Constructor Injection is best:**
1. Dependencies are **explicit** (visible in constructor)
2. Fields can be `final` (immutable)
3. Easy to unit test (pass mock in constructor)
4. Fails fast if dependency is missing (compile-time check)

---

### Q6. What is the Spring IoC Container?

The **ApplicationContext** is Spring's IoC container:
1. Reads configuration (annotations/XML)
2. Creates beans (objects managed by Spring)
3. Injects dependencies
4. Manages bean lifecycle

```
Configuration → IoC Container → Bean Creation → DI → Ready to use
```

---

## SECTION 3: Spring Annotations

---

### Q7. Stereotype Annotations

| Annotation | Layer | Purpose |
| :--- | :--- | :--- |
| `@Component` | Generic | Any Spring-managed bean |
| `@Controller` | Web | Handles HTTP requests (returns views) |
| `@RestController` | Web | `@Controller` + `@ResponseBody` (returns JSON) |
| `@Service` | Business | Business logic layer |
| `@Repository` | Data | Data access layer + exception translation |

```
          @Component
         /    |     \
  @Service  @Repository  @Controller
                              |
                       @RestController
```

**Your TinyLink Project Mapping:**
```java
@RestController      → UrlController     (handles HTTP requests)
@Service             → UrlService        (business logic — encoding, validation)
@Repository          → UrlRepository     (data access — H2 database)
```

---

### Q8. Request Mapping Annotations

```java
@RestController
@RequestMapping("/api")
public class UrlController {

    @GetMapping("/urls/{id}")         // GET /api/urls/123
    public Url getUrl(@PathVariable Long id) { ... }

    @PostMapping("/shorten")           // POST /api/shorten
    public Url shorten(@RequestBody UrlRequest req) { ... }

    @PutMapping("/urls/{id}")          // PUT /api/urls/123
    public Url update(@PathVariable Long id, @RequestBody UrlRequest req) { ... }

    @DeleteMapping("/urls/{id}")       // DELETE /api/urls/123
    public void delete(@PathVariable Long id) { ... }
}
```

| Annotation | Purpose |
| :--- | :--- |
| `@RequestMapping` | Base URL mapping for the controller |
| `@GetMapping` | Maps HTTP GET |
| `@PostMapping` | Maps HTTP POST |
| `@PutMapping` | Maps HTTP PUT |
| `@DeleteMapping` | Maps HTTP DELETE |
| `@PathVariable` | Extracts value from URL path |
| `@RequestParam` | Extracts query parameter |
| `@RequestBody` | Maps request JSON body to Java object |

---

### Q9. Other Important Annotations

| Annotation | Purpose |
| :--- | :--- |
| `@Autowired` | Auto-inject dependency |
| `@Bean` | Manually define a bean in `@Configuration` class |
| `@Value` | Inject property values from `application.properties` |
| `@Qualifier` | Specify which bean to inject when multiple exist |
| `@Scope` | Define bean scope (singleton, prototype, etc.) |
| `@Transactional` | Enable transaction management |

---

## SECTION 4: REST API Concepts

---

### Q10. What is REST?

**REST** (REpresentational State Transfer) is an architectural style for web services.

**6 Constraints:**
1. **Client-Server** — Separate client and server concerns
2. **Stateless** — Each request contains all info needed; no session stored on server
3. **Cacheable** — Responses should be cacheable
4. **Uniform Interface** — Standard HTTP methods (GET, POST, PUT, DELETE)
5. **Layered System** — Client doesn't know if talking to end server or middleware
6. **Code on Demand** (optional) — Server can send executable code

---

### Q11. HTTP Methods & Idempotency

| Method | Purpose | Idempotent? | Safe? |
| :--- | :--- | :---: | :---: |
| `GET` | Retrieve resource | ✅ Yes | ✅ Yes |
| `POST` | Create new resource | ❌ No | ❌ No |
| `PUT` | Update/Replace entire resource | ✅ Yes | ❌ No |
| `PATCH` | Partial update | ❌ No | ❌ No |
| `DELETE` | Remove resource | ✅ Yes | ❌ No |

**Idempotent** = Multiple identical requests produce the same result as a single request.
**Safe** = Does not modify the resource.

---

### Q12. HTTP Status Codes

| Code | Meaning | When to Use |
| :--- | :--- | :--- |
| **200** | OK | Successful GET/PUT |
| **201** | Created | Successful POST (resource created) |
| **204** | No Content | Successful DELETE |
| **301** | Moved Permanently | Permanent redirect |
| **302** | Found (Temporary Redirect) | **Your TinyLink uses this!** |
| **400** | Bad Request | Invalid input/validation error |
| **401** | Unauthorized | Authentication required |
| **403** | Forbidden | Authenticated but not authorized |
| **404** | Not Found | Resource doesn't exist |
| **500** | Internal Server Error | Unexpected server failure |

**Your TinyLink Implementation:**
```java
// POST /shorten → returns 200 OK with short URL
// GET /redirect/{code} → returns 302 redirect to original URL
// Invalid code → returns 404 Not Found
// Invalid URL → returns 400 Bad Request
```

---

### Q13. REST vs SOAP

| Feature | REST | SOAP |
| :--- | :--- | :--- |
| **Protocol** | HTTP only | HTTP, SMTP, TCP |
| **Data Format** | JSON (lightweight) | XML only (verbose) |
| **Performance** | Fast | Slower |
| **Caching** | Supported | Not built-in |
| **Standards** | Flexible | Strict (WSDL, WS-*) |
| **Use Case** | Modern web APIs | Enterprise, banking |

---

## SECTION 5: Spring Boot Architecture

---

### Q14. Layered Architecture (Your TinyLink follows this!)

```
┌─────────────────────────────┐
│      Client (Browser)       │
└──────────┬──────────────────┘
           │ HTTP Request
           ▼
┌─────────────────────────────┐
│   Controller Layer          │  @RestController
│   (Request handling)        │  Receives HTTP, returns Response
└──────────┬──────────────────┘
           │ Method call
           ▼
┌─────────────────────────────┐
│   Service Layer             │  @Service
│   (Business logic)          │  Encoding, Validation, Processing
└──────────┬──────────────────┘
           │ Method call
           ▼
┌─────────────────────────────┐
│   Repository Layer          │  @Repository
│   (Data access)             │  CRUD operations on database
└──────────┬──────────────────┘
           │ SQL/JPA
           ▼
┌─────────────────────────────┐
│   Database (H2/PostgreSQL)  │
└─────────────────────────────┘
```

---

### Q15. What is Spring Data JPA?

Spring Data JPA simplifies database access:
- Auto-generates SQL from method names
- Provides `CrudRepository`, `JpaRepository` interfaces
- Supports custom queries via `@Query`

```java
@Repository
public interface UrlRepository extends JpaRepository<Url, Long> {
    // Auto-generated: SELECT * FROM url WHERE short_code = ?
    Optional<Url> findByShortCode(String shortCode);
    
    // Custom query
    @Query("SELECT u FROM Url u WHERE u.createdAt > :date")
    List<Url> findRecentUrls(@Param("date") LocalDateTime date);
}
```

---

### Q16. Bean Scopes

| Scope | Description | Default? |
| :--- | :--- | :---: |
| **singleton** | One instance per Spring container | ✅ Default |
| **prototype** | New instance for every request | |
| **request** | One instance per HTTP request | Web only |
| **session** | One instance per HTTP session | Web only |

```java
@Component
@Scope("prototype")
public class PrototypeBean { }
```

---

### Q17. What is `application.properties`?

Configuration file for Spring Boot applications:

```properties
# Server
server.port=8080

# Database (H2 — your TinyLink project)
spring.datasource.url=jdbc:h2:mem:testdb
spring.datasource.driver-class-name=org.h2.Driver
spring.jpa.hibernate.ddl-auto=update

# Logging
logging.level.org.springframework=INFO
```

---

## SECTION 6: Exception Handling in REST APIs

---

### Q18. How to handle exceptions globally?

```java
@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<ErrorResponse> handleNotFound(ResourceNotFoundException ex) {
        ErrorResponse error = new ErrorResponse(404, ex.getMessage());
        return new ResponseEntity<>(error, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(BadRequestException.class)
    public ResponseEntity<ErrorResponse> handleBadRequest(BadRequestException ex) {
        ErrorResponse error = new ErrorResponse(400, ex.getMessage());
        return new ResponseEntity<>(error, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorResponse> handleGeneral(Exception ex) {
        ErrorResponse error = new ErrorResponse(500, "Internal Server Error");
        return new ResponseEntity<>(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
```

---

## SECTION 7: Common Interview Scenarios

---

### Q19. "Walk me through the request lifecycle in your TinyLink project"

**Expected Answer:**
```
1. Client sends POST /shorten with { "url": "https://example.com" }
2. DispatcherServlet receives request, maps to UrlController.shorten()
3. @RequestBody deserializes JSON to UrlRequest object
4. Controller calls urlService.shortenUrl(originalUrl)
5. Service validates URL, generates short code using Base62 encoding
6. Service calls urlRepository.save(urlEntity)
7. Repository persists to H2 database via JPA
8. Service returns UrlResponse with short code
9. Controller wraps in ResponseEntity with HTTP 200
10. Jackson serializes to JSON → sent back to client
```

---

### Q20. "How did you ensure thread safety in TinyLink?"

**Your Answer:**
- Used `AtomicLong` for auto-incrementing ID generation
- `AtomicLong.incrementAndGet()` is thread-safe (CAS operation)
- No need for `synchronized` blocks — atomic operations are lock-free
- Each request gets a unique ID → Base62 encoding → unique short URL

```java
private final AtomicLong counter = new AtomicLong(0);

public String generateShortCode() {
    long id = counter.incrementAndGet();
    return Base62.encode(id);
}
```

---

### Q21. "What is Base62 encoding and why did you use it?"

**Answer:**
- Base62 uses characters: `[a-z, A-Z, 0-9]` (62 characters)
- Converts a numeric ID to a short alphanumeric string
- **Why Base62?** URL-safe characters only (no special chars like +, /, =)
- **Why not Base64?** Base64 includes `+`, `/`, `=` which aren't URL-safe

```java
private static final String CHARACTERS = 
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

public static String encode(long id) {
    StringBuilder sb = new StringBuilder();
    while (id > 0) {
        sb.append(CHARACTERS.charAt((int)(id % 62)));
        id /= 62;
    }
    return sb.reverse().toString();
}
```

---

## SECTION 8: Docker Basics (Bonus — Your TinyLink uses Docker)

---

### Q22. What is Docker? Why did you use it?

- **Docker** = Platform for packaging applications in **containers**
- **Container** = Lightweight, standalone executable package (code + dependencies + runtime)
- **Why?** "Works on my machine" → works everywhere

```dockerfile
# Your TinyLink Dockerfile
FROM openjdk:17-jdk-slim
COPY target/tinylink.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
```

| Concept | Description |
| :--- | :--- |
| **Image** | Blueprint/template (like a class) |
| **Container** | Running instance (like an object) |
| **Dockerfile** | Instructions to build an image |
| **Docker Hub** | Public registry for images |

---

### Q23. Docker vs Virtual Machine

| Feature | Docker Container | Virtual Machine |
| :--- | :--- | :--- |
| **OS** | Shares host OS kernel | Full OS per VM |
| **Size** | MBs | GBs |
| **Startup** | Seconds | Minutes |
| **Performance** | Near-native | Overhead (hypervisor) |
| **Isolation** | Process-level | Hardware-level |
