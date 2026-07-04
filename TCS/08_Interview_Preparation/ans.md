# 🔥 Today's TCS Interview Questions — Complete Answers

> **Source:** Questions asked to candidates at LPU campus today (4 July 2026)  
> **All answers personalized for Dilip Kumar's CV and projects**

---

## TR (Technical Round) Questions

---

### Q1: Introduce yourself

> *"Good morning sir/ma'am. I'm Dilip Kumar, currently pursuing B.Tech in Computer Science and Engineering from Lovely Professional University, Punjab.*
>
> *I'm passionate about problem-solving and building real-world applications. I've solved over 1000 DSA problems across LeetCode, Codeforces, and CodeChef — rated Knight on LeetCode (1892), Specialist on Codeforces (1475), and 3-Star on CodeChef.*
>
> *On the development side, my most significant project is AceCoder — a placement preparation platform serving 200+ active users across 5+ countries, built with Node.js, Express.js, and PostgreSQL. I also built TinyLink, a URL shortener using Java and Spring Boot with SOLID architecture and Docker containerization. And SpeakUp, a PWA-based communication coach using Google Gemini AI API.*
>
> *I'm proficient in C++, Java, and JavaScript, and I'm excited about the opportunity to contribute to TCS and grow as a professional."*

⏱️ **Keep under 90 seconds.**

---

### Q2: Write an SQL query to delete duplicates from a table

> ⚠️ **This is a tricky one — the candidate made a mistake here. Learn it well!**

**Method 1 — Using CTE + ROW_NUMBER (Best answer):**
```sql
-- Keep one copy, delete the rest
WITH duplicates AS (
    SELECT id,
           ROW_NUMBER() OVER (PARTITION BY name, email ORDER BY id) AS rn
    FROM employees
)
DELETE FROM employees
WHERE id IN (SELECT id FROM duplicates WHERE rn > 1);
```

**Explanation:** `ROW_NUMBER()` assigns 1, 2, 3... to each group of duplicates. We keep `rn = 1` (first occurrence) and delete the rest (`rn > 1`).

**Method 2 — Using self-join:**
```sql
DELETE e1 FROM employees e1
INNER JOIN employees e2
ON e1.name = e2.name AND e1.email = e2.email
AND e1.id > e2.id;
-- Keeps the row with the smallest id, deletes the rest
```

**Method 3 — Using subquery (simplest):**
```sql
DELETE FROM employees
WHERE id NOT IN (
    SELECT MIN(id) FROM employees GROUP BY name, email
);
-- Keeps only the first occurrence of each duplicate group
```

> **How to explain:** *"I use ROW_NUMBER with PARTITION BY on the duplicate columns. It numbers each row within its group. I delete all rows where the row number is greater than 1, keeping only the first occurrence."*

---

### Q3: Spring Security — types of authentication

> *"Spring Security supports multiple types of authentication:*
>
> | Type | How It Works | Use Case |
> |------|-------------|----------|
> | **Form-based** | Login page with username/password, session cookie | Traditional web apps |
> | **HTTP Basic** | Credentials in Base64 in every request header | Simple APIs, internal tools |
> | **JWT (Token-based)** | Stateless — signed token in Authorization header | REST APIs, microservices |
> | **OAuth 2.0** | Third-party login (Google, GitHub) | Social login, SSO |
> | **LDAP** | Authenticate against corporate directory | Enterprise apps |
>
> *In my TinyLink project, if I were to add authentication, I'd use JWT-based auth because it's stateless and scales well with REST APIs. In AceCoder (Node.js), I already implemented JWT authentication."*

---

### Q4: How to secure your application using Spring Security?

> *"Multiple layers of security in a Spring Boot application:*
>
> 1. **Authentication** — Verify identity using JWT or session-based login
> 2. **Authorization** — Role-based access control (`@PreAuthorize("hasRole('ADMIN')")`)
> 3. **CSRF protection** — Enabled by default for session-based auth (disabled for stateless JWT APIs)
> 4. **Password encoding** — Use `BCryptPasswordEncoder` — never store plain text passwords
> 5. **CORS configuration** — Allow only trusted origins
> 6. **HTTPS** — Encrypt all traffic
> 7. **Rate limiting** — Prevent brute force attacks
> 8. **Input validation** — Prevent SQL injection, XSS
>
> ```java
> @Configuration
> @EnableWebSecurity
> public class SecurityConfig {
>     @Bean
>     public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
>         http
>             .csrf(csrf -> csrf.disable())           // disable for stateless JWT API
>             .sessionManagement(s -> s.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
>             .authorizeHttpRequests(auth -> auth
>                 .requestMatchers("/api/auth/**").permitAll()     // public endpoints
>                 .anyRequest().authenticated()                     // everything else needs auth
>             )
>             .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);
>         return http.build();
>     }
>     
>     @Bean
>     public PasswordEncoder passwordEncoder() {
>         return new BCryptPasswordEncoder();  // never store plain text!
>     }
> }
> ```"

---

### Q5: Is it possible to hack your application? How can a hacker get access to a Spring application?

> *"Yes, every application is potentially vulnerable. Common attack vectors on a Spring application:*
>
> | Attack | How It Works | Prevention |
> |--------|-------------|-----------|
> | **SQL Injection** | Malicious SQL through user input | Parameterized queries, JPA (auto-escapes) |
> | **XSS** | Injecting malicious JavaScript | Input sanitization, Content Security Policy |
> | **CSRF** | Tricking authenticated user into malicious action | CSRF tokens (Spring Security enables by default) |
> | **Brute Force** | Repeatedly guessing passwords | Rate limiting, account lockout, strong passwords |
> | **Exposed endpoints** | Actuator or debug endpoints left open | Secure/disable actuator in production |
> | **Dependency vulnerabilities** | Known CVEs in old libraries | Regular `mvn dependency:check`, keep dependencies updated |
> | **JWT secret leak** | If secret key is compromised, attacker can forge tokens | Use strong secrets, environment variables, rotate keys |
> | **Session hijacking** | Stealing session cookie | HTTPS, HttpOnly cookies, short session timeout |
>
> *In my AceCoder project, I prevent SQL injection with parameterized queries, store passwords with bcrypt, and use JWT with short expiry. For TinyLink, Spring Data JPA auto-parameterizes queries, eliminating SQL injection risk."*

---

### Q6: What are SOAP APIs?

> *"SOAP (Simple Object Access Protocol) is a protocol for exchanging structured information between systems using XML. It uses strict standards with a formal contract called WSDL (Web Services Description Language).*
>
> **Key characteristics:**
> - Messages are always in **XML format**
> - Uses **WSDL** to define the service contract
> - Built-in **WS-Security** for enterprise security
> - Supports **ACID transactions** across services
> - Can work over HTTP, SMTP, TCP
> - Heavy and verbose compared to REST
>
> *SOAP is commonly used in banking, payment gateways, and enterprise systems where formal contracts and strict security are required."*

---

### Q7: Difference between SOAP and REST?

| Feature | SOAP | REST |
|---------|------|------|
| **Protocol vs Style** | Protocol (strict rules) | Architectural style (flexible) |
| **Data format** | XML only | JSON, XML, text, HTML |
| **Speed** | Slower (XML parsing overhead) | Faster (lightweight JSON) |
| **Contract** | WSDL required | No formal contract needed |
| **Security** | WS-Security (built-in) | HTTPS + OAuth/JWT |
| **State** | Can be stateful | Stateless |
| **Error handling** | Standardized fault element | HTTP status codes |
| **Caching** | Not cacheable | GET requests are cacheable |
| **Use case** | Banking, payment, enterprise | Web APIs, mobile apps, microservices |

> *"I chose REST for both my projects (AceCoder and TinyLink) because REST is lighter, faster, and JSON is easier to work with than XML. REST is the standard for modern web APIs."*

---

### Q8: What is Docker and what does it do?

> *"Docker is a platform that packages an application with ALL its dependencies into a lightweight, portable container. It ensures the app runs consistently across dev, test, and production — solving the 'works on my machine' problem.*
>
> **What it does:**
> - **Containerization** — isolates the app from the host system
> - **Consistency** — same environment everywhere
> - **Portability** — runs on any machine with Docker installed
> - **Efficiency** — shares host OS kernel, lighter than VMs
>
> *In my TinyLink project, I containerized the Spring Boot app with Docker. Anyone can clone the repo, run `docker build` and `docker run`, and the app works instantly without installing Java, Maven, or H2 manually."*

---

### Q9: What is a Dockerfile?

> *"A Dockerfile is a text file with instructions to build a Docker image. Each instruction creates a layer in the final image."*
>
> **My TinyLink Dockerfile:**
> ```dockerfile
> # Stage 1: Build the application
> FROM maven:3.9-eclipse-temurin-17 AS build
> WORKDIR /app
> COPY pom.xml .
> COPY src ./src
> RUN mvn clean package -DskipTests
>
> # Stage 2: Run the application (smaller image)
> FROM eclipse-temurin:17-jre
> WORKDIR /app
> COPY --from=build /app/target/tinylink-0.0.1-SNAPSHOT.jar app.jar
> EXPOSE 8080
> ENTRYPOINT ["java", "-jar", "app.jar"]
> ```
>
> **Key instructions:**
> | Instruction | Purpose |
> |------------|---------|
> | `FROM` | Base image to build upon |
> | `WORKDIR` | Set working directory |
> | `COPY` | Copy files from host to container |
> | `RUN` | Execute command during build |
> | `EXPOSE` | Declare the port the app listens on |
> | `ENTRYPOINT` | Command to run when container starts |
>
> *"This is a multi-stage build — Stage 1 compiles the code with Maven, Stage 2 only copies the final JAR and runs it. This keeps the production image small because we don't include Maven and build tools."*

---

### Q10: What is an interface?

**Java:**
> *"An interface is a contract that defines WHAT a class must do, without specifying HOW. It contains abstract method signatures that implementing classes must define."*
>
> ```java
> // Interface — the contract
> public interface UrlRepository {
>     void save(UrlEntity entity);
>     UrlEntity findByShortCode(String code);
>     // Only defines WHAT — no implementation
> }
>
> // Implementation — the HOW
> @Repository
> public class InMemoryUrlRepository implements UrlRepository {
>     private Map<String, UrlEntity> store = new HashMap<>();
>     
>     @Override
>     public void save(UrlEntity entity) {
>         store.put(entity.getShortCode(), entity);
>     }
>     
>     @Override
>     public UrlEntity findByShortCode(String code) {
>         return store.get(code);
>     }
> }
> ```

**C++:**
> *"In C++, interfaces are achieved using abstract classes with pure virtual functions:"*
> ```cpp
> class Shape {      // abstract class = interface
> public:
>     virtual double area() = 0;     // pure virtual — MUST be implemented
>     virtual double perimeter() = 0;
> };
> 
> class Circle : public Shape {
>     double radius;
> public:
>     double area() override { return 3.14159 * radius * radius; }
>     double perimeter() override { return 2 * 3.14159 * radius; }
> };
> ```

---

### Q11: What is operator overloading?

> *"Defining custom behavior for an operator when used with user-defined types."*

**C++ (supports operator overloading):**
```cpp
class Complex {
    double real, imag;
public:
    Complex(double r, double i) : real(r), imag(i) {}
    
    // Overloading the + operator
    Complex operator+(const Complex& c) {
        return Complex(real + c.real, imag + c.imag);
    }
    
    // Overloading << for printing
    friend ostream& operator<<(ostream& os, const Complex& c) {
        os << c.real << " + " << c.imag << "i";
        return os;
    }
};
// Usage: Complex a(1,2), b(3,4); Complex c = a + b; → 4 + 6i
```

> **Java:** *"Java does NOT support operator overloading (except `+` for String concatenation which is built-in). This is a design choice to keep the language simpler."*

---

### Q12: What is method overloading?

> *"Defining multiple methods with the SAME name but DIFFERENT parameters in the same class. Resolved at compile time."*

**Java:**
```java
class Calculator {
    int add(int a, int b) { return a + b; }                      // 2 ints
    double add(double a, double b) { return a + b; }             // 2 doubles
    int add(int a, int b, int c) { return a + b + c; }           // 3 ints
    String add(String a, String b) { return a + b; }             // 2 strings
}
// Same name "add" — compiler picks the right one based on argument types
```

**C++:**
```cpp
int add(int a, int b) { return a + b; }
float add(float a, float b) { return a + b; }
int add(int a, int b, int c) { return a + b + c; }
```

---

### Q13: Why is an interface used — explain with an example

> *"Interfaces provide three main benefits:*
>
> 1. **Abstraction** — Define WHAT without HOW
> 2. **Loose coupling** — Code depends on contract, not implementation
> 3. **Multiple implementations** — Swap implementations without changing client code
>
> **Real example from my TinyLink project:**
> ```java
> // Interface
> public interface UrlRepository {
>     void save(UrlEntity entity);
>     UrlEntity findByShortCode(String code);
> }
>
> // Implementation 1 — In-memory (for development)
> public class InMemoryRepo implements UrlRepository { ... }
>
> // Implementation 2 — PostgreSQL (for production)
> public class JpaRepo implements UrlRepository { ... }
>
> // The Service doesn't care WHICH one it gets
> @Service
> public class UrlService {
>     private final UrlRepository repo;   // depends on INTERFACE, not class
>     
>     public UrlService(UrlRepository repo) {
>         this.repo = repo;  // Spring injects the right implementation
>     }
> }
> ```
>
> *The key benefit: I can switch from H2 to PostgreSQL by just changing the config — the Service code stays EXACTLY the same because it depends on the interface, not the concrete class. This is the Dependency Inversion Principle (D in SOLID)."*

---

### Q14: How many images are there in Docker for a Spring Boot application?

> *"In a typical multi-stage Dockerfile for a Spring Boot app, there are 2 images:*
>
> | Stage | Image | Purpose | Size |
> |-------|-------|---------|------|
> | **Build stage** | `maven:3.9-eclipse-temurin-17` | Compiles code, creates JAR | Large (~500MB — includes JDK + Maven) |
> | **Run stage** | `eclipse-temurin:17-jre` | Only runs the JAR | Small (~200MB — only JRE, no compiler) |
>
> *The final Docker image only includes the run stage. The build stage is discarded — that's the benefit of multi-stage builds. The final image is smaller because it doesn't include Maven, source code, or the full JDK — only the JRE needed to run the application.*
>
> *If you use a single-stage build, there's just 1 image, but it's much larger because it includes build tools too."*

---

### Q15: How can you run your application on Azure?

> *"Several ways to deploy a Spring Boot app on Azure:*
>
> 1. **Azure App Service** (PaaS — simplest)
>    - Upload the JAR directly or connect to GitHub for CI/CD
>    - Azure handles OS, scaling, SSL automatically
>    - `az webapp deploy --resource-group myGroup --name myApp --src-path target/app.jar`
>
> 2. **Azure Container Instances (ACI)** — run Docker container
>    - Push Docker image to Azure Container Registry (ACR)
>    - Deploy container with `az container create`
>
> 3. **Azure Kubernetes Service (AKS)** — for microservices at scale
>    - Orchestrate multiple containers with Kubernetes
>
> 4. **Azure Spring Apps** — purpose-built for Spring Boot
>    - Managed service specifically designed for Spring applications
>
> *My TinyLink is already Dockerized, so deploying to Azure would be: push image to ACR → create App Service or ACI → configure environment variables → deploy. Similar to how I deploy AceCoder on Render."*

---

### Q16: About my project

> *(Use your 90-second scripts from the prep files. Here's the key one:)*
>
> **AceCoder:**
> *"AceCoder is a placement preparation platform serving 200+ active users across 5+ countries. I built the complete backend with Node.js, Express.js, and PostgreSQL. I designed RESTful APIs for users, problems, submissions, and contests. Authentication is JWT-based — stateless and scalable. I integrated an external code execution API for C++. The biggest challenge was concurrent submissions causing timeouts — I solved it with async/await and proper error handling. Deployed on Render with managed PostgreSQL."*
>
> **TinyLink:**
> *"TinyLink is a URL shortener built with Java and Spring Boot. I use Base62 encoding on auto-incrementing IDs with thread-safe AtomicLong for collision-free short URLs. I followed SOLID principles — Controller, Service, Repository separation with Spring DI. Three REST endpoints: POST /shorten, GET /redirect (HTTP 302), with robust error handling. Containerized with Docker."*

---

### Q17: What is stateless authentication?

> *"In stateless authentication, the server does NOT store any session data. Each request carries all the information needed to verify the user — typically as a JWT token.*
>
> | Stateful (Session-based) | Stateless (JWT-based) |
> |-------------------------|----------------------|
> | Server stores session in memory | Server stores NOTHING |
> | Client sends session cookie | Client sends JWT in Authorization header |
> | Hard to scale (session stored on ONE server) | Easy to scale (any server can verify) |
> | Easy to revoke (delete session) | Hard to revoke (token is self-contained) |
> | Vulnerable to CSRF | NOT vulnerable to CSRF (if using headers) |
>
> *In my AceCoder project, I use stateless JWT authentication:*
> 1. User logs in → server creates JWT with `{userId, email}`, signs it with a secret
> 2. Client stores token, sends `Authorization: Bearer <token>` with every request
> 3. Server verifies token signature — if valid, request proceeds
> 4. Server never stores the session — each request is independent
>
> *This is why my backend can scale horizontally — any server instance can verify the token without sharing session state."*

---

### Q18: What is CSRF? What is a session?

#### CSRF (Cross-Site Request Forgery):
> *"CSRF is an attack where a malicious website tricks a user's browser into making unwanted requests to a site where the user is already authenticated.*
>
> **How it works:**
> 1. User logs into `bank.com` → browser stores session cookie
> 2. User visits `evil.com` (in another tab)
> 3. `evil.com` has hidden form: `<form action="bank.com/transfer" method="POST">`
> 4. Browser automatically attaches `bank.com` cookies → transfer happens without user's consent!
>
> **Prevention:**
> - **CSRF tokens** — server generates unique token per form, validates on submission
> - Spring Security enables CSRF protection by default for session-based auth
> - For stateless JWT APIs using Authorization headers → CSRF is NOT a risk (browser doesn't auto-attach headers like cookies)

#### Session:
> *"A session is a server-side storage mechanism that maintains user state across multiple HTTP requests.*
> 1. User logs in → server creates session object in memory with unique Session ID
> 2. Session ID sent to browser as a cookie
> 3. Every subsequent request → browser sends cookie → server looks up session
> 4. When user logs out or session expires → server deletes session data
>
> *I chose JWT over sessions in AceCoder because JWT is stateless — no server-side storage needed, which means easier horizontal scaling."*

---

## HR / MR Questions

---

### Q19: Who is the CEO of TCS?

> *"K. Krithivasan is the current CEO & Managing Director of TCS. He took over on June 1, 2023."*

---

### Q20: Who was the first CEO of TCS?

> *"F. C. Kohli (Faqir Chand Kohli) was the first CEO of TCS. He is known as the 'Father of the Indian IT Industry.' He joined TCS as a director in 1970, became CEO in 1972, and served until his retirement in 1999. He was the visionary who laid the foundation for India's entire IT services revolution."*

---

### Q21: Who founded TCS?

> *"TCS was founded by J.R.D. Tata (Jehangir Ratanji Dadabhoy Tata) in 1968. F. C. Kohli is credited with building and growing the company as its first CEO. TCS was part of the Tata Group's vision to establish India's technology capabilities."*

---

### Q22: Who is Noel Tata?

> *"Noel Naval Tata is the half-brother of the late Ratan Tata. He is a prominent member of the Tata family and currently serves as the Chairman of Tata Trusts. He was appointed to this role in October 2024, following the passing of Ratan Tata on October 9, 2024. He also serves as Chairman of Trent Ltd (Westside, Zudio retail chain) and has held leadership roles across the Tata Group."*

---

### Q23: Who is the Chairman of Tata Trusts?

> *"Noel Tata is the current Chairman of Tata Trusts (appointed October 11, 2024). The Tata Trusts hold approximately 66% stake in Tata Sons, which is the parent holding company of the entire Tata Group, including TCS. So the Tata Trusts are effectively the controlling entity behind TCS."*

---

### Q24: How is TCS different from Reliance?

> | Aspect | TCS (Tata Group) | Reliance Industries |
> |--------|-----------------|-------------------|
> | **Core business** | IT services & consulting | Oil/gas, petrochemicals, telecom (Jio), retail |
> | **Revenue model** | Service-based (clients pay for IT projects) | Product/asset-based (sells products, services) |
> | **Global presence** | 56 countries, 584K+ employees | Primarily India-focused (Jio, Reliance Retail) |
> | **Ownership** | 66% held by Tata Trusts (philanthropic trusts) | Promoter-family owned (Ambani family) |
> | **Philosophy** | "Building on Belief" — values-driven, nation-building | "Growth and disruption" — rapid market capture |
> | **Founded** | 1868 (Tata Group) / 1968 (TCS) | 1966 by Dhirubhai Ambani |

---

### Q25: How is the management of TCS and Reliance different?

> *"The fundamental difference is in ownership and governance:*
>
> **TCS (Tata Group):**
> - Owned by **Tata Trusts** (charitable trusts) — not a family-owned business
> - Professional management — CEO hired based on merit, not family lineage
> - K. Krithivasan is CEO, N. Chandrasekaran is Tata Sons Chairman
> - Focus on long-term sustainability, ethics, employee welfare, CSR
> - Tata Trusts donate ~60% of dividends to philanthropy (education, healthcare)
>
> **Reliance:**
> - **Promoter-family controlled** — Ambani family holds significant stake
> - Mukesh Ambani is Chairman & MD
> - Family succession planned (Isha, Akash, Anant Ambani in leadership roles)
> - Focus on aggressive growth, market disruption, vertical integration
>
> *I personally admire TCS's model — professional management based on merit and a strong ethical foundation through the Tata Trusts."*

---

### Q26: What are your hobbies?

> *"My primary hobby is competitive programming — I genuinely enjoy solving challenging algorithmic problems on LeetCode, Codeforces, and CodeChef. The rating system gives a constant sense of progress, and it's made me a stronger problem-solver. Apart from that, I enjoy reading about new technologies and exploring different frameworks — my curiosity led me to integrate Google's Gemini AI API into my SpeakUp project."*

> ⚠️ **If you mention cooking**, be prepared for deep follow-ups like the ones below! Only mention hobbies you can discuss in depth.

---

### Q27: What can you cook?

> *(Adapt this to your actual cooking skills. Example if you mentioned cooking:)*
>
> *"I enjoy making simple Indian dishes like dal, rice, sabzi, and egg curry. I'm also comfortable making breakfast items like poha, upma, and maggi. Living in a hostel at LPU taught me to be self-sufficient — I started cooking out of necessity and grew to enjoy it."*

---

### Q28: What can you do differently from others in cooking?

> *"I approach cooking the same way I approach programming — I experiment. While most people follow recipes exactly, I like to adjust spices and ingredients based on what's available. I also try to optimize the process — prepping ingredients in parallel, reusing the same base for different dishes. It's like refactoring code — same input, better output with less effort."*

---

### Q29: Name three dishes that can be cooked without fire

> 1. **Fruit salad / Raita** — mix fruits or yogurt with spices — no fire needed
> 2. **Sandwich / Cold sandwich** — bread, vegetables, cheese, chutney — assembled cold
> 3. **Lassi / Milkshake / Smoothie** — blend yogurt/milk with fruits and sugar
>
> *(Other options: cold coffee, sprout chaat, peanut butter toast, overnight oats)*

---

### Q30: You mentioned GitHub — how do you pull, and what is a staging area?

#### Git Pull:
> *"`git pull` fetches the latest changes from the remote repository and merges them into your local branch. It's essentially `git fetch` + `git merge` combined."*
>
> ```bash
> git pull origin main
> # Fetches latest changes from 'main' branch on remote 'origin'
> # and merges them into your current local branch
> ```

#### Staging Area:
> *"The staging area (also called the 'index') is an intermediate zone between your working directory and the repository. When you modify files, they're in the working directory. When you `git add` them, they move to the staging area — marking them as 'ready to be committed.' When you `git commit`, only the staged changes are committed."*
>
> ```
> Working Directory  →  git add  →  Staging Area  →  git commit  →  Repository
>    (modified)                      (ready to commit)               (saved permanently)
> ```
>
> ```bash
> git add file.java        # stages one file
> git add .                # stages ALL changes
> git status               # shows what's staged vs unstaged
> git commit -m "message"  # commits only staged files
> ```
>
> *"I use the staging area to selectively commit — for example, if I changed 5 files but only want to commit 3, I `git add` only those 3 and commit. The other 2 stay as unstaged changes for a separate commit."*
>
> *"In my AceCoder project, I follow this workflow: make changes → `git add .` → `git commit -m 'descriptive message'` → `git push origin main` → Render auto-deploys."*

---

## 🎯 Key Observations from Today's Questions

| Pattern | What It Means |
|---------|--------------|
| **Spring Security & CSRF** were asked | They're going DEEP on security — revise new.md (Ethical Hacking section) |
| **SOAP vs REST** was asked | Not just REST — know the differences and when SOAP is preferred |
| **Docker & Dockerfile** were asked | They expect you to know containerization practically |
| **Azure deployment** was asked | Cloud deployment knowledge is expected |
| **Noel Tata & TCS vs Reliance** | HR is testing DEPTH of company knowledge — not just CEO name |
| **Cooking follow-ups** | They go DEEP into ANY hobby — only say what you can defend! |
| **Git staging area** was asked | They're testing real Git understanding, not just memorized commands |
| **SQL delete duplicates** tripped someone | Practice tricky SQL on paper! |

---

> **💡 These are the NEWEST questions. Combine with your existing prep files — today.md, new.md, All_Answers.md — and you have coverage for 95%+ of possible questions. Go crush it! 🚀💪**
