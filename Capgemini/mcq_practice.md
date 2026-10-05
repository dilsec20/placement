# 🧠 Capgemini Advanced Technical MCQ Question Bank (3–4 Yr Industry Level)



> **Why This Guide Exists:** 

> Recent candidates from top engineering batches (BTech, MTech, MCA) on [r/Capgemini_india](https://www.reddit.com/r/Capgemini_india/comments/1wt2px9/capgemini_technical_exam/) reported that the **Capgemini Technical & AI Literacy MCQs are "not doable" with traditional campus preparation**. 

> The 2026/2027 assessment has shifted away from basic textbook definitions toward **production-grade engineering questions** typically asked to engineers with 3–4 years of experience: **Vector databases (HNSW), RAG chunking & rerankers, LoRA fine-tuning, Kafka consumer group semantics, Kubernetes probes, Docker namespaces, Distributed Sagas, MVCC isolation anomalies, and Concurrency memory barriers**.



---



## 📑 Table of Contents



1. [🚨 The Reddit Reality: What Capgemini Actually Asks](#-the-reddit-reality-what-capgemini-actually-asks)

2. [🤖 Module 1: Production AI Engineering & LLM Architecture (25 MCQs)](#-module-1-production-ai-engineering--llm-architecture-25-mcqs)

3. [☁️ Module 2: Cloud, DevOps & Distributed Microservices (25 MCQs)](#-module-2-cloud-devops--distributed-microservices-25-mcqs)

4. [🗄️ Module 3: Database Internals, Storage Engines & Concurrency (20 MCQs)](#-module-3-database-internals-storage-engines--concurrency-20-mcqs)

5. [🖥️ Module 4: Operating Systems, Networking & Threading Mechanics (20 MCQs)](#-module-4-operating-systems-networking--threading-mechanics-20-mcqs)

6. [🧩 Module 5: Tricky Pseudocode, Bitwise & Memory Traps (20 MCQs)](#-module-5-tricky-pseudocode-bitwise--memory-traps-20-mcqs)

7. [🏛️ Module 6: Object-Oriented Programming (OOP) Deep Theory & Design Patterns (20 MCQs)](#-module-6-object-oriented-programming-oop-deep-theory--design-patterns-20-mcqs)

8. [🌳 Module 7: Comprehensive Tree Theory (All Types), Heaps (Min/Max) & Advanced DSA (25 MCQs)](#-module-7-comprehensive-tree-theory-all-types-heaps-minmax--advanced-dsa-25-mcqs)

9. [🎯 Strategic Playbook: How to Crack "Impossible" Questions](#-strategic-playbook-how-to-crack-impossible-questions)



---



## 🚨 The Reddit Reality: What Capgemini Actually Asks



Recent candidate feedback from actual test-takers:

> *"The MCQs are not doable man... not one person from my entire batch (BTech, MTech, MCA) had a good experience with those MCQs. 3–4 yrs experienced people will only be able to answer those questions."* — **r/Capgemini_india (Oct 2026)**



### Why Campus Resources (PrepInsta / KN Academy / IndiaBIX) Fail Here

| Traditional Prep Websites Teach | What Capgemini Assessment Actually Tests |

|---|---|

| *"What is an array index?"* | **Cache line alignment ($64ext{B}$ boundaries), false sharing in multi-core CPUs** |

| *"What is an LLM?"* | **HNSW graph traversal ($M, efConstruction$), LoRA $\alpha/r$ rank scaling, Cross-Encoder vs Bi-Encoder rerankers** |

| *"What is a primary key?"* | **B+ Tree leaf splitting vs LSM-Tree compaction, Write-Ahead Log (WAL) recovery, MVCC snapshot isolation** |

| *"What is Docker?"* | **Linux cgroups CPU quotas, PID/Mount namespaces, multi-stage image attack surface reduction** |

| *"What is a REST API?"* | **Idempotency keys with distributed Redis locks, SAGA orchestration vs choreography, Circuit breaker half-open states** |



---



## 🤖 Module 1: Production AI Engineering & LLM Architecture (25 MCQs)



#### Q1. In a production Retrieval-Augmented Generation (RAG) system, why is a Cross-Encoder used as a re-ranker rather than the primary vector search retriever?

- **Options:**

 1. Cross-Encoders cannot compute semantic similarity between texts.

 2. Cross-Encoders pass query and document concatenated into full self-attention ($O((L_q + L_d)^2)$), making them highly accurate but computationally too slow for millions of documents.

 3. Cross-Encoders only support single-character inputs.

 4. Cross-Encoders require documents to be stored as uncompressed audio.

- **✅ Correct Answer:** `2. Cross-Encoders pass query and document concatenated into full self-attention ($O((L_q + L_d)^2)$), making them highly accurate but computationally too slow for millions of documents.`

- **💡 Explanation:** Bi-encoders (like sentence-transformers) independently map queries and passages to dense vectors so search reduces to fast MIPS (Maximum Inner Product Search). Cross-encoders compute all-to-all cross-attention between query and passage tokens, capturing subtle semantic nuances, but are feasible only over the top-K retrieved candidates ($K \approx 20ext{--}100$).



---



#### Q2. When constructing an HNSW (Hierarchical Navigable Small World) index in a vector database (e.g. Pinecone, Milvus, pgvector), what is the direct tradeoff of increasing the parameter `efConstruction`?

- **Options:**

 1. It decreases memory usage while doubling search latency.

 2. It increases build time and index construction memory, but improves recall accuracy during runtime nearest neighbor queries.

 3. It permanently converts all floating point vectors to 8-bit integers.

 4. It limits the maximum number of vectors stored to 256.

- **✅ Correct Answer:** `2. It increases build time and index construction memory, but improves recall accuracy during runtime nearest neighbor queries.`

- **💡 Explanation:** `efConstruction` dictates the size of the dynamic candidate list evaluated during index construction. A larger `efConstruction` evaluates more links, yielding a higher-quality multi-layer graph with superior recall at query time, at the expense of prolonged indexing duration.



---



#### Q3. In Low-Rank Adaptation (LoRA) parameter-efficient fine-tuning, the forward pass computes $h = W_0 x + \Delta W x = W_0 x + \frac{\alpha}{r} B A x$. What is the function of the scalar $\frac{\alpha}{r}$?

- **Options:**

 1. It discards negative weights in base matrix $W_0$.

 2. It scales the magnitude of the adapter update $\Delta W$, ensuring that fine-tuning step sizes remain stable when experimenting with different rank values $r$.

 3. It determines the number of GPU threads allocated to matrix multiplication.

 4. It forces the adapter weights to sum to zero.

- **✅ Correct Answer:** `2. It scales the magnitude of the adapter update $\Delta W$, ensuring that fine-tuning step sizes remain stable when experimenting with different rank values $r$.`

- **💡 Explanation:** $\alpha$ is a constant scaling hyperparameter. Normalizing the update by $\frac{\alpha}{r}$ prevents the learning rate from requiring complete recalibration whenever the rank $r$ is altered.



---



#### Q4. How does QLoRA achieve 4-bit quantization without severe degradation in LLM task performance compared to standard 4-bit integer quantization?

- **Options:**

 1. By truncating the last 50% of the transformer decoder layers.

 2. By using NormalFloat4 (NF4) data type built on the empirical normal distribution of weights, combined with Double Quantization to compress quantization constants.

 3. By replacing floating-point weights with character strings.

 4. By training only the embedding layer and freezing all attention heads.

- **✅ Correct Answer:** `2. By using NormalFloat4 (NF4) data type built on the empirical normal distribution of weights, combined with Double Quantization to compress quantization constants.`

- **💡 Explanation:** Pretrained neural network weights typically follow a normal distribution centered at zero. NF4 segments the theoretical quantiles of a normal distribution equally, providing higher information density per bit than uniform INT4 quantization.



---



#### Q5. What is an **Indirect Prompt Injection** vulnerability in an enterprise LLM application?

- **Options:**

 1. A user directly typing `Ignore all previous instructions` in the chat input box.

 2. An attacker embedding malicious instructions within external data (e.g., a webpage, PDF, or email) that the LLM ingests via a retrieval tool or web scraper.

 3. An attacker intercepting the HTTPS connection between browser and server.

 4. A hardware fault in the GPU's tensor cores.

- **✅ Correct Answer:** `2. An attacker embedding malicious instructions within external data (e.g., a webpage, PDF, or email) that the LLM ingests via a retrieval tool or web scraper.`

- **💡 Explanation:** In indirect prompt injection, the attack payload resides in third-party data processed by the LLM. When retrieved into the context window, the model interprets the untrusted content as system instructions, potentially exfiltrating sensitive data or executing unauthorized tool calls.



---



#### Q6. What does **Reciprocal Rank Fusion (RRF)** accomplish when combining results from Dense (Vector) search and Sparse (BM25) search in a Hybrid Search engine?

- **Options:**

 1. It converts sparse keywords into high-dimensional dense embeddings.

 2. It normalizes disparate scoring scales by scoring documents purely based on their reciprocal rank positions across both result lists: $RRF(d) = \sum \frac{1}{k + r_i(d)}$.

 3. It eliminates all stop words from the SQL database.

 4. It forces the search engine to return exactly one document.

- **✅ Correct Answer:** `2. It normalizes disparate scoring scales by scoring documents purely based on their reciprocal rank positions across both result lists: $RRF(d) = \sum \frac{1}{k + r_i(d)}$.`

- **💡 Explanation:** Vector distance scores (e.g. cosine distance $0.0ext{--}1.0$) and BM25 scores (unbounded positive numbers) cannot be directly added. RRF circumvents calibration problems by considering only the ordinal ranking $r_i(d)$ of documents across systems.



---



#### Q7. When chunking documents for an embedding index, why is a **sliding window with an overlap** (e.g., 512 tokens with 64-token overlap) preferred over strict fixed chunking?

- **Options:**

 1. It halves the storage requirement of the vector database.

 2. It prevents critical semantic context and relationships spanning chunk boundaries from being abruptly severed.

 3. It guarantees that no two chunks have identical embeddings.

 4. It eliminates the need for tokenizer encodings.

- **✅ Correct Answer:** `2. It prevents critical semantic context and relationships spanning chunk boundaries from being abruptly severed.`

- **💡 Explanation:** Fixed chunking without overlap can split a subject from its predicate or a problem statement from its solution across consecutive chunks, rendering individual vector searches incomplete.



---



#### Q8. In the context of LLM decoding parameters, what is the mathematical distinction between `temperature` and `top_p` (nucleus sampling)?

- **Options:**

 1. `temperature` changes the vocabulary size; `top_p` sets the maximum token length.

 2. `temperature` divides logits by scalar $T$ before softmax to reshape probability entropy; `top_p` truncates the probability distribution to the smallest set of tokens whose cumulative probability exceeds $p$.

 3. `temperature` is only used for image models; `top_p` is used for text.

 4. `top_p` multiplies all logits by $-1$.

- **✅ Correct Answer:** `2. `temperature` divides logits by scalar $T$ before softmax to reshape probability entropy; `top_p` truncates the probability distribution to the smallest set of tokens whose cumulative probability exceeds $p$.`

- **💡 Explanation:** Softmax with temperature: $P(w_i) = \frac{e^{z_i / T}}{\sum_j e^{z_j / T}}$. Lower $T$ concentrates mass on high-probability tokens; nucleus sampling dynamically bounds candidate tokens by cumulative density $p$, avoiding tail hallucinations.



---



#### Q9. When evaluating RAG pipelines, what does the **Faithfulness (or Groundedness)** metric specifically measure?

- **Options:**

 1. How fast the vector database responds to nearest-neighbor queries.

 2. Whether the claims made in the generated answer are strictly inferable from the retrieved context documents, without ungrounded external hallucinations.

 3. The number of grammar errors in the prompt.

 4. Whether the user query contains offensive language.

- **✅ Correct Answer:** `2. Whether the claims made in the generated answer are strictly inferable from the retrieved context documents, without ungrounded external hallucinations.`

- **💡 Explanation:** The RAG Triad consists of: (1) Context Relevance (retrieval quality), (2) Groundedness/Faithfulness (hallucination avoidance against context), and (3) Answer Relevance (satisfaction of user intent).



---



#### Q10. What is a key failure mode of **LLM-as-a-judge** evaluation setups?

- **Options:**

 1. LLMs cannot read JSON schemas.

 2. Positional bias (favoring the first presented response in pairwise comparisons) and verbosity bias (favoring longer, verbose answers regardless of correctness).

 3. Inability to evaluate code syntax.

 4. Complete refusal to run automated batch evaluations.

- **✅ Correct Answer:** `2. Positional bias (favoring the first presented response in pairwise comparisons) and verbosity bias (favoring longer, verbose answers regardless of correctness).`

- **💡 Explanation:** Automated evaluation using LLMs displays systemic cognitive artifacts: swapping option order changes the winner in up to 30% of cases, and models systematically over-score wordy responses over concise, correct ones.



---



#### Q11. In an autonomous AI Agent following the **ReAct (Reason + Act)** pattern, what happens when an invoked tool returns an error or exception?

- **Options:**

 1. The agent's neural weights are immediately corrupted.

 2. The tool error is formatted as an observation and injected back into the prompt context, allowing the LLM to inspect the failure, adjust its reasoning, and attempt an alternate tool or parameter.

 3. The agent permanently hangs in an infinite recursion loop.

 4. The operating system kernel terminates the host machine.

- **✅ Correct Answer:** `2. The tool error is formatted as an observation and injected back into the prompt context, allowing the LLM to inspect the failure, adjust its reasoning, and attempt an alternate tool or parameter.`

- **💡 Explanation:** ReAct agents operate in a cycle: Thought $o$ Action $o$ Observation. Runtime errors are fed back as observations so the agent can self-correct, try alternative queries, or gracefully inform the user.



---



#### Q12. Why must agent function/tool definitions adhere to strict JSON Schema specifications with type constraints and property descriptions?

- **Options:**

 1. Because LLMs can only understand binary machine code.

 2. The LLM relies on parameter descriptions to discern intent and maps extracted natural language entities into validated, strongly typed arguments expected by backend APIs.

 3. JSON schemas encrypt API payloads across the public internet.

 4. It prevents the model from using memory during execution.

- **✅ Correct Answer:** `2. The LLM relies on parameter descriptions to discern intent and maps extracted natural language entities into validated, strongly typed arguments expected by backend APIs.`

- **💡 Explanation:** Function calling is constrained decoding where the model predicts token arguments compliant with schemas. Detailed field descriptions serve as semantic guidance for parameter extraction.



---



#### Q13. In modern transformer architectures (such as LLaMA-3), what advantage does **RoPE (Rotary Position Embedding)** provide over absolute sinusoidal positional embeddings?

- **Options:**

 1. It completely replaces the multi-head attention mechanism.

 2. It encodes relative positions by rotating the query and key vectors in complex 2D planes, enabling better generalization to longer context lengths and natural decay of attention over distance.

 3. It eliminates all matrix multiplications in the feedforward network.

 4. It compresses the model vocabulary to 256 tokens.

- **✅ Correct Answer:** `2. It encodes relative positions by rotating the query and key vectors in complex 2D planes, enabling better generalization to longer context lengths and natural decay of attention over distance.`

- **💡 Explanation:** RoPE applies an orthogonal rotation matrix to Query and Key representations such that $\langle R_{\Theta, m} q, R_{\Theta, n} k \rangle$ depends strictly on relative offset $(m - n)$, naturally supporting context extension via techniques like YaRN.



---



#### Q14. What is the primary purpose of **Grouped-Query Attention (GQA)** adopted in modern open-weight LLMs?

- **Options:**

 1. It forces queries to execute across multiple CPU threads.

 2. It shares Key and Value heads across multiple Query heads, drastically reducing the KV cache memory footprint during autoregressive generation with minimal quality loss.

 3. It restricts prompts to a maximum of 100 tokens.

 4. It removes the need for residual connections.

- **✅ Correct Answer:** `2. It shares Key and Value heads across multiple Query heads, drastically reducing the KV cache memory footprint during autoregressive generation with minimal quality loss.`

- **💡 Explanation:** Standard Multi-Head Attention (MHA) maintains independent KV caches per head, causing GPU memory bottlenecks during long-context serving. GQA pools KV heads, striking an optimal balance between Multi-Query Attention (MQA) speed and MHA fidelity.



---



#### Q15. When using the **HyDE (Hypothetical Document Embeddings)** technique in RAG, what is the first step executed before vector retrieval?

- **Options:**

 1. Deleting all punctuation marks from the user prompt.

 2. The LLM generates a hypothetical, synthetic answer to the query, and the embedding of that hypothetical answer is used to search the vector index.

 3. The vector database is dropped and recreated.

 4. The user query is translated to binary ASCII code.

- **✅ Correct Answer:** `2. The LLM generates a hypothetical, synthetic answer to the query, and the embedding of that hypothetical answer is used to search the vector index.`

- **💡 Explanation:** Queries and answer passages occupy different semantic spaces. Embedding a hallucinated/hypothetical answer brings the search vector into document space, capturing relevant passage semantics even if facts in the hypothetical document are partially inaccurate.



---



#### Q16. Which strategy best prevents an autonomous coding agent from executing runaway infinite loops or depleting user token budgets?

- **Options:**

 1. Disabling all error logging in production.

 2. Implementing hard max-step bounds, token consumption caps, deterministic loop-detection heuristics (tracking repeated consecutive identical tool calls), and strict tool timeouts.

 3. Removing all type hints from source code.

 4. Running the model only on weekends.

- **✅ Correct Answer:** `2. Implementing hard max-step bounds, token consumption caps, deterministic loop-detection heuristics (tracking repeated consecutive identical tool calls), and strict tool timeouts.`

- **💡 Explanation:** As evidenced in actual Capgemini AI assessments, naive prompts cause agent loops. Production systems require guardrails, step bounds, and state history analysis to terminate stuck iterations.



---



#### Q17. How does **Product Quantization (PQ)** compress vectors in high-scale vector search engines?

- **Options:**

 1. By deleting every second coordinate in the embedding vector.

 2. By decomposing $D$-dimensional vectors into $M$ smaller sub-vectors, clustering each subspace with k-means into centroids, and storing vectors as short arrays of centroid index bytes.

 3. By hashing vector text with MD5.

 4. By rounding all floating point numbers to either 0 or 1.

- **✅ Correct Answer:** `2. By decomposing $D$-dimensional vectors into $M$ smaller sub-vectors, clustering each subspace with k-means into centroids, and storing vectors as short arrays of centroid index bytes.`

- **💡 Explanation:** PQ reduces 1536-dimensional FP32 vectors (6144 bytes) to 64 or 96 bytes, enabling billions of vectors to reside in RAM with Asymmetric Distance Computation (ADC).



---



#### Q18. What is the fundamental difference between **DPO (Direct Preference Optimization)** and traditional **RLHF using PPO**?

- **Options:**

 1. DPO requires no human preferences or training data.

 2. DPO mathematically optimizes the policy directly on preference pairs $(y_w, y_l)$ using an implicit reward formulation, eliminating the need to train and host a separate reward model or use reinforcement learning.

 3. DPO only functions on convolutional neural networks.

 4. PPO does not use gradients during backpropagation.

- **✅ Correct Answer:** `2. DPO mathematically optimizes the policy directly on preference pairs $(y_w, y_l)$ using an implicit reward formulation, eliminating the need to train and host a separate reward model or use reinforcement learning.`

- **💡 Explanation:** DPO derives the closed-form solution of the RLHF objective, replacing complex, unstable PPO actor-critic actor loops with a standard cross-entropy loss over preferred vs rejected generation pairs.



---



#### Q19. In RAG context window optimization, what does the **"Lost in the Middle"** phenomenon describe?

- **Options:**

 1. Documents stored in middle database partitions are dropped due to network partitions.

 2. Language models exhibit highest retrieval and reasoning accuracy for information positioned near the extreme beginning or end of the context window, while performance degrades significantly for information located in the middle.

 3. Tokenizers drop middle letters of words exceeding 10 characters.

 4. Vector embeddings collapse to zero in 3D coordinate space.

- **✅ Correct Answer:** `2. Language models exhibit highest retrieval and reasoning accuracy for information positioned near the extreme beginning or end of the context window, while performance degrades significantly for information located in the middle.`

- **💡 Explanation:** Research by Liu et al. revealed that self-attention mechanisms exhibit U-shaped performance curves; critical context placed centrally inside large prompts suffers from lower attention weights than prefix or suffix tokens.



---



#### Q20. What is **Catastrophic Forgetting** when fine-tuning a pretrained LLM on a narrow domain dataset?

- **Options:**

 1. The GPU runs out of VRAM and restarts the operating system.

 2. The fine-tuned model drastically loses its pre-existing general capabilities (e.g. reasoning, coding, common sense) while over-optimizing for the new domain distribution.

 3. The tokenizer deletes special tokens like `<|endoftext|>`.

 4. The model weights decay to zero due to high weight decay coefficients.

- **✅ Correct Answer:** `2. The fine-tuned model drastically loses its pre-existing general capabilities (e.g. reasoning, coding, common sense) while over-optimizing for the new domain distribution.`

- **💡 Explanation:** Unchecked parameter updates overwrite general representations. Mitigation involves LoRA (freezing base weights), replaying general instruction datasets, or regularization penalties.



---



#### Q21. Which metric evaluates the semantic similarity of generated text by matching token embeddings using cosine similarity and maximum greedy matching?

- **Options:**

 1. BLEU-4

 2. ROUGE-1

 3. BERTScore

 4. Levenshtein Distance

- **✅ Correct Answer:** `3. BERTScore`

- **💡 Explanation:** Surface metrics like BLEU and ROUGE rely on exact n-gram overlap, penalizing valid paraphrases. BERTScore computes pairwise cosine similarity between contextual BERT embeddings of candidate and reference tokens.



---



#### Q22. In vector search, under what mathematical condition is **Cosine Similarity** computationally equivalent to the **Dot Product**?

- **Options:**

 1. When all vector dimensions are prime numbers.

 2. When all vectors are normalized to unit length ($L_2ext{ norm} = \|v\| = 1$).

 3. When all matrix elements are non-negative integers.

 4. When Euclidean distance is exactly zero.

- **✅ Correct Answer:** `2. When all vectors are normalized to unit length ($L_2ext{ norm} = \|v\| = 1$).`

- **💡 Explanation:** $ext{Cosine}(u, v) = \frac{u \cdot v}{\|u\| \|v\|}$. If $\|u\| = \|v\| = 1$, the denominator equals 1, reducing cosine similarity to the inner product ($u \cdot v$), which GPUs compute significantly faster via matrix multiplication.



---



#### Q23. What security risk arises from running an AI agent with an unbounded **bash execution tool** in an uncontainerized environment?

- **Options:**

 1. Code compiles without warnings.

 2. The LLM can be manipulated via prompt injection into running destructive shell commands (e.g., `rm -rf /`, exfiltrating environment variables, attacking internal networks).

 3. Python bytecode becomes corrupted.

 4. The browser closes its dev tools tab.

- **✅ Correct Answer:** `2. The LLM can be manipulated via prompt injection into running destructive shell commands (e.g., `rm -rf /`, exfiltrating environment variables, attacking internal networks).`

- **💡 Explanation:** Production agents executing arbitrary shell scripts require ephemerally provisioned gVisor, Firecracker microVMs, or sandboxed unprivileged containers with read-only filesystems and dropped capabilities (`CAP_SYS_ADMIN`).



---



#### Q24. What does **Speculative Decoding** achieve in high-throughput LLM inference engines (e.g. vLLM, TensorRT-LLM)?

- **Options:**

 1. It guesses future user queries before they are submitted.

 2. A small, fast draft model generates candidate tokens cheaply, and the large target model validates multiple tokens in parallel via a single forward pass, increasing generation speed without altering the output distribution.

 3. It replaces GPU RAM with slower flash storage.

 4. It permanently lowers the precision from FP16 to 1-bit.

- **✅ Correct Answer:** `2. A small, fast draft model generates candidate tokens cheaply, and the large target model validates multiple tokens in parallel via a single forward pass, increasing generation speed without altering the output distribution.`

- **💡 Explanation:** LLM token generation is memory-bandwidth bound. Evaluating $K$ draft tokens in parallel on the target model leverages unused compute capacity, accelerating inference by $2imesext{--}3imes$ mathematically losslessly.



---



#### Q25. Why is **KV-cache paged memory allocation (PagedAttention)** essential in production LLM inference servers?

- **Options:**

 1. It compresses weights to 1-bit integers.

 2. Key-Value tensors vary dynamically in length; traditional contiguous allocation causes up to 60–80% memory fragmentation and waste, whereas PagedAttention manages KV states in non-contiguous virtual memory blocks like an OS page table.

 3. It prevents users from querying the model concurrently.

 4. It compiles CUDA kernels into JavaScript.

- **✅ Correct Answer:** `2. Key-Value tensors vary dynamically in length; traditional contiguous allocation causes up to 60–80% memory fragmentation and waste, whereas PagedAttention manages KV states in non-contiguous virtual memory blocks like an OS page table.`

- **💡 Explanation:** Pioneered by vLLM, PagedAttention partitions KV caches into fixed-size physical blocks, eliminating internal/external fragmentation and enabling near-zero memory waste during dynamic concurrent batching.



---



## ☁️ Module 2: Cloud, DevOps & Distributed Microservices (25 MCQs)



#### Q1. When designing an HTTP POST endpoint for financial transactions, why is an **Idempotency-Key** header implemented?

- **Options:**

 1. To encrypt credit card numbers in transit.

 2. To ensure that network retries or duplicate client requests do not result in repeated duplicate executions of the state-changing operation (e.g., double billing).

 3. To enable HTTP/2 server push.

 4. To bypass CORS validation on mobile devices.

- **✅ Correct Answer:** `2. To ensure that network retries or duplicate client requests do not result in repeated duplicate executions of the state-changing operation (e.g., double billing).`

- **💡 Explanation:** If an API client encounters a network timeout after sending payment, it cannot know if the server processed the transaction. Resending with the identical Idempotency-Key allows the server (using a distributed lock/cache) to return the cached response without re-executing payment.



---



#### Q2. What is the fundamental difference between the **Saga Pattern (Orchestration vs Choreography)** for distributed transactions in microservices?

- **Options:**

 1. Orchestration uses no messaging queues; choreography uses only SQL databases.

 2. In Choreography, services react to domain events published by peers without central control; in Orchestration, a centralized controller explicitly invokes service endpoints and manages compensating transactions.

 3. Orchestration is synchronous only; choreography cannot handle failures.

 4. Choreography requires 2-Phase Commit (2PC) locks.

- **✅ Correct Answer:** `2. In Choreography, services react to domain events published by peers without central control; in Orchestration, a centralized controller explicitly invokes service endpoints and manages compensating transactions.`

- **💡 Explanation:** Choreography avoids single points of failure but can lead to cyclic event dependencies. Orchestration centralizes business logic and rollbacks, simplifying state inspection in complex distributed workflows.



---



#### Q3. In a Kubernetes cluster, what is the exact functional distinction between a **LivenessProbe** and a **ReadinessProbe**?

- **Options:**

 1. Liveness probes are for frontend pods; readiness probes are for backend pods.

 2. A failing LivenessProbe causes Kubernetes to kill and restart the container; a failing ReadinessProbe removes the pod's IP from the Service endpoints so it stops receiving incoming traffic without restarting.

 3. A failing ReadinessProbe immediately triggers node drain.

 4. Liveness probes run only once during container startup.

- **✅ Correct Answer:** `2. A failing LivenessProbe causes Kubernetes to kill and restart the container; a failing ReadinessProbe removes the pod's IP from the Service endpoints so it stops receiving incoming traffic without restarting.`

- **💡 Explanation:** If a service is temporarily overwhelmed or loading caches, a readiness probe failure stops traffic routing until it recovers. If a deadlock occurs, a liveness probe failure terminates and restarts the stuck container.



---



#### Q4. In Apache Kafka, what happens when a new consumer is added to an existing **Consumer Group** subscribed to a topic with 6 partitions?

- **Options:**

 1. The topic is paused for all producers until all partitions are purged.

 2. A consumer group rebalance occurs, and partition assignments are redistributed so the new consumer shares the workload, with at most one consumer per partition.

 3. All 6 partitions are duplicated so every consumer reads all messages.

 4. Kafka crashes with an `IllegalStateException`.

- **✅ Correct Answer:** `2. A consumer group rebalance occurs, and partition assignments are redistributed so the new consumer shares the workload, with at most one consumer per partition.`

- **💡 Explanation:** Partitions are the unit of parallelism in Kafka. Within a single consumer group, each partition is consumed by exactly one consumer at any given time. Adding a consumer triggers partition reassignment via group coordinators.



---



#### Q5. Why are **Docker Multi-Stage Builds** considered an essential best practice for production container images?

- **Options:**

 1. They allow containers to execute on multiple operating systems simultaneously.

 2. They separate the build environment (compilers, build tools, SDKs) from the final runtime image, drastically reducing image size and attack surface.

 3. They eliminate the need for container runtime engines like containerd.

 4. They automatically scale pods horizontally in Kubernetes.

- **✅ Correct Answer:** `2. They separate the build environment (compilers, build tools, SDKs) from the final runtime image, drastically reducing image size and attack surface.`

- **💡 Explanation:** Artifacts are compiled in an initial heavy builder stage (`golang`, `maven`). The final production stage uses minimal base images (`scratch` or `alpine`), copying solely the compiled binary without leaking compilers, package managers, or source credentials.



---



#### Q6. What security boundary is established by running Docker containers with `--read-only` root filesystem and a non-root `USER`?

- **Options:**

 1. The container consumes 0 bytes of RAM.

 2. It mitigates privilege escalation and malware persistence by preventing attackers who achieve remote code execution (RCE) from writing binaries to disk or modifying system binaries.

 3. It prevents the container from accepting incoming network traffic.

 4. It automatically enables HTTPS for all endpoints.

- **✅ Correct Answer:** `2. It mitigates privilege escalation and malware persistence by preventing attackers who achieve remote code execution (RCE) from writing binaries to disk or modifying system binaries.`

- **💡 Explanation:** Container escapes frequently rely on writing exploits to `/tmp` or modifying `/bin`. An immutable root filesystem paired with non-root UID blocks persistent file drops and root privilege escalation.



---



#### Q7. In AWS networking, what is the role of a **NAT Gateway** in a Virtual Private Cloud (VPC)?

- **Options:**

 1. It allows external internet users to initiate direct SSH connections to private EC2 instances.

 2. It enables instances in a private subnet to initiate outbound IPv4 connections to the internet (e.g. for software updates) while preventing inbound internet connections from reaching them.

 3. It acts as a DNS resolver for on-premise Active Directory.

 4. It stores database backups on tape drives.

- **✅ Correct Answer:** `2. It enables instances in a private subnet to initiate outbound IPv4 connections to the internet (e.g. for software updates) while preventing inbound internet connections from reaching them.`

- **💡 Explanation:** Private subnet route tables route `0.0.0.0/0` traffic to the NAT Gateway located in a public subnet with an Elastic IP, translating private IPs to maintain outbound egress without exposing instances to inbound ingress.



---



#### Q8. What happens during a **Circuit Breaker** state transition from `OPEN` to `HALF-OPEN` in Resilience4j?

- **Options:**

 1. All calls are immediately routed to the database.

 2. The circuit breaker permits a configured, limited number of trial requests through to the downstream service to test if the service has recovered before fully closing the circuit.

 3. The service restarts itself immediately.

 4. All incoming HTTP requests are permanently dropped with status 404.

- **✅ Correct Answer:** `2. The circuit breaker permits a configured, limited number of trial requests through to the downstream service to test if the service has recovered before fully closing the circuit.`

- **💡 Explanation:** In `OPEN` state, requests fail-fast without hitting the failing downstream service. After a wait duration, it enters `HALF-OPEN`. If trial calls succeed, it transitions to `CLOSED`; if they fail, it returns to `OPEN`.



---



#### Q9. Why is **CORS (Cross-Origin Resource Sharing)** preflight `OPTIONS` request sent by modern web browsers before certain cross-origin HTTP calls?

- **Options:**

 1. To download CSS stylesheets before rendering.

 2. To verify with the remote server whether the actual HTTP method, custom headers, or credentials are authorized before executing potentially state-modifying requests (e.g. `PUT`, `DELETE`, or JSON `POST`).

 3. To negotiate TLS 1.3 cipher suites.

 4. To bypass CDN caching mechanisms.

- **✅ Correct Answer:** `2. To verify with the remote server whether the actual HTTP method, custom headers, or credentials are authorized before executing potentially state-modifying requests (e.g. `PUT`, `DELETE`, or JSON `POST`).`

- **💡 Explanation:** For non-simple HTTP requests (e.g., `Content-Type: application/json` with custom auth headers), the browser dispatches an `OPTIONS` preflight with `Access-Control-Request-Method` to ensure the server explicitly permits cross-origin invocation.



---



#### Q10. What vulnerability is created if a web application stores sensitive JWT authentication tokens in browser `localStorage` instead of `HttpOnly`, `Secure`, `SameSite` cookies?

- **Options:**

 1. The token expires immediately after 1 minute.

 2. The token is accessible by any JavaScript running in the page context, making it vulnerable to total credential theft via Cross-Site Scripting (XSS).

 3. The token cannot be decoded on backend servers.

 4. The browser blocks all outgoing fetch requests.

- **✅ Correct Answer:** `2. The token is accessible by any JavaScript running in the page context, making it vulnerable to total credential theft via Cross-Site Scripting (XSS).`

- **💡 Explanation:** `localStorage` has no access restrictions for client-side scripts. An injected XSS payload can execute `localStorage.getItem('token')` and exfiltrate it. `HttpOnly` cookies cannot be read by JavaScript.



---



#### Q11. In distributed caching, what is a **Cache Stampede (or Thundering Herd)** and how is it mitigated?

- **Options:**

 1. When cache memory reaches 100% capacity and corrupts files.

 2. When a heavily queried cache key expires, causing thousands of concurrent client requests to miss simultaneously and crush the underlying database; mitigated using distributed locks (mutexes) or probabilistic early expiration (XFetch).

 3. When Redis nodes disconnect from each other.

 4. When network routers drop UDP packets.

- **✅ Correct Answer:** `2. When a heavily queried cache key expires, causing thousands of concurrent client requests to miss simultaneously and crush the underlying database; mitigated using distributed locks (mutexes) or probabilistic early expiration (XFetch).`

- **💡 Explanation:** If key expiration causes high-concurrency requests to query the database concurrently to rebuild the cache, the database can experience sudden CPU exhaustion. Mutual exclusion locks ensure only one request regenerates the cache.



---



#### Q12. What is the fundamental difference between **Horizontal Pod Autoscaling (HPA)** and **Vertical Pod Autoscaling (VPA)** in Kubernetes?

- **Options:**

 1. HPA scales pods on AWS; VPA scales pods on Azure.

 2. HPA adjusts the number of replica pods based on observed CPU/memory or custom metrics; VPA adjusts the CPU and memory resource requests/limits of existing containers.

 3. HPA runs only on master nodes; VPA runs on worker nodes.

 4. VPA doubles the number of worker nodes in the cluster.

- **✅ Correct Answer:** `2. HPA adjusts the number of replica pods based on observed CPU/memory or custom metrics; VPA adjusts the CPU and memory resource requests/limits of existing containers.`

- **💡 Explanation:** HPA scales out/in by changing `spec.replicas` in Deployments/StatefulSets. VPA scales up/down individual container sizing, typically requiring pod eviction and restart unless in-place resize features are enabled.



---



#### Q13. In distributed systems, what does **CAP Theorem** state regarding network partitions?

- **Options:**

 1. Network partitions can be prevented 100% through high-end optical cables.

 2. When a network partition occurs, a distributed system must fundamentally choose between Consistency (all nodes return the latest data or error) and Availability (every non-failing node returns a response, possibly stale).

 3. A system can achieve Consistency, Availability, and Partition Tolerance simultaneously at all times.

 4. Partition tolerance is optional in multi-data-center deployments.

- **✅ Correct Answer:** `2. When a network partition occurs, a distributed system must fundamentally choose between Consistency (all nodes return the latest data or error) and Availability (every non-failing node returns a response, possibly stale).`

- **💡 Explanation:** Network partitions are unavoidable in physical networks. In the presence of a partition ($P$), a system can either accept writes on isolated nodes (violating $C$) or reject writes to maintain consistency across replicas (violating $A$).



---



#### Q14. What is the primary purpose of a **Dead Letter Queue (DLQ)** in asynchronous message-driven architectures?

- **Options:**

 1. To automatically delete old log files from disk.

 2. To quarantine messages that cannot be processed successfully after a maximum retry threshold, preventing poisonous messages from blocking the queue while allowing inspection and reprocessing.

 3. To encrypt messages sent across public subnets.

 4. To speed up consumer throughput by discarding unread messages.

- **✅ Correct Answer:** `2. To quarantine messages that cannot be processed successfully after a maximum retry threshold, preventing poisonous messages from blocking the queue while allowing inspection and reprocessing.`

- **💡 Explanation:** Without a DLQ, malformed messages cause consumer crashes and repeated redeliveries in an infinite loop, starving valid messages of processing resources.



---



#### Q15. In TLS 1.3 handshake, how does **0-RTT (Zero Round Trip Time) resumption** improve latency, and what security risk does it introduce?

- **Options:**

 1. It disables all encryption; introduces no risk.

 2. It allows clients to send application data in the very first flight using pre-shared keys from previous sessions, but leaves that initial 0-RTT data vulnerable to replay attacks.

 3. It replaces TCP with UDP for all streaming video.

 4. It requires client certificates for every request.

- **✅ Correct Answer:** `2. It allows clients to send application data in the very first flight using pre-shared keys from previous sessions, but leaves that initial 0-RTT data vulnerable to replay attacks.`

- **💡 Explanation:** 0-RTT eliminates the round-trip handshake penalty on reconnection, significantly boosting mobile API latency, but since early data lacks forward secrecy and replay protection, non-idempotent operations (like financial payments) must not be transmitted in 0-RTT.



---



#### Q16. What is the role of an **Ingress Controller** in Kubernetes?

- **Options:**

 1. Managing storage volume attachments on worker nodes.

 2. Operating as a reverse proxy and load balancer that executes routing rules (host-based and path-based) defined in Ingress resources to direct external traffic to cluster Services.

 3. Backing up etcd snapshots to AWS S3.

 4. Compiling application source code inside pods.

- **✅ Correct Answer:** `2. Operating as a reverse proxy and load balancer that executes routing rules (host-based and path-based) defined in Ingress resources to direct external traffic to cluster Services.`

- **💡 Explanation:** Ingress objects are routing metadata declarations; the Ingress Controller (e.g., NGINX, Traefik, Envoy) is the active daemon implementing that configuration via reverse proxying and SSL/TLS termination.



---



#### Q17. How does a **Canary Deployment** reduce production release risk compared to a Blue-Green deployment?

- **Options:**

 1. By completely shutting down production for 2 hours during deployment.

 2. By rolling out the new software version to a small, controlled subset of real users (e.g. 5%) and monitoring error rates and telemetry before progressively routing 100% of traffic.

 3. By duplicating every physical server in the data center.

 4. By disabling database foreign key constraints during upgrades.

- **✅ Correct Answer:** `2. By rolling out the new software version to a small, controlled subset of real users (e.g. 5%) and monitoring error rates and telemetry before progressively routing 100% of traffic.`

- **💡 Explanation:** Canary rollouts expose minimal user populations to potential regressions, allowing automated rollbacks upon metric degradation before widespread impact occurs.



---



#### Q18. In microservices, why should synchronous HTTP chaining (Service A $o$ B $o$ C $o$ D) be avoided in favor of **asynchronous event-driven communication**?

- **Options:**

 1. Because synchronous HTTP is unencrypted.

 2. Synchronous call chains create temporal coupling, amplify latency additively, and propagate cascading failures where any downstream outage causes the entire upstream chain to fail.

 3. Microservices cannot parse JSON payloads.

 4. Asynchronous queues guarantee zero latency.

- **✅ Correct Answer:** `2. Synchronous call chains create temporal coupling, amplify latency additively, and propagate cascading failures where any downstream outage causes the entire upstream chain to fail.`

- **💡 Explanation:** Deep synchronous call graphs multiply failure probabilities: if each service has 99% uptime, 4 chained services yield $0.99^4 \approx 96\%$ availability, whereas asynchronous event queues decouple producers from consumer availability.



---



#### Q19. What is the function of **Prometheus Alertmanager's inhibition rules**?

- **Options:**

 1. To mute alerts from servers located in non-English speaking countries.

 2. To suppress redundant notification alerts if a higher-level, related alert is already firing (e.g. suppressing `InstanceDown` alerts for 100 services if the entire `ClusterNetworkDown` alert is active).

 3. To delete alert history from disk every midnight.

 4. To convert alerts into PDF reports.

- **✅ Correct Answer:** `2. To suppress redundant notification alerts if a higher-level, related alert is already firing (e.g. suppressing `InstanceDown` alerts for 100 services if the entire `ClusterNetworkDown` alert is active).`

- **💡 Explanation:** Alert inhibition mitigates alert fatigue during catastrophic infrastructure incidents by silencing downstream secondary alerts when the root cause alert is already active.



---



#### Q20. In continuous integration (CI) pipelines, what is **Docker Layer Caching** and why is `COPY package*.json ./` executed before `COPY . .`?

- **Options:**

 1. It prevents syntax errors in JavaScript files.

 2. Docker caches layers sequentially; dependency definition files change less frequently than source code, so copying them first avoids re-running expensive dependency installations (`npm install`) on every code change.

 3. It encrypts the node_modules folder.

 4. It is an outdated convention that has no impact on build times.

- **✅ Correct Answer:** `2. Docker caches layers sequentially; dependency definition files change less frequently than source code, so copying them first avoids re-running expensive dependency installations (`npm install`) on every code change.`

- **💡 Explanation:** Docker invalidates all subsequent layer caches as soon as an earlier layer changes. Isolating dependency installation behind dependency manifest files ensures `RUN npm install` runs only when dependencies change.



---



#### Q21. In AWS IAM, what is the principle difference between an **IAM Role** and an **IAM User**?

- **Options:**

 1. IAM Users are for Linux; IAM Roles are for Windows.

 2. An IAM User has permanent long-term credentials (password, access keys); an IAM Role is an identity intended to be assumed dynamically by trusted entities, issuing temporary security credentials via AWS STS.

 3. IAM Roles cannot access Amazon S3.

 4. IAM Users can only exist for 24 hours.

- **✅ Correct Answer:** `2. An IAM User has permanent long-term credentials (password, access keys); an IAM Role is an identity intended to be assumed dynamically by trusted entities, issuing temporary security credentials via AWS STS.`

- **💡 Explanation:** IAM Roles adhere to least privilege and eliminate hardcoded credentials in application code. Workloads running on EC2/ECS assume roles to obtain rotating STS credentials automatically.



---



#### Q22. How does the **Write-Through** cache pattern differ from the **Write-Back (Write-Behind)** cache pattern?

- **Options:**

 1. Write-through writes only to disk; write-back writes only to memory.

 2. Write-Through writes data simultaneously to both the cache and the backing database before acknowledging completion; Write-Back updates the cache immediately and asynchronously flushes updates to the database in batches.

 3. Write-Back causes immediate data corruption on restart.

 4. Write-Through never invalidates entries.

- **✅ Correct Answer:** `2. Write-Through writes data simultaneously to both the cache and the backing database before acknowledging completion; Write-Back updates the cache immediately and asynchronously flushes updates to the database in batches.`

- **💡 Explanation:** Write-Through ensures strong data consistency and eliminates loss upon cache failure at the cost of higher write latency. Write-Back optimizes write throughput for heavy write workloads but risks data loss if the cache node crashes before flushing.



---



#### Q23. What is an **Envoy / Service Mesh Sidecar** proxy's responsibility in a microservice pod?

- **Options:**

 1. Compiling Java bytecode into native machine instructions.

 2. Intercepting all inbound and outbound network traffic to provide mutual TLS (mTLS), traffic shaping, distributed tracing, rate limiting, and observability transparently to application code.

 3. Managing physical hard drive partitions.

 4. Hosting static HTML pages for marketing websites.

- **✅ Correct Answer:** `2. Intercepting all inbound and outbound network traffic to provide mutual TLS (mTLS), traffic shaping, distributed tracing, rate limiting, and observability transparently to application code.`

- **💡 Explanation:** Service meshes (e.g. Istio, Linkerd) decouple operational networking concerns from business applications by co-locating proxy sidecars alongside service containers via iptables redirection.



---



#### Q24. What does **Strict Consistency** mean in distributed database systems compared to **Eventual Consistency**?

- **Options:**

 1. Strict consistency guarantees that all writes are completed in under 1 millisecond.

 2. Under Strict Consistency, any read operation always returns the result of the most recent write regardless of which replica is queried; under Eventual Consistency, replicas may temporarily return stale data until updates propagate.

 3. Strict consistency does not allow database indexes.

 4. Eventual consistency guarantees zero downtime forever.

- **✅ Correct Answer:** `2. Under Strict Consistency, any read operation always returns the result of the most recent write regardless of which replica is queried; under Eventual Consistency, replicas may temporarily return stale data until updates propagate.`

- **💡 Explanation:** Strict consistency requires synchronous quorum replication and coordination across nodes, incurring latency. Eventual consistency replicates asynchronously to maximize throughput and partition resilience.



---



#### Q25. Why is **gRPC with Protocol Buffers** significantly faster and more bandwidth-efficient than traditional REST over JSON?

- **Options:**

 1. gRPC does not use network cables.

 2. Protocol Buffers serialize data into compact binary payloads with strongly typed schemas over persistent HTTP/2 multiplexed streams, avoiding the text serialization overhead and verbose key redundancy of JSON.

 3. gRPC runs without CPU memory.

 4. JSON payloads are restricted to 128 characters.

- **✅ Correct Answer:** `2. Protocol Buffers serialize data into compact binary payloads with strongly typed schemas over persistent HTTP/2 multiplexed streams, avoiding the text serialization overhead and verbose key redundancy of JSON.`

- **💡 Explanation:** JSON repeatedly serializes field names as UTF-8 strings. ProtoBuf uses field tag integers and packed varints over multiplexed HTTP/2 framing, reducing payload sizes by 60–80% and deserialization CPU cycles by orders of magnitude.



---



## 🗄️ Module 3: Database Internals, Storage Engines & Concurrency (20 MCQs)



#### Q1. What is the primary reason relational databases (PostgreSQL, MySQL InnoDB) use **B+ Trees** rather than standard binary search trees (BST) or B-Trees for disk-backed indexing?

- **Options:**

 1. B+ Trees require no memory to search.

 2. High branching factor minimizes disk I/O seeks, and storing all data pointers exclusively in doubly linked leaf nodes enables highly efficient sequential range scans.

 3. BSTs cannot store integer numbers.

 4. B+ Trees permanently prevent deadlock.

- **✅ Correct Answer:** `2. High branching factor minimizes disk I/O seeks, and storing all data pointers exclusively in doubly linked leaf nodes enables highly efficient sequential range scans.`

- **💡 Explanation:** Disk page seeks are physical mechanical/electronic bottlenecks. A B+ Tree node matches the disk block size ($4ext{KB}ext{--}16ext{KB}$), packing hundreds of keys per node to maintain tree depth $\le 4$ for millions of rows. Linked leaf nodes allow $O(\log N + K)$ range queries without traversing parent nodes.



---



#### Q2. In transactional databases, what specific anomaly is prevented by the **REPEATABLE READ** isolation level that is permitted under **READ COMMITTED**?

- **Options:**

 1. Dirty Read

 2. Non-Repeatable (Fuzzy) Read

 3. Deadlock

 4. Primary Key Violation

- **✅ Correct Answer:** `2. Non-Repeatable (Fuzzy) Read`

- **💡 Explanation:** Under READ COMMITTED, if Transaction A reads a row, and Transaction B updates and commits that row, Transaction A re-reading the same row will see the new modified values (Non-Repeatable Read). REPEATABLE READ locks rows or uses MVCC snapshot reads to ensure repeated queries within the same transaction yield identical row states.



---



#### Q3. How does **Multi-Version Concurrency Control (MVCC)** prevent read operations from blocking write operations and write operations from blocking read operations?

- **Options:**

 1. By deleting older database tables every hour.

 2. Instead of overwriting rows in-place with exclusive locks, modifications create new versioned row tuples with transaction ID metadata ($xmin, xmax$ in Postgres), allowing readers to access a consistent point-in-time snapshot without acquiring locks.

 3. By forcing all queries to run sequentially in one thread.

 4. By storing all tables in unencrypted cookies.

- **✅ Correct Answer:** `2. Instead of overwriting rows in-place with exclusive locks, modifications create new versioned row tuples with transaction ID metadata ($xmin, xmax$ in Postgres), allowing readers to access a consistent point-in-time snapshot without acquiring locks.`

- **💡 Explanation:** In MVCC, readers never block writers and writers never block readers. Older row versions remain visible to concurrent active transactions until no active transaction requires them, after which vacuum processes reclaim disk space.



---



#### Q4. Why do NoSQL write-heavy databases (like Apache Cassandra, RocksDB, Google Bigtable) use **LSM-Trees (Log-Structured Merge-Trees)** instead of B+ Trees?

- **Options:**

 1. LSM-Trees do not support disk storage.

 2. LSM-Trees append all incoming writes sequentially to an in-memory MemTable and Write-Ahead Log (WAL), converting random disk writes into high-throughput sequential disk writes before background compaction into immutable SSTables.

 3. LSM-Trees eliminate the need for primary keys.

 4. B+ Trees cannot store string data.

- **✅ Correct Answer:** `2. LSM-Trees append all incoming writes sequentially to an in-memory MemTable and Write-Ahead Log (WAL), converting random disk writes into high-throughput sequential disk writes before background compaction into immutable SSTables.`

- **💡 Explanation:** Random disk writes degrade I/O bandwidth. LSM-Trees buffer mutations in memory and flush sequentially, maximizing write performance at the expense of higher read amplification mitigated by Bloom filters.



---



#### Q5. What is a **Covering Index** in SQL optimization and why does it drastically accelerate query execution?

- **Options:**

 1. An index that encrypts the table from unauthorized users.

 2. An index that contains all columns requested by the `SELECT`, `WHERE`, and `JOIN` clauses, enabling the database engine to satisfy the query entirely from the index tree without executing secondary lookups to the clustered table heap.

 3. An index placed across all tables in a database simultaneously.

 4. An index that runs without using CPU cycles.

- **✅ Correct Answer:** `2. An index that contains all columns requested by the `SELECT`, `WHERE`, and `JOIN` clauses, enabling the database engine to satisfy the query entirely from the index tree without executing secondary lookups to the clustered table heap.`

- **💡 Explanation:** When an index covers a query, the execution plan displays `Using index`. The engine eliminates the secondary step of dereferencing row IDs to fetch data blocks from the primary clustered table, cutting I/O operations significantly.



---



#### Q6. What is the function of the **Write-Ahead Log (WAL)** in relational database management systems?

- **Options:**

 1. Logging user passwords in plain text for debugging.

 2. Enforcing the Atomicity and Durability (of ACID) by ensuring all transaction changes are flushed to persistent sequential storage before corresponding modified data pages are written to disk tables.

 3. Automatically generating documentation for frontend developers.

 4. Compressing JPEG images stored in columns.

- **✅ Correct Answer:** `2. Enforcing the Atomicity and Durability (of ACID) by ensuring all transaction changes are flushed to persistent sequential storage before corresponding modified data pages are written to disk tables.`

- **💡 Explanation:** In-memory dirty buffer pages are flushed asynchronously. If a power outage occurs, the database replays the sequential WAL during crash recovery (via the ARIES protocol) to redo committed transactions and undo uncommitted ones.



---



#### Q7. In an index defined as `INDEX idx_user (country, state, city)`, which of the following queries CANNOT take advantage of the index due to the **Leftmost Prefix Rule**?

- **Options:**

 1. `WHERE country = 'IN' AND state = 'KA'`

 2. `WHERE country = 'IN'`

 3. `WHERE state = 'KA' AND city = 'Bangalore'`

 4. `WHERE country = 'IN' AND state = 'KA' AND city = 'Bangalore'`

- **✅ Correct Answer:** `3. WHERE state = 'KA' AND city = 'Bangalore'`

- **💡 Explanation:** Composite B+ Tree keys are sorted lexicographically: first by `country`, then `state`, then `city`. A query omitting the leading column `country` cannot traverse the tree and triggers a full table scan.



---



#### Q8. What is the key functional difference between **Optimistic Concurrency Control (OCC)** and **Pessimistic Concurrency Control**?

- **Options:**

 1. OCC is only for read-only queries; pessimistic is for writes.

 2. Pessimistic concurrency locks records immediately upon read (`SELECT ... FOR UPDATE`); OCC allows concurrent reads and writes without row locks, checking a version column or timestamp at commit time to abort if conflicting updates occurred.

 3. OCC completely prevents all transaction rollbacks.

 4. Pessimistic concurrency is faster in high-contention systems.

- **✅ Correct Answer:** `2. Pessimistic concurrency locks records immediately upon read (`SELECT ... FOR UPDATE`); OCC allows concurrent reads and writes without row locks, checking a version column or timestamp at commit time to abort if conflicting updates occurred.`

- **💡 Explanation:** OCC is optimal for low-contention scenarios (e-commerce browsing, profile updates), avoiding lock overhead. Pessimistic locking is suited for high-contention critical paths (seat bookings, inventory depletion) to avoid repeated rollback cascades.



---



#### Q9. What anomaly does **Phantom Read** describe in database transactions?

- **Options:**

 1. Reading a row whose data has been encrypted by another user.

 2. A transaction re-executing a range query (e.g. `WHERE age > 30`) and discovering newly inserted or deleted rows that satisfy the predicate because another transaction committed them in the interim.

 3. Reading database blocks that have been physically deleted from disk.

 4. Querying a table that does not exist in the schema.

- **✅ Correct Answer:** `2. A transaction re-executing a range query (e.g. `WHERE age > 30`) and discovering newly inserted or deleted rows that satisfy the predicate because another transaction committed them in the interim.`

- **💡 Explanation:** Unlike Non-Repeatable Read (which modifies existing individual rows), Phantom Reads involve new rows appearing in a search range. It is prevented by `SERIALIZABLE` isolation via predicate locking or Next-Key locks.



---



#### Q10. In database query optimization, why can `SELECT COUNT(DISTINCT user_id)` become a major performance bottleneck on billion-row tables, and what probabilistic structure provides a fast alternative?

- **Options:**

 1. It uses no CPU; replaced with MD5 hashing.

 2. Exact distinct counting requires maintaining a hash set of all unique keys in memory, causing severe RAM pressure and disk spilling; **HyperLogLog (HLL)** provides approximate distinct counts in fixed memory (e.g., $1.5ext{KB}$) with $\approx 1\%$ standard error.

 3. `COUNT(DISTINCT)` is unsupported in SQL.

 4. It can only run on single-core processors.

- **✅ Correct Answer:** `2. Exact distinct counting requires maintaining a hash set of all unique keys in memory, causing severe RAM pressure and disk spilling; **HyperLogLog (HLL)** provides approximate distinct counts in fixed memory (e.g., $1.5ext{KB}$) with $\approx 1\%$ standard error.`

- **💡 Explanation:** HyperLogLog calculates the maximum number of leading zeros in hashed representations of elements to estimate cardinality accurately with logarithmic memory footprint.



---



## 🖥️ Module 4: Operating Systems, Networking & Threading Mechanics (20 MCQs)



#### Q1. According to Brian Goetz's classic formula in *Java Concurrency in Practice*, how should an optimal thread pool size be calculated for a thread pool executing tasks on a machine with $N_{ext{CPU}}$ cores?

- **Options:**

 1. $N_{ext{threads}} = N_{ext{CPU}} + 1$ always, regardless of task characteristics.

 2. $N_{ext{threads}} = N_{ext{CPU}} imes U_{ext{CPU}} imes \left(1 + \frac{W}{C}\right)$, where $U_{ext{CPU}}$ is target CPU utilization ($0 \le U \le 1$), $W$ is wait time (I/O, database), and $C$ is computation time.

 3. $N_{ext{threads}} = 1000$ fixed.

 4. $N_{ext{threads}} = N_{ext{CPU}}^2$.

- **✅ Correct Answer:** `2. $N_{ext{threads}} = N_{ext{CPU}} imes U_{ext{CPU}} imes \left(1 + \frac{W}{C}\right)$, where $U_{ext{CPU}}$ is target CPU utilization ($0 \le U \le 1$), $W$ is wait time (I/O, database), and $C$ is computation time.`

- **💡 Explanation:** For pure compute-bound tasks ($W/C \approx 0$), $N_{ext{threads}} \approx N_{ext{CPU}} + 1$ prevents thread context-switching overhead. For I/O-bound tasks where threads spend 90% of time waiting ($W/C = 9$), higher thread counts keep cores saturated.



---



#### Q2. What memory visibility guarantee does the `volatile` keyword provide in Java and C# multi-threaded programming?

- **Options:**

 1. It makes composite operations like `count++` atomic.

 2. It enforces a memory barrier preventing instruction reordering across the variable and guarantees that writes by one thread are immediately visible to subsequent reads by other threads via direct main memory synchronization.

 3. It locks the object monitor like `synchronized`.

 4. It allocates the variable on the CPU register permanently.

- **✅ Correct Answer:** `2. It enforces a memory barrier preventing instruction reordering across the variable and guarantees that writes by one thread are immediately visible to subsequent reads by other threads via direct main memory synchronization.`

- **💡 Explanation:** `volatile` guarantees visibility and ordering (happens-before relationship), but does NOT guarantee atomicity for non-atomic read-modify-write compound operations (such as `x++`).



---



#### Q3. In TCP connection termination, why must the initiating host enter the **TIME_WAIT** state and remain there for $2 imes ext{MSL}$ (Maximum Segment Lifetime)?

- **Options:**

 1. To allow CPU temperatures to cool down.

 2. To ensure that the final ACK was received by the remote peer (resending ACK if remote retransmits FIN) and to prevent lingering delayed duplicate packets from old connections colliding with new connections reusing the same port.

 3. To negotiate the TLS certificate.

 4. To download remaining buffer bytes from RAM.

- **✅ Correct Answer:** `2. To ensure that the final ACK was received by the remote peer (resending ACK if remote retransmits FIN) and to prevent lingering delayed duplicate packets from old connections colliding with new connections reusing the same port.`

- **💡 Explanation:** If the final ACK is lost, the peer retransmits FIN. Without TIME_WAIT, the host would respond with RST. Remaining in TIME_WAIT for $2 ext{MSL}$ (typically 60–120s) clears all orphaned in-flight network packets.



---



#### Q4. What is **False Sharing** in high-performance multi-threaded applications on modern multi-core processors?

- **Options:**

 1. Threads sharing passwords over an insecure network socket.

 2. When two independent threads running on different cores update independent variables that happen to reside on the same $64ext{-byte}$ CPU cache line, causing constant cache-coherency invalidations and severe performance degradation.

 3. Multiple processes sharing a single virtual memory page.

 4. An operating system scheduler failing to assign threads to idle cores.

- **✅ Correct Answer:** `2. When two independent threads running on different cores update independent variables that happen to reside on the same $64ext{-byte}$ CPU cache line, causing constant cache-coherency invalidations and severe performance degradation.`

- **💡 Explanation:** CPU caches maintain coherency at the granularity of cache lines (64 bytes). When Core 1 writes to variable $A$, the MESI protocol invalidates the entire cache line on Core 2, even if Core 2 only cares about variable $B$ located in the same line. Mitigated via padding (`@Contended` in Java).



---



#### Q5. What are the **Four Coffman Conditions** that must hold simultaneously for a deadlock to occur in an operating system?

- **Options:**

 1. Read, Write, Execute, Delete.

 2. Mutual Exclusion, Hold and Wait, No Preemption, and Circular Wait.

 3. Paging, Swapping, Thrashing, Segmentation.

 4. SYN, ACK, FIN, RST.

- **✅ Correct Answer:** `2. Mutual Exclusion, Hold and Wait, No Preemption, and Circular Wait.`

- **💡 Explanation:** Breaking any single condition completely prevents deadlocks: imposing a global resource acquisition hierarchy eliminates Circular Wait; requiring all locks up front eliminates Hold and Wait.



---



#### Q6. How does the **Compare-And-Swap (CAS)** atomic CPU primitive enable lock-free concurrency (e.g. `AtomicInteger`, `ConcurrentLinkedQueue`)?

- **Options:**

 1. It halts all other CPU cores until the write completes.

 2. It checks if the memory location contains an expected old value; if equal, it updates to the new value in a single atomic instruction; if not, the thread loops and retries without entering OS kernel sleep state.

 3. It writes memory directly to magnetic disk storage.

 4. It relies on the operating system's kernel scheduler mutex.

- **✅ Correct Answer:** `2. It checks if the memory location contains an expected old value; if equal, it updates to the new value in a single atomic instruction; if not, the thread loops and retries without entering OS kernel sleep state.`

- **💡 Explanation:** Hardware instructions like `CMPXCHG` on x86 execute comparison and replacement atomically at the hardware bus level, bypassing heavy kernel context-switch penalties associated with mutex locks.



---



#### Q7. What is the fundamental throughput advantage of **HTTP/2 Multiplexing** over HTTP/1.1 pipelining?

- **Options:**

 1. HTTP/2 eliminates the need for TCP handshakes.

 2. HTTP/2 breaks requests and responses into independent binary frames tagged with stream IDs over a single shared TCP connection, completely eliminating application-level Head-of-Line (HoL) blocking where a slow response stalls all subsequent requests.

 3. HTTP/2 encrypts data using quantum key distribution.

 4. HTTP/2 increases the MTU packet size to 1 Gigabyte.

- **✅ Correct Answer:** `2. HTTP/2 breaks requests and responses into independent binary frames tagged with stream IDs over a single shared TCP connection, completely eliminating application-level Head-of-Line (HoL) blocking where a slow response stalls all subsequent requests.`

- **💡 Explanation:** In HTTP/1.1, responses must arrive strictly in the order requested on that connection. A slow database query blocks the queue. In HTTP/2, interleaved frames from multiple streams travel concurrently across a single socket.



---



#### Q8. What problem led to the invention of **HTTP/3 using QUIC over UDP** instead of relying on HTTP/2 over TCP?

- **Options:**

 1. TCP packet headers are too short to hold URLs.

 2. In HTTP/2, a single dropped TCP packet causes TCP-level Head-of-Line blocking, forcing the kernel to stall all independent multiplexed HTTP streams until the dropped packet is retransmitted; QUIC over UDP handles lost packets per-stream independently.

 3. UDP is faster because it does not support encryption.

 4. HTTP/2 cannot run over WiFi networks.

- **✅ Correct Answer:** `2. In HTTP/2, a single dropped TCP packet causes TCP-level Head-of-Line blocking, forcing the kernel to stall all independent multiplexed HTTP streams until the dropped packet is retransmitted; QUIC over UDP handles lost packets per-stream independently.`

- **💡 Explanation:** Because TCP enforces in-order byte delivery, one dropped packet halts all data buffers. QUIC encapsulates stream logic inside UDP, ensuring a dropped packet in Stream 1 never blocks delivery of frames in Stream 2.



---



#### Q9. What is a **Memory Leak** in a garbage-collected language like Java or C#?

- **Options:**

 1. Hardware RAM modules physically losing electric charge.

 2. Unused objects that remain unintentionally reachable from a GC root (e.g. static collections, unclosed event listeners, thread locals), preventing the garbage collector from reclaiming their allocated heap memory.

 3. Writing array indices beyond the bounds of the array.

 4. Running out of stack space during infinite recursion.

- **✅ Correct Answer:** `2. Unused objects that remain unintentionally reachable from a GC root (e.g. static collections, unclosed event listeners, thread locals), preventing the garbage collector from reclaiming their allocated heap memory.`

- **💡 Explanation:** Garbage collectors perform reachability analysis from GC roots (static references, stack variables, thread references). If an application appends objects to an unbounded static map or forgets to deregister listeners, the memory is permanently uncollectable.



---



#### Q10. What is the **ABA Problem** in lock-free concurrent programming, and how is it resolved?

- **Options:**

 1. When threads write strings containing only letters A and B.

 2. When a thread reads value A, is preempted, another thread changes A $o$ B and back $o$ A; the first thread wakes up, finds value A unchanged, and incorrectly assumes the state was never modified; solved via tagged pointers / version stamps (e.g. `AtomicStampedReference`).

 3. When an array cannot be sorted alphabetically.

 4. When CPU registers invert their binary polarity.

- **✅ Correct Answer:** `2. When a thread reads value A, is preempted, another thread changes A $o$ B and back $o$ A; the first thread wakes up, finds value A unchanged, and incorrectly assumes the state was never modified; solved via tagged pointers / version stamps (e.g. `AtomicStampedReference`).`

- **💡 Explanation:** CAS checks value equality, not mutation history. In linked structures, if node A was popped, freed, and reallocated at the identical memory address, a naive CAS succeeds while corrupting pointers. Version stamping associates an incremental integer stamp with the pointer.



---



## 🧩 Module 5: Tricky Pseudocode, Bitwise & Memory Traps (20 MCQs)



#### Q1. What is the output of the following pseudocode?

```text

Integer a = 12, b = 25

Integer c = a ^ b

Integer d = c & (~a)

Print d

```

- **Options:** 1) 12 &nbsp;&nbsp; 2) 21 &nbsp;&nbsp; 3) 17 &nbsp;&nbsp; 4) 25

- **✅ Correct Answer:** `3. 17`

- **💡 Explanation:**

 - $a = 12 = 01100_2$

 - $b = 25 = 11001_2$

 - $c = a \oplus b = 01100_2 \oplus 11001_2 = 10101_2 = 21$

 - $\sim a = \dots 11110011_2$

 - $d = c \ \& \ (\sim a) = 10101_2 \ \& \ 10011_2 = 10001_2 = 17$.



---



#### Q2. What does the bitwise expression `x & (x - 1)` evaluate to for any positive integer `x`?

- **Options:**

 1. It isolates the most significant bit.

 2. It clears (sets to 0) the lowest set bit (rightmost 1-bit) of `x`.

 3. It multiplies `x` by 2.

 4. It checks whether `x` is an odd number.

- **✅ Correct Answer:** `2. It clears (sets to 0) the lowest set bit (rightmost 1-bit) of `x`.`

- **💡 Explanation:** Subtracting 1 inverts all bits up to and including the lowest set bit. Bitwise ANDing with the original number preserves all higher bits while toggling the lowest set bit to 0 (Brian Kernighan's bit-counting algorithm). If `x & (x - 1) == 0`, `x` is a power of 2.



---



#### Q3. What is the return value of `solve(4)` given the recursive function below?

```text

Integer solve(Integer n)

  Static Integer x = 0

  If (n <= 0)

    Return 1

  End If

  x = x + 1

  Return solve(n - 1) + x

End Function

```

- **Options:** 1) 11 &nbsp;&nbsp; 2) 17 &nbsp;&nbsp; 3) 25 &nbsp;&nbsp; 4) 15

- **✅ Correct Answer:** `2. 17`

- **💡 Explanation:**

 - `x` is static and retains its value across all recursive invocations.

 - Call stack unwinding:

  - `solve(4)`: $x=1$, calls `solve(3)`

  - `solve(3)`: $x=2$, calls `solve(2)`

  - `solve(2)`: $x=3$, calls `solve(1)`

  - `solve(1)`: $x=4$, calls `solve(0)`

  - `solve(0)`: returns 1 ($x=4$ remains static!)

 - Backtracking returns:

  - `solve(1)` returns $1 + 4 = 5$

  - `solve(2)` returns $5 + 4 = 9$

  - `solve(3)` returns $9 + 4 = 13$

  - `solve(4)` returns $13 + 4 = 17$.



---



#### Q4. What is the output of the following pseudocode?

```text

Integer a = 7, b = 4

Integer result = (a >> 1) + (b << 2) ^ (a & b)

Print result

```

- **Options:** 1) 19 &nbsp;&nbsp; 2) 23 &nbsp;&nbsp; 3) 15 &nbsp;&nbsp; 4) 27

- **✅ Correct Answer:** `2. 23`

- **💡 Explanation:**

 - Operator precedence: Shift (`>>`, `<<`) and Addition (`+`) take precedence over Bitwise XOR (`^`).

 - `a >> 1` = $7 >> 1 = 3$.

 - `b << 2` = $4 << 2 = 16$.

 - `(a >> 1) + (b << 2)` = $3 + 16 = 19$.

 - `a & b` = $7 \ \& \ 4 = 4$.

 - `result` = $19 \oplus 4 = 10011_2 \oplus 00100_2 = 10111_2 = 23$.



---



#### Q5. What is the value of `count` after executing this loop?

```text

Integer n = 60

Integer count = 0

While (n > 0)

  n = n & (n - 1)

  count = count + 1

End While

Print count

```

- **Options:** 1) 60 &nbsp;&nbsp; 2) 4 &nbsp;&nbsp; 3) 6 &nbsp;&nbsp; 4) 16

- **✅ Correct Answer:** `2. 4`

- **💡 Explanation:**

 - $60 = 32 + 16 + 8 + 4 = 111100_2$.

 - The loop clears one set bit per iteration.

 - Count of set bits (Hamming weight) in $60$ is 4.



---



#### Q6. What happens when compiling and running this C/C++ memory snippet?

```cpp

int* getPointer() {

  int local_val = 42;

  return &local_val;

}

```

- **Options:**

 1. The code returns a permanent reference stored on the heap.

 2. Undefined behavior; returning a pointer to a stack-allocated local variable that is destroyed once `getPointer()` pops off the stack frame (dangling pointer).

 3. The compiler allocates the variable on CPU cache.

 4. The code throws a runtime `NullPointerException`.

- **✅ Correct Answer:** `2. Undefined behavior; returning a pointer to a stack-allocated local variable that is destroyed once `getPointer()` pops off the stack frame (dangling pointer).`

- **💡 Explanation:** Local variables live on the activation record of the function's stack frame. When the function returns, that frame is marked free for reuse by subsequent function calls, resulting in memory corruption if dereferenced.



---



#### Q7. What will be printed by the following code?

```text

Integer arr[5] = {2, 4, 6, 8, 10}

Integer *p = arr

*(p + 2) = *(p + 1) * 3

Print arr[2]

```

- **Options:** 1) 6 &nbsp;&nbsp; 2) 12 &nbsp;&nbsp; 3) 8 &nbsp;&nbsp; 4) 18

- **✅ Correct Answer:** `2. 12`

- **💡 Explanation:**

 - `p` points to `arr[0]`.

 - `*(p + 1)` dereferences `arr[1]`, which is 4.

 - `*(p + 1) * 3` = $4 imes 3 = 12$.

 - `*(p + 2)` targets `arr[2]` and assigns 12.



---



#### Q8. What does this bitwise function return for any non-negative integer `n`?

```text

Boolean check(Integer n)

  Return (n > 0) AND ((n & -n) == n)

End Function

```

- **Options:**

 1. Returns true if `n` is an odd number.

 2. Returns true if `n` is a power of 2.

 3. Returns true if `n` is a multiple of 10.

 4. Returns true if `n` is a prime number.

- **✅ Correct Answer:** `2. Returns true if `n` is a power of 2.`

- **💡 Explanation:** In two's complement representation, `-n = (~n) + 1`. The expression `n & -n` isolates the lowest set bit of `n`. If that isolated lowest set bit equals `n` itself, `n` has exactly one set bit, meaning it is a power of 2.



---



#### Q9. What is the output of the following nested loop pseudocode?

```text

Integer total = 0

For i = 1 To 4

  For j = i To 4

    If ((i + j) % 2 == 0)

      total = total + (i * j)

    End If

  End For

End For

Print total

```

- **Options:** 1) 32 &nbsp;&nbsp; 2) 41 &nbsp;&nbsp; 3) 48 &nbsp;&nbsp; 4) 38

- **✅ Correct Answer:** `2. 41`

- **💡 Explanation:**

 - $i=1$:

  - $j=1$: $1+1=2$ (even) $\implies total += 1 imes 1 = 1$.

  - $j=2$: $1+2=3$ (odd).

  - $j=3$: $1+3=4$ (even) $\implies total += 1 imes 3 = 3$.

  - $j=4$: $1+4=5$ (odd).

 - $i=2$:

  - $j=2$: $2+2=4$ (even) $\implies total += 2 imes 2 = 4$.

  - $j=3$: $2+3=5$ (odd).

  - $j=4$: $2+4=6$ (even) $\implies total += 2 imes 4 = 8$.

 - $i=3$:

  - $j=3$: $3+3=6$ (even) $\implies total += 3 imes 3 = 9$.

  - $j=4$: $3+4=7$ (odd).

 - $i=4$:

  - $j=4$: $4+4=8$ (even) $\implies total += 4 imes 4 = 16$.

 - Total = $1 + 3 + 4 + 8 + 9 + 16 = 41$.



---



#### Q10. What is the output of the recursive pseudocode below when called with `f(3, 2)`?

```text

Integer f(Integer x, Integer y)

  If (y == 0)

    Return 1

  End If

  If (y % 2 == 0)

    Integer temp = f(x, y / 2)

    Return temp * temp

  Else

    Return x * f(x, y - 1)

  End If

End Function

```

- **Options:** 1) 6 &nbsp;&nbsp; 2) 9 &nbsp;&nbsp; 3) 8 &nbsp;&nbsp; 4) 27

- **✅ Correct Answer:** `2. 9`

- **💡 Explanation:** This is the fast exponentiation algorithm computing $x^y = 3^2 = 9$ in $O(\log y)$ steps.



---



## 🏛️ Module 6: Object-Oriented Programming (OOP) Deep Theory & Design Patterns (20 MCQs)



#### Q1. Consider the following C++ code snippet. What is the output and what critical runtime behavior occurs?

```cpp

#include <iostream>

using namespace std;



class Base {

public:

  virtual void foo() { cout << "Base "; }

  ~Base() { cout << "~Base "; } // Non-virtual destructor!

};



class Derived : public Base {

public:

  void foo() override { cout << "Derived "; }

  ~Derived() { cout << "~Derived "; }

};



int main() {

  Base* ptr = new Derived();

  ptr->foo();

  delete ptr;

  return 0;

}

```

- **Options:**

 1. `Derived ~Derived ~Base `

 2. `Derived ~Base ` (Undefined Behavior according to C++ standard §8.3.5, but in most compilers / Capgemini exam choice, only `~Base` executes, leaking `Derived` resources)

 3. `Base ~Base `

 4. Compile-time error because `delete` cannot be called on a base pointer

- **✅ Correct Answer:** `2. Derived ~Base ` (Undefined Behavior according to C++ standard §8.3.5, but in most compilers / Capgemini exam choice, only `~Base` executes, leaking `Derived` resources)`

- **💡 Explanation:**

 - `ptr->foo()` uses the virtual table (`vtable`) of the actual object (`Derived`), so it prints `Derived `.

 - Because `~Base()` is **NOT declared virtual**, the delete expression performs static binding on the static type (`Base*`), calling only `Base::~Base()`.

 - The `Derived` destructor is skipped entirely, leading to resource leaks. In ISO C++, deleting a derived object through a pointer to a base class without a virtual destructor is formally **undefined behavior**. A production class with any virtual function must declare `virtual ~Base() = default;`.



---



#### Q2. What happens if a virtual function is called inside the constructor of a base class in C++?

```cpp

class Base {

public:

  Base() { foo(); }

  virtual void foo() { cout << "Base::foo" << endl; }

};

class Derived : public Base {

public:

  Derived() {}

  void foo() override { cout << "Derived::foo" << endl; }

};

```

- **Options:**

 1. It dynamically dispatches to `Derived::foo`.

 2. It statically dispatches to `Base::foo` because during `Base`'s constructor execution, the `Derived` object has not yet been initialized, and the object's `vptr` currently points to `Base`'s vtable.

 3. It throws a `NullPointerException` at runtime.

 4. The code fails to compile with an error: *"Virtual call in constructor forbidden"*.

- **✅ Correct Answer:** `2. It statically dispatches to `Base::foo` because during `Base`'s constructor execution, the `Derived` object has not yet been initialized, and the object's `vptr` currently points to `Base`'s vtable.`

- **💡 Explanation:** In C++, object construction occurs in layers from base to derived. During `Base::Base()`, the derived members are uninitialized raw memory; invoking `Derived::foo()` would access unconstructed members. The runtime actively sets the `vptr` to `Base::vtable` until `Base` construction finishes. (Contrast with Java, where polymorphic dispatch DOES call the derived override even if derived fields are uninitialized).



---



#### Q3. What is the internal memory layout mechanism that enables dynamic polymorphism in C++?

- **Options:**

 1. A hash map of function strings stored in the operating system kernel.

 2. A hidden Virtual Pointer (`vptr`) inserted into the object memory layout (typically at offset 0), which points to a compiler-generated Virtual Method Table (`vtable`) containing function pointers to virtual overrides.

 3. Every polymorphic object duplicates all executable machine code in RAM.

 4. Polymorphism is handled by the CPU's branch predictor without memory pointers.

- **✅ Correct Answer:** `2. A hidden Virtual Pointer (`vptr`) inserted into the object memory layout (typically at offset 0), which points to a compiler-generated Virtual Method Table (`vtable`) containing function pointers to virtual overrides.`

- **💡 Explanation:** On 64-bit architectures, adding a virtual function increases `sizeof(Object)` by 8 bytes (the pointer size of `vptr`). When calling `ptr->virtualFunc()`, the compiler generates assembly: `mov rax, [rdi] ; dereference vptr -> call [rax + offset]`.



---



#### Q4. What is **Object Slicing** in C++ and when does it occur?

- **Options:**

 1. Slicing an array into two halves during binary search.

 2. When a derived class instance is assigned or passed by value to a base class object (`Base b = derivedObj;`), copying only the base subobject and completely slicing off all derived member variables and virtual table pointers.

 3. Releasing memory of a single linked list node.

 4. Overriding a private method with a public method.

- **✅ Correct Answer:** `2. When a derived class instance is assigned or passed by value to a base class object (`Base b = derivedObj;`), copying only the base subobject and completely slicing off all derived member variables and virtual table pointers.`

- **💡 Explanation:** `Base` has only enough allocated storage for `Base` data members. Passing `Derived` by value invokes `Base::Base(const Base&)`, discarding derived attributes. Polymorphism requires passing by reference (`Base&`) or pointer (`Base*`).



---



#### Q5. How does C++ resolve the **Diamond Problem** in multiple inheritance where class `D` inherits from both `B` and `C`, and both `B` and `C` inherit from `A`?

```text

  A

  / \

 B  C

  \ /

  D

```

- **Options:**

 1. By renaming class `A` in class `C`.

 2. By declaring virtual inheritance in intermediate classes: `class B : virtual public A` and `class C : virtual public A`, ensuring only a single shared instance of base class `A` is allocated in the memory layout of `D`.

 3. By declaring all methods of class `A` as static.

 4. The diamond problem cannot be resolved in C++; multiple inheritance is completely prohibited.

- **✅ Correct Answer:** `2. By declaring virtual inheritance in intermediate classes: `class B : virtual public A` and `class C : virtual public A`, ensuring only a single shared instance of base class `A` is allocated in the memory layout of `D`.`

- **💡 Explanation:** Without `virtual`, `D` contains two distinct copies of `A` subobjects, creating ambiguity on `d.memberA`. With virtual base classes, the compiler stores an offset pointer (`vbase_offset`) in `B` and `C` to access the single unified `A` instance at the tail of `D`.



---



#### Q6. What is the fundamental requirement of the **Liskov Substitution Principle (LSP)** in the SOLID design principles?

- **Options:**

 1. Every class must implement at least two public interfaces.

 2. Subtypes must be substitutable for their base types without altering the correctness of the program (preconditions cannot be strengthened in a subtype, and postconditions cannot be weakened).

 3. A derived class must always override every method of its parent.

 4. Base classes must never contain protected members.

- **✅ Correct Answer:** `2. Subtypes must be substitutable for their base types without altering the correctness of the program (preconditions cannot be strengthened in a subtype, and postconditions cannot be weakened).`

- **💡 Explanation:** The classic violation is `Square` inheriting from `Rectangle`. If `Rectangle::setWidth(w)` expects height to remain invariant, while `Square::setWidth(w)` mutates both width and height, client code expecting rectangle behavior breaks when supplied with a square.



---



#### Q7. In modern thread-safe **Singleton Pattern** implementations, why is the `volatile` keyword mandatory for Double-Checked Locking in Java?

```java

public class Singleton {

  private static volatile Singleton instance;

  public static Singleton getInstance() {

    if (instance == null) {

      synchronized (Singleton.class) {

        if (instance == null) {

          instance = new Singleton();

        }

      }

    }

    return instance;

  }

}

```

- **Options:**

 1. To make the constructor execute faster.

 2. To prevent instruction reordering by the JVM/JIT compiler where memory allocation and reference assignment (`instance = ptr`) occur BEFORE constructor execution finishes, preventing other threads from observing a partially constructed, non-null object.

 3. To serialize all threads during every `getInstance()` call.

 4. Because Java does not allow `synchronized` blocks without `volatile` fields.

- **✅ Correct Answer:** `2. To prevent instruction reordering by the JVM/JIT compiler where memory allocation and reference assignment (`instance = ptr`) occur BEFORE constructor execution finishes, preventing other threads from observing a partially constructed, non-null object.`

- **💡 Explanation:** `new Singleton()` comprises three bytecode steps: (1) allocate memory, (2) run constructor, (3) assign reference to `instance`. Without `volatile`, the compiler can reorder to (1) $ o$ (3) $ o$ (2). Thread B observing non-null `instance` would access uninitialized members. `volatile` establishes a happens-before memory barrier.



---



#### Q8. Why is **Meyers' Singleton** in C++11 inherently thread-safe without requiring explicit mutex locks?

```cpp

class Singleton {

public:

  static Singleton& getInstance() {

    static Singleton instance;

    return instance;

  }

private:

  Singleton() = default;

};

```

- **Options:**

 1. Because C++ disables multithreading inside member functions.

 2. C++11 standard §6.7 [stmt.dcl] explicitly guarantees that static local variable initialization is thread-safe; concurrent threads will block until initialization by the first thread completes.

 3. Static local variables are allocated in the CPU L1 cache.

 4. It is not thread-safe; it crashes if accessed by multiple threads.

- **✅ Correct Answer:** `2. C++11 standard §6.7 [stmt.dcl] explicitly guarantees that static local variable initialization is thread-safe; concurrent threads will block until initialization by the first thread completes.`

- **💡 Explanation:** The C++11 language specification mandates that the compiler generate hidden reentrant atomic guards around local static initialization (often using `__cxa_guard_acquire` and `__cxa_guard_release`), guaranteeing safe lazy initialization with zero mutex boilerplate.



---



#### Q9. What design principle is violated when an interface forces a client class to implement dummy methods that it does not use?

- **Options:**

 1. Single Responsibility Principle (SRP)

 2. Interface Segregation Principle (ISP)

 3. Liskov Substitution Principle (LSP)

 4. Open-Closed Principle (OCP)

- **✅ Correct Answer:** `2. Interface Segregation Principle (ISP)`

- **💡 Explanation:** ISP states: *"Clients should not be forced to depend upon interfaces that they do not use."* Large "fat" interfaces should be split into smaller, cohesive, role-specific interfaces (e.g. `Printable`, `Serializable`, `Closable`).



---



#### Q10. What is the key structural difference between the **Factory Method** pattern and the **Abstract Factory** pattern?

- **Options:**

 1. Factory Method uses static functions; Abstract Factory uses private functions.

 2. Factory Method uses inheritance and subclassing to create a single product instance; Abstract Factory uses object composition to produce families of related or dependent product objects without specifying concrete classes.

 3. Abstract Factory can only produce one object during runtime.

 4. Factory Method is obsolete in object-oriented programming.

- **✅ Correct Answer:** `2. Factory Method uses inheritance and subclassing to create a single product instance; Abstract Factory uses object composition to produce families of related or dependent product objects without specifying concrete classes.`

- **💡 Explanation:** Factory Method delegates creation to a derived class method (`createButton()`). Abstract Factory defines an interface for creating a whole suite of interrelated products (`GUIFactory` creating `Button`, `Checkbox`, and `Scrollbar` for Windows vs Mac).



---



#### Q11. In the **Observer Pattern**, what causes the notorious **"Lapsed Listener Problem"** (memory leak)?

- **Options:**

 1. The observer crashes the operating system.

 2. The subject maintains strong references to registered observer objects in its internal listener list; if a client forgets to deregister an observer, the garbage collector / reference count cannot free the observer, leaking memory.

 3. Observers cannot receive notifications if network drops occur.

 4. It only happens when using C++ pointers.

- **✅ Correct Answer:** `2. The subject maintains strong references to registered observer objects in its internal listener list; if a client forgets to deregister an observer, the garbage collector / reference count cannot free the observer, leaking memory.`

- **💡 Explanation:** In long-lived subjects (e.g., event buses, window managers), holding strong references keeps short-lived UI listeners permanently reachable from GC roots. Resolved using `WeakReference` in Java or `std::weak_ptr` in C++.



---



#### Q12. How does the **Strategy Pattern** differ fundamentally from the **Template Method Pattern**?

- **Options:**

 1. Strategy is behavioral; Template Method is creational.

 2. Strategy uses composition (interchangeable algorithm strategy object injected at runtime); Template Method uses inheritance (base class defines invariant algorithm skeleton with abstract hooks overridden by subclasses at compile/class definition time).

 3. Template method can only be written in Python.

 4. Strategy pattern requires multiple inheritance.

- **✅ Correct Answer:** `2. Strategy uses composition (interchangeable algorithm strategy object injected at runtime); Template Method uses inheritance (base class defines invariant algorithm skeleton with abstract hooks overridden by subclasses at compile/class definition time).`

- **💡 Explanation:** Strategy conforms to *"Favor object composition over class inheritance"*, allowing algorithms (e.g., `PaymentStrategy`) to switch dynamically. Template Method fixes execution workflow in base `final void executeAlgorithm()` while sub-steps are customized via subclassing.



---



#### Q13. In C++, what is the execution order of constructors and destructors in an inheritance hierarchy: `Derived` inheriting from `Base`?

- **Options:**

 1. Constructor: Derived $ o$ Base; Destructor: Base $ o$ Derived.

 2. Constructor: Base $ o$ Derived; Destructor: Derived $ o$ Base.

 3. Constructor: Base $ o$ Derived; Destructor: Base $ o$ Derived.

 4. Both execute in arbitrary random order determined by the thread scheduler.

- **✅ Correct Answer:** `2. Constructor: Base $ o$ Derived; Destructor: Derived $ o$ Base.`

- **💡 Explanation:** Base parts must exist before derived parts can reference them $\implies$ Base constructor runs first. Conversely, derived parts must be torn down while base parts are still fully intact and valid $\implies$ Derived destructor runs first, followed by Base destructor (LIFO stack unwinding).



---



#### Q14. Can a **pure virtual function** in C++ (`virtual void foo() = 0;`) have a function body definition?

- **Options:**

 1. No, the compiler rejects any pure virtual function with a body with a fatal syntax error.

 2. Yes, a pure virtual function can provide a default implementation outside the class body, which derived classes can explicitly invoke using `Base::foo()`, while still making the base class abstract.

 3. Yes, but it can only be invoked by `main()`.

 4. No, pure virtual functions exist only in Java interfaces.

- **✅ Correct Answer:** `2. Yes, a pure virtual function can provide a default implementation outside the class body, which derived classes can explicitly invoke using `Base::foo()`, while still making the base class abstract.`

- **💡 Explanation:** `virtual void foo() = 0;` declares the class abstract (cannot be directly instantiated). However, `void Base::foo() { cout << "default"; }` can be defined externally. A pure virtual destructor **must** have a body because base destructors are always called during destruction.



---



#### Q15. What is the computational and memory cost of performing a `dynamic_cast<Derived*>(base_ptr)` in C++?

- **Options:**

 1. Zero cost; it is evaluated at compile time.

 2. Runtime overhead because it traverses the class hierarchy type metadata (RTTI - Run-Time Type Information) to verify inheritance validity, returning `nullptr` (or throwing `std::bad_cast` for references) on invalid downcasts.

 3. It allocates 1 GB of heap memory.

 4. It is faster than `static_cast`.

- **✅ Correct Answer:** `2. Runtime overhead because it traverses the class hierarchy type metadata (RTTI - Run-Time Type Information) to verify inheritance validity, returning `nullptr` (or throwing `std::bad_cast` for references) on invalid downcasts.`

- **💡 Explanation:** `static_cast` performs compile-time pointer arithmetic without safety checks. `dynamic_cast` inspects the RTTI structure linked from the vtable to verify the runtime type in complex diamond/multiple inheritance trees, incurring runtime pointer-chasing latency.



---



#### Q16. How does the **Decorator Pattern** differ from traditional subclassing to add features to objects?

- **Options:**

 1. Decorator pattern replaces all class constructors.

 2. Subclassing adds behavior statically at compile time for all instances of that class; Decorator dynamically attaches additional responsibilities to individual objects at runtime by wrapping them recursively.

 3. Decorator pattern cannot be used in web applications.

 4. Subclassing is always more memory efficient than Decorator.

- **✅ Correct Answer:** `2. Subclassing adds behavior statically at compile time for all instances of that class; Decorator dynamically attaches additional responsibilities to individual objects at runtime by wrapping them recursively.`

- **💡 Explanation:** If you have 5 features, subclassing every combination requires $2^5 = 32$ classes (class explosion). The Decorator wraps an inner interface (e.g. Java I/O `new BufferedReader(new InputStreamReader(new FileInputStream(f)))`), composing arbitrary feature sets at runtime.



---



#### Q17. In C++, what is the **Rule of 5** (modern extension of the Rule of 3)?

- **Options:**

 1. A class must not exceed 5 member variables.

 2. If a class manages a resource and explicitly defines a Destructor, Copy Constructor, or Copy Assignment Operator, it must also explicitly define or delete the Move Constructor and Move Assignment Operator.

 3. Every class must have 5 virtual methods.

 4. Functions must not take more than 5 arguments.

- **✅ Correct Answer:** `2. If a class manages a resource and explicitly defines a Destructor, Copy Constructor, or Copy Assignment Operator, it must also explicitly define or delete the Move Constructor and Move Assignment Operator.`

- **💡 Explanation:** With C++11 move semantics, providing a custom destructor or copy operator inhibits the compiler from automatically synthesizing move operations, leading to expensive deep copies instead of pointer steals (`std::move`).



---



#### Q18. In Java and C++, what is the difference between **Method Overloading** and **Method Overriding**?

- **Options:**

 1. Overloading is dynamic polymorphism; overriding is static.

 2. Overloading is compile-time (static) polymorphism with the same method name but different parameter signatures in the same scope; Overriding is runtime (dynamic) polymorphism where a derived class provides a specific implementation of a virtual method declared in its base class with an identical signature.

 3. Overloading only applies to constructors.

 4. Overriding requires changing the return type to `void`.

- **✅ Correct Answer:** `2. Overloading is compile-time (static) polymorphism with the same method name but different parameter signatures in the same scope; Overriding is runtime (dynamic) polymorphism where a derived class provides a specific implementation of a virtual method declared in its base class with an identical signature.`

- **💡 Explanation:** Overload resolution occurs during compilation based on static argument types (mangled function names). Override resolution occurs at runtime via vtable dispatch based on the dynamic type of the object.



---



#### Q19. What is the primary purpose of the **Composite Design Pattern**?

- **Options:**

 1. Encrypting database connections across multiple threads.

 2. Composing objects into tree structures to represent part-whole hierarchies, allowing client code to treat individual leaf objects and compositions of objects uniformly.

 3. Forcing all classes to inherit from a single superclass.

 4. Providing caching for slow REST API requests.

- **✅ Correct Answer:** `2. Composing objects into tree structures to represent part-whole hierarchies, allowing client code to treat individual leaf objects and compositions of objects uniformly.`

- **💡 Explanation:** In a graphic drawing tool, `Circle` (leaf) and `GroupOfShapes` (composite containing multiple shapes) both implement `Shape::draw()`. Calling `draw()` on the root composite recursively draws all children without the caller needing `if (isGroup)` type checks.



---



#### Q20. In C++, why should **private inheritance** be used instead of composition only when strictly necessary?

- **Options:**

 1. Private inheritance makes the derived class run twice as fast.

 2. Private inheritance models *"is-implemented-in-terms-of"* and is needed only when the derived class requires access to protected members of the base class or needs to override virtual functions; otherwise, composition provides looser coupling and clearer encapsulation.

 3. Private inheritance is the only way to instantiate objects.

 4. Private inheritance makes all base methods public in the derived class.

- **✅ Correct Answer:** `2. Private inheritance models *"is-implemented-in-terms-of"* and is needed only when the derived class requires access to protected members of the base class or needs to override virtual functions; otherwise, composition provides looser coupling and clearer encapsulation.`

- **💡 Explanation:** Private inheritance is an implementation detail: public/protected members of base become private in derived. It breaks encapsulation more than composition. Item 39 of Scott Meyers' *Effective C++* advises: *"Use composition when you can, private inheritance when you must."*



---



## 🌳 Module 7: Comprehensive Tree Theory (All Types), Heaps (Min/Max) & Advanced DSA (25 MCQs)



#### Q1. For a **Complete Binary Tree** with $n$ nodes, what is the exact formula for its **depth / height in edges** and **number of levels**? *(Real Capgemini Question)*

- **Options:**

 1. Depth = $n/2$, Levels = $n$

 2. Depth (edges) = $\lfloor \log_2(n) 

floor$, Height (edges) = $\lfloor \log_2(n) 

floor$, Number of levels = $\lfloor \log_2(n) 

floor + 1$

 3. Depth = $2^n - 1$, Levels = $\log_2(n)$

 4. Depth = $\lceil \log_2(n) 

ceil + 1$, Levels = $\lfloor \log_2(n) 

floor$

- **✅ Correct Answer:** `2. Depth (edges) = $\lfloor \log_2(n) 

floor$, Height (edges) = $\lfloor \log_2(n) 

floor$, Number of levels = $\lfloor \log_2(n) 

floor + 1$`

- **💡 Explanation:**

 - In a complete binary tree, every level except possibly the last is completely filled, and all nodes in the last level are as far left as possible.

 - For $n = 7$: $\lfloor \log_2(7) 

floor = \lfloor 2.807 

floor = 2$.

  - Level 0 (root): 1 node

  - Level 1: 2 nodes

  - Level 2: 4 nodes $\implies$ Total nodes = 7.

  - Height / Depth (edges) = **2**.

  - Levels = $2 + 1 = \mathbf{3}$.

 - **Quick Capgemini Exam Trick:** If asked maximum depth/height of a complete binary tree with $n$ nodes $\implies \mathbf{\lfloor \log_2 n 

floor}$.



---



#### Q2. Given a min-heap array `[1, 2, 3, 17, 100]`. What is the value of the root node after deleting root `1` and completing the subsequent downward heapify steps? *(Real Capgemini Question)*

```text

Initial Min-Heap:

    1

   /  \

  2   3

  / \

 17 100

```

- **Options:** 1) 100 &nbsp;&nbsp; 2) 2 &nbsp;&nbsp; 3) 3 &nbsp;&nbsp; 4) 17

- **✅ Correct Answer:** `2. 2`

- **💡 Explanation:**

 - Step 1: Remove root `1`. Replace root with the last leaf element `100`:

  Array becomes: `[100, 2, 3, 17]`.

 - Step 2: Compare new root `100` with left child `2` and right child `3`.

  The smaller child is `2`. Since $2 < 100$, swap `100` and `2`:

  Array becomes: `[2, 100, 3, 17]`.

 - Step 3: Now compare `100` with its left child `17`. Since $17 < 100$, swap them:

  Array becomes: `[2, 17, 3, 100]`.

 - At the end of the operation, the root node is **2**.



---



#### Q3. In an array-based representation of a complete binary tree using **0-based indexing**, what are the index formulas for the parent, left child, and right child of a node at index $i$?

- **Options:**

 1. Parent: $2i$, Left: $2i + 1$, Right: $2i + 2$

 2. Parent: $\lfloor (i - 1) / 2 \rfloor$, Left: $2i + 1$, Right: $2i + 2$

 3. Parent: $i / 2$, Left: $2i$, Right: $2i + 1$

 4. Parent: $i - 1$, Left: $i + 1$, Right: $i + 2$

- **✅ Correct Answer:** `2. Parent: $\lfloor (i - 1) / 2 \rfloor$, Left: $2i + 1$, Right: $2i + 2$`

- **💡 Explanation:**

 - For 0-based indexing:

  - Root is at index 0.

  - Children of 0 are at $2(0) + 1 = 1$ and $2(0) + 2 = 2$.

  - Parent of index 1: $\lfloor (1 - 1) / 2 \rfloor = 0$.

  - Parent of index 2: $\lfloor (2 - 1) / 2 \rfloor = 0$.

 - (Note: In 1-based indexing, Parent: $\lfloor i/2 \rfloor$, Left: $2i$, Right: $2i + 1$).



---



#### Q4. Why is the time complexity of building a binary heap from an arbitrary unsorted array of $n$ elements using `buildHeap()` (bottom-up heapify) $O(n)$ and NOT $O(n \log n)$?

- **Options:**

 1. Because it does not compare all elements.

 2. Nodes at higher levels (near root) are few but can sift down far; the vast majority of nodes reside at or near leaf levels (height $h=0, 1$) and do very little work. The summation $\sum_{h=0}^{\log n} \frac{n}{2^{h+1}} O(h)$ converges to $O(n)$.

 3. Building a heap requires an auxiliary hash map.

 4. It is actually $O(n \log n)$; $O(n)$ is a theoretical misconception.

- **✅ Correct Answer:** `2. Nodes at higher levels (near root) are few but can sift down far; the vast majority of nodes reside at or near leaf levels (height $h=0, 1$) and do very little work. The summation $\sum_{h=0}^{\log n} \frac{n}{2^{h+1}} O(h)$ converges to $O(n)$.`

- **💡 Explanation:** Half of all nodes ($n/2$) are leaves requiring 0 swaps. One-quarter ($n/4$) do at most 1 swap. One-eighth ($n/8$) do at most 2 swaps. Sum = $n \sum_{h=1}^\infty \frac{h}{2^h} = n imes 2 = O(n)$. (Inserting $n$ elements one by one via `insert()` is $O(n \log n)$, but bottom-up `heapify` is $O(n)$).



---



#### Q5. What is a **Min-Max Heap** and what are the time complexities for finding the minimum and maximum elements in it?

- **Options:**

 1. A heap where finding min is $O(n)$ and max is $O(n)$.

 2. A complete binary tree where levels alternate between Min levels (even depths: $0, 2, \dots$) and Max levels (odd depths: $1, 3, \dots$). Finding Minimum takes $O(1)$ time (at root), and finding Maximum takes $O(1)$ time (maximum of root's children).

 3. A graph that connects all vertices with minimum cost.

 4. A binary search tree with balance factor 0.

- **✅ Correct Answer:** `2. A complete binary tree where levels alternate between Min levels (even depths: $0, 2, \dots$) and Max levels (odd depths: $1, 3, \dots$). Finding Minimum takes $O(1)$ time (at root), and finding Maximum takes $O(1)$ time (maximum of root's children).`

- **💡 Explanation:** Min-Max heaps implement double-ended priority queues. For any node $x$ on a min level, $x$ is the minimum among all elements in its subtree. For any node $y$ on a max level, $y$ is the maximum among all elements in its subtree. Both `findMin()` (root) and `findMax()` (max(child1, child2)) run in $O(1)$.



---



#### Q6. In **ANY binary tree** (not necessarily complete or full), if $L$ denotes the number of leaf nodes, and $T_2$ denotes the number of internal nodes with degree 2 (two non-empty children), what relation ALWAYS holds?

- **Options:**

 1. $L = T_2 + 1$

 2. $L = 2 imes T_2$

 3. $L = T_2 - 1$

 4. $L = \log_2(T_2)$

- **✅ Correct Answer:** `1. L = T_2 + 1`

- **💡 Explanation:**

 - Let total nodes = $N$, total edges = $E = N - 1$.

 - Let $T_0 = L$ (leaf nodes, degree 0), $T_1$ (nodes with 1 child), $T_2$ (nodes with 2 children).

 - $N = T_0 + T_1 + T_2$.

 - Sum of outgoing edges = $E = 0 \cdot T_0 + 1 \cdot T_1 + 2 \cdot T_2 = T_1 + 2T_2$.

 - Since $E = N - 1 \implies T_1 + 2T_2 = T_0 + T_1 + T_2 - 1 \implies \mathbf{T_0 = T_2 + 1} \implies \mathbf{L = T_2 + 1}$.

 - This holds for every valid binary tree in computer science!



---



#### Q7. What are the definitions and boundary differences between **Full (Strict) Binary Tree**, **Complete Binary Tree**, and **Perfect Binary Tree**?

- **Options:**

 1. They are all synonyms for the same tree structure.

 2. **Full:** Every node has either 0 or 2 children; **Complete:** All levels are completely filled except possibly the last, which is filled from left to right; **Perfect:** All interior nodes have 2 children and all leaf nodes are at the identical maximum depth ($N = 2^{h+1} - 1$).

 3. A full binary tree must have height $\le 3$.

 4. A perfect binary tree contains an odd number of edges only.

- **✅ Correct Answer:** `2. **Full:** Every node has either 0 or 2 children; **Complete:** All levels are completely filled except possibly the last, which is filled from left to right; **Perfect:** All interior nodes have 2 children and all leaf nodes are at the identical maximum depth ($N = 2^{h+1} - 1$).`

- **💡 Explanation:** Every perfect binary tree is both full and complete. However, a complete binary tree is not necessarily full (it can have a node with 1 child), and a full binary tree is not necessarily complete (it can be skewed).



---



#### Q8. Which pairs of tree traversal orders can **uniquely reconstruct** a general Binary Tree?

- **Options:**

 1. Preorder and Postorder only

 2. Inorder + Preorder, OR Inorder + Postorder (Inorder is strictly required for general binary trees)

 3. Preorder and Level-order without Inorder

 4. Any single traversal order is sufficient

- **✅ Correct Answer:** `2. Inorder + Preorder, OR Inorder + Postorder (Inorder is strictly required for general binary trees)`

- **💡 Explanation:** Preorder gives the root first (left boundary), Postorder gives the root last. But without Inorder, you cannot distinguish whether remaining nodes belong to the left or right subtrees. Inorder splits the sequence cleanly: `[Left Subtree] Root [Right Subtree]`. (Note: Preorder + Postorder can uniquely reconstruct ONLY if the tree is a Full Binary Tree).



---



#### Q9. When deleting a node with **degree 2** (two children) from a Binary Search Tree (BST), what node replaces it to preserve BST invariants?

- **Options:**

 1. The root of the tree.

 2. Either its Inorder Predecessor (maximum node in its left subtree) or its Inorder Successor (minimum node in its right subtree).

 3. A newly allocated leaf node initialized to 0.

 4. The rightmost leaf of the left subtree inverted.

- **✅ Correct Answer:** `2. Either its Inorder Predecessor (maximum node in its left subtree) or its Inorder Successor (minimum node in its right subtree).`

- **💡 Explanation:** The Inorder Successor is guaranteed to have at most one child (it cannot have a left child, because a left child would be smaller). Copying its key into the target node and deleting the successor reduces deletion to the trivial degree-0 or degree-1 deletion case.



---



#### Q10. What is the definition of the **Balance Factor ($BF$)** of a node in an **AVL Tree**, and what are the valid values for any balanced node?

- **Options:**

 1. $BF = ext{node.key} \pmod 2 \in \{0, 1\}$

 2. $BF = ext{Height}( ext{Left Subtree}) - ext{Height}( ext{Right Subtree}) \in \{-1, 0, +1\}$

 3. $BF = ext{Number of leaves} / 2 \in \{0, 1, 2\}$

 4. $BF = ext{Depth} - ext{Height} \in \{-2, +2\}$

- **✅ Correct Answer:** `2. BF = ext{Height}( ext{Left Subtree}) - ext{Height}( ext{Right Subtree}) \in \{-1, 0, +1\}`

- **💡 Explanation:** An AVL tree enforces strict height balance. If $|BF| \ge 2$, the node is unbalanced. It is rebalanced using one of 4 rotation schemes: LL (single right rotation), RR (single left rotation), LR (left-right double rotation), or RL (right-left double rotation).



---



#### Q11. What is the recurrence relation for the **minimum number of nodes $N(h)$** in an AVL tree of height $h$?

- **Options:**

 1. $N(h) = 2^h$

 2. $N(h) = N(h-1) + N(h-2) + 1$, with $N(0) = 1$ and $N(1) = 2$

 3. $N(h) = 2 imes N(h-1)$

 4. $N(h) = h^2 + 1$

- **✅ Correct Answer:** `2. N(h) = N(h-1) + N(h-2) + 1$, with $N(0) = 1$ and $N(1) = 2$`

- **💡 Explanation:** To minimize nodes for height $h$, one subtree must have height $h-1$ and the other height $h-2$. Sequence values: $N(0) = 1, N(1) = 2, N(2) = 4, N(3) = 7, N(4) = 12, N(5) = 20$. This Fibonacci-like relation proves that maximum height $h < 1.44 \log_2(n + 2) - 0.328 \implies O(\log n)$.



---



#### Q12. What are the **5 mandatory invariants** of a **Red-Black Tree**?

- **Options:**

 1. Every node is green; all leaves are blue; root is yellow; height is odd.

 2. (1) Every node is either RED or BLACK. (2) The root is BLACK. (3) Every leaf (NIL sentinel) is BLACK. (4) If a node is RED, both its children must be BLACK (no two adjacent RED nodes). (5) For each node, all simple paths from the node to descendant leaves contain the same number of BLACK nodes (equal Black-Height).

 3. All nodes on even levels are red; all nodes on odd levels are black.

 4. All left children are red; all right children are black.

- **✅ Correct Answer:** `2. (1) Every node is either RED or BLACK. (2) The root is BLACK. (3) Every leaf (NIL sentinel) is BLACK. (4) If a node is RED, both its children must be BLACK (no two adjacent RED nodes). (5) For each node, all simple paths from the node to descendant leaves contain the same number of BLACK nodes (equal Black-Height).`

- **💡 Explanation:** Properties 4 and 5 ensure that no path from root to leaf is more than twice as long as any other path, bounding tree height strictly to $h \le 2 \log_2(n + 1)$.



---



#### Q13. Why do standard library associative containers (`std::map`/`std::set` in C++, `TreeMap`/`TreeSet` in Java) use **Red-Black Trees** instead of **AVL Trees**?

- **Options:**

 1. AVL trees do not support string keys.

 2. AVL trees are more rigidly balanced ($BF \le 1$), offering marginally faster $O(\log n)$ searches, but requiring more rotations during frequent insertions and deletions; Red-Black trees require at most **2 rotations per insertion** and at most **3 rotations per deletion**, making them significantly faster for mixed write workloads.

 3. Red-Black trees require zero memory for child pointers.

 4. AVL trees cannot be implemented in C++.

- **✅ Correct Answer:** `2. AVL trees are more rigidly balanced ($BF \le 1$), offering marginally faster $O(\log n)$ searches, but requiring more rotations during frequent insertions and deletions; Red-Black trees require at most **2 rotations per insertion** and at most **3 rotations per deletion**, making them significantly faster for mixed write workloads.`

- **💡 Explanation:** In generic libraries where data undergoes continual insert/delete churn, the cost of rebalancing dominates. The looser balance guarantees of Red-Black trees bound rotation cascades to $O(1)$ structural rotations per mutation.



---



#### Q14. In a **B-Tree of order $M$** (where $M \ge 3$), what are the bounds on the number of keys and children in any non-root internal node?

- **Options:**

 1. Keys: exactly $M$; Children: exactly $M + 1$.

 2. Keys: minimum $\lceil M / 2 

ceil - 1$, maximum $M - 1$; Children: minimum $\lceil M / 2 

ceil$, maximum $M$.

 3. Keys: always 1; Children: 2.

 4. Keys: unrestricted; Children: at most 2.

- **✅ Correct Answer:** `2. Keys: minimum $\lceil M / 2 

ceil - 1$, maximum $M - 1$; Children: minimum $\lceil M / 2 

ceil$, maximum $M$.`

- **💡 Explanation:** B-Trees are self-balancing multi-way search trees designed for block storage. Each non-root node must be at least half full ($\ge \lceil M/2 

ceil$ children). When keys exceed $M - 1$, the node splits at median key which promotes to parent.



---



#### Q15. What structural feature distinguishes a **B+ Tree** from a standard **B-Tree**, making B+ Trees the universal choice for database indexing?

- **Options:**

 1. B+ Trees store all user data records/pointers exclusively in the leaf nodes, while internal nodes store only routing keys; all leaf nodes are linked sequentially in a doubly linked list, enabling $O(\log N + K)$ range scans without traversing tree branches.

 2. B+ Trees do not have root nodes.

 3. B+ Trees require all keys to be prime numbers.

 4. B-Trees cannot store duplicate keys.

- **✅ Correct Answer:** `1. B+ Trees store all user data records/pointers exclusively in the leaf nodes, while internal nodes store only routing keys; all leaf nodes are linked sequentially in a doubly linked list, enabling $O(\log N + K)$ range scans without traversing tree branches.`

- **💡 Explanation:** In a B-Tree, data pointers reside in internal nodes, which reduces fanout per disk page and turns range queries (`WHERE age BETWEEN 20 AND 30`) into expensive multi-level in-order traversals. In B+ Trees, higher fanout reduces tree height to 3–4, and range scans simply traverse leaf links sequentially.



---



#### Q16. What are the time and space complexities of inserting and searching a word of length $L$ in a standard **Trie (Prefix Tree)** with alphabet size $\Sigma$?

- **Options:**

 1. Time: $O(N \log N)$, Space: $O(1)$

 2. Time: $O(L)$ for both insert and search; Space: $O(\Sigma \cdot L \cdot N)$ worst case where $N$ is total words inserted.

 3. Time: $O(2^L)$, Space: $O(L^2)$

 4. Time: $O(1)$ search, Space: $O(\log N)$

- **✅ Correct Answer:** `2. Time: $O(L)$ for both insert and search; Space: $O(\Sigma \cdot L \cdot N)$ worst case where $N$ is total words inserted.`

- **💡 Explanation:** Each character transitions down a child pointer in $O(1)$ time, yielding exact $O(L)$ lookup independent of the total number of words in the dictionary. To save space, a Radix Tree (Compressed Trie) collapses non-branching chains into single edge strings.



---



#### Q17. How does a **Segment Tree** achieve $O(\log N)$ range queries and updates, and what is the function of **Lazy Propagation**?

- **Options:**

 1. It transforms strings into floating-point vectors.

 2. It stores aggregated interval values in a complete binary tree of size $4N$; Lazy Propagation defers updates to descendant nodes by caching modifications in a lazy flag array, updating children only when they are accessed, reducing Range Updates from $O(N)$ to $O(\log N)$.

 3. It sorts arrays in $O(1)$ time.

 4. Lazy propagation causes memory corruption on multi-core CPUs.

- **✅ Correct Answer:** `2. It stores aggregated interval values in a complete binary tree of size $4N$; Lazy Propagation defers updates to descendant nodes by caching modifications in a lazy flag array, updating children only when they are accessed, reducing Range Updates from $O(N)$ to $O(\log N)$.`

- **💡 Explanation:** Without lazy propagation, updating an entire interval $[L, R]$ requires visiting every leaf in that range ($O(N)$). Lazy propagation records the pending delta at the highest covering canonical nodes ($O(\log N)$) and pushes down only on demand.



---



#### Q18. How does a **Fenwick Tree (Binary Indexed Tree / BIT)** compute prefix sums and perform point updates in $O(\log N)$ using bitwise operations?

- **Options:**

 1. Using pointer arithmetic on linked lists.

 2. By exploiting the binary representation of indices: adding/subtracting the lowest set bit (`idx & (-idx)` or `idx & (~idx + 1)`) navigates directly to parent or covering responsibility intervals in an implicit array.

 3. By hashing indices using SHA-256.

 4. By storing all tree nodes in an external SQL database.

- **✅ Correct Answer:** `2. By exploiting the binary representation of indices: adding/subtracting the lowest set bit (`idx & (-idx)` or `idx & (~idx + 1)`) navigates directly to parent or covering responsibility intervals in an implicit array.`

- **💡 Explanation:** Index $i$ stores the sum of the interval $(i - (i \ \& \ -i), i]$. To query prefix sum, subtract `i & -i` iteratively ($O(\log N)$). To update a point, add `i & -i` iteratively ($O(\log N)$). It requires zero pointer storage overhead (exact size $N+1$).



---



#### Q19. What dual invariants define a **Treap (Cartesian Tree)**?

- **Options:**

 1. Nodes have two colors (red and blue).

 2. Keys satisfy the **Binary Search Tree (BST)** property; randomly assigned priorities satisfy the **Heap (Max-Heap or Min-Heap)** property.

 3. All leaf nodes must be at depth 0.

 4. Every node must have 4 children.

- **✅ Correct Answer:** `2. Keys satisfy the **Binary Search Tree (BST)** property; randomly assigned priorities satisfy the **Heap (Max-Heap or Min-Heap)** property.`

- **💡 Explanation:** When inserting a key with random priority, it is placed via standard BST insertion, then rotated upward using tree rotations until heap order is restored. Because priorities are assigned uniformly at random, expected tree height is strictly $O(\log N)$.



---



#### Q20. What is a **Splay Tree** and why is it categorized as an **amortized $O(\log N)$** data structure?

- **Options:**

 1. A tree that physically splits across multiple servers.

 2. A self-adjusting binary search tree where every accessed node is moved to the root via a sequence of tree rotations (Zig, Zig-Zig, Zig-Zag); while a single operation can take $O(N)$ worst-case time on a skewed tree, any sequence of $M$ operations takes $O(M \log N)$ amortized time.

 3. A tree that stores data only on leaves without rotations.

 4. A tree with fixed depth 2.

- **✅ Correct Answer:** `2. A self-adjusting binary search tree where every accessed node is moved to the root via a sequence of tree rotations (Zig, Zig-Zig, Zig-Zag); while a single operation can take $O(N)$ worst-case time on a skewed tree, any sequence of $M$ operations takes $O(M \log N)$ amortized time.`

- **💡 Explanation:** Splay trees require no balance factors or color bits. Splaying automatically moves frequently queried elements close to the root, optimizing for 80/20 locality-of-reference access patterns (caches, garbage collectors).



---



#### Q21. In a **k-d Tree (k-Dimensional Tree)**, how does the partitioning hyperplane alternate at each level?

- **Options:**

 1. It alternates based on random coin flips.

 2. At depth $d$, the tree splits space along dimension $(d \pmod k)$, using the median coordinate along that dimension to divide points into left and right subtrees.

 3. It only splits along the X-axis regardless of depth.

 4. It rotates all vectors by 45 degrees.

- **✅ Correct Answer:** `2. At depth $d$, the tree splits space along dimension $(d \pmod k)$, using the median coordinate along that dimension to divide points into left and right subtrees.`

- **💡 Explanation:** In 2D ($k=2$): level 0 splits vertically (X-axis), level 1 splits horizontally (Y-axis), level 2 splits on X-axis, etc. This hierarchical spatial partitioning enables multidimensional range searches and $O(\log N)$ average nearest neighbor queries.



---



#### Q22. In a weighted connected undirected graph $G = (V, E)$, what are the algorithmic differences between **Kruskal's Algorithm** and **Prim's Algorithm** for finding the Minimum Spanning Tree (MST)?

- **Options:**

 1. Kruskal works only on directed graphs; Prim works only on DAGs.

 2. Kruskal sorts all edges globally and greedily adds the minimum edge that does not form a cycle using Disjoint Set Union (DSU) in $O(E \log E)$ time; Prim grows a single tree from a starting vertex by greedily adding the minimum cut edge using a priority queue in $O(E \log V)$ time.

 3. Prim requires negative edge weights.

 4. Kruskal generates a graph with cycles.

- **✅ Correct Answer:** `2. Kruskal sorts all edges globally and greedily adds the minimum edge that does not form a cycle using Disjoint Set Union (DSU) in $O(E \log E)$ time; Prim grows a single tree from a starting vertex by greedily adding the minimum cut edge using a priority queue in $O(E \log V)$ time.`

- **💡 Explanation:** Kruskal is optimal for sparse graphs ($E \approx V$), where sorting edges is fast. Prim (especially with Fibonacci heaps: $O(E + V \log V)$) is superior for dense graphs ($E \approx V^2$). Both find an identical minimum weight total.



---



#### Q23. In **Disjoint Set Union (DSU / Union-Find)**, what is the amortized time complexity per operation when both **Union by Rank (or Size)** and **Path Compression** heuristics are applied?

- **Options:**

 1. $O(N)$

 2. $O(\log N)$

 3. $O(\alpha(N))$ where $\alpha$ is the Inverse Ackermann function, which is practically $O(1)$ ($\alpha(N) < 5$ for any universe size $N \le 10^{80}$).

 4. $O(N^2)$

- **✅ Correct Answer:** `3. O(\alpha(N)) where \alpha is the Inverse Ackermann function, which is practically O(1) (\alpha(N) < 5 for any universe size N \le 10^{80}).`

- **💡 Explanation:** Path compression flattens the tree during `find()`, making every traversed node point directly to root. Union by rank attaches the shallower tree under the deeper tree root. Tarjan proved the combination achieves inverse Ackermann runtime bounds.



---



#### Q24. How does the **3-Color DFS algorithm** detect cycles in a directed graph during Topological Sorting?

- **Options:**

 1. By counting the number of vertices.

 2. Vertices are assigned: WHITE (unvisited), GRAY (currently on recursive call stack), and BLACK (fully processed); a cycle exists if and only if a directed edge points to a **GRAY** vertex (a Back-Edge to an active ancestor).

 3. Cycles occur if any vertex is painted BLACK twice.

 4. By sorting vertices by alphabet order.

- **✅ Correct Answer:** `2. Vertices are assigned: WHITE (unvisited), GRAY (currently on recursive call stack), and BLACK (fully processed); a cycle exists if and only if a directed edge points to a **GRAY** vertex (a Back-Edge to an active ancestor).`

- **💡 Explanation:** If DFS from vertex $u$ encounters neighbor $v$ currently in the GRAY state, $v$ is an active ancestor in the current recursion stack, meaning path $v \leadsto u$ exists. The edge $(u, v)$ completes the cycle $v \leadsto u o v$.



---



#### Q25. What is the **Cut Property** in Minimum Spanning Tree theory?

- **Options:**

 1. Cutting any tree edge divides memory allocation in half.

 2. For any cut $(S, V - S)$ of a connected graph, the minimum-weight edge crossing the cut boundary (having one endpoint in $S$ and one in $V - S$) is guaranteed to belong to some Minimum Spanning Tree of the graph.

 3. Every tree can be cut into exactly two subtrees.

 4. It is an algorithmic rule used only in binary search.

- **✅ Correct Answer:** `2. For any cut $(S, V - S)$ of a connected graph, the minimum-weight edge crossing the cut boundary (having one endpoint in $S$ and one in $V - S$) is guaranteed to belong to some Minimum Spanning Tree of the graph.`

- **💡 Explanation:** The cut property is the theoretical bedrock of both Prim's and Kruskal's greedy correctness: adding the lightest crossing edge can never prevent the formation of a global minimum spanning tree.



---



## 🎯 Strategic Playbook: How to Crack "Impossible" Questions



### 1. The Senior Elimination Rule

When an MCQ appears hopelessly complex, look at the distractors:

- **Discard overly simplified answers:** Options suggesting that an issue *"has no impact"* or *"never causes errors"* are almost always distractors.

- **Identify trade-off language:** Senior engineering questions almost universally reward answers that explain **trade-offs** (e.g. *"Improves read performance at the expense of write amplification"*, *"Reduces memory fragmentation via paging"*).



### 2. Time Allocation Rule (60 seconds per question)

- You have **20 MCQs in 20 minutes** for AI Literacy, and **20 MCQs in 25 minutes** for Technical Assessment.

- **Never spend >90 seconds on one MCQ:** If an answer requires tracing 10 iterations of nested bitwise shifts, make an educated elimination between the remaining 2 plausible options and mark it.



### 3. Avoiding the AI Token Depletion Trap

As confirmed by real candidates on Reddit:

- **Do not ask the AI assistant for "the approach" or "solution":** The system limits your token budget (often 2000 tokens) and the AI model is constrained with system prompts prohibiting it from providing full solutions.

- **Use the AI strictly as a syntax and edge-case linter:** Frame queries as: *"Check this function for array boundary indexing bugs"* or *"Identify why line 14 causes integer overflow"*.



---



> 🚀 **Complementary Modules:** 

> • [Master 30 Coding Problems Bank](./practice.md) 

> • [Stage 2 — Technical Module Deep-Dive](./02_Technical_Module.md) 

> • [Stage 3 — C++ Debugging Assessment](./03_Debugging_Assessment.md) 

> • [Stage 4 — AI-Assisted Coding](./04_AI_Assisted_Coding.md)

