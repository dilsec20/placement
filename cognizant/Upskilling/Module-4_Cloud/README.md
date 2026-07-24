# ☁️ Cloud Computing — Complete Study Guide

> **Module 4 | Digital Nurture 5.0 — Java FSE Upskilling**
> MCQ-focused notes covering AWS, Azure, GCP concepts, cloud fundamentals, and exam-ready practice questions.

---

## 📋 Topics Covered

1. [Introduction to Cloud Computing](#1-introduction-to-cloud-computing)
2. [Cloud Service Models](#2-cloud-service-models)
3. [Cloud Deployment Models](#3-cloud-deployment-models)
4. [Major Cloud Providers](#4-major-cloud-providers)
5. [AWS — Amazon Web Services](#5-aws--amazon-web-services)
6. [Azure — Microsoft Azure](#6-azure--microsoft-azure)
7. [GCP — Google Cloud Platform](#7-gcp--google-cloud-platform)
8. [Virtualization & Containers](#8-virtualization--containers)
9. [Cloud Storage & Databases](#9-cloud-storage--databases)
10. [Cloud Networking](#10-cloud-networking)
11. [Cloud Security & Compliance](#11-cloud-security--compliance)
12. [DevOps & CI/CD in Cloud](#12-devops--cicd-in-cloud)
13. [Serverless Computing](#13-serverless-computing)
14. [Cloud Cost Management](#14-cloud-cost-management)
15. [Practice MCQs — Exam Ready](#15-practice-mcqs--exam-ready)

---

## 1. Introduction to Cloud Computing

### 📌 What is Cloud Computing?

**Cloud Computing** is the delivery of computing services — including servers, storage, databases, networking, software, analytics, and intelligence — over the Internet ("the cloud") to offer faster innovation, flexible resources, and economies of scale.

> 💡 NIST Definition: *"Cloud computing is a model for enabling ubiquitous, convenient, on-demand network access to a shared pool of configurable computing resources."*

### Essential Characteristics (NIST — Must Know for MCQs!)

| Characteristic | Description |
|----------------|-------------|
| **On-demand Self-service** | Users can provision resources without human interaction from service provider |
| **Broad Network Access** | Available over the network and accessed through standard mechanisms |
| **Resource Pooling** | Provider's resources pooled to serve multiple consumers (multi-tenancy) |
| **Rapid Elasticity** | Resources can be elastically provisioned and released |
| **Measured Service** | Resource usage is monitored, controlled, and reported (pay-per-use) |

### Benefits of Cloud Computing

| Benefit | Description |
|---------|-------------|
| **Cost Efficiency** | No upfront hardware investment; pay-as-you-go |
| **Scalability** | Scale up/down based on demand |
| **Reliability** | Data backup, disaster recovery, business continuity |
| **Security** | Broad set of policies, technologies, and controls |
| **Speed** | Vast amounts of computing resources provisioned in minutes |
| **Global Reach** | Deploy globally in minutes |
| **Productivity** | Removes need to manage hardware/software |

### Cloud vs Traditional IT

| Aspect | Traditional IT | Cloud Computing |
|--------|---------------|-----------------|
| **Capital Expense** | High upfront cost | Low / Pay-as-you-go |
| **Scalability** | Limited by hardware | Infinite / on-demand |
| **Maintenance** | IT team responsible | Provider responsible |
| **Speed of Deployment** | Weeks/months | Minutes |
| **Disaster Recovery** | Complex & costly | Built-in |
| **Global Reach** | Limited | Instant |

---

## 2. Cloud Service Models

### 🔑 The Three Core Service Models (IaaS, PaaS, SaaS)

```
+----------------------------------------------------------+
|                      SaaS                               |
|   Applications (Gmail, Salesforce, Office 365)          |
+----------------------------------------------------------+
|                      PaaS                               |
|   Development Platforms (AWS Elastic Beanstalk,         |
|        Google App Engine, Azure App Service)            |
+----------------------------------------------------------+
|                      IaaS                               |
|   Infrastructure (AWS EC2, Azure VMs, Google CE)        |
+----------------------------------------------------------+
```

### IaaS — Infrastructure as a Service

| Property | Details |
|----------|---------|
| **What you get** | Virtualized computing, storage, networking |
| **Who manages** | You manage OS, middleware, apps; provider manages hardware |
| **Use case** | Migrating data center workloads, test/dev |
| **Examples** | AWS EC2, Azure Virtual Machines, Google Compute Engine |
| **Control Level** | Highest (most flexible) |

### PaaS — Platform as a Service

| Property | Details |
|----------|---------|
| **What you get** | Development tools, databases, middleware, OS |
| **Who manages** | You manage applications & data; provider manages everything else |
| **Use case** | App development without managing underlying infrastructure |
| **Examples** | AWS Elastic Beanstalk, Azure App Service, Google App Engine, Heroku |
| **Control Level** | Medium |

### SaaS — Software as a Service

| Property | Details |
|----------|---------|
| **What you get** | Fully functional applications delivered via browser |
| **Who manages** | Provider manages everything |
| **Use case** | Email, CRM, collaboration tools |
| **Examples** | Gmail, Microsoft 365, Salesforce, Dropbox, Zoom |
| **Control Level** | Lowest (least flexible) |

### Responsibility Matrix (Exam Favorite!)

| Component | IaaS | PaaS | SaaS |
|-----------|------|------|------|
| Applications | You | You | Provider |
| Data | You | You | Provider |
| Runtime | You | Provider | Provider |
| Middleware | You | Provider | Provider |
| Operating System | You | Provider | Provider |
| Virtualization | Provider | Provider | Provider |
| Servers | Provider | Provider | Provider |
| Storage | Provider | Provider | Provider |
| Networking | Provider | Provider | Provider |

### Other Service Models

| Model | Full Form | Description |
|-------|-----------|-------------|
| **FaaS** | Function as a Service | Run individual functions (AWS Lambda) |
| **DBaaS** | Database as a Service | Managed databases (AWS RDS, Azure SQL) |
| **STaaS** | Storage as a Service | Managed cloud storage (S3, Azure Blob) |
| **CaaS** | Container as a Service | Managed containers (ECS, GKE) |
| **DRaaS** | Disaster Recovery as a Service | Backup & DR solutions |

---

## 3. Cloud Deployment Models

### Four Deployment Models

| Model | Description | Use Case |
|-------|-------------|----------|
| **Public Cloud** | Resources owned and operated by third-party provider, shared among customers | Startups, web apps, variable workloads |
| **Private Cloud** | Resources used exclusively by one organization (on-premise or hosted) | Banks, government, sensitive data |
| **Hybrid Cloud** | Combination of public and private cloud connected | Burst to cloud, data sovereignty |
| **Community Cloud** | Shared by several organizations with common concerns | Healthcare, government agencies |

### Public Cloud

- **Providers**: AWS, Azure, GCP
- **Pros**: No maintenance, cost-effective, scalable
- **Cons**: Less control, security concerns, vendor lock-in

### Private Cloud

- **Examples**: VMware, OpenStack, Microsoft Azure Stack
- **Pros**: Full control, security, compliance
- **Cons**: High cost, requires IT expertise, limited scalability

### Hybrid Cloud

- **Key Tech**: VPN, Direct Connect (AWS), ExpressRoute (Azure)
- **Use case**: Keep sensitive data on-premise, burst compute to public cloud
- **Pros**: Flexibility, control + scalability

### Multi-Cloud

- Using services from **multiple cloud providers** simultaneously
- Avoid vendor lock-in, best-of-breed services
- Example: AWS for compute + GCP for ML + Azure for Office 365

---

## 4. Major Cloud Providers

### Market Share Comparison

| Provider | Market Share | Key Strength |
|----------|-------------|--------------|
| **AWS (Amazon)** | ~32% (Leader) | Broadest services, mature ecosystem |
| **Azure (Microsoft)** | ~22% | Enterprise, Active Directory, Office 365 integration |
| **GCP (Google)** | ~12% | Data analytics, ML/AI, Kubernetes (invented it) |
| **Alibaba Cloud** | ~4% | Asia-Pacific dominance |
| **IBM Cloud** | ~3% | Hybrid cloud, enterprise |

### Service Comparison Table

| Service Category | AWS | Azure | GCP |
|-----------------|-----|-------|-----|
| **Compute** | EC2 | Virtual Machines | Compute Engine |
| **Serverless** | Lambda | Azure Functions | Cloud Functions |
| **Containers** | ECS/EKS | AKS | GKE |
| **Object Storage** | S3 | Blob Storage | Cloud Storage |
| **Block Storage** | EBS | Managed Disks | Persistent Disk |
| **Relational DB** | RDS | Azure SQL Database | Cloud SQL |
| **NoSQL DB** | DynamoDB | Cosmos DB | Firestore/Bigtable |
| **Data Warehouse** | Redshift | Synapse Analytics | BigQuery |
| **CDN** | CloudFront | Azure CDN | Cloud CDN |
| **DNS** | Route 53 | Azure DNS | Cloud DNS |
| **Load Balancer** | ELB/ALB | Azure Load Balancer | Cloud Load Balancing |
| **VPC/Networking** | VPC | Virtual Network (VNet) | VPC |
| **IAM** | IAM | Azure AD | Cloud IAM |
| **Monitoring** | CloudWatch | Azure Monitor | Cloud Monitoring |
| **ML/AI** | SageMaker | Azure ML | Vertex AI |
| **CI/CD** | CodePipeline | Azure DevOps | Cloud Build |
| **Message Queue** | SQS/SNS | Service Bus | Pub/Sub |

---

## 5. AWS — Amazon Web Services

### AWS Global Infrastructure

| Component | Description |
|-----------|-------------|
| **Region** | Geographic area with 2+ Availability Zones (e.g., us-east-1) |
| **Availability Zone (AZ)** | One or more data centers with redundant power/networking |
| **Edge Location** | CDN endpoints for CloudFront (200+ globally) |
| **Local Zone** | Extension of AWS Region to metro area |

> 📌 **Key fact**: AWS has **30+ Regions** and **90+ Availability Zones** globally.

### Core AWS Services

#### Compute Services

| Service | Description |
|---------|-------------|
| **EC2** | Elastic Compute Cloud — Virtual servers in the cloud |
| **Lambda** | Run code without managing servers (serverless) |
| **ECS** | Elastic Container Service — Run Docker containers |
| **EKS** | Elastic Kubernetes Service — Managed Kubernetes |
| **Elastic Beanstalk** | PaaS — Deploy apps without managing infrastructure |
| **Lightsail** | Simple virtual private servers for small apps |
| **Fargate** | Serverless containers (no need to manage EC2) |

#### EC2 Instance Types

| Family | Optimized For | Use Case |
|--------|--------------|----------|
| **t** (General) | Burstable performance | Web servers, dev/test |
| **m** (General) | Balance of compute/memory | App servers, databases |
| **c** (Compute) | High CPU | Batch, gaming, ML inference |
| **r** (Memory) | High RAM | In-memory databases, caching |
| **i** (Storage) | NVMe SSD | NoSQL databases, data warehousing |
| **p/g** (GPU) | GPU-intensive | ML training, graphics |

#### EC2 Pricing Models

| Model | Description | Discount |
|-------|-------------|---------|
| **On-Demand** | Pay by the hour/second, no commitment | Baseline |
| **Reserved Instances** | 1 or 3-year commitment | Up to 72% |
| **Spot Instances** | Use unused capacity, can be interrupted | Up to 90% |
| **Savings Plans** | Flexible pricing, commitment to spend | Up to 66% |
| **Dedicated Hosts** | Physical server dedicated to you | Compliance needs |

#### Storage Services

| Service | Type | Description |
|---------|------|-------------|
| **S3** | Object Storage | Scalable, 99.999999999% (11 nines) durability |
| **EBS** | Block Storage | Persistent disk for EC2 instances |
| **EFS** | File Storage | Managed NFS for Linux (shared) |
| **FSx** | File Storage | Windows File Server or Lustre |
| **Glacier** | Archive Storage | Long-term archival, very cheap |
| **Storage Gateway** | Hybrid | Connect on-premise to cloud storage |

#### S3 Storage Classes

| Class | Use Case | Retrieval |
|-------|----------|-----------|
| **S3 Standard** | Frequently accessed data | Immediate |
| **S3 Intelligent-Tiering** | Unknown access patterns | Immediate |
| **S3 Standard-IA** | Infrequently accessed | Immediate |
| **S3 One Zone-IA** | Non-critical, infrequent | Immediate |
| **S3 Glacier Instant** | Archive with instant access | Milliseconds |
| **S3 Glacier Flexible** | Archive | 1 min to 12 hours |
| **S3 Glacier Deep Archive** | Long-term archive | 12-48 hours |

#### Database Services

| Service | Type | Description |
|---------|------|-------------|
| **RDS** | Relational | MySQL, PostgreSQL, Oracle, SQL Server, MariaDB |
| **Aurora** | Relational | MySQL/PostgreSQL-compatible, 5x faster |
| **DynamoDB** | NoSQL | Fully managed key-value & document DB |
| **ElastiCache** | In-memory | Redis or Memcached |
| **Redshift** | Data Warehouse | Petabyte-scale analytics |
| **Neptune** | Graph DB | Highly connected datasets |
| **DocumentDB** | Document | MongoDB-compatible |
| **Timestream** | Time Series | IoT and operational applications |

#### Networking Services

| Service | Description |
|---------|-------------|
| **VPC** | Virtual Private Cloud — isolated network |
| **Route 53** | DNS web service + domain registration |
| **CloudFront** | CDN — Content Delivery Network |
| **ELB** | Elastic Load Balancing (ALB, NLB, CLB) |
| **API Gateway** | Create, maintain, and secure APIs |
| **Direct Connect** | Dedicated network from on-premise to AWS |
| **Transit Gateway** | Connect VPCs and on-premise networks |

#### Security Services

| Service | Description |
|---------|-------------|
| **IAM** | Identity and Access Management |
| **KMS** | Key Management Service — encryption keys |
| **WAF** | Web Application Firewall |
| **Shield** | DDoS protection |
| **GuardDuty** | Threat detection service |
| **Inspector** | Security assessment service |
| **Macie** | Data security, finds sensitive data in S3 |
| **Secrets Manager** | Store and rotate secrets |
| **CloudTrail** | Log AWS API calls |

#### Monitoring & Management

| Service | Description |
|---------|-------------|
| **CloudWatch** | Monitoring for AWS resources and apps |
| **CloudFormation** | Infrastructure as Code (IaC) |
| **CloudTrail** | API activity logging and auditing |
| **Config** | Track configuration changes |
| **Systems Manager** | Operational data across AWS resources |
| **Trusted Advisor** | Best practice recommendations |

#### AWS Well-Architected Framework Pillars

| Pillar | Focus |
|--------|-------|
| **Operational Excellence** | Run and monitor systems |
| **Security** | Protect information and systems |
| **Reliability** | Recover from failures, meet demand |
| **Performance Efficiency** | Use computing resources efficiently |
| **Cost Optimization** | Avoid unnecessary costs |
| **Sustainability** | Minimize environmental impact |

---

## 6. Azure — Microsoft Azure

### Azure Global Infrastructure

| Component | Description |
|-----------|-------------|
| **Geography** | Contains two or more regions (data residency boundary) |
| **Region** | A set of data centers connected by a low-latency network |
| **Availability Zone** | Physically separate data centers within a region |
| **Region Pair** | Two regions in same geography for disaster recovery |

### Core Azure Services

#### Compute

| Service | Description |
|---------|-------------|
| **Virtual Machines** | IaaS compute (Windows/Linux) |
| **Azure Functions** | Serverless compute |
| **App Service** | PaaS for web apps |
| **AKS** | Azure Kubernetes Service |
| **Container Instances** | Serverless containers |
| **Azure Batch** | Large-scale parallel computing |

#### Storage

| Service | Type |
|---------|------|
| **Blob Storage** | Object storage (Hot, Cool, Archive tiers) |
| **File Storage** | SMB/NFS file shares |
| **Queue Storage** | Message queuing |
| **Table Storage** | NoSQL key-value |
| **Disk Storage** | Managed disks for VMs |

#### Databases

| Service | Type |
|---------|------|
| **Azure SQL Database** | Managed SQL Server |
| **Cosmos DB** | Multi-model globally distributed NoSQL |
| **Azure Database for MySQL/PostgreSQL** | Managed OSS databases |
| **Azure Synapse Analytics** | Unified analytics (data warehouse + big data) |
| **Azure Cache for Redis** | In-memory caching |

#### Networking

| Service | Description |
|---------|-------------|
| **Virtual Network (VNet)** | Private network in Azure |
| **Azure Load Balancer** | L4 load balancing |
| **Application Gateway** | L7 load balancing + WAF |
| **Azure CDN** | Content Delivery Network |
| **ExpressRoute** | Dedicated private connection to Azure |
| **Azure DNS** | DNS hosting |
| **VPN Gateway** | Site-to-site VPN |

#### Identity & Security

| Service | Description |
|---------|-------------|
| **Azure Active Directory (AAD)** | Identity platform, SSO |
| **Azure Key Vault** | Secrets, keys, certificates |
| **Azure Security Center** | Unified security management |
| **Azure Sentinel** | Cloud-native SIEM |
| **Azure Policy** | Enforce organizational standards |
| **RBAC** | Role-Based Access Control |

#### Azure Messaging Services Comparison

| Feature | Service Bus | Event Hub | Event Grid |
|---------|------------|-----------|------------|
| **Type** | Message queue/topic | Event streaming | Event routing |
| **Use Case** | Enterprise messaging, ordering | Big data streaming, telemetry | Reactive programming, events |
| **Protocol** | AMQP, HTTPS | AMQP, HTTPS, Kafka | HTTPS |

---

## 7. GCP — Google Cloud Platform

### Core GCP Services

#### Compute

| Service | Description |
|---------|-------------|
| **Compute Engine** | IaaS — Virtual machines |
| **Cloud Functions** | Serverless, event-driven |
| **App Engine** | PaaS — auto-scaling web apps |
| **GKE** | Google Kubernetes Engine (Google invented Kubernetes) |
| **Cloud Run** | Serverless containers |

#### Storage

| Service | Type |
|---------|------|
| **Cloud Storage** | Object storage (Standard, Nearline, Coldline, Archive) |
| **Persistent Disk** | Block storage for VMs |
| **Filestore** | Managed NFS file storage |

#### Databases

| Service | Type |
|---------|------|
| **Cloud SQL** | Managed MySQL, PostgreSQL, SQL Server |
| **Cloud Spanner** | Globally distributed relational DB |
| **Firestore** | NoSQL document database |
| **Bigtable** | Wide-column NoSQL for large analytical workloads |
| **BigQuery** | Serverless data warehouse |
| **Memorystore** | Managed Redis/Memcached |

#### ML & AI (GCP's Strength!)

| Service | Description |
|---------|-------------|
| **Vertex AI** | Unified ML platform |
| **AutoML** | Train custom ML models with minimal code |
| **Vision AI** | Image recognition API |
| **Natural Language API** | Text analysis |
| **Translation API** | 100+ language translation |
| **Speech-to-Text / Text-to-Speech** | Audio processing |
| **TensorFlow** | Open-source ML framework (by Google) |

---

## 8. Virtualization & Containers

### Virtualization Concepts

| Term | Description |
|------|-------------|
| **Hypervisor** | Software to create and run virtual machines |
| **Type 1 Hypervisor** | Bare-metal (VMware ESXi, Microsoft Hyper-V, KVM) |
| **Type 2 Hypervisor** | Hosted on OS (VMware Workstation, VirtualBox) |
| **VM** | Virtual Machine — complete OS running on hypervisor |
| **Snapshot** | Point-in-time copy of a VM state |

### VM vs Container

| Feature | Virtual Machine | Container |
|---------|----------------|-----------|
| **OS** | Full OS per VM | Shares host OS kernel |
| **Size** | GB range | MB range |
| **Boot Time** | Minutes | Seconds |
| **Isolation** | Strong | Process-level |
| **Portability** | Less portable | Highly portable |
| **Performance** | Near native | Native |
| **Use Case** | Full OS isolation | Microservices |

### Docker

| Concept | Description |
|---------|-------------|
| **Docker** | Container platform to build, ship, run apps |
| **Dockerfile** | Blueprint to build Docker image |
| **Image** | Read-only template for containers |
| **Container** | Running instance of an image |
| **Docker Hub** | Public registry for Docker images |
| **Docker Compose** | Multi-container apps with YAML |

### Kubernetes (K8s)

| Concept | Description |
|---------|-------------|
| **Kubernetes** | Container orchestration platform (open-source, by Google) |
| **Pod** | Smallest deployable unit (one or more containers) |
| **Node** | Worker machine (VM or physical) |
| **Cluster** | Set of nodes managed by Kubernetes |
| **Deployment** | Declarative updates for Pods |
| **Service** | Expose application as network service |
| **Ingress** | HTTP/HTTPS routing rules |
| **ConfigMap** | Store non-confidential configuration |
| **Secret** | Store sensitive information |
| **Namespace** | Virtual cluster within a cluster |
| **kubectl** | CLI to interact with K8s |

#### Managed Kubernetes Services

| Provider | Service |
|----------|---------|
| AWS | EKS (Elastic Kubernetes Service) |
| Azure | AKS (Azure Kubernetes Service) |
| GCP | GKE (Google Kubernetes Engine) |

---

## 9. Cloud Storage & Databases

### Storage Types

| Type | Description | Access Pattern |
|------|-------------|----------------|
| **Object Storage** | Flat namespace, key-value (S3, Blob, GCS) | HTTP-based, infrequent |
| **Block Storage** | Raw storage attached to VM (EBS, Azure Disk) | Low latency, random I/O |
| **File Storage** | Hierarchical file system (EFS, Azure Files) | Shared access, NFS/SMB |
| **Archive Storage** | Long-term, very cheap (Glacier, Archive) | Rare access |

### Database Types

| Type | Examples | Use Case |
|------|---------|----------|
| **Relational (RDBMS)** | MySQL, PostgreSQL, Oracle | Structured data, ACID transactions |
| **Key-Value** | DynamoDB, Redis, Cosmos DB | Sessions, caching, user profiles |
| **Document** | MongoDB, Firestore, DocumentDB | JSON-like documents, catalogs |
| **Wide-Column** | Cassandra, Bigtable, HBase | IoT, time-series, analytics |
| **Graph** | Neptune, Neo4j | Social networks, recommendations |
| **Time-Series** | InfluxDB, Timestream | IoT sensors, monitoring metrics |
| **In-memory** | Redis, Memcached | Caching, real-time leaderboards |
| **Search** | Elasticsearch, OpenSearch | Full-text search |

### ACID Properties

| Property | Description |
|----------|-------------|
| **Atomicity** | All or nothing — transaction fully completes or rolls back |
| **Consistency** | Database remains in valid state before and after transaction |
| **Isolation** | Transactions do not interfere with each other |
| **Durability** | Committed transactions persist even after failure |

### CAP Theorem

| Property | Description |
|----------|-------------|
| **Consistency** | Every read receives the most recent write |
| **Availability** | Every request receives a response |
| **Partition Tolerance** | System continues despite network partitions |

> 📌 A distributed system can guarantee only **2 out of 3** CAP properties simultaneously.

---

## 10. Cloud Networking

### Key Networking Concepts

| Concept | Description |
|---------|-------------|
| **VPC** | Virtual Private Cloud — isolated network in cloud |
| **Subnet** | Range of IP addresses in a VPC |
| **Public Subnet** | Has route to internet gateway |
| **Private Subnet** | No direct internet access |
| **Internet Gateway** | Allows internet access for VPC |
| **NAT Gateway** | Allows private subnet to access internet (outbound only) |
| **Security Group** | Virtual firewall at instance level (stateful) |
| **Network ACL** | Subnet-level firewall (stateless) |
| **Route Table** | Rules for routing network traffic |
| **VPN** | Encrypted connection over public internet |
| **Peering** | Connect two VPCs privately |
| **Load Balancer** | Distribute traffic across multiple targets |

### Load Balancer Types

| Type | Layer | Use Case |
|------|-------|----------|
| **Application Load Balancer (ALB)** | L7 (HTTP/HTTPS) | Web apps, microservices, path-based routing |
| **Network Load Balancer (NLB)** | L4 (TCP/UDP) | Ultra-low latency, millions of requests/sec |
| **Gateway Load Balancer** | L3 | Deploy, scale, manage third-party network appliances |
| **Classic Load Balancer** | L4/L7 | Legacy (being phased out) |

### CDN (Content Delivery Network)

| Concept | Description |
|---------|-------------|
| **CDN** | Distributed servers caching content near users |
| **Edge Location** | CDN node closest to end user |
| **Origin** | Source of the original content |
| **Cache Hit** | Content served from CDN edge |
| **Cache Miss** | Content fetched from origin |
| **TTL** | Time-to-Live — how long content stays cached |
| **AWS CloudFront** | AWS CDN with 400+ edge locations |

### DNS Concepts

| Term | Description |
|------|-------------|
| **DNS** | Domain Name System — translates domain to IP |
| **A Record** | Maps domain to IPv4 address |
| **AAAA Record** | Maps domain to IPv6 address |
| **CNAME** | Alias from one domain to another |
| **MX Record** | Mail exchange record |
| **TTL** | Time-to-Live — cache duration |
| **Route 53** | AWS DNS service + health checks + routing policies |

---

## 11. Cloud Security & Compliance

### Shared Responsibility Model (Critical MCQ Topic!)

```
+--------------------------------------------------+
|              CUSTOMER                            |
|  Data, Applications, IAM, OS (for IaaS),         |
|  Network Config, Client-side encryption          |
+--------------------------------------------------+
|              CLOUD PROVIDER                      |
|  Physical Security, Hardware, Hypervisor,        |
|  Network Infrastructure, Facilities              |
+--------------------------------------------------+
```

| Model | Customer Manages | Provider Manages |
|-------|-----------------|-----------------|
| **IaaS** | OS, Middleware, Apps, Data | Hardware, Hypervisor, Network |
| **PaaS** | Apps, Data | OS, Middleware, Hardware |
| **SaaS** | Data only | Everything else |

### IAM Concepts

| Concept | Description |
|---------|-------------|
| **IAM** | Identity and Access Management |
| **User** | Individual person or service with credentials |
| **Group** | Collection of users with same permissions |
| **Role** | Set of permissions assumed by user/service |
| **Policy** | JSON document defining permissions |
| **Principle of Least Privilege** | Grant only minimum required access |
| **MFA** | Multi-Factor Authentication — extra security layer |

### Authentication vs Authorization

| Term | Description |
|------|-------------|
| **Authentication (AuthN)** | Verifying WHO you are (identity) |
| **Authorization (AuthZ)** | Verifying WHAT you can do (permissions) |
| **SSO** | Single Sign-On — one login for multiple apps |
| **OAuth 2.0** | Authorization framework |
| **SAML** | Security Assertion Markup Language — federated identity |
| **JWT** | JSON Web Token — stateless auth token |

### Encryption

| Concept | Description |
|---------|-------------|
| **Encryption at Rest** | Data encrypted when stored |
| **Encryption in Transit** | Data encrypted when moving (TLS/SSL) |
| **Symmetric Encryption** | Same key for encrypt/decrypt (AES) |
| **Asymmetric Encryption** | Public key encrypts, private key decrypts (RSA) |
| **KMS** | Key Management Service — manage encryption keys |
| **HSM** | Hardware Security Module — physical key storage |
| **TLS** | Transport Layer Security (HTTPS) |

### Compliance Standards

| Standard | Domain |
|----------|--------|
| **ISO 27001** | Information security management |
| **SOC 2** | Service organization controls (security/availability) |
| **PCI DSS** | Payment card industry data security |
| **HIPAA** | Healthcare data protection (USA) |
| **GDPR** | General Data Protection Regulation (EU) |
| **FedRAMP** | US Federal government cloud security |
| **NIST** | National Institute of Standards and Technology |

---

## 12. DevOps & CI/CD in Cloud

### DevOps Concepts

| Concept | Description |
|---------|-------------|
| **DevOps** | Culture combining Development + Operations |
| **CI** | Continuous Integration — frequently merge and build |
| **CD** | Continuous Delivery/Deployment — automate release |
| **IaC** | Infrastructure as Code — manage infra with code |
| **GitOps** | Using Git as single source of truth for infra |
| **Shift Left** | Test/secure earlier in development lifecycle |

### CI/CD Pipeline Stages

```
Code --> Build --> Test --> Stage --> Deploy --> Monitor
```

### Cloud CI/CD Tools

| Provider | CI/CD Tool |
|----------|-----------|
| AWS | CodeCommit, CodeBuild, CodeDeploy, CodePipeline |
| Azure | Azure DevOps, Azure Pipelines |
| GCP | Cloud Source Repositories, Cloud Build, Cloud Deploy |
| Third-party | Jenkins, GitHub Actions, GitLab CI, CircleCI |

### Infrastructure as Code (IaC)

| Tool | Provider | Language |
|------|----------|---------|
| **CloudFormation** | AWS | JSON/YAML |
| **ARM Templates** | Azure | JSON |
| **Deployment Manager** | GCP | YAML/Python |
| **Terraform** | Multi-cloud | HCL (HashiCorp) |
| **Pulumi** | Multi-cloud | Python/JS/Go |
| **Ansible** | Multi-cloud | YAML |
| **Chef/Puppet** | Multi-cloud | Ruby DSL |

---

## 13. Serverless Computing

### What is Serverless?

- **No server management** — cloud handles all infrastructure
- **Auto-scaling** — scales to zero when not in use
- **Pay-per-execution** — pay only when code runs
- **Event-driven** — triggered by events (HTTP, queue, timer)

### Serverless Services

| Provider | FaaS | Other Serverless |
|----------|------|-----------------|
| AWS | Lambda | Fargate, API Gateway, DynamoDB, S3, SNS/SQS |
| Azure | Azure Functions | Logic Apps, Event Grid, Cosmos DB |
| GCP | Cloud Functions | Cloud Run, Firestore, BigQuery |

### AWS Lambda Key Facts

| Property | Value |
|----------|-------|
| **Max execution time** | 15 minutes |
| **Memory** | 128 MB to 10 GB |
| **Languages** | Python, Node.js, Java, C#, Go, Ruby |
| **Triggers** | S3, DynamoDB, Kinesis, API Gateway, SNS, SQS, etc. |
| **Free tier** | 1 million requests/month |
| **Pricing** | Per request + duration (GB-seconds) |

### Serverless Architecture Patterns

| Pattern | Description |
|---------|-------------|
| **Event-driven** | Functions triggered by events |
| **Fan-out** | One event triggers multiple functions |
| **Saga** | Distributed transactions using multiple functions |
| **Backend for Frontend (BFF)** | Dedicated API per frontend |

---

## 14. Cloud Cost Management

### Cloud Pricing Models

| Model | Description |
|-------|-------------|
| **Pay-as-you-go** | Pay only for what you use, no commitment |
| **Reserved** | Commit to 1 or 3 years for discount (up to 72%) |
| **Spot/Preemptible** | Cheapest, can be interrupted anytime |
| **Savings Plans** | Flexible discount with usage commitment |
| **Free Tier** | Limited free usage for new users |

### Cost Optimization Strategies

| Strategy | Description |
|----------|-------------|
| **Right-sizing** | Match instance size to actual workload |
| **Auto-scaling** | Scale in during low demand |
| **Reserved Instances** | Commit for predictable workloads |
| **Spot Instances** | Batch jobs and fault-tolerant workloads |
| **Storage tiering** | Move cold data to cheaper storage classes |
| **Delete unused resources** | Terminate idle instances, snapshots |
| **Multi-region optimization** | Leverage cheaper regions |

### Cloud Cost Tools

| Provider | Tool |
|----------|------|
| AWS | Cost Explorer, Budgets, Trusted Advisor |
| Azure | Cost Management + Billing, Azure Advisor |
| GCP | Cloud Billing, Cloud Recommender |

---

## 15. Practice MCQs — Exam Ready

### Section A — Cloud Fundamentals

**Q1.** Which of the following is NOT an essential characteristic of cloud computing according to NIST?
- A) On-demand self-service
- B) Broad network access
- C) Dedicated hardware
- D) Measured service

> ✅ **Answer: C) Dedicated hardware**
> NIST's 5 characteristics: On-demand self-service, Broad network access, Resource pooling, Rapid elasticity, Measured service.

---

**Q2.** In which cloud service model does the provider manage the operating system?
- A) IaaS only
- B) PaaS and SaaS
- C) IaaS and PaaS
- D) All service models

> ✅ **Answer: B) PaaS and SaaS**
> In IaaS, the customer manages the OS. In PaaS and SaaS, the provider manages it.

---

**Q3.** A company wants to use cloud resources during peak times but keep sensitive data on-premise. Which deployment model is best?
- A) Public Cloud
- B) Private Cloud
- C) Hybrid Cloud
- D) Community Cloud

> ✅ **Answer: C) Hybrid Cloud**
> Hybrid cloud combines public and private clouds, ideal for bursting to the cloud while keeping sensitive data on-premise.

---

**Q4.** Which cloud model provides the LEAST control to the user?
- A) IaaS
- B) PaaS
- C) SaaS
- D) FaaS

> ✅ **Answer: C) SaaS**
> SaaS abstracts all infrastructure — users only control their data.

---

**Q5.** What does "elasticity" mean in cloud computing?
- A) Ability to stretch physically
- B) Automatically scale resources up/down based on demand
- C) Making data elastic/flexible
- D) Stretching network bandwidth

> ✅ **Answer: B) Automatically scale resources up/down based on demand**

---

### Section B — AWS

**Q6.** What is the minimum number of Availability Zones required in an AWS Region?
- A) 1
- B) 2
- C) 3
- D) 4

> ✅ **Answer: B) 2**
> AWS regions have a minimum of 2 Availability Zones (most have 3+).

---

**Q7.** Which AWS service provides managed Kubernetes?
- A) ECS
- B) EKS
- C) Fargate
- D) Lambda

> ✅ **Answer: B) EKS**
> EKS = Elastic Kubernetes Service. ECS is for Docker containers.

---

**Q8.** An application needs object storage with 99.999999999% durability. Which AWS service should be used?
- A) EBS
- B) EFS
- C) S3
- D) Glacier

> ✅ **Answer: C) S3**
> Amazon S3 offers 11 nines (99.999999999%) of data durability.

---

**Q9.** Which S3 storage class is best for data accessed once a month with low cost?
- A) S3 Standard
- B) S3 Standard-IA
- C) S3 Glacier Deep Archive
- D) S3 Intelligent-Tiering

> ✅ **Answer: B) S3 Standard-IA**
> IA = Infrequently Accessed. Cheaper than Standard but has retrieval fee.

---

**Q10.** What is the maximum execution time for an AWS Lambda function?
- A) 5 minutes
- B) 10 minutes
- C) 15 minutes
- D) 60 minutes

> ✅ **Answer: C) 15 minutes**

---

**Q11.** Which EC2 pricing model offers the highest discount (up to 90%) but can be interrupted?
- A) On-Demand
- B) Reserved Instances
- C) Spot Instances
- D) Savings Plans

> ✅ **Answer: C) Spot Instances**
> Spot instances use AWS spare capacity and can be reclaimed with 2 minutes notice.

---

**Q12.** Which AWS service is used to log all API calls made to AWS?
- A) CloudWatch
- B) CloudTrail
- C) Config
- D) Trusted Advisor

> ✅ **Answer: B) CloudTrail**
> CloudTrail = audit log of all API activity. CloudWatch = metrics & monitoring.

---

**Q13.** In the AWS Shared Responsibility Model, who is responsible for patching the OS on an EC2 instance?
- A) AWS
- B) Customer
- C) Both AWS and Customer
- D) Neither

> ✅ **Answer: B) Customer**
> EC2 is IaaS — customer manages the OS, patching, and applications.

---

**Q14.** Which AWS service provides a dedicated private connection from on-premise to AWS?
- A) VPN
- B) Direct Connect
- C) Transit Gateway
- D) VPC Peering

> ✅ **Answer: B) Direct Connect**
> Direct Connect provides a dedicated, private fiber connection to AWS.

---

**Q15.** Which pillar of the AWS Well-Architected Framework focuses on recovering from failures?
- A) Performance Efficiency
- B) Cost Optimization
- C) Reliability
- D) Operational Excellence

> ✅ **Answer: C) Reliability**

---

### Section C — Azure

**Q16.** What is Azure's equivalent of AWS S3?
- A) Azure Files
- B) Azure Blob Storage
- C) Azure Queue Storage
- D) Azure Disk

> ✅ **Answer: B) Azure Blob Storage**
> Blob (Binary Large Object) Storage is Azure's object storage service.

---

**Q17.** Which Azure service is used for Identity and Access Management?
- A) Azure Security Center
- B) Azure Key Vault
- C) Azure Active Directory
- D) Azure Policy

> ✅ **Answer: C) Azure Active Directory (AAD)**
> AAD is Azure's cloud identity and access management service.

---

**Q18.** Which Azure service is equivalent to AWS Direct Connect?
- A) VPN Gateway
- B) ExpressRoute
- C) Azure CDN
- D) Virtual WAN

> ✅ **Answer: B) ExpressRoute**
> ExpressRoute provides private, dedicated connectivity to Azure.

---

**Q19.** What is Azure's managed Kubernetes service called?
- A) ACR
- B) ACI
- C) AKS
- D) ACE

> ✅ **Answer: C) AKS**
> AKS = Azure Kubernetes Service.

---

**Q20.** Cosmos DB is an example of which type of database?
- A) Relational
- B) Graph-only
- C) Multi-model globally distributed NoSQL
- D) Time-series

> ✅ **Answer: C) Multi-model globally distributed NoSQL**
> Cosmos DB supports key-value, document, graph, and column-family APIs.

---

### Section D — GCP

**Q21.** Which company originally created Kubernetes?
- A) Amazon
- B) Microsoft
- C) Docker
- D) Google

> ✅ **Answer: D) Google**
> Google created Kubernetes internally as "Borg" and open-sourced it in 2014.

---

**Q22.** GCP's serverless data warehouse is:
- A) Cloud SQL
- B) Firestore
- C) BigQuery
- D) Bigtable

> ✅ **Answer: C) BigQuery**
> BigQuery is Google's fully managed, serverless data warehouse.

---

**Q23.** Which GCP service is equivalent to AWS Lambda?
- A) Cloud Run
- B) App Engine
- C) Cloud Functions
- D) Compute Engine

> ✅ **Answer: C) Cloud Functions**
> Cloud Functions is GCP's FaaS (Function as a Service) offering.

---

### Section E — Cloud Security & Networking

**Q24.** What is the difference between a Security Group and a Network ACL in AWS?
- A) Security Groups are stateless, NACLs are stateful
- B) Security Groups are stateful, NACLs are stateless
- C) Both are stateless
- D) Both are stateful

> ✅ **Answer: B) Security Groups are stateful, NACLs are stateless**
> Stateful = return traffic automatically allowed. Stateless = return traffic must be explicitly allowed.

---

**Q25.** Which encryption approach is used by HTTPS?
- A) Symmetric only
- B) Asymmetric only
- C) TLS (combines both)
- D) MD5 hashing

> ✅ **Answer: C) TLS (combines both)**
> TLS uses asymmetric encryption for handshake/key exchange, then symmetric (AES) for data.

---

**Q26.** The principle of "Least Privilege" means:
- A) Use the cheapest cloud services
- B) Grant users only the permissions they need, nothing more
- C) Minimize the number of cloud providers
- D) Reduce server count to minimum

> ✅ **Answer: B) Grant users only the permissions they need, nothing more**

---

**Q27.** According to CAP theorem, a distributed system can guarantee:
- A) All three: Consistency, Availability, Partition Tolerance
- B) Only one at a time
- C) Any two out of three
- D) None of the three

> ✅ **Answer: C) Any two out of three**

---

**Q28.** A NAT Gateway in AWS is used for:
- A) Allowing internet inbound traffic to private subnets
- B) Allowing private subnet instances to reach the internet (outbound only)
- C) Connecting two VPCs
- D) DNS resolution

> ✅ **Answer: B) Allowing private subnet instances to reach the internet (outbound only)**
> NAT = Network Address Translation. Outbound only — no unsolicited inbound.

---

### Section F — DevOps & Containers

**Q29.** What is the smallest deployable unit in Kubernetes?
- A) Container
- B) Pod
- C) Node
- D) Cluster

> ✅ **Answer: B) Pod**
> A Pod can contain one or more containers that share storage and network.

---

**Q30.** Which tool is used to define multi-container Docker applications?
- A) Dockerfile
- B) Kubernetes
- C) Docker Compose
- D) Helm

> ✅ **Answer: C) Docker Compose**
> Docker Compose uses a YAML file to define multi-container applications.

---

**Q31.** What does IaC stand for?
- A) Internet as a Cloud
- B) Infrastructure as Code
- C) Instance and Container
- D) Integrated API Control

> ✅ **Answer: B) Infrastructure as Code**

---

**Q32.** Which tool is used for multi-cloud Infrastructure as Code?
- A) CloudFormation
- B) ARM Templates
- C) Terraform
- D) Ansible

> ✅ **Answer: C) Terraform**
> Terraform by HashiCorp is cloud-agnostic and supports AWS, Azure, GCP and more.

---

**Q33.** In a Type 1 Hypervisor, where is the hypervisor installed?
- A) On top of an OS
- B) Directly on the physical hardware (bare-metal)
- C) Inside a container
- D) On a virtual machine

> ✅ **Answer: B) Directly on the physical hardware (bare-metal)**
> Examples: VMware ESXi, Microsoft Hyper-V, KVM.

---

### Section G — Serverless & Advanced

**Q34.** What is a key advantage of serverless computing?
- A) Always-on servers
- B) No auto-scaling
- C) Pay only when code executes
- D) Full OS control

> ✅ **Answer: C) Pay only when code executes**
> Serverless billing is per execution and duration, scaling to zero when idle.

---

**Q35.** Which AWS service would you use to decouple microservices using message queuing?
- A) SQS
- B) SNS
- C) API Gateway
- D) EventBridge

> ✅ **Answer: A) SQS**
> SQS = Simple Queue Service. Used for point-to-point message queuing.
> SNS = Simple Notification Service — pub/sub broadcasting.

---

**Q36.** What is the difference between Vertical and Horizontal Scaling?
- A) Vertical = add more instances; Horizontal = add more power to one instance
- B) Vertical = add more power to one instance; Horizontal = add more instances
- C) They are the same
- D) Vertical applies to storage only

> ✅ **Answer: B) Vertical = add more power (scale up); Horizontal = add more instances (scale out)**

---

**Q37.** Which pricing model offers the greatest cost savings for predictable workloads?
- A) On-Demand
- B) Spot Instances
- C) Reserved Instances
- D) Free Tier

> ✅ **Answer: C) Reserved Instances**
> Reserved Instances (1- or 3-year term) offer up to 72% savings for predictable workloads.

---

**Q38.** High Availability (HA) in cloud typically means:
- A) Always the cheapest option
- B) Data stored in a single location
- C) System remains operational even if a component fails
- D) System uses 100% CPU at all times

> ✅ **Answer: C) System remains operational even if a component fails**

---

**Q39.** What is the purpose of an API Gateway in microservices architecture?
- A) Store data permanently
- B) Single entry point for client requests, handling routing, auth, rate limiting
- C) Provide DNS resolution
- D) Manage database connections

> ✅ **Answer: B) Single entry point for client requests, handling routing, auth, rate limiting**

---

**Q40.** Which cloud architecture pattern ensures a system continues working even when parts fail?
- A) Monolithic Architecture
- B) Fault Tolerant Architecture
- C) Serverless Architecture
- D) Microservices Architecture

> ✅ **Answer: B) Fault Tolerant Architecture**
> Fault tolerance = continued operation despite component failure.

---

## Quick Reference — Key Terms

| Term | Full Form / Meaning |
|------|---------------------|
| AWS | Amazon Web Services |
| GCP | Google Cloud Platform |
| IaaS | Infrastructure as a Service |
| PaaS | Platform as a Service |
| SaaS | Software as a Service |
| FaaS | Function as a Service |
| CDN | Content Delivery Network |
| VPC | Virtual Private Cloud |
| IAM | Identity and Access Management |
| EC2 | Elastic Compute Cloud |
| S3 | Simple Storage Service |
| RDS | Relational Database Service |
| ELB | Elastic Load Balancer |
| ALB | Application Load Balancer |
| NLB | Network Load Balancer |
| EKS | Elastic Kubernetes Service |
| AKS | Azure Kubernetes Service |
| GKE | Google Kubernetes Engine |
| K8s | Kubernetes |
| IaC | Infrastructure as Code |
| CI/CD | Continuous Integration / Continuous Deployment |
| SLA | Service Level Agreement |
| SLO | Service Level Objective |
| RPO | Recovery Point Objective |
| RTO | Recovery Time Objective |
| HA | High Availability |
| DR | Disaster Recovery |
| MFA | Multi-Factor Authentication |
| SSO | Single Sign-On |
| TLS | Transport Layer Security |
| NIST | National Institute of Standards and Technology |
| SQS | Simple Queue Service |
| SNS | Simple Notification Service |
| KMS | Key Management Service |
| NAT | Network Address Translation |

---

## Additional Resources

| Resource | Link |
|----------|------|
| AWS Documentation | https://docs.aws.amazon.com |
| Azure Documentation | https://docs.microsoft.com/azure |
| GCP Documentation | https://cloud.google.com/docs |
| AWS Free Tier | https://aws.amazon.com/free |
| Azure Free Account | https://azure.microsoft.com/free |
| GCP Free Tier | https://cloud.google.com/free |
| AWS Skill Builder | https://skillbuilder.aws |
| Microsoft Learn (Azure) | https://learn.microsoft.com/azure |
| Google Cloud Skills Boost | https://cloudskillsboost.google |

---

> ✅ **Pro Tip for MCQs**: Focus on the **Shared Responsibility Model**, **IaaS vs PaaS vs SaaS differences**, **NIST's 5 characteristics**, **AWS service names**, and **security concepts (IAM, encryption, MFA)**. These are the most frequently tested topics!
