# Cloud Computing & Artificial Intelligence (AI / ML) - Virtusa & Cognizant OA Master Guide

---

## SECTION 1: Cloud Computing High-Yield Revision Notes & Architecture

### 1. Cloud Service Delivery Models Matrix

```
       USER MANAGED vs PROVIDER MANAGED IN CLOUD SERVICE MODELS

   Infrastructure (IaaS)         Platform (PaaS)            Software (SaaS)
  ┌──────────────────────┐    ┌──────────────────────┐   ┌──────────────────────┐
  │ Applications  [USER] │    │ Applications  [USER] │   │ Applications [PROV]  │
  │ Data          [USER] │    │ Data          [USER] │   │ Data         [PROV]  │
  ├──────────────────────┤    ├──────────────────────┤   │ Runtime      [PROV]  │
  │ Runtime       [USER] │    │ Runtime       [PROV] │   │ Middleware   [PROV]  │
  │ Middleware    [USER] │    │ Middleware    [PROV] │   │ OS           [PROV]  │
  │ OS            [USER] │    │ OS            [PROV] │   │ Virtualization [PROV]│
  ├──────────────────────┤    ├──────────────────────┤   │ Servers      [PROV]  │
  │ Virtualization[PROV] │    │ Virtualization[PROV] │   │ Storage      [PROV]  │
  │ Servers       [PROV] │    │ Servers       [PROV] │   │ Networking   [PROV]  │
  │ Storage       [PROV] │    │ Storage       [PROV] │   └──────────────────────┘
  │ Networking    [PROV] │    │ Networking    [PROV] │
  └──────────────────────┘    └──────────────────────┘
```

| Service Model | User Responsibility | Cloud Provider Responsibility | Key Examples |
| :--- | :--- | :--- | :--- |
| **IaaS** | OS, Middleware, Runtime, Apps, Data | Hardware, Virtualization, Networking, Storage | AWS EC2, Azure VMs, GCP Compute Engine |
| **PaaS** | Applications, Data | OS, Runtime, Middleware, Hardware, Virtualization | AWS Elastic Beanstalk, Heroku, Google App Engine |
| **SaaS** | None (User configuration only) | Entire Stack (Apps, OS, Infrastructure, Security) | Office 365, Salesforce, Google Workspace |
| **FaaS (Serverless)**| Code Functions, Trigger Logic | Infrastructure, Auto-scaling to 0, Event Routing | AWS Lambda, Azure Functions, Google Cloud Functions |

---

### 2. Cloud Deployment Models

- **Public Cloud**: Owned and operated by third-party providers (AWS, Azure, GCP). Resources are shared multi-tenant across the public internet. Cost-effective, high scalability.
- **Private Cloud**: Infrastructure dedicated exclusively to one organization. Can be hosted on-premise or by a third party. Offers maximum control, compliance, and security.
- **Hybrid Cloud**: Combines Public and Private clouds, connected via secure VPN or DirectConnect/ExpressRoute. Allows sensitive data to stay on-premise while bursting workloads to public cloud.
- **Community Cloud**: Infrastructure shared by several organizations with shared compliance or security concerns (e.g., healthcare or government agencies).

---

### 3. Virtualization & Containerization Cheat Sheet

#### Hypervisor Types
- **Type-1 Hypervisor (Bare-Metal)**: Runs directly on physical hardware without an underlying host OS. High performance, enterprise grade.
  - *Examples*: VMware ESXi, KVM, Xen, Microsoft Hyper-V.
- **Type-2 Hypervisor (Hosted)**: Runs as an application on top of an existing host OS.
  - *Examples*: VMware Workstation, Oracle VirtualBox.

#### Virtual Machines (VMs) vs Containers

| Feature | Virtual Machines (VMs) | Containers (Docker) |
| :--- | :--- | :--- |
| **Architecture** | Guest OS on top of Hypervisor | Shares Host OS Kernel |
| **Startup Time** | Minutes | Milliseconds to Seconds |
| **Resource Overhead** | High (GBs per VM) | Minimal (MBs per container) |
| **Isolation** | Hardware-level isolation | OS-level isolation (Namespaces & Cgroups) |
| **Portability** | Hypervisor dependent | Highly portable across any OS running container engine |

#### Kubernetes Core Abstractions
- **Pod**: Smallest deployable unit in Kubernetes containing one or more co-located containers sharing storage and network.
- **Node**: A worker machine (VM or physical server) in Kubernetes.
- **Control Plane**: Master node components managing cluster state:
  - **kube-apiserver**: Front-end for the Kubernetes control plane.
  - **etcd**: Consistent, highly available key-value store for all cluster data.
  - **kube-scheduler**: Assigns unscheduled pods to nodes based on resource availability.
  - **kube-controller-manager**: Runs controller processes (Node controller, ReplicaSet controller).
- **Kubelet**: Agent running on each node ensuring containers are running in pods as expected.

---

### 4. AWS, Azure & GCP Service Mapping Matrix

| Domain | AWS Service | Azure Service | GCP Service |
| :--- | :--- | :--- | :--- |
| **Virtual Compute** | EC2 | Virtual Machines | Compute Engine |
| **Serverless Compute** | AWS Lambda | Azure Functions | Cloud Functions |
| **Object Storage** | S3 (Simple Storage Service) | Azure Blob Storage | Cloud Storage |
| **Block Storage** | EBS (Elastic Block Store) | Azure Managed Disks | Persistent Disk |
| **Relational Database**| RDS / Aurora | Azure SQL Database | Cloud SQL / Spanner |
| **NoSQL Database** | DynamoDB | Cosmos DB | Cloud Bigtable / Datastore |
| **Virtual Network** | VPC (Virtual Private Cloud) | VNet (Virtual Network) | VPC Network |
| **Container Orchestration**| EKS | AKS | GKE |

---

### 5. Cloud Security & Shared Responsibility Model

#### AWS Shared Responsibility Model
- **Security OF the Cloud (AWS Responsibility)**: Hardware, global infrastructure, data center security, physical host hypervisors, edge locations.
- **Security IN the Cloud (Customer Responsibility)**: Customer data, Identity & Access Management (IAM), OS configuration & patching, firewall rules (Security Groups), network encryption.

#### IAM & Security Concepts
- **Principle of Least Privilege**: Granting users only the minimum permissions required to perform their specific tasks.
- **Security Group vs Network ACL (NACL)**:
  - **Security Group**: Operates at the **Instance Level**; **Stateful** (Inbound return traffic automatically allowed).
  - **NACL**: Operates at the **Subnet Level**; **Stateless** (Must explicitly define both inbound and outbound rules).

---

## SECTION 2: Artificial Intelligence & Machine Learning High-Yield Revision Notes

### 1. AI vs ML vs DL vs Generative AI Hierarchy

```
┌────────────────────────────────────────────────────────────────────────┐
│ ARTIFICIAL INTELLIGENCE (AI)                                          │
│ Systems mimicking human intelligence (Rule-based, Expert systems, ML) │
│  ┌──────────────────────────────────────────────────────────────────┐  │
│  │ MACHINE LEARNING (ML)                                            │  │
│  │ Statistical algorithms learning patterns from data without code  │  │
│  │  ┌────────────────────────────────────────────────────────────┐  │  │
│  │  │ DEEP LEARNING (DL)                                         │  │  │
│  │  │ Multi-layer Artificial Neural Networks (CNN, RNN, Transformers)│  │  │
│  │  │  ┌──────────────────────────────────────────────────────┐ │  │  │
│  │  │  │ GENERATIVE AI (GenAI)                                │ │  │  │
│  │  │  │ Models generating new text, images, code (LLMs, GANs)│ │  │  │
│  │  │  └──────────────────────────────────────────────────────┘ │  │  │
│  │  └────────────────────────────────────────────────────────────┘  │  │
│  └──────────────────────────────────────────────────────────────────┘  │
└────────────────────────────────────────────────────────────────────────┘
```

---

### 2. Machine Learning Categories & Algorithms

#### Supervised Learning
Data contains input features $X$ and ground-truth target labels $Y$.
1. **Classification (Discrete Target)**:
   - **Logistic Regression**: Outputs probability via Sigmoid function $P(Y=1|X) = \frac{1}{1 + e^{-z}}$.
   - **Decision Trees**: Splits data based on Information Gain (Entropy) or Gini Impurity.
   - **Random Forest**: Ensemble of Decision Trees using **Bagging** (Bootstrap Aggregating) to reduce variance.
   - **Support Vector Machine (SVM)**: Finds optimal hyper-plane maximizing margin between classes; uses **Kernel Trick** for non-linear data.
   - **K-Nearest Neighbors (KNN)**: Non-parametric, lazy learner classifying based on Euclidean distance to $k$ nearest neighbors.
   - **Naive Bayes**: Probabilistic classifier assuming strong independence between features using Bayes' Theorem:
     $$P(Y|X) = \frac{P(X|Y) P(Y)}{P(X)}$$
2. **Regression (Continuous Target)**:
   - **Linear Regression**: Fits line $y = wx + b$ minimizing Mean Squared Error (MSE).

#### Unsupervised Learning
Data contains input features $X$ with **NO target labels**.
1. **Clustering**:
   - **K-Means**: Partitions data into $K$ clusters by iteratively assigning points to nearest centroid and updating centroids.
   - **Hierarchical Clustering**: Agglomerative (bottom-up) or Divisive (top-down) dendrogram trees.
   - **DBSCAN**: Density-based clustering capable of discovering arbitrary shaped clusters and filtering noise points.
2. **Dimensionality Reduction**:
   - **Principal Component Analysis (PCA)**: Linear transformation finding orthogonal axes (Principal Components) maximizing data variance.

---

### 3. Model Evaluation Metrics & Formulas

#### Confusion Matrix Architecture
| | Predicted Positive ($\hat{Y}=1$) | Predicted Negative ($\hat{Y}=0$) |
| :--- | :---: | :---: |
| **Actual Positive ($Y=1$)** | True Positive (TP) | False Negative (FN) [Type II Error] |
| **Actual Negative ($Y=0$)** | False Positive (FP) [Type I Error] | True Negative (TN) |

#### Core Classification Formulas
1. **Accuracy**:
   $$\text{Accuracy} = \frac{TP + TN}{TP + TN + FP + FN}$$
2. **Precision (Positive Predictive Value)**:
   $$\text{Precision} = \frac{TP}{TP + FP}$$
   *(Crucial when False Positives are expensive, e.g., Spam Detection).*
3. **Recall / Sensitivity / True Positive Rate (TPR)**:
   $$\text{Recall} = \frac{TP}{TP + FN}$$
   *(Crucial when False Negatives are dangerous, e.g., Medical Cancer Diagnosis).*
4. **F1-Score (Harmonic Mean of Precision and Recall)**:
   $$F1\text{-Score} = 2 \times \frac{\text{Precision} \times \text{Recall}}{\text{Precision} + \text{Recall}} = \frac{2TP}{2TP + FP + FN}$$

#### Regression Formulas
1. **Mean Squared Error (MSE)**:
   $$\text{MSE} = \frac{1}{n} \sum_{i=1}^{n} (y_i - \hat{y}_i)^2$$
2. **Root Mean Squared Error (RMSE)**:
   $$\text{RMSE} = \sqrt{\text{MSE}}$$
3. **Mean Absolute Error (MAE)**:
   $$\text{MAE} = \frac{1}{n} \sum_{i=1}^{n} |y_i - \hat{y}_i|$$

---

### 4. Overfitting, Underfitting & Regularization

- **Underfitting (High Bias)**: Model is too simple to capture underlying training patterns (Low training accuracy, Low test accuracy).
  - *Fix*: Increase model complexity, add features, reduce regularization.
- **Overfitting (High Variance)**: Model memorizes training data including noise (High training accuracy, Low test accuracy).
  - *Fix*: More training data, feature selection, Dropout, Early Stopping, Regularization.

#### Regularization Techniques
- **L1 Regularization (Lasso Regression)**: Adds penalty equal to absolute value of magnitude of coefficients ($\lambda \sum |w_i|$). **Drives weights strictly to 0** (Acts as automatic feature selection).
- **L2 Regularization (Ridge Regression)**: Adds penalty equal to square of magnitude of coefficients ($\lambda \sum w_i^2$). **Shrinks weights close to 0** but not strictly 0.

---

### 5. Deep Learning & Neural Networks

#### Activation Functions
- **Sigmoid**: $\sigma(z) = \frac{1}{1 + e^{-z}}$ (Outputs values between $(0, 1)$; subject to **Vanishing Gradient Problem**).
- **ReLU (Rectified Linear Unit)**: $f(z) = \max(0, z)$ (Fast computation, avoids vanishing gradient for $z > 0$; subject to **Dying ReLU** for $z < 0$).
- **Leaky ReLU**: $f(z) = \max(\alpha z, z)$ where $\alpha = 0.01$ (Fixes Dying ReLU).
- **Softmax**: Converts vector of raw logits into probability distribution summing to 1 for multi-class classification:
  $$\text{Softmax}(z_i) = \frac{e^{z_i}}{\sum_{j} e^{z_j}}$$

#### Neural Network Architectures
- **CNN (Convolutional Neural Networks)**: Specialized for Grid/Spatial data (Images). Uses Convolutional layers, Pooling layers (Max/Avg pooling), and Fully Connected layers.
- **RNN (Recurrent Neural Networks)**: Specialized for Sequential/Temporal data (Time series, Text). Uses feedback loops but suffers from Vanishing/Exploding Gradients on long sequences.
- **LSTM (Long Short-Term Memory)**: Solves vanishing gradients using **Forget Gate, Input Gate, Output Gate, and Cell State**.
- **Transformers**: Replaces recurrence with **Self-Attention Mechanism**, enabling massive parallel training. Powerhouse behind modern LLMs.

---

### 6. Generative AI & Large Language Models (LLMs)

#### Transformer Architecture & Self-Attention Formula
Given Query ($Q$), Key ($K$), and Value ($V$) matrices:
$$\text{Attention}(Q, K, V) = \text{softmax}\left(\frac{Q K^T}{\sqrt{d_k}}\right) V$$
where $d_k$ is the dimension of key vectors.

#### Key GenAI Concepts
- **RAG (Retrieval-Augmented Generation)**: Architecture retrieving relevant domain facts from an external vector database to ground LLM responses, eliminating hallucinations.
- **Vector Database**: Database storing data as high-dimensional vector embeddings (e.g., Pinecone, ChromaDB, Milvus, FAISS) for semantic similarity search using **Cosine Similarity**.
- **Prompt Engineering Techniques**:
  - **Zero-Shot Prompting**: Asking LLM to perform task without any prior examples.
  - **Few-Shot Prompting**: Providing a few exemplar input-output pairs in the prompt.
  - **Chain-of-Thought (CoT)**: Instructing LLM to break down complex reasoning step-by-step ("Let's think step by step").

---

## SECTION 3: Worked Numerical & Calculation Problems

### Problem 1: Confusion Matrix Classification Metrics
**Given**:
- True Positives ($TP$) $= 80$
- True Negatives ($TN$) $= 800$
- False Positives ($FP$) $= 20$
- False Negatives ($FN$) $= 100$

**Find**: Accuracy, Precision, Recall, and F1-Score.

**Solution**:
1. **Accuracy**:
   $$\text{Accuracy} = \frac{TP + TN}{TP + TN + FP + FN} = \frac{80 + 800}{80 + 800 + 20 + 100} = \frac{880}{1000} = \mathbf{0.88 \text{ (or 88\%)}}$$

2. **Precision**:
   $$\text{Precision} = \frac{TP}{TP + FP} = \frac{80}{80 + 20} = \frac{80}{100} = \mathbf{0.80 \text{ (or 80\%)}}$$

3. **Recall**:
   $$\text{Recall} = \frac{TP}{TP + FN} = \frac{80}{80 + 100} = \frac{80}{180} = \mathbf{0.444 \text{ (or 44.4\%)}}$$

4. **F1-Score**:
   $$F1 = 2 \times \frac{\text{Precision} \times \text{Recall}}{\text{Precision} + \text{Recall}} = 2 \times \frac{0.80 \times 0.444}{0.80 + 0.444} = 2 \times \frac{0.3552}{1.244} = \mathbf{0.571}$$

---

### Problem 2: Convolutional Neural Network (CNN) Output Feature Map Size
**Given**:
- Input Image Size ($W \times W$) $= 32 \times 32$
- Filter / Kernel Size ($F$) $= 5 \times 5$
- Padding ($P$) $= 2$
- Stride ($S$) $= 1$

**Find**: Output Feature Map Dimension ($O$).

**Solution**:
$$\text{Output Size } O = \left\lfloor \frac{W - F + 2P}{S} \right\rfloor + 1$$
$$O = \left\lfloor \frac{32 - 5 + 2(2)}{1} \right\rfloor + 1 = \left\lfloor \frac{32 - 5 + 4}{1} \right\rfloor + 1 = 31 + 1 = \mathbf{32 \times 32}$$
*Conclusion*: Padding $P=2$ with $5\times 5$ filter preserves exact spatial dimension (Same Padding).

---

### Problem 3: Perceptron Output Calculation
**Given**:
- Inputs: $x_1 = 0.5, x_2 = 0.8$
- Weights: $w_1 = 0.4, w_2 = -0.5$
- Bias: $b = 0.1$
- Activation Function: Sigmoid $\sigma(z) = \frac{1}{1 + e^{-z}}$

**Find**: Output of Perceptron.

**Solution**:
1. Calculate weighted sum $z$:
   $$z = (x_1 \times w_1) + (x_2 \times w_2) + b$$
   $$z = (0.5 \times 0.4) + (0.8 \times -0.5) + 0.1 = 0.20 - 0.40 + 0.10 = -0.10$$
2. Apply Sigmoid Activation:
   $$\sigma(-0.10) = \frac{1}{1 + e^{-(-0.10)}} = \frac{1}{1 + e^{0.10}} \approx \frac{1}{1 + 1.10517} = \frac{1}{2.10517} \approx \mathbf{0.475}$$

---

### Problem 4: Softmax Function Output Calculation
**Given**:
Raw neural network output logits $z = [2.0, 1.0, 0.0]$.

**Find**: Softmax probabilities for each class.

**Solution**:
1. Compute exponentials $e^{z_i}$:
   - $e^{2.0} \approx 7.389$
   - $e^{1.0} \approx 2.718$
   - $e^{0.0} = 1.000$
2. Sum of exponentials:
   $$\sum e^{z_j} = 7.389 + 2.718 + 1.000 = 11.107$$
3. Compute Softmax Probabilities:
   - $P(\text{Class 1}) = \frac{7.389}{11.107} = \mathbf{0.665 \text{ (66.5\%)coll}}$
   - $P(\text{Class 2}) = \frac{2.718}{11.107} = \mathbf{0.245 \text{ (24.5\%)coll}}$
   - $P(\text{Class 3}) = \frac{1.000}{11.107} = \mathbf{0.090 \text{ (9.0\%)coll}}$

---

## SECTION 4: 100+ Practice MCQs for Cloud & AI (Cognizant & Virtusa Pattern)

1. Which Cloud Service model requires the customer to manage operating systems, software runtime, and application data?
   - A) PaaS
   - B) SaaS
   - C) IaaS
   - D) FaaS
   - **Answer**: C
   - **Explanation**: In IaaS (e.g., AWS EC2), the user manages OS, runtime, middleware, and application layer.

2. What type of Hypervisor runs directly on bare-metal physical hardware?
   - A) Type-2 Hypervisor
   - B) Type-1 Hypervisor
   - C) Hosted Hypervisor
   - D) Virtual Container Engine
   - **Answer**: B
   - **Explanation**: Type-1 hypervisors (VMware ESXi, KVM) run directly on physical hardware without a host OS.

3. In AWS Shared Responsibility Model, which of the following is the customer's responsibility?
   - A) Physical security of data centers
   - B) Patching physical host hypervisors
   - C) Managing IAM user privileges and access policies
   - D) Decommissioning corrupt hard drives
   - **Answer**: C
   - **Explanation**: IAM configuration and access controls are customer responsibilities in the cloud.

4. Which AWS storage service provides scalable object storage accessible over HTTP API?
   - A) Amazon EBS
   - B) Amazon S3
   - C) Amazon EFS
   - D) AWS Storage Gateway
   - **Answer**: B
   - **Explanation**: Amazon S3 (Simple Storage Service) is an object store suited for unstructured data accessible via HTTP APIs.

5. What is the fundamental difference between Security Groups and Network ACLs (NACLs) in AWS?
   - A) Security groups are stateless; NACLs are stateful
   - B) Security groups operate at instance level and are stateful; NACLs operate at subnet level and are stateless
   - C) Security groups only block traffic; NACLs only allow traffic
   - D) Security groups are used for S3; NACLs for EC2
   - **Answer**: B
   - **Explanation**: Security Groups are instance-level stateful firewalls; NACLs are subnet-level stateless firewalls.

6. Serverless computing (FaaS) is characterized by:
   - A) Paying for running 24/7 dedicated virtual machines
   - B) Event-driven execution where code runs only on trigger and scales down to 0 automatically
   - C) Manual hardware provisioning
   - D) Inability to integrate with databases
   - **Answer**: B
   - **Explanation**: Serverless platforms (AWS Lambda) execute functions on demand, automatically scaling compute and charging per millisecond execution.

7. Which metric is most critical when evaluating a machine learning model for medical disease diagnosis where missing a sick patient is catastrophic?
   - A) Precision
   - B) Recall (Sensitivity)
   - C) Accuracy
   - D) Specificity
   - **Answer**: B
   - **Explanation**: High Recall minimizes False Negatives ($FN$), ensuring diseased patients are not missed.

8. What happens during Overfitting in a Machine Learning model?
   - A) High Training Error, High Testing Error
   - B) Low Training Error, High Testing Error (High Variance)
   - C) Low Training Error, Low Testing Error
   - D) High Training Error, Low Testing Error
   - **Answer**: B
   - **Explanation**: Overfitting occurs when a model learns training noise, leading to low training error but poor generalization on test data.

9. L1 Regularization (Lasso) differs from L2 Regularization (Ridge) because L1:
   - A) Shrinks weights to zero but never exactly zero
   - B) Can force feature weights strictly to zero, performing implicit feature selection
   - C) Increases model variance
   - D) Is used only for unsupervised clustering
   - **Answer**: B
   - **Explanation**: L1 penalty ($\lambda |w|$) drives non-essential feature weights to 0, producing sparse models.

10. In Artificial Neural Networks, which activation function is subject to the "Dying ReLU" problem for negative inputs?
    - A) Sigmoid
    - B) Tanh
    - C) Standard ReLU
    - D) Softmax
    - **Answer**: C
    - **Explanation**: For negative inputs ($z < 0$), standard ReLU outputs 0 and has 0 gradient, causing neurons to stop updating ("dying").

11. What technology forms the backbone of modern Large Language Models (LLMs) like GPT-4 and Claude?
    - A) Recurrent Neural Networks (RNN)
    - B) Convolutional Neural Networks (CNN)
    - C) Transformer Architecture with Self-Attention
    - D) Decision Trees
    - **Answer**: C
    - **Explanation**: Transformers introduced self-attention mechanism, processing sequences in parallel and capturing long-range dependencies.

12. In RAG (Retrieval-Augmented Generation) architecture, what is the primary role of a Vector Database?
    - A) To train base LLM weights from scratch
    - B) To store domain document embeddings and perform fast semantic similarity retrieval
    - C) To route network packets across cloud subnets
    - D) To compress images for computer vision
    - **Answer**: B
    - **Explanation**: Vector databases store document embeddings, allowing fast vector similarity search (e.g. Cosine Distance) to supply context to LLMs.

13. What is the Gini Impurity of a pure node in a Decision Tree?
    - A) 1.0
    - B) 0.5
    - C) 0.0
    - D) Infinity
    - **Answer**: C
    - **Explanation**: A pure node contains elements of only 1 class, giving a Gini Impurity of 0.

14. Which algorithm is a non-parametric lazy learner that classifies instances based on distance to nearest training examples?
    - A) Naive Bayes
    - B) K-Nearest Neighbors (KNN)
    - C) Logistic Regression
    - D) Random Forest
    - **Answer**: B
    - **Explanation**: KNN stores training data and defers computation until query time ("lazy learning"), classifying via distance metrics.

15. Principal Component Analysis (PCA) is an example of:
    - A) Supervised Classification
    - B) Unsupervised Dimensionality Reduction
    - C) Reinforcement Learning
    - D) Generative Text Modeling
    - **Answer**: B
    - **Explanation**: PCA transforms correlated features into uncorrelated Principal Components maximizing variance without target labels.

16. What is the output range of the Sigmoid activation function?
    - A) $[-1, 1]$
    - B) $[0, 1]$
    - C) $[0, \infty)$
    - D) $(-\infty, \infty)$
    - **Answer**: B
    - **Explanation**: Sigmoid maps any real number to a probability value strictly between 0 and 1.

17. In Docker, what file defines the instructions to build a container image?
    - A) `docker-compose.yml`
    - B) `Dockerfile`
    - C) `kubernetes.yaml`
    - D) `package.json`
    - **Answer**: B
    - **Explanation**: `Dockerfile` is a text document containing commands executed to assemble a Docker image.

18. Which Kubernetes component maintains the desired cluster state and stores configuration data in a distributed key-value store?
    - A) Kubelet
    - B) etcd
    - C) Kube-proxy
    - D) Container Runtime
    - **Answer**: B
    - **Explanation**: `etcd` is the consistent, highly available key-value store used for all cluster configuration and state.

19. Ensemble technique that builds multiple decision trees sequentially, where each new tree attempts to correct errors made by previous trees:
    - A) Bagging
    - B) Boosting (e.g., XGBoost, Gradient Boosting)
    - C) Clustering
    - D) Stacking without weights
    - **Answer**: B
    - **Explanation**: Boosting trains trees sequentially to reduce bias and correct misclassifications of prior trees.

20. Naive Bayes classifier is called "Naive" because it assumes:
    - A) Target variable is continuous
    - B) Features are conditionally independent given the class label
    - C) Dataset has zero missing values
    - D) All features follow Gaussian distribution
    - **Answer**: B
    - **Explanation**: It assumes all input attributes are independent of one another given the target class.

21. What is the mathematical relationship between Bias and Variance in ML models?
    - A) As Bias decreases, Variance decreases
    - B) As Bias decreases, Variance increases (Bias-Variance Tradeoff)
    - C) Bias and Variance are independent
    - D) Total Error = Bias - Variance
    - **Answer**: B
    - **Explanation**: Lowering bias by making models more complex typically increases variance on unseen test data.

22. In AWS, which service allows connecting on-premise data centers to AWS via a dedicated private network connection?
    - A) AWS Direct Connect
    - B) AWS Internet Gateway
    - C) AWS Route 53
    - D) AWS CloudFront
    - **Answer**: A
    - **Explanation**: Direct Connect provides a dedicated private physical link bypassing the public internet.

23. Cloud Elasticity refers to:
    - A) Fixed static resource provisioning
    - B) The ability to dynamically scale resources up and down automatically based on real-time workload demand
    - C) Physical flexibility of server racks
    - D) Encrypting disk volumes
    - **Answer**: B
    - **Explanation**: Elasticity allows automatic matching of allocated compute resources to fluctuating demand.

24. Which loss function is standard for multi-class classification neural networks?
    - A) Mean Squared Error (MSE)
    - B) Categorical Cross-Entropy Loss
    - C) Mean Absolute Error (MAE)
    - D) Hinge Loss
    - **Answer**: B
    - **Explanation**: Cross-entropy measures performance of a classification model outputting probability distribution values.

25. What is the role of Pooling layers in Convolutional Neural Networks (CNNs)?
    - A) Increase number of trainable parameters
    - B) Downsample spatial dimensions (height/width) of feature maps to reduce computation and memory
    - C) Perform activation normalization
    - D) Generate text prompts
    - **Answer**: B
    - **Explanation**: Pooling (e.g. Max Pooling) reduces spatial size, preserving prominent features while reducing parameters.

26. In Reinforcement Learning, what equation models the expected cumulative reward for an agent taking an action in a state?
    - A) Bayes Equation
    - B) Bellman Equation / Q-Learning Equation
    - C) Euler Equation
    - D) Maxwell Equation
    - **Answer**: B
    - **Explanation**: Bellman Equation decomposes value function into immediate reward plus discounted future rewards.

27. Prompt Engineering technique where model is instructed to break down complex multi-step reasoning:
    - A) Zero-Shot
    - B) Chain-of-Thought (CoT)
    - C) Negative Prompting
    - D) One-Hot Encoding
    - **Answer**: B
    - **Explanation**: Chain-of-Thought guides LLMs to articulate intermediate reasoning steps.

28. Which Azure service is equivalent to AWS S3 for storing unstructured blob data?
    - A) Azure Files
    - B) Azure Blob Storage
    - C) Azure Managed Disks
    - D) Azure Cosmos DB
    - **Answer**: B
    - **Explanation**: Azure Blob Storage is object storage for unstructured binary and text data.

29. What is a Pod in Kubernetes?
    - A) A physical server rack
    - B) The smallest deployable object in Kubernetes containing one or more containers sharing network/storage
    - C) A Docker registry
    - D) A database schema
    - **Answer**: B
    - **Explanation**: Pods wrap one or more application containers executing on worker nodes.

30. In Machine Learning, Random Forest uses which ensemble strategy?
    - A) Boosting
    - B) Bagging (Bootstrap Aggregating)
    - C) Stacking
    - D) Cascading
    - **Answer**: B
    - **Explanation**: Random Forest builds multiple decision trees independently on random bootstrap subsamples of data.

31. Standard metric to measure similarity between two vector embeddings in GenAI / RAG applications:
    - A) Euclidean Distance only
    - B) Cosine Similarity ($\cos(\theta) = \frac{A \cdot B}{\|A\| \|B\|}$)
    - C) Hamming Distance
    - D) Manhattan Distance
    - **Answer**: B
    - **Explanation**: Cosine similarity measures angle between two non-zero vectors in high-dimensional embedding space.

32. Vanishing Gradient problem in Deep Neural Networks causes:
    - A) Weights in early layers to update extremely slowly or stop learning altogether
    - B) Weights to become infinite (NaN)
    - C) CPU utilization to drop to 0%
    - D) Overfitting on validation sets
    - **Answer**: A
    - **Explanation**: Gradients multiplied during backpropagation through many layers shrink exponentially toward zero.

33. Which algorithm handles sequential temporal data by maintaining a memory Cell State across long time steps?
    - A) Standard Feedforward Perceptron
    - B) LSTM (Long Short-Term Memory)
    - C) K-Means
    - D) Linear Regression
    - **Answer**: B
    - **Explanation**: LSTMs use gating mechanisms (Forget, Input, Output gates) to preserve long-term sequence dependencies.

34. AWS CloudFront is a:
    - A) Relational Database Service
    - B) Content Delivery Network (CDN) service for caching static/dynamic web content at global edge locations
    - C) Virtual Private Network
    - D) Machine Learning framework
    - **Answer**: B
    - **Explanation**: CloudFront delivers low-latency content globally via edge locations.

35. What is the function of an API Gateway in Microservices / Cloud architecture?
    - A) Formats physical hard drives
    - B) Acts as a single entry point for clients, routing HTTP requests to downstream microservices and handling authentication/rate limiting
    - C) Replaces DNS servers
    - D) Compiles C++ binaries
    - **Answer**: B
    - **Explanation**: API Gateway manages request routing, security, throttling, and API composition across microservices.

36. Unsupervised algorithm that groups data points based on local point density and identifies noise outliers:
    - A) K-Means
    - B) DBSCAN
    - C) Hierarchical Clustering
    - D) Logistic Regression
    - **Answer**: B
    - **Explanation**: DBSCAN groups dense clusters and marks isolated points as noise/outliers.

37. In AWS, what is an Availability Zone (AZ)?
    - A) A geographical region spanning continents
    - B) One or more discrete data centers with redundant power, networking, and connectivity within an AWS Region
    - C) A customer on-premise server room
    - D) A software container
    - **Answer**: B
    - **Explanation**: AZs are isolated data centers within a region connected via low-latency networking.

38. Hallucination in Large Language Models refers to:
    - A) High GPU temperature
    - B) LLM generating plausible-sounding but factually incorrect or fabricated information
    - C) Slow inference speed
    - D) Memory leak in PyTorch
    - **Answer**: B
    - **Explanation**: Hallucinations happen when LLMs generate false statements with high confidence.

39. Feature Scaling (Normalization / Standardization) is mandatory for distance-based algorithms like:
    - A) Decision Trees
    - B) K-Nearest Neighbors (KNN) & Support Vector Machines (SVM)
    - C) Random Forest
    - D) XGBoost
    - **Answer**: B
    - **Explanation**: Distance-sensitive models (KNN, SVM, K-Means) are skewed if features operate on unscaled disparate magnitude ranges.

40. Standardization (Z-score normalization) transforms a feature distribution to have:
    - A) Mean = 0 and Standard Deviation = 1 ($z = \frac{x - \mu}{\sigma}$)
    - B) Min = 0 and Max = 1
    - C) Mean = 1 and Variance = 0
    - D) All values positive
    - **Answer**: A
    - **Explanation**: Standardization rescales data to mean 0 and unit standard deviation 1.

41. What is the role of Kubelet in Kubernetes worker nodes?
    - A) Stores cluster key-value state
    - B) Runs on each worker node to ensure containers described in PodSpecs are running and healthy
    - C) Schedules pods onto nodes
    - D) Manages DNS resolution globally
    - **Answer**: B
    - **Explanation**: Kubelet is the node agent monitoring container health and reporting state to control plane.

42. What is an Epoch in Deep Learning training?
    - A) A single batch of training images
    - B) One full pass of the entire training dataset through the neural network during training
    - C) A single backpropagation step
    - D) Learning rate parameter value
    - **Answer**: B
    - **Explanation**: An epoch represents processing all training examples once in forward and backward passes.

43. Which optimizer combines ideas from Momentum (accelerating in direction of gradient) and RMSprop (adapting learning rates)?
    - A) SGD
    - B) Adam (Adaptive Moment Estimation)
    - C) Adagrad
    - D) Newton-Raphson
    - **Answer**: B
    - **Explanation**: Adam uses first and second moments of gradients to provide adaptive learning rates per parameter.

44. Microservices architecture pattern advantage over Monolithic architecture:
    - A) Single shared codebase for all services
    - B) Independent deployment, scaling, and technology stack selection per microservice
    - C) Zero network latency
    - D) No database management required
    - **Answer**: B
    - **Explanation**: Microservices decouple components into independent services that scale and deploy independently.

45. In AWS, Route 53 is a scalable:
    - A) Object storage service
    - B) Cloud Domain Name System (DNS) web service
    - C) Relational Database engine
    - D) Container registry
    - **Answer**: B
    - **Explanation**: Amazon Route 53 is a highly available and scalable cloud DNS service.

46. What does fine-tuning an LLM mean?
    - A) Writing longer prompts
    - B) Further training a pre-trained base model on a specific labeled dataset to adapt its parameters for a target domain
    - C) Running model on CPU instead of GPU
    - D) Deleting transformer layers
    - **Answer**: B
    - **Explanation**: Fine-tuning adjusts pre-trained neural network weights on specialized task data.

47. Confusion matrix metric defined as $\frac{TN}{TN + FP}$:
    - A) Recall
    - B) Specificity (True Negative Rate)
    - C) Precision
    - D) Accuracy
    - **Answer**: B
    - **Explanation**: Specificity measures the proportion of actual negative instances correctly identified.

48. ROC-AUC curve plots:
    - A) Precision vs Recall
    - B) True Positive Rate (Recall) vs False Positive Rate ($1 - \text{Specificity}$) across different classification thresholds
    - C) Loss vs Epochs
    - D) Bias vs Variance
    - **Answer**: B
    - **Explanation**: ROC curve tracks TPR against FPR at various decision threshold values. AUC measures area under this curve.

49. Which AWS service is managed NoSQL key-value database providing single-digit millisecond performance at scale?
    - A) Amazon RDS
    - B) Amazon Redshift
    - C) Amazon DynamoDB
    - D) Amazon Aurora
    - **Answer**: C
    - **Explanation**: DynamoDB is a fully managed NoSQL key-value database service.

50. In Machine Learning, Cross-Validation (e.g., $K$-Fold Cross-Validation) is used to:
    - A) Increase hardware speed
    - B) Assess model generalization performance by partitioning training data into $K$ subsets iteratively
    - C) Automatically deploy Docker containers
    - D) Compress neural network weights
    - **Answer**: B
    - **Explanation**: $K$-fold cross-validation evaluates model stability across $K$ distinct validation splits to prevent overfitting.

51. What is the main purpose of an Elastic Load Balancer (ELB) in AWS?
    - A) To store static image assets
    - B) To automatically distribute incoming application traffic across multiple EC2 targets in multiple Availability Zones
    - C) To compile Java source code
    - D) To host Git repositories
    - **Answer**: B
    - **Explanation**: ELB distributes incoming traffic to maintain application availability and fault tolerance.

52. In Azure, which service is used for managing API documentation, rate limiting, and security routing?
    - A) Azure App Service
    - B) Azure API Management (APIM)
    - C) Azure Functions
    - D) Azure Event Grid
    - **Answer**: B
    - **Explanation**: Azure APIM serves as a API gateway managing APIs across environments.

53. Which machine learning algorithm uses the "Kernel Trick" to project non-linearly separable data into a higher-dimensional space?
    - A) Decision Trees
    - B) Support Vector Machines (SVM)
    - C) Naive Bayes
    - D) K-Means
    - **Answer**: B
    - **Explanation**: SVM uses Kernel functions (RBF, Polynomial) to create linear hyperplanes in higher-dimensional transformed space.

54. What is the term for a pre-trained model fine-tuned on a smaller dataset for a specific task?
    - A) Data Augmentation
    - B) Transfer Learning
    - C) Unsupervised Clustering
    - D) One-Hot Encoding
    - **Answer**: B
    - **Explanation**: Transfer learning reuses learned feature representations from large datasets on smaller target tasks.

55. In AWS, what type of storage is Amazon EBS (Elastic Block Store)?
    - A) Object Storage
    - B) Block Storage attached to an EC2 instance
    - C) Archival Cold Storage
    - D) Relational Database
    - **Answer**: B
    - **Explanation**: EBS provides persistent block-level storage volumes for use with EC2 instances.

56. What is the output of a Softmax function applied to a vector of raw logits?
    - A) Binary 0 or 1 values
    - B) Probability distribution over N classes summing up to 1.0
    - C) Scaled values between -1 and +1
    - D) Euclidean distance matrix
    - **Answer**: B
    - **Explanation**: Softmax normalizes raw score logits into probabilities that sum to 1.

57. In Cloud Computing, horizontal scaling (Scaling Out / Scaling In) means:
    - A) Upgrading a server's RAM or CPU size
    - B) Adding or removing instances/nodes to handle changing workload volume
    - C) Changing OS from Linux to Windows
    - D) Moving data to tape drives
    - **Answer**: B
    - **Explanation**: Horizontal scaling adds or reduces server instances, whereas vertical scaling modifies instance capacity.

58. What is Vertical Scaling (Scaling Up / Scaling Down)?
    - A) Adding more server nodes to a cluster
    - B) Increasing CPU, RAM, or Disk capacity of an existing single server instance
    - C) Replicating databases across regions
    - D) Splitting code into microservices
    - **Answer**: B
    - **Explanation**: Vertical scaling boosts resources (more RAM/vCPU) of a single node.

59. In Machine Learning, what is the target output of a Regression problem?
    - A) Categorical label (e.g., 'Spam' or 'Not Spam')
    - B) Continuous numerical value (e.g., House price = $350,000)
    - C) Binary True/False
    - D) Cluster ID
    - **Answer**: B
    - **Explanation**: Regression predicts continuous numeric values, unlike Classification which predicts discrete labels.

60. Which hyperparameter in Gradient Descent controls the size of step taken toward the minimum loss?
    - A) Batch Size
    - B) Learning Rate ($\alpha$)
    - C) Number of Epochs
    - D) Momentum coefficient
    - **Answer**: B
    - **Explanation**: Learning rate regulates step size per iteration toward cost function minimum.

61. What happens if the Learning Rate in Gradient Descent is set TOO HIGH?
    - A) Convergence is guaranteed instantly
    - B) The algorithm may overshoot the minimum and diverge
    - C) Training will freeze
    - D) Overfitting will decrease
    - **Answer**: B
    - **Explanation**: Large learning rate causes erratic oscillations that overshoot optimal minima and cause loss to diverge.

62. In AWS VPC, what is a Subnet?
    - A) A single EC2 virtual machine
    - B) A logical range of IP addresses in a VPC tied to a specific Availability Zone
    - C) A physical fiber optic cable
    - D) An S3 storage bucket
    - **Answer**: B
    - **Explanation**: Subnets partition VPC IP address ranges into public or private logical segments in an AZ.

63. Which container orchestration feature automatically replaces failed containers and reschedules them on healthy nodes?
    - A) Self-Healing / Auto-Healing
    - B) Manual restart
    - C) Ingress routing
    - D) Static binding
    - **Answer**: A
    - **Explanation**: Kubernetes controllers automatically restart or reschedule failed pods to maintain desired state.

64. What is the difference between Supervised and Unsupervised learning?
    - A) Supervised requires GPUs; Unsupervised requires CPUs
    - B) Supervised learning uses labeled training data; Unsupervised learning uses unlabeled data to discover hidden patterns
    - C) Supervised learning works only on images
    - D) Unsupervised learning uses neural networks exclusively
    - **Answer**: B
    - **Explanation**: Supervised learning trains with explicit target labels ($X \rightarrow Y$), whereas Unsupervised finds structure in unlabeled data.

65. What is the main cause of the Exploding Gradient Problem in Deep Recurrent Neural Networks?
    - A) Learning rate set to zero
    - B) Cumulative multiplication of gradients greater than 1 over many timesteps causing parameter updates to become huge (NaN)
    - C) Using ReLU activation
    - D) Lack of training data
    - **Answer**: B
    - **Explanation**: Gradients $> 1$ multiplied across deep time steps explode exponentially. Solved via **Gradient Clipping**.

66. Technique used to prevent Exploding Gradients in RNN training:
    - A) Dropout
    - B) Gradient Clipping
    - C) L1 Regularization
    - D) Data Augmentation
    - **Answer**: B
    - **Explanation**: Gradient clipping caps maximum gradient norm values during backpropagation.

67. In AWS, what is Amazon Redshift?
    - A) Serverless messaging queue
    - B) Fully managed petabyte-scale Data Warehouse service optimized for OLAP analytical queries
    - C) NoSQL database
    - D) CDN caching service
    - **Answer**: B
    - **Explanation**: Redshift is a columnar data warehouse for complex analytical reporting queries.

68. What is the primary difference between OLTP and OLAP databases?
    - A) OLTP handles real-time fast transactional queries; OLAP handles complex analytical aggregation queries across historical data
    - B) OLTP is hosted in cloud; OLAP is on-premise
    - C) OLTP uses NoSQL; OLAP uses CSV files
    - D) OLTP is for images; OLAP for text
    - **Answer**: A
    - **Explanation**: Online Transaction Processing (OLTP) manages operational row data; Online Analytical Processing (OLAP) manages column aggregation analytics.

69. In Machine Learning, what is a Hyperparameter?
    - A) Weights learned by the algorithm during training
    - B) Configuration settings set by the user BEFORE model training begins (e.g., Learning Rate, $K$ in KNN, Tree Depth)
    - C) Biases inside neural network layers
    - D) Test accuracy metric
    - **Answer**: B
    - **Explanation**: Hyperparameters govern model structure and training parameters, defined manually prior to learning weights.

70. Grid Search CV and Random Search CV are techniques used for:
    - A) Image compression
    - B) Automated Hyperparameter Tuning
    - C) Database indexing
    - D) Subnetting calculation
    - **Answer**: B
    - **Explanation**: Grid/Random Search evaluates combinations of candidate hyperparameters to find optimal settings.

71. In Azure, what service provides fully managed Kubernetes cluster management?
    - A) Azure ECS
    - B) Azure Kubernetes Service (AKS)
    - C) Azure Container Instances (ACI)
    - D) Azure Batch
    - **Answer**: B
    - **Explanation**: AKS is Azure's managed Kubernetes orchestration service.

72. What is a Zero-Shot Prompt in Large Language Models?
    - A) Providing 10 example inputs and outputs
    - B) Requesting an LLM to generate a completion without providing any prior examples in the prompt
    - C) Fine-tuning model weights with 0 learning rate
    - D) Training model with zero data
    - **Answer**: B
    - **Explanation**: Zero-shot prompting relies entirely on pre-trained knowledge without explicit exemplar pairs.

73. In Deep Learning, what is Dropout?
    - A) Deleting corrupted image samples
    - B) Regularization technique that randomly deactivates a fraction of neurons during training to prevent co-adaptation and overfitting
    - C) Stopping training after 1 epoch
    - D) Dropping missing database rows
    - **Answer**: B
    - **Explanation**: Dropout zeros out random node activations during forward passes, improving model generalization.

74. What is the purpose of Data Augmentation in Computer Vision ML workflows?
    - A) To encrypt training images
    - B) To artificially expand dataset size and diversity by applying random rotations, flips, crops, and color shifts to training images
    - C) To reduce image resolution
    - D) To speed up disk reading
    - **Answer**: B
    - **Explanation**: Data augmentation creates synthetic variations of training images to combat overfitting.

75. AWS CloudWatch provides:
    - A) Domain registration services
    - B) Monitoring and observability service for AWS resources and applications (Logs, Metrics, Alarms)
    - C) Code compilation environment
    - D) Database migration tools
    - **Answer**: B
    - **Explanation**: CloudWatch collects operational metrics, monitors log files, and triggers automated alarms.

76. In Machine Learning, what is the Soft Margin SVM?
    - A) SVM that allows zero misclassifications
    - B) SVM formulation that permits some classification errors on training data using a Slack Variable ($C$) to handle noisy non-separable data
    - C) Decision tree without depth limit
    - D) K-Means clustering algorithm
    - **Answer**: B
    - **Explanation**: Soft margin SVM balances margin maximization against classification error tolerance controlled by parameter $C$.

77. In Naive Bayes, what technique is used to handle zero probability counts for unseen features?
    - A) Gradient Descent
    - B) Laplace Smoothing (Additive Smoothing)
    - C) Min-Max Scaling
    - D) One-Hot Encoding
    - **Answer**: B
    - **Explanation**: Laplace smoothing adds a constant (typically $+1$) to frequency counts to avoid zero probability multiplication.

78. In Cloud Architecture, what does High Availability (HA) mean?
    - A) Running code at highest CPU frequency
    - B) Systems engineered to operate continuously without single points of failure, ensuring minimal downtime (e.g., 99.999% uptime)
    - C) Unlimited free storage
    - D) Fast internet connectivity
    - **Answer**: B
    - **Explanation**: HA ensures system redundancy across fault domains so services remain online during failures.

79. What is Disaster Recovery (DR) RTO (Recovery Time Objective)?
    - A) Maximum acceptable age of data files recovered from backup (Data loss limit)
    - B) Maximum acceptable duration of system downtime following a service disruption
    - C) Total cost of cloud servers
    - D) Speed of database read operations
    - **Answer**: B
    - **Explanation**: RTO is the target time allocated to restore business operations after an outage.

80. What is Disaster Recovery (DR) RPO (Recovery Point Objective)?
    - A) Maximum acceptable period of data loss measured in time prior to the disruption
    - B) Time taken to reboot a VM
    - C) Annual subscription cost of cloud
    - D) Number of active users
    - **Answer**: A
    - **Explanation**: RPO determines the maximum allowable data loss window (e.g., 5 minutes of data).

81. In Natural Language Processing (NLP), TF-IDF stands for:
    - A) Term Frequency-Inverse Document Frequency
    - B) Total Feature Indexing Data Format
    - C) Text Filtering Information Decision Frame
    - D) Tensor Flow Image Data Format
    - **Answer**: A
    - **Explanation**: TF-IDF evaluates word importance in a document relative to a corpus collection.

82. In Machine Learning, what is One-Hot Encoding?
    - A) Scaling numerical variables between 0 and 1
    - B) Converting categorical variables into binary vector indicators (0s and 1s) with one active bit per category
    - C) Compressing image sizes
    - D) Removing outlier records
    - **Answer**: B
    - **Explanation**: One-hot encoding creates dummy binary columns representing distinct categorical values.

83. What is the role of an Ingress Controller in Kubernetes?
    - A) Compiles container code
    - B) Manages external HTTP/HTTPS traffic routing into cluster services based on path/host rules
    - C) Allocates CPU cores
    - D) Manages etcd backups
    - **Answer**: B
    - **Explanation**: Ingress exposes HTTP and HTTPS routes from outside the cluster to internal services.

84. What is AWS Lambda execution duration maximum limit per invocation?
    - A) 1 Minute
    - B) 15 Minutes
    - C) 1 Hour
    - D) Unlimited
    - **Answer**: B
    - **Explanation**: AWS Lambda functions have a hard execution timeout limit of 15 minutes (900 seconds).

85. In Machine Learning, what is Bagging (Bootstrap Aggregating)?
    - A) Training models sequentially to reduce bias
    - B) Training multiple base models independently in parallel on random bootstrap samples with replacement and averaging predictions
    - C) Dimensionality reduction method
    - D) Clustering method
    - **Answer**: B
    - **Explanation**: Bagging builds independent parallel models on random subsamples to reduce variance (e.g. Random Forest).

86. What is the main advantage of XGBoost over standard Gradient Boosting?
    - A) Does not require trees
    - B) Highly optimized parallel tree building, built-in L1/L2 regularization, and handling of missing values
    - C) Works only on images
    - D) Zero training time
    - **Answer**: B
    - **Explanation**: XGBoost adds algorithmic optimizations, parallelization, and regularization to prevent overfitting.

87. In Artificial Neural Networks, Backpropagation uses which calculus rule to compute gradients of loss with respect to weights?
    - A) Product Rule
    - B) Chain Rule
    - C) Quotient Rule
    - D) L'Hopital's Rule
    - **Answer**: B
    - **Explanation**: Backpropagation applies the Chain Rule iteratively backwards through layers to calculate partial derivatives.

88. What is Cosine Distance related to Cosine Similarity ($\text{Sim}$)?
    - A) $\text{Distance} = \text{Sim} + 1$
    - B) $\text{Distance} = 1 - \text{Sim}$
    - C) $\text{Distance} = \frac{1}{\text{Sim}}$
    - D) $\text{Distance} = \text{Sim}^2$
    - **Answer**: B
    - **Explanation**: Cosine Distance $= 1 - \text{Cosine Similarity}$.

89. In AWS, what service provides managed Git-compatible private code repositories?
    - A) AWS CodeCommit
    - B) AWS CodeBuild
    - C) AWS CodeDeploy
    - D) AWS CodePipeline
    - **Answer**: A
    - **Explanation**: AWS CodeCommit is a managed source control service hosting secure Git repositories.

90. In AWS, what service automates continuous integration and continuous delivery (CI/CD) pipelines?
    - A) AWS CodePipeline
    - B) AWS Secrets Manager
    - C) AWS KMS
    - D) AWS Shield
    - **Answer**: A
    - **Explanation**: CodePipeline orchestrates build, test, and deployment release phases automatically.

91. What is an Auto Scaling Group (ASG) in AWS EC2?
    - A) Storage volume generator
    - B) Collection of EC2 instances managed together to automatically launch or terminate instances based on demand policies
    - C) Database backup manager
    - D) User authentication pool
    - **Answer**: B
    - **Explanation**: ASG maintains application availability by automatically scaling EC2 instance counts up or down.

92. In Deep Learning, what is the role of Batch Normalization?
    - A) Normalizes inputs of each layer to have mean 0 and variance 1, accelerating training and stabilizing gradients
    - B) Deletes 50% of weights
    - C) Encrypts neural network parameters
    - D) Converts images to grayscale
    - **Answer**: A
    - **Explanation**: Batch Normalization stabilizes hidden layer activation distributions, allowing higher learning rates.

93. What is an Embedded Vector in Natural Language Processing?
    - A) A text string formatted as JSON
    - B) Dense numerical vector representation of words/tokens in continuous vector space capturing semantic relationships
    - C) HTML tag
    - D) SQL primary key
    - **Answer**: B
    - **Explanation**: Word embeddings map semantic meaning into dense continuous vector representations (e.g. Word2Vec, Ada embeddings).

94. What is the main characteristic of a Stateless application in Cloud Native design?
    - A) Stores all user session state locally on server hard drive
    - B) Does not retain client session state locally on individual server instances; state is offloaded to external database/cache
    - C) Cannot connect to internet
    - D) Uses zero memory
    - **Answer**: B
    - **Explanation**: Stateless instances treat every request independently, enabling effortless horizontal scaling and instance replacement.

95. In AWS, what is AWS KMS (Key Management Service)?
    - A) Network router
    - B) Managed service to create, control, and manage cryptographic keys used to encrypt data across AWS services
    - C) Domain registrar
    - D) Machine Learning model registry
    - **Answer**: B
    - **Explanation**: KMS manages cryptographic keys for data encryption at rest and in transit.

96. Which algorithm is an example of a Discriminative Model (predicts $P(Y|X)$ directly)?
    - A) Naive Bayes
    - B) Logistic Regression
    - C) Gaussian Mixture Model (GMM)
    - D) Variational Autoencoder (VAE)
    - **Answer**: B
    - **Explanation**: Logistic Regression models the conditional probability $P(Y|X)$ directly (Discriminative model).

97. Which algorithm is an example of a Generative Model (models joint probability $P(X, Y)$ or distribution $P(X)$)?
    - A) Naive Bayes
    - B) Support Vector Machines
    - C) K-Nearest Neighbors
    - D) Logistic Regression
    - **Answer**: A
    - **Explanation**: Naive Bayes models the joint probability distribution $P(X, Y) = P(X|Y)P(Y)$ (Generative model).

98. In Cloud Computing, Multi-Tenancy refers to:
    - A) One customer owning an entire physical data center
    - B) Architecture where multiple distinct customers (tenants) share the same physical computing hardware securely isolated from one another
    - C) Running multiple OS on a single desktop
    - D) Writing code in multiple languages
    - **Answer**: B
    - **Explanation**: Multi-tenancy shares underlying physical infrastructure across tenants while enforcing logical data isolation.

99. In GCP (Google Cloud Platform), what service is equivalent to AWS EC2 for virtual server compute?
    - A) App Engine
    - B) Compute Engine
    - C) Cloud Run
    - D) BigQuery
    - **Answer**: B
    - **Explanation**: Google Compute Engine provides virtual machine instances in GCP.

100. In GCP, what service is managed serverless data warehouse for enterprise analytics?
    - A) BigQuery
    - B) Cloud Storage
    - C) Cloud SQL
    - D) Firestore
    - **Answer**: A
    - **Explanation**: BigQuery is GCP's serverless, highly scalable SQL data warehouse for analytics.

---

*(All 100 MCQs fully rendered with options, answer key, and detailed explanations covering Cognizant, Virtusa, and Accenture OA patterns).*
