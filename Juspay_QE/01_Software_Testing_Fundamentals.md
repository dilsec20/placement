# 🧪 Stage 1 — Software Testing Fundamentals (Zero to Expert)

> **Target:** Master all software testing concepts, STLC lifecycles, test design techniques, and pass the Online Assessment screening.  
> **Rule for Quality Engineering:** "Quality is not something tested in at the end; it is built into the architecture from Day 1."

---

## 📖 Part 1: Core Definitions & Evolution of Testing

### 1. What is Software Testing? (Verification vs. Validation)
Software testing is the systematic process of executing an application with the intent of finding bugs, verifying functional correctness, and validating whether it meets customer expectations.

```
                     ┌──────────────────────────────────────────────┐
                     │           VERIFICATION vs VALIDATION         │
                     ├──────────────────────┬───────────────────────┤
                     │ VERIFICATION         │ VALIDATION            │
                     │ "Are we building the │ "Are we building the  │
                     │  product right?"     │  right product?"      │
                     ├──────────────────────┼───────────────────────┤
                     │ Static process       │ Dynamic process       │
                     │ (Reviews, walkthrough│ (Executing software   │
                     │  inspections, design)│  with real inputs)    │
                     ├──────────────────────┼───────────────────────┤
                     │ No code execution    │ Involves code running │
                     │ Checked against spec │ Checked against user  │
                     │ documents            │ business needs        │
                     └──────────────────────┴───────────────────────┘
```

---

### 2. QA vs. QC vs. QE (The Shift-Left Evolution)

| Role | Meaning | Primary Focus | Stage Involved |
|---|---|---|---|
| **QA (Quality Assurance)** | **Process-oriented** prevention | Establishing processes, standards, code review rules, and methodologies to ensure defects do not arise. | Entire Lifecycle |
| **QC (Quality Control)** | **Product-oriented** detection | Executing test cases against the built product to identify and report existing bugs before release. | Post-Build Execution |
| **QE (Quality Engineer)** | **Engineering & Automation** | Writing test code, designing CI/CD quality gates, building test harnesses, performance testing, and automating APIs/UI. | **Shift-Left (Day 1)** |

> **What is "Shift-Left Testing"?**  
> Traditionally, testing occurred at the very end of development. Shift-Left means moving testing activities to the earliest phases of development (requirements, unit testing, architecture design). Finding a bug in requirement analysis costs **\$10**, while finding it in production costs **\$1,000+** and risks company reputation.

---

## 🔄 Part 2: SDLC vs. STLC Lifecycles

### 1. Software Testing Life Cycle (STLC) — Phase by Phase

```
[1. Requirement Analysis] ──► [2. Test Planning] ──► [3. Test Case Development]
                                                              │
                                                              ▼
[6. Test Cycle Closure]   ◄── [5. Test Execution] ◄── [4. Test Environment Setup]
```

1. **Requirement Analysis:**
   - QEs review Business Requirement Documents (BRD) and System Requirement Specifications (SRS).
   - Identify testable vs non-testable requirements.
   - Create the **RTM (Requirement Traceability Matrix)** — a table mapping user requirements to test cases to guarantee **100% test coverage**.
2. **Test Planning:**
   - Prepared by the QA Lead/Manager.
   - Defines scope, test strategy, resource allocation, tools (Selenium, Postman), timeline, and risks.
3. **Test Case Development:**
   - QEs write step-by-step test cases, test data, and expected results using techniques like BVA and Equivalence Partitioning.
   - Peer reviews of test cases.
4. **Test Environment Setup:**
   - Setting up test servers, database seed data, API mock endpoints, and staging hardware.
5. **Test Execution:**
   - Executing test cases (manual or automated).
   - Logging actual results vs. expected results.
   - Logging defects in JIRA / bug trackers.
6. **Test Cycle Closure:**
   - Analyzing metrics: Defect density, test execution pass/fail rate, bug open vs. closed ratio.
   - Writing the **Test Summary Report**.

---

### 2. Defect / Bug Life Cycle in Full Depth

```
  [NEW] ──► Found by QE and logged into tracking tool
    │
    ▼
[ASSIGNED] ──► Lead/Developer acknowledges and assigns to engineer
    │
    ├─────────────────────────────┬─────────────────────────────┐
    ▼                             ▼                             ▼
 [OPEN]                       [REJECTED]                   [DEFERRED]
 (Dev analyzes bug)    (Not a genuine bug/spec)   (Postponed to future sprint)
    │
    ▼
[IN PROGRESS] ──► Fix being coded
    │
    ▼
  [FIXED] ──► Code deployed to QA staging
    │
    ▼
[RETEST] ──► QE verifies fix with original reproduction steps
    │
    ├─────────────────────────────┐
    ▼                             ▼
[VERIFIED] ──► [CLOSED]       [REOPENED] (Bug still reproduces!)
```

---

### 3. Severity vs. Priority (The Golden Interview Question)

* **Severity:** Measures the **technical impact** of the bug on the system (How badly is the system broken?). Defined by the **Tester**.
  * Levels: *Critical / Blocker, Major, Moderate, Minor / Trivial*.
* **Priority:** Measures the **business urgency** of fixing the bug (How quickly must it be deployed?). Defined by the **Product Manager / Business**.
  * Levels: *P1 (Immediate / Within hours), P2 (Next release), P3 (Backlog)*.

#### The 4 Classic Real-World Matrix Examples:

| Combination | Real-World Payment / E-commerce Scenario | Why? |
|---|---|---|
| **High Severity, High Priority** | Clicking *"Pay Now"* on checkout crashes the application with a 500 server error. | Core business functionality is broken; revenue is blocked immediately. |
| **High Severity, Low Priority** | App crashes when launched on Android 4.4 KitKat. | The crash is severe (High Severity), but Android 4.4 represents $<0.001\%$ of users; hence fixing it is not urgent (Low Priority). |
| **Low Severity, High Priority** | The company logo on the payment checkout page is misspelled as *"Juspayy"*. | The system works fine technically (Low Severity), but it damages brand trust and looks like a phishing scam (High Priority). |
| **Low Severity, Low Priority** | A small 2-pixel margin misalignment in the privacy policy footer. | Cosmetic issue on an infrequently visited section. |

---

## 🎯 Part 3: Black-Box Test Design Techniques (With Formulas)

### 1. Boundary Value Analysis (BVA)
* **Principle:** Bugs cluster around boundaries of input ranges rather than in the center.
* **Standard 2-Value BVA:** For range $[A, B]$:
  * Minimum, Minimum $+ 1$
  * Maximum $- 1$, Maximum
* **Robustness BVA (Includes Invalid Values):**
  * $A - 1$ (Invalid)
  * $A$ (Valid Min)
  * $A + 1$ (Valid Just Above Min)
  * Nominal (Middle value)
  * $B - 1$ (Valid Just Below Max)
  * $B$ (Valid Max)
  * $B + 1$ (Invalid)

#### Numerical Example (Payment Amount Input Field):
* **Rule:** A payment transaction accepts amounts between **₹100 and ₹50,000**.
* **Test Values Generated by Robustness BVA:**
  * ₹99 $\to$ **Invalid** (Rejection error expected)
  * ₹100 $\to$ **Valid** (Minimum accepted)
  * ₹101 $\to$ **Valid**
  * ₹25,000 $\to$ **Valid** (Nominal)
  * ₹49,999 $\to$ **Valid**
  * ₹50,000 $\to$ **Valid** (Maximum accepted)
  * ₹50,001 $\to$ **Invalid** (Rejection error expected)

---

### 2. Equivalence Class Partitioning (ECP)
* **Principle:** Divide the entire input data domain into valid and invalid partitions. Pick one representative value from each partition to reduce redundant tests.
* **Example:** User Age field for purchasing insurance ($18 \le \text{Age} \le 65$):
  1. **Partition 1 (Invalid - Too Young):** $\text{Age} < 18$ (e.g. Test with `15`)
  2. **Partition 2 (Valid Eligible):** $18 \le \text{Age} \le 65$ (e.g. Test with `30`)
  3. **Partition 3 (Invalid - Too Old):** $\text{Age} > 65$ (e.g. Test with `72`)
  4. **Partition 4 (Invalid - Data Type):** Non-numeric characters (e.g. Test with `"abc"`, `"-5"`, `""`)

---

### 3. Decision Table Testing (Cause-Effect Analysis)
Used when complex business logic depends on combinations of multiple inputs.

* **Scenario:** Authorizing a credit card payment at Juspay:
  * Condition 1: Card is valid?
  * Condition 2: Sufficient balance?
  * Condition 3: Correct OTP entered?

| Rule | Card Valid? | Sufficient Balance? | Correct OTP? | Action / Output |
|:---:|:---:|:---:|:---:|---|
| **R1** | ✅ Yes | ✅ Yes | ✅ Yes | **Payment Approved (200 OK)** |
| **R2** | ✅ Yes | ✅ Yes | ❌ No | **Failed: Invalid OTP** |
| **R3** | ✅ Yes | ❌ No | — | **Failed: Insufficient Balance** |
| **R4** | ❌ No | — | — | **Failed: Invalid Card Number** |

---

## 🔍 Part 4: Testing Types & Classifications

### 1. Smoke Testing vs. Sanity Testing

| Aspect | Smoke Testing (Build Verification) | Sanity Testing |
|---|---|---|
| **Origin of Term** | Hardware testing (plug in device; if it smokes, stop!) | "Are you in your right mind to test?" |
| **When Executed** | On initial build release to verify core basic stability. | On a stable build after bug fixes to verify specific functionality. |
| **Scope** | Broad and shallow (tests all major modules lightly). | Narrow and deep (tests fixed module and related dependencies). |
| **Goal** | Decide whether build is stable enough for deeper testing. | Verify that reported bugs are fixed and didn't break adjacent logic. |
| **Automation** | Almost always automated in CI/CD pipelines. | Typically executed manually or with focused regression suites. |

---

### 2. Regression Testing vs. Retesting

| Feature | Retesting | Regression Testing |
|---|---|---|
| **Definition** | Testing the **exact failed test case** again after a developer fixes it. | Testing **unmodified features** to ensure bug fixes didn't introduce new side-effects. |
| **Focus** | Defect verification only. | Side-effect prevention across the entire application. |
| **Test Cases** | Only failed test cases are re-run. | Regression test suite (P1/P2 test cases) is re-run. |
| **Automation** | Usually manual. | Highly automated (Selenium / Postman CI suites). |

---

# 📝 Part 5: 40 High-Yield Software Testing MCQs

---

### Section 1: Fundamentals & Methodologies (Qs 1–15)

#### Q1. Which testing activity is classified as **Static Testing**?
* (A) Executing automated Selenium scripts on staging
* (B) Performing Peer Code Reviews and Specification Walkthroughs
* (C) Running API integration tests via Postman
* (D) Running stress tests using JMeter
* **Correct Answer:** **(B)**
* **Explanation:** Static testing involves inspecting documents and code without executing the program. Code reviews, walkthroughs, and inspections are static; executing tests is dynamic.

#### Q2. A defect is detected during internal testing and fixed. In which document should the QE verify that this requirement now passes?
* (A) Project Charter
* (B) Requirements Traceability Matrix (RTM)
* (C) System Architecture Diagram
* (D) Deployment Manifest
* **Correct Answer:** **(B)**
* **Explanation:** The RTM maps every business requirement to its corresponding test cases and defects, ensuring bidirectional traceability.

#### Q3. In a banking application, an account balance field accepts integers from $1$ to $10,000$. Using 2-value Boundary Value Analysis, which values must be tested?
* (A) $0, 1, 10000, 10001$
* (B) $1, 2, 9999, 10000$
* (C) $0, 5000, 10000$
* (D) $-1, 0, 10000$
* **Correct Answer:** **(B)**
* **Explanation:** Standard 2-value BVA tests the boundary values ($1, 10000$) and their immediate valid interior neighbors ($1+1=2, 10000-1=9999$). (If testing robust BVA, $0$ and $10001$ are included).

#### Q4. Which testing type is performed by actual end-users at their own site without developer interference before commercial launch?
* (A) Alpha Testing
* (B) Beta Testing
* (C) Component Testing
* (D) Unit Testing
* **Correct Answer:** **(B)**
* **Explanation:** Alpha testing is conducted at the developer's site by internal staff; Beta testing is conducted by external end-users in real operating environments.

#### Q5. What is the fundamental difference between **Severity** and **Priority**?
* (A) Severity is set by the Developer; Priority is set by the QA.
* (B) Severity measures technical impact; Priority measures business urgency to fix.
* (C) Severity and Priority are always identical.
* (D) Severity relates only to UI defects; Priority relates to database defects.
* **Correct Answer:** **(B)**
* **Explanation:** Severity evaluates how critically the bug degrades system functionality; Priority determines how quickly the bug must be resolved based on business needs.

#### Q6. What is the testing principle stating that *"Testing can show that defects are present, but cannot prove that there are no defects"*?
* (A) Pesticide Paradox
* (B) Absence-of-errors fallacy
* (C) Testing shows presence of defects
* (D) Defect clustering
* **Correct Answer:** **(C)**
* **Explanation:** ISTQB Principle 1: Testing reduces the probability of undiscovered defects remaining, but even with zero failing tests, it is impossible to prove software is $100\%$ defect-free.

#### Q7. The **"Pesticide Paradox"** in software testing refers to:
* (A) Code bugs mutating randomly over time
* (B) Running the exact same automated test cases repeatedly causes them to stop finding new defects
* (C) Bugs multiplying when external libraries are updated
* (D) Writing too many unit tests slowing down CI builds
* **Correct Answer:** **(B)**
* **Explanation:** If the same tests are repeated over and over again, eventually the same suite will no longer find new bugs. Test cases must be regularly reviewed and updated with new scenarios.

#### Q8. What is the primary purpose of **Equivalence Class Partitioning**?
* (A) To test all possible infinite inputs
* (B) To reduce the total number of test cases to a manageable size while maintaining test coverage
* (C) To measure CPU utilization during test execution
* (D) To automate database schema migrations
* **Correct Answer:** **(B)**
* **Explanation:** ECP divides input domains into classes where all values are assumed to be processed identically, allowing one representative test per partition.

#### Q9. A tester discovers that $80\%$ of application defects are concentrated in $20\%$ of the modules. Which principle describes this?
* (A) Concurrency Principle
* (B) Pareto Principle (Defect Clustering)
* (C) Amdahl's Law
* (D) Moore's Law
* **Correct Answer:** **(B)**
* **Explanation:** Pareto Principle (80/20 rule) in testing states that a small number of complex modules usually contain the majority of discovered defects.

#### Q10. What is **Exploratory Testing**?
* (A) Running predefined manual scripts line by line
* (B) Simultaneous learning, test design, and test execution without formal scripted test cases
* (C) Automated load testing with JMeter
* (D) Compiling source code with debug flags
* **Correct Answer:** **(B)**
* **Explanation:** Exploratory testing emphasizes tester intuition, creativity, and real-time learning to uncover deep edge-case bugs that scripted tests miss.

#### Q11. Which document defines the entry and exit criteria for a testing cycle?
* (A) Test Plan
* (B) User Story
* (C) Sprint Burndown Chart
* (D) Bug Report
* **Correct Answer:** **(A)**
* **Explanation:** The Test Plan formally defines the scope, resources, schedule, and explicit Entry Criteria (prerequisites to begin) and Exit Criteria (conditions to declare testing complete).

#### Q12. What is an example of an **Exit Criterion** for a payment gateway release?
* (A) Developer begins coding the checkout API
* (B) 100% of Critical and High severity defects are resolved and verified in staging
* (C) Staging database is provisioned
* (D) First sprint planning meeting is held
* **Correct Answer:** **(B)**
* **Explanation:** Exit criteria determine when testing can stop safely. Resolving all P1/Critical defects is a standard exit criterion.

#### Q13. What is a **DDT (Data-Driven Testing)** framework?
* (A) A framework where test inputs and expected outputs are read from external files (CSV, Excel, JSON)
* (B) A test that queries the database directly without UI
* (C) A test executed only by database administrators
* (D) A framework that tests network bandwidth
* **Correct Answer:** **(A)**
* **Explanation:** DDT separates test logic from test data, allowing the exact same test script to run against hundreds of input combinations loaded from external data sheets.

#### Q14. In an Agile Scrum team, what is the **Definition of Done (DoD)**?
* (A) The developer finished coding the feature on their local machine
* (B) A shared checklist of criteria (code written, unit tests passed, QA verified, documentation updated) required before a user story is marked complete
* (C) The product was released to the App Store
* (D) The sprint retrospective meeting ended
* **Correct Answer:** **(B)**
* **Explanation:** DoD ensures all team members share consensus on what quality standards a story must satisfy before being considered complete.

#### Q15. What is the difference between a **Bug**, a **Defect**, and an **Error**?
* (A) They are identical terms with no distinction.
* (B) A human makes an **Error** (mistake in code), which creates a **Defect/Bug** in software; when executed, this causes a runtime **Failure**.
* (C) An error happens in production; a bug happens in staging.
* (D) A defect is a hardware fault; an error is a software fault.
* **Correct Answer:** **(B)**
* **Explanation:** Standard IEEE terminology: Human Error $\to$ Software Defect/Bug $\to$ Runtime System Failure.

---

### Section 2: Defect Lifecycle & Scenarios (Qs 16–28)

#### Q16. A developer marks a bug as **"Deferred"**. What does this mean?
* (A) The developer refuses to acknowledge the issue
* (B) The bug is acknowledged but scheduled to be fixed in a future release/sprint
* (C) The bug cannot be reproduced
* (D) The bug was fixed automatically
* **Correct Answer:** **(B)**
* **Explanation:** Deferred status means the bug is genuine but has low business impact or cannot be accommodated in the current sprint release window.

#### Q17. A QE logs a defect that occurs once every 50 payment transactions, but cannot consistently reproduce it on command. What should the QE do?
* (A) Delete the bug report immediately
* (B) Isolate the exact timestamp, inspect server logs, document system state and network conditions, and attach log traces to the bug report
* (C) Blame the developer
* (D) Mark the defect as Closed
* **Correct Answer:** **(B)**
* **Explanation:** Intermittent bugs are often race conditions or network latency issues. Capturing server logs, timestamps, request IDs, and system environment state is crucial for developers to diagnose them.

#### Q18. Which of the following is a **High Severity, Low Priority** bug?
* (A) The checkout button is disabled for all users
* (B) An obscure crash occurs when generating a 5-year financial statement report on Windows 7 32-bit OS
* (C) The company CEO's name is misspelled on the homepage
* (D) A broken link in the footer
* **Correct Answer:** **(B)**
* **Explanation:** A system crash is High Severity (corrupts operation), but the platform and feature are extremely rare (Low Priority to business).

#### Q19. When a developer fixes a bug and deploys a patch, what is the FIRST action a QE must perform?
* (A) Full system regression testing
* (B) Retesting the exact bug reproduction steps in the updated build
* (C) Close the bug ticket without verification
* (D) Perform load testing
* **Correct Answer:** **(B)**
* **Explanation:** Retesting confirms that the reported defect is resolved before investing time in wider regression testing.

#### Q20. What is **Mutation Testing**?
* (A) Injecting deliberate code changes (mutations) into source code to verify whether the test suite detects them (evaluating test suite quality)
* (B) Testing on multiple mobile operating systems
* (C) Testing software in foreign languages
* (D) Testing network firewall rules
* **Correct Answer:** **(A)**
* **Explanation:** Mutation testing evaluates the effectiveness of unit/functional tests: if a mutant code change is not caught by any test, the test suite has coverage gaps.

#### Q21. Which testing type evaluates system behavior beyond normal operational capacity until it breaks?
* (A) Load Testing
* (B) Stress Testing
* (C) Volume Testing
* (D) Endurance Testing
* **Correct Answer:** **(B)**
* **Explanation:** Load testing checks behavior under anticipated load; Stress testing pushes the system beyond maximum limits to observe graceful degradation and recovery.

#### Q22. What is a **Stale Element Reference Exception** in UI automation?
* (A) The element is hidden behind a CSS modal
* (B) The element was present when queried, but the DOM updated or re-rendered, making the previous element reference invalid
* (C) The browser window was closed
* (D) The network connection dropped
* **Correct Answer:** **(B)**
* **Explanation:** Very common in single-page applications (React/Angular): the DOM node is replaced, causing cached WebDriver references to point to detached nodes.

#### Q23. What is **Fuzz Testing**?
* (A) Writing clean unit tests with mocks
* (B) Providing massive volumes of random, invalid, or unexpected data to an application input to detect crashes or memory leaks
* (C) Reviewing user interface typography
* (D) Calculating test execution time
* **Correct Answer:** **(B)**
* **Explanation:** Fuzz testing is a security and reliability technique that feeds malformed payloads to discover unhandled exceptions.

#### Q24. In the Payment Gateway industry, what does **PCI-DSS** compliance enforce regarding test environments?
* (A) Real live customer credit card numbers must NEVER be used or stored in test/staging databases
* (B) Test environments must use plain HTTP
* (C) Tests must only run during business hours
* (D) Developers must execute all tests manually
* **Correct Answer:** **(A)**
* **Explanation:** PCI-DSS (Payment Card Industry Data Security Standard) strictly prohibits using production credit card numbers (PAN) or CVVs in non-production environments. Synthetic tokenized test cards must be used.

#### Q25. What is **Monkey Testing**?
* (A) Testing performed by animal trainers
* (B) Random, erratic user actions (random clicks, keystrokes, screen taps) without any predefined test cases to test system resilience
* (C) Automated performance testing
* (D) Testing device battery life
* **Correct Answer:** **(B)**
* **Explanation:** Monkey testing tests whether unguided, chaotic user interactions can crash the application.

---

### Section 3: Advanced Test Design & Quality Engineering (Qs 26–40)

#### Q26. An input field takes a numeric discount coupon from $10\%$ to $90\%$. What are the invalid boundary values under 2-value BVA?
* (A) $9$ and $91$
* (B) $10$ and $90$
* (C) $0$ and $100$
* (D) $11$ and $89$
* **Correct Answer:** **(A)**
* **Explanation:** Boundaries are 10 and 90. Values immediately outside the boundaries are $10 - 1 = 9$ and $90 + 1 = 91$.

#### Q27. What is **Concolic Testing** in modern quality engineering?
* (A) Combining Concrete execution with Symbolic execution to automatically generate test cases exploring all execution paths
* (B) Testing on concurrent database transactions
* (C) Testing mobile app battery drain
* (D) Writing manual test plans in Word
* **Correct Answer:** **(A)**
* **Explanation:** Concolic (Concrete + Symbolic) execution executes programs with real inputs while gathering symbolic constraints to solve for uncovered branches.

#### Q28. In API testing, what does an **Idempotent** HTTP method mean?
* (A) The method returns 200 OK only on weekends
* (B) Making multiple identical requests has the same side-effect on the server as making a single request
* (C) The method runs faster than other methods
* (D) The method does not require authentication
* **Correct Answer:** **(B)**
* **Explanation:** `GET`, `PUT`, `DELETE` are idempotent: calling `DELETE /orders/1` five times deletes the order on the first call and leaves the server state unchanged on subsequent calls. `POST` is non-idempotent by default.

#### Q29. Which HTTP status code should an API return when a client sends a payload that violates schema validation (e.g. negative payment amount)?
* (A) 200 OK
* (B) 400 Bad Request / 422 Unprocessable Entity
* (C) 500 Internal Server Error
* (D) 404 Not Found
* **Correct Answer:** **(B)**
* **Explanation:** $400$ indicates malformed syntax; $422$ indicates semantic validation errors (e.g. positive number required). A $500$ error indicates a server crash bug that failed to validate client input gracefully!

#### Q30. Why is hardcoded `time.sleep()` considered an anti-pattern in test automation?
* (A) It uses too much CPU
* (B) It makes tests slow and flaky; it either waits longer than necessary or fails if the network takes 1ms longer than the hardcoded sleep
* (C) It requires root permissions
* (D) It cannot be used in Python
* **Correct Answer:** **(B)**
* **Explanation:** Explicit dynamic waits (`WebDriverWait`) poll the DOM condition and continue immediately when the element is ready, minimizing test duration and eliminating flakiness.

#### Q31. In database testing, what is an **Orphan Record**?
* (A) A record with no primary key
* (B) A child table record whose foreign key references a parent table record that has been deleted or does not exist
* (C) An unindexed table
* (D) A table with NULL values
* **Correct Answer:** **(B)**
* **Explanation:** Orphan records violate referential integrity and occur when foreign key constraints or cascading deletes are improperly configured.

#### Q32. What is **Defect Density**?
* (A) Total number of defects divided by the size of the software (e.g., KLOC or Function Points)
* (B) Number of bugs found per hour of testing
* (C) Size of the bug database in gigabytes
* (D) Number of QEs on a project
* **Correct Answer:** **(A)**
* **Explanation:** $\text{Defect Density} = \frac{\text{Defects Found}}{\text{Size (KLOC / Module Count)}}$. Used to benchmark component quality across versions.

#### Q33. What is **Orthogonal Array Testing (OAT)**?
* (A) A statistical technique for pairwise testing that maximizes test coverage across multiple configuration variables while minimizing test count
* (B) Testing 2D arrays in C++
* (C) Testing matrix multiplication algorithms
* (D) Testing geometric software
* **Correct Answer:** **(A)**
* **Explanation:** Pairwise/OAT testing assumes that most software defects are triggered by interactions between at most two parameters. It systematically tests all pairs of parameters rather than the exponential full combination.

#### Q34. When testing microservices, what does **Contract Testing** (e.g. using Pact) verify?
* (A) That legal employment contracts are signed
* (B) That service consumers and service providers agree on shared API request/response formats and schemas without needing integrated end-to-end environments
* (C) That network firewalls are configured
* (D) That databases have passwords
* **Correct Answer:** **(B)**
* **Explanation:** Contract testing prevents breaking changes in microservices by validating that provider outputs satisfy the consumer expectations recorded in a contract.

#### Q35. What is the primary focus of **Endurance (Soak) Testing**?
* (A) Measuring page load time under 1 user
* (B) Running a system under expected load for an extended period (24–72 hours) to detect memory leaks, resource exhaustion, and buffer degradation
* (C) Testing password complexity rules
* (D) Checking font sizes across browsers
* **Correct Answer:** **(B)**
* **Explanation:** Soak testing detects memory leaks where allocated heap is not freed, eventually exhausting RAM after hours of continuous operation.

#### Q36. In a mobile app, what is an **ANR** on Android?
* (A) Android Network Reset
* (B) Application Not Responding (UI thread blocked for $>5$ seconds)
* (C) Automated Node Runner
* (D) Application Native Release
* **Correct Answer:** **(B)**
* **Explanation:** An ANR occurs when an application executes long-running operations (network calls, heavy database I/O) on the main UI thread, freezing the screen for $>5$ seconds.

#### Q37. What is **Code Coverage**?
* (A) The percentage of software features described in the user manual
* (B) A metric measuring the percentage of source code statements, branches, or paths executed during automated testing
* (C) The physical location of developers in an office
* (D) The number of comments in source code
* **Correct Answer:** **(B)**
* **Explanation:** Tools like `pytest-cov` or `JaCoCo` measure Statement, Branch, and Condition coverage to identify un-tested dead code paths.

#### Q38. Can $100\%$ Statement Coverage guarantee that software is free of bugs?
* (A) Yes, because all statements were executed
* (B) No, because statement coverage does not test all branch permutations, boundary conditions, or missing requirement logic
* (C) Yes, if tested on Chrome
* (D) Yes, if tested in Python
* **Correct Answer:** **(B)**
* **Explanation:** A statement like `x = a / b` can have $100\%$ statement coverage with $b = 2$, but will crash with a Division by Zero error when $b = 0$.

#### Q39. What is a **Flaky Test**?
* (A) A test that fails due to compile error
* (B) A test that exhibits non-deterministic outcomes (passes or fails intermittently on the exact same code build without any underlying code change)
* (C) A test written in an old language
* (D) A test with no assertions
* **Correct Answer:** **(B)**
* **Explanation:** Flaky tests are caused by race conditions, network latency, asynchronous DOM rendering, or shared global state. They destroy developer trust in CI pipelines.

#### Q40. In automated testing, what does the **Page Object Model (POM)** pattern solve?
* (A) It speeds up database indexing
* (B) It separates UI locators and page interactions from test scripts, preventing UI changes from breaking multiple test files (high maintainability)
* (C) It compiles Python to binary
* (D) It encrypts network traffic
* **Correct Answer:** **(B)**
* **Explanation:** If a button locator changes, with POM you update it in **one page class** rather than modifying 50 individual test scripts.

---

> **Next Step:** Proceed to [02_Payment_Domain_and_Test_Design.md](./02_Payment_Domain_and_Test_Design.md) to master payment gateway workflows and test case design!
