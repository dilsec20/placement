# SQL & DBMS — Interview Questions (Recruit CRM + TCS)

---

## SECTION 1: DBMS Theory

---

### Q1. What is DBMS? DBMS vs RDBMS?

| Feature | DBMS | RDBMS |
| :--- | :--- | :--- |
| **Data Storage** | Files | Tables (rows & columns) |
| **Relationships** | No relationships | Foreign key relationships |
| **Normalization** | Not supported | Supported |
| **ACID** | Not guaranteed | Guaranteed |
| **Examples** | File system, XML | MySQL, PostgreSQL, Oracle |

---

### Q2. ACID Properties (Very Frequently Asked!)

| Property | Meaning | Example |
| :--- | :--- | :--- |
| **Atomicity** | All or nothing — transaction either fully completes or fully rolls back | Bank transfer: debit AND credit both happen, or neither |
| **Consistency** | DB moves from one valid state to another | Balance can't go negative if constraint exists |
| **Isolation** | Concurrent transactions don't interfere | Two withdrawals from same account don't see each other's intermediate state |
| **Durability** | Once committed, data persists even after crash | Committed transaction survives power failure |

---

### Q3. What is Normalization? Explain Normal Forms.

**Normalization** = Process of organizing data to reduce redundancy and dependency.

| Normal Form | Rule | Fix |
| :--- | :--- | :--- |
| **1NF** | Each cell has atomic (single) value; no repeating groups | Split multi-valued attributes into rows |
| **2NF** | 1NF + No partial dependency (non-key depends on entire primary key) | Move partial dependencies to separate table |
| **3NF** | 2NF + No transitive dependency (non-key depends only on primary key, not other non-keys) | Move transitive dependencies to separate table |
| **BCNF** | 3NF + Every determinant is a candidate key | Decompose further |

**Example — 1NF Violation:**
```
| StudentID | Name  | Courses          |
| 1         | Alice | Math, Science    |  ← Multi-valued! Violates 1NF
```

**Fixed (1NF):**
```
| StudentID | Name  | Course   |
| 1         | Alice | Math     |
| 1         | Alice | Science  |
```

---

### Q4. Keys in DBMS

| Key | Definition |
| :--- | :--- |
| **Primary Key** | Uniquely identifies each row. Not NULL, unique. |
| **Foreign Key** | References primary key of another table. Establishes relationship. |
| **Candidate Key** | Minimal set of attributes that can uniquely identify a row. |
| **Super Key** | Any superset of a candidate key (can have extra attributes). |
| **Unique Key** | Like primary key but allows ONE null value. |
| **Composite Key** | Primary key made of 2+ columns. |

---

### Q5. SQL vs NoSQL

| Feature | SQL (Relational) | NoSQL (Non-Relational) |
| :--- | :--- | :--- |
| **Structure** | Tables with fixed schema | Documents, Key-Value, Graph, Column |
| **Schema** | Rigid (predefined) | Flexible (schema-less) |
| **Scalability** | Vertical (scale up) | Horizontal (scale out) |
| **ACID** | Strong ACID | Eventually consistent (BASE) |
| **Joins** | Supported | Generally avoided |
| **Best For** | Structured data, complex queries | Unstructured data, high scalability |
| **Examples** | MySQL, PostgreSQL | MongoDB, Redis, Cassandra |

**Your Project (AceCoder) uses PostgreSQL because:**
- Structured data (users, problems, submissions)
- Complex relationships (user → submissions → problems)
- Need for data consistency and complex queries

---

### Q6. What is Indexing? Why is it important?

**Index** = Data structure (B-Tree/Hash) that speeds up data retrieval.

```
Without Index: Full table scan → O(n)
With Index:    B-Tree lookup  → O(log n)
```

| Advantage | Disadvantage |
| :--- | :--- |
| Faster SELECT queries | Slower INSERT/UPDATE/DELETE (index must be updated) |
| Efficient WHERE, JOIN, ORDER BY | Extra storage space |

```sql
-- Create an index on email column
CREATE INDEX idx_email ON users(email);

-- Composite index
CREATE INDEX idx_name_age ON users(last_name, first_name);
```

**When to use:**
- Columns used frequently in WHERE, JOIN, ORDER BY
- Columns with high cardinality (many unique values)

**When NOT to use:**
- Small tables
- Columns with low cardinality
- Columns that are frequently updated

---

### Q7. What is a Transaction?

A transaction is a sequence of operations treated as a single unit:

```sql
BEGIN TRANSACTION;
    UPDATE accounts SET balance = balance - 500 WHERE id = 1;  -- Debit
    UPDATE accounts SET balance = balance + 500 WHERE id = 2;  -- Credit
COMMIT;
-- If any step fails → ROLLBACK (Atomicity)
```

---

### Q8. What is a View?

A **virtual table** based on a SELECT query. Does not store data physically.

```sql
CREATE VIEW active_users AS
    SELECT id, name, email FROM users WHERE status = 'active';

-- Use like a regular table
SELECT * FROM active_users;
```

**Advantages:** Security (restrict column access), Simplicity (hide complex queries).

---

## SECTION 2: SQL Queries (Most Asked!)

---

### Q9. Types of JOINs

```
INNER JOIN:     Only matching rows from both tables
LEFT JOIN:      All rows from left + matching from right (NULL if no match)
RIGHT JOIN:     All rows from right + matching from left (NULL if no match)
FULL OUTER JOIN: All rows from both tables (NULL where no match)
CROSS JOIN:     Cartesian product (every row × every row)
SELF JOIN:      Table joined with itself
```

```sql
-- INNER JOIN: Employees with their department names
SELECT e.name, d.dept_name
FROM employees e
INNER JOIN departments d ON e.dept_id = d.id;

-- LEFT JOIN: All employees, even those without departments
SELECT e.name, d.dept_name
FROM employees e
LEFT JOIN departments d ON e.dept_id = d.id;
```

---

### Q10. Find the 2nd Highest Salary (Classic Interview Question!)

```sql
-- Method 1: Subquery
SELECT MAX(salary) AS second_highest
FROM employees
WHERE salary < (SELECT MAX(salary) FROM employees);

-- Method 2: LIMIT + OFFSET
SELECT DISTINCT salary
FROM employees
ORDER BY salary DESC
LIMIT 1 OFFSET 1;

-- Method 3: Nth highest (general)
SELECT DISTINCT salary
FROM employees
ORDER BY salary DESC
LIMIT 1 OFFSET N-1;  -- Replace N with desired rank

-- Method 4: DENSE_RANK() (handles duplicates)
SELECT salary FROM (
    SELECT salary, DENSE_RANK() OVER (ORDER BY salary DESC) AS rank
    FROM employees
) ranked
WHERE rank = 2;
```

---

### Q11. GROUP BY and HAVING

```sql
-- Find departments with more than 5 employees
SELECT dept_id, COUNT(*) AS emp_count
FROM employees
GROUP BY dept_id
HAVING COUNT(*) > 5;

-- Find departments where average salary > 50000
SELECT dept_id, AVG(salary) AS avg_salary
FROM employees
GROUP BY dept_id
HAVING AVG(salary) > 50000;
```

**WHERE vs HAVING:**
| Feature | WHERE | HAVING |
| :--- | :--- | :--- |
| **Filters** | Individual rows | Groups (after GROUP BY) |
| **Aggregate Functions** | ❌ Cannot use | ✅ Can use |
| **Execution Order** | Before GROUP BY | After GROUP BY |

---

### Q12. Aggregate Functions

```sql
SELECT 
    COUNT(*) AS total_employees,
    SUM(salary) AS total_salary,
    AVG(salary) AS avg_salary,
    MAX(salary) AS max_salary,
    MIN(salary) AS min_salary
FROM employees;
```

---

### Q13. Subqueries

```sql
-- Scalar subquery: employees earning more than average
SELECT name, salary
FROM employees
WHERE salary > (SELECT AVG(salary) FROM employees);

-- IN subquery: employees in departments located in 'New York'
SELECT name FROM employees
WHERE dept_id IN (
    SELECT id FROM departments WHERE location = 'New York'
);

-- EXISTS subquery: departments that have at least one employee
SELECT dept_name FROM departments d
WHERE EXISTS (
    SELECT 1 FROM employees e WHERE e.dept_id = d.id
);
```

---

### Q14. String Functions in SQL

```sql
SELECT 
    UPPER(name),           -- Convert to uppercase
    LOWER(name),           -- Convert to lowercase
    LENGTH(name),          -- Length of string
    SUBSTRING(name, 1, 3), -- First 3 characters
    CONCAT(first, ' ', last), -- Concatenate
    TRIM(name),            -- Remove leading/trailing spaces
    REPLACE(name, 'old', 'new')  -- Replace substring
FROM employees;
```

---

### Q15. UNION vs UNION ALL

```sql
-- UNION: Combines results, removes duplicates
SELECT name FROM employees
UNION
SELECT name FROM contractors;

-- UNION ALL: Combines results, keeps duplicates (faster)
SELECT name FROM employees
UNION ALL
SELECT name FROM contractors;
```

---

### Q16. DELETE vs TRUNCATE vs DROP

| Feature | DELETE | TRUNCATE | DROP |
| :--- | :--- | :--- | :--- |
| **Removes** | Specific rows (WHERE) | All rows | Entire table (structure + data) |
| **Rollback** | Yes (logged) | No (minimal logging) | No |
| **Speed** | Slow | Fast | Fast |
| **Triggers** | Fires triggers | Does NOT fire triggers | N/A |
| **Auto-increment** | Preserved | Reset | N/A |

---

### Q17. Practice Queries

**Given Tables:**
```
employees(id, name, salary, dept_id, manager_id, hire_date)
departments(id, dept_name, location)
```

**Q: Find employees who earn more than their manager:**
```sql
SELECT e.name AS employee, e.salary AS emp_salary, 
       m.name AS manager, m.salary AS mgr_salary
FROM employees e
INNER JOIN employees m ON e.manager_id = m.id
WHERE e.salary > m.salary;
```

**Q: Find department with highest total salary:**
```sql
SELECT d.dept_name, SUM(e.salary) AS total_salary
FROM employees e
INNER JOIN departments d ON e.dept_id = d.id
GROUP BY d.dept_name
ORDER BY total_salary DESC
LIMIT 1;
```

**Q: Find employees hired in the last 30 days:**
```sql
SELECT name, hire_date
FROM employees
WHERE hire_date >= CURRENT_DATE - INTERVAL '30 days';
```

**Q: Find duplicate records:**
```sql
SELECT name, COUNT(*) AS count
FROM employees
GROUP BY name
HAVING COUNT(*) > 1;
```

**Q: Rank employees by salary within each department:**
```sql
SELECT name, dept_id, salary,
    RANK() OVER (PARTITION BY dept_id ORDER BY salary DESC) AS rank,
    DENSE_RANK() OVER (PARTITION BY dept_id ORDER BY salary DESC) AS dense_rank,
    ROW_NUMBER() OVER (PARTITION BY dept_id ORDER BY salary DESC) AS row_num
FROM employees;
```

**RANK vs DENSE_RANK vs ROW_NUMBER:**
| Function | Gaps? | Duplicates? |
| :--- | :--- | :--- |
| `RANK()` | Yes (skips after ties) | Same rank for ties |
| `DENSE_RANK()` | No gaps | Same rank for ties |
| `ROW_NUMBER()` | N/A | Unique number always |

---

## SECTION 3: Database Design (Project Discussion)

---

### Q18. How did you design the database for AceCoder?

```sql
-- Users table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Problems table
CREATE TABLE problems (
    id SERIAL PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    difficulty VARCHAR(20) CHECK (difficulty IN ('Easy', 'Medium', 'Hard')),
    description TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Submissions table
CREATE TABLE submissions (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id),
    problem_id INT REFERENCES problems(id),
    language VARCHAR(20) NOT NULL,
    code TEXT NOT NULL,
    status VARCHAR(20) CHECK (status IN ('Accepted', 'Wrong Answer', 'TLE', 'Runtime Error')),
    submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

**Relationships:**
```
users (1) ──── (N) submissions (N) ──── (1) problems
```

---

### Q19. How did you optimize queries in AceCoder?

1. **Indexes** on frequently queried columns:
   ```sql
   CREATE INDEX idx_submissions_user ON submissions(user_id);
   CREATE INDEX idx_submissions_problem ON submissions(problem_id);
   ```

2. **Query optimization:**
   - Used `SELECT` only needed columns (not `SELECT *`)
   - Used `LIMIT` for pagination
   - Used prepared statements (prevent SQL injection + query plan caching)

3. **Connection pooling** via managed PostgreSQL on Render.
