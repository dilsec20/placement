# 🧠 Stage 2 — Technical Module (AI Literacy + Problem Solving)

> **Type:** MCQ-Based Elimination | **Sections:** AI Literacy, Pseudocode, DSA MCQs, Situational  
> **For ₹13-16 LPA:** This is the HARDEST elimination gate — expect deep questions

---

## 📋 Section Breakdown

| Sub-Section | Questions | Topics |
|-------------|-----------|--------|
| **AI Literacy** | 10-15 MCQs | Gen AI, Prompt Engineering, RAG, LLMs, Responsible AI |
| **Pseudocode** | 15-20 MCQs | Output prediction, loop tracing, array/stack operations |
| **Technical MCQs** | 10-15 MCQs | DSA, OOPs, DBMS/SQL, Networking basics |
| **Situational** | 5-10 MCQs | Workplace scenarios, problem-solving approach |

---

# Part A: AI Literacy PYQs

## 1. Generative AI Fundamentals

### Q1. What is Generative AI?
**Answer:** AI systems that can generate new content (text, images, code, audio) rather than just classifying or analyzing existing data. Examples: ChatGPT, DALL-E, GitHub Copilot.

### Q2. What is a Large Language Model (LLM)?
**Answer:** A deep learning model trained on massive text data that can understand and generate human language. Based on the **Transformer** architecture. Examples: GPT-4, Gemini, LLaMA.

### Q3. How do LLMs generate text?
**Answer:** Through **next-token prediction** — the model predicts the most probable next word/token given the context of all previous tokens. It uses probability distributions (softmax) to sample outputs.

### Q4. What is the difference between Training and Inference?
| Training | Inference |
|----------|-----------|
| Learning from data | Using the trained model |
| Computationally expensive | Relatively lightweight |
| Done once (or fine-tuned) | Done every time model is used |
| Produces model weights | Produces outputs/predictions |

### Q5. What is Tokenization?
**Answer:** The process of breaking text into smaller units (tokens) that the model can process. A token can be a word, subword, or character.
- "Hello world" → ["Hello", " world"] (2 tokens)
- "unhappiness" → ["un", "happiness"] (2 tokens, subword tokenization)

### Q6. What is the "Temperature" parameter?
**Answer:** Controls randomness of output:
- **Temperature = 0:** Deterministic, always picks most likely token (factual tasks)
- **Temperature = 0.7:** Balanced creativity
- **Temperature = 1.0+:** More random, creative (brainstorming, poetry)

### Q7. What are "Hallucinations" in AI?
**Answer:** When an LLM generates confident-sounding but **factually incorrect** or made-up information. Common in tasks requiring real-time data, specific facts, or niche knowledge.

---

## 2. Prompt Engineering

### Q8. What is Prompt Engineering?
**Answer:** The practice of designing and refining input prompts to guide AI models to produce desired outputs effectively.

### Q9. Types of Prompting Techniques

| Technique | Description | Example |
|-----------|-------------|---------|
| **Zero-shot** | No examples given | "Translate to French: Hello" |
| **One-shot** | 1 example given | "cat → animal. dog → ?" |
| **Few-shot** | 2-5 examples given | Multiple input→output pairs before the actual query |
| **Chain-of-Thought (CoT)** | Ask model to "think step by step" | "Solve this math problem. Show your reasoning step by step." |
| **Role/Persona** | Assign a role to the AI | "You are an expert Java developer. Review this code." |
| **Self-Consistency** | Generate multiple answers, pick majority | Run same prompt 5 times, pick most common answer |

### Q10. Which prompting technique reduces hallucinations best?
**Answer:** **Chain-of-Thought (CoT)** prompting — forcing the model to show reasoning steps helps catch logical errors. Combined with **RAG** for factual accuracy.

### Q11. How to improve a bad prompt?

**Bad:** "Write code"  
**Good:** "Write a Java function that takes an integer array and returns the second largest element. Handle edge cases like empty array and single element. Include comments."

**Improvement principles:**
1. Be **specific** about the task
2. Define the **format** of output
3. Provide **context** and constraints
4. Mention **edge cases**
5. Specify the **programming language**

### Q12. What is the difference between Zero-shot and Few-shot?
| Zero-shot | Few-shot |
|-----------|----------|
| No examples in prompt | 2-5 examples in prompt |
| Relies on model's training | Model learns pattern from examples |
| Works for simple, common tasks | Better for niche or ambiguous tasks |
| Less tokens used | More tokens used |

---

## 3. RAG (Retrieval-Augmented Generation)

### Q13. What is RAG?
**Answer:** A technique that combines an LLM with an external knowledge base. Before generating a response, the system **retrieves** relevant documents from a database, then the LLM **generates** a response grounded in that retrieved data.

```
User Query → Retriever (searches knowledge base) → Retrieved Documents → LLM (generates answer using docs + query)
```

### Q14. Why use RAG instead of fine-tuning?

| RAG | Fine-tuning |
|-----|-------------|
| Access real-time, updated data | Uses data frozen at training time |
| No model retraining needed | Requires expensive retraining |
| Can use private company data | Data baked into model weights |
| Reduces hallucinations (grounded) | May still hallucinate |
| Cheaper and faster to implement | Expensive (compute + data) |

### Q15. What are Vector Databases?
**Answer:** Databases that store data as high-dimensional vectors (embeddings). Used in RAG to find semantically similar documents to a query using **cosine similarity** or **dot product**. Examples: Pinecone, ChromaDB, Weaviate.

### Q16. What is an Embedding?
**Answer:** A dense numerical representation (vector) of text/data that captures semantic meaning. Similar meanings → similar vectors.
- "king" - "man" + "woman" ≈ "queen" (in embedding space)

---

## 4. Responsible AI & Ethics

### Q17. Key Principles of Responsible AI

| Principle | Description |
|-----------|-------------|
| **Fairness** | AI should not discriminate based on race, gender, age |
| **Transparency** | Users should know they're interacting with AI |
| **Accountability** | Humans must be responsible for AI decisions |
| **Privacy** | AI must protect user data (GDPR compliance) |
| **Safety** | AI should not cause harm |
| **Explainability** | AI decisions should be interpretable |

### Q18. What is AI Bias?
**Answer:** When AI produces systematically prejudiced results due to biased training data or flawed algorithms. Example: A hiring AI trained mostly on male resumes may discriminate against female candidates.

### Q19. What is the EU AI Act?
**Answer:** First comprehensive AI regulation law. Classifies AI by risk level:
- **Unacceptable risk:** Social scoring, manipulative AI → banned
- **High risk:** Healthcare, law enforcement → strict regulations
- **Limited risk:** Chatbots → transparency requirements
- **Minimal risk:** AI in games, spam filters → no regulation

---

## 5. Agentic AI Concepts

### Q20. What is an AI Agent?
**Answer:** An AI system that can autonomously perform tasks, make decisions, and interact with tools/APIs to achieve a goal. Unlike chatbots, agents can:
- Plan multi-step workflows
- Use external tools (search, code execution, APIs)
- Self-correct based on feedback

### Q21. What is the difference between a Chatbot and an Agent?
| Chatbot | Agent |
|---------|-------|
| Single-turn or multi-turn conversations | Goal-oriented task execution |
| Responds to queries | Takes actions autonomously |
| No tool use | Uses tools (search, code, APIs) |
| Stateless or limited memory | Maintains state across steps |

---

# Part B: Pseudocode MCQs

## Pattern 1: Loop Tracing

### Q22. What is the output?
```
SET x = 1
SET sum = 0
WHILE x <= 5
    sum = sum + x
    x = x + 1
END WHILE
PRINT sum
```
**Answer: 15** (1+2+3+4+5)

---

### Q23. What is the output?
```
SET n = 5
SET fact = 1
FOR i = 1 TO n
    fact = fact * i
END FOR
PRINT fact
```
**Answer: 120** (5! = 1×2×3×4×5)

---

### Q24. What is the output?
```
SET i = 1
SET result = 0
WHILE i <= 10
    IF i MOD 2 == 0 THEN
        result = result + i
    END IF
    i = i + 1
END WHILE
PRINT result
```
**Answer: 30** (2+4+6+8+10)

---

### Q25. What is the output?
```
SET arr = [3, 7, 2, 8, 1, 5]
SET max = arr[0]
FOR i = 1 TO LENGTH(arr) - 1
    IF arr[i] > max THEN
        max = arr[i]
    END IF
END FOR
PRINT max
```
**Answer: 8**

---

## Pattern 2: Nested Loops & Arrays

### Q26. What is the output?
```
SET count = 0
FOR i = 1 TO 4
    FOR j = 1 TO i
        count = count + 1
    END FOR
END FOR
PRINT count
```
**Answer: 10** (1+2+3+4)

---

### Q27. What is the output?
```
SET arr = [1, 2, 3, 4, 5]
SET n = 5
FOR i = 0 TO n/2 - 1
    SET temp = arr[i]
    arr[i] = arr[n - 1 - i]
    arr[n - 1 - i] = temp
END FOR
PRINT arr
```
**Answer: [5, 4, 3, 2, 1]** (Array reversed)

---

### Q28. What is the output?
```
SET a = 5
SET b = 3
SET a = a XOR b    // a = 5^3 = 6
SET b = a XOR b    // b = 6^3 = 5
SET a = a XOR b    // a = 6^5 = 3
PRINT a, b
```
**Answer: 3, 5** (XOR swap without temp variable)

---

## Pattern 3: Recursion

### Q29. What is the output?
```
FUNCTION foo(n)
    IF n <= 0 THEN RETURN 0
    RETURN n + foo(n - 1)
END FUNCTION
PRINT foo(4)
```
**Answer: 10** (4 + 3 + 2 + 1 + 0)

---

### Q30. What is the output?
```
FUNCTION mystery(n)
    IF n == 0 THEN RETURN 1
    RETURN 2 * mystery(n - 1)
END FUNCTION
PRINT mystery(5)
```
**Answer: 32** (2⁵ = 32)

---

## Pattern 4: Stack & Queue

### Q31. What is the output?
```
CREATE STACK s
PUSH s, 10
PUSH s, 20
PUSH s, 30
POP s           // removes 30
PUSH s, 40
PRINT TOP(s)    // top element
PRINT SIZE(s)   // size
```
**Answer: TOP = 40, SIZE = 3** (Stack: [10, 20, 40])

---

### Q32. What is the output?
```
CREATE QUEUE q
ENQUEUE q, 'A'
ENQUEUE q, 'B'
ENQUEUE q, 'C'
DEQUEUE q         // removes 'A'
ENQUEUE q, 'D'
PRINT FRONT(q)
```
**Answer: B** (Queue: [B, C, D])

---

# Part C: Technical MCQs (DSA/OOPs/SQL)

## OOPs Quick-Fire

### Q33. What are the 4 pillars of OOPs?
1. **Encapsulation** — Wrapping data + methods into a class
2. **Abstraction** — Hiding complexity, showing only essentials
3. **Inheritance** — Child class inherits from parent
4. **Polymorphism** — Same interface, different implementations

### Q34. Method Overloading vs Overriding?
| Overloading | Overriding |
|-------------|-----------|
| Same class | Parent-child |
| Different parameters | Same signature |
| Compile-time | Runtime |
| Can change return type | Must be same/covariant |

### Q35. What is the output?
```java
class A {
    void show() { System.out.println("A"); }
}
class B extends A {
    void show() { System.out.println("B"); }
}
A obj = new B();
obj.show();
```
**Answer: B** (Runtime polymorphism)

---

## SQL Quick-Fire

### Q36. Find 2nd highest salary?
```sql
SELECT MAX(salary) FROM employees
WHERE salary < (SELECT MAX(salary) FROM employees);
```

### Q37. WHERE vs HAVING?
| WHERE | HAVING |
|-------|--------|
| Filters rows before GROUP BY | Filters groups after GROUP BY |
| Cannot use aggregates | CAN use aggregates |

### Q38. DELETE vs TRUNCATE?
| DELETE | TRUNCATE |
|--------|----------|
| DML, row-by-row | DDL, drops & recreates |
| WHERE clause allowed | No WHERE |
| Can rollback | Cannot rollback |

---

## Data Structures Quick-Fire

### Q39. Array vs Linked List?
| Array | Linked List |
|-------|-------------|
| Contiguous memory | Non-contiguous |
| O(1) random access | O(n) access |
| O(n) insert/delete | O(1) insert/delete (at known position) |
| Fixed size (static) | Dynamic size |

### Q40. Stack vs Queue?
| Stack | Queue |
|-------|-------|
| LIFO (Last In First Out) | FIFO (First In First Out) |
| Push/Pop from top | Enqueue at rear, Dequeue from front |
| Used for: undo, recursion, backtracking | Used for: BFS, scheduling, buffering |

### Q41. Time complexity of Binary Search?
**Answer: O(log n)** — halves search space each step. Requires sorted array.

---

# Part D: Situational Problem Solving

### Q42. Your teammate hasn't completed their module and the deadline is tomorrow. What do you do?

**Best Answer:** "I would first check what's blocking them and offer to help with any specific issues. If the delay is unavoidable, I would immediately inform the team lead about the risk, propose a plan to prioritize critical features, and volunteer to take on some of the remaining tasks to minimize impact."

### Q43. You notice a bug in production that was caused by someone else's code. What do you do?

**Best Answer:** "I would immediately document the bug with steps to reproduce it, then notify the responsible developer and the team lead. I would focus on finding a quick fix or workaround to minimize customer impact, rather than blaming anyone."

### Q44. Key Qualities Capgemini Tests

```
✅ Collaboration over competition
✅ Ownership and accountability
✅ Clear, proactive communication
✅ Problem-solving over blame
✅ Customer-first mindset
✅ Adaptability to change
```

---

> **Next:** [Stage 3 — Debugging Assessment →](./03_Debugging_Assessment.md) | **Back to** [Main](./README.md)
