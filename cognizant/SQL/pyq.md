# 🗄️ SQL — Previous Year Questions (PYQs) | Cognizant GenC Cluster 1

> **Section:** Technical — SQL/MySQL Queries (2 Qs) | **Time:** ~30 mins

---

## 📑 Table of Contents

1. [SELECT, WHERE & Filtering](#1-select-where--filtering)
2. [JOINs — INNER, LEFT, SELF](#2-joins--inner-left-self)
3. [GROUP BY, HAVING & Aggregates](#3-group-by-having--aggregates)
4. [Subqueries](#4-subqueries)
5. [Date Functions](#5-date-functions)
6. [DDL/DML/DCL Conceptual](#6-ddldmldcl-conceptual)
7. [Window Functions (Bonus)](#7-window-functions-bonus)
8. [Quick Revision](#8-quick-revision)

---

## Common Tables Used in PYQs

```sql
-- employees table
CREATE TABLE employees (
    emp_id INT PRIMARY KEY,
    name VARCHAR(50),
    department VARCHAR(50),
    salary DECIMAL(10,2),
    manager_id INT,
    join_date DATE
);

-- customers table
CREATE TABLE customers (
    customer_id INT PRIMARY KEY,
    name VARCHAR(50),
    city VARCHAR(50)
);

-- orders table
CREATE TABLE orders (
    order_id INT PRIMARY KEY,
    customer_id INT,
    order_date DATE,
    amount DECIMAL(10,2)
);

-- students table
CREATE TABLE students (
    student_id INT PRIMARY KEY,
    name VARCHAR(50),
    marks INT,
    grade VARCHAR(2)
);
```

---

## 1. SELECT, WHERE & Filtering

### PYQ 1: Find Employees with Salary Between 50K and 100K

```sql
SELECT emp_id, name, salary
FROM employees
WHERE salary BETWEEN 50000 AND 100000
ORDER BY salary DESC;
```

---

### PYQ 2: Find Employees Whose Name Starts with 'A'

```sql
SELECT * FROM employees
WHERE name LIKE 'A%';

-- Names ending with 'n':
-- WHERE name LIKE '%n';

-- Names containing 'ar':
-- WHERE name LIKE '%ar%';

-- Names with exactly 5 characters:
-- WHERE name LIKE '_____';
```

---

### PYQ 3: Find Employees NOT in 'HR' or 'Finance' Department

```sql
SELECT * FROM employees
WHERE department NOT IN ('HR', 'Finance');
```

---

### PYQ 4: Find Employees with NULL Manager (Top-level)

```sql
SELECT * FROM employees
WHERE manager_id IS NULL;
```

---

## 2. JOINs — INNER, LEFT, SELF

### PYQ 5: Get Employee Details with Department Name (INNER JOIN) ⭐

```sql
SELECT e.emp_id, e.name, e.salary, d.dept_name
FROM employees e
INNER JOIN departments d ON e.dept_id = d.dept_id
ORDER BY e.name;
```

---

### PYQ 6: Find Customers Who Never Placed an Order (LEFT JOIN) ⭐⭐

```sql
-- Method 1: LEFT JOIN
SELECT c.customer_id, c.name
FROM customers c
LEFT JOIN orders o ON c.customer_id = o.customer_id
WHERE o.order_id IS NULL;

-- Method 2: NOT IN
SELECT customer_id, name
FROM customers
WHERE customer_id NOT IN (
    SELECT DISTINCT customer_id FROM orders
);

-- Method 3: NOT EXISTS
SELECT c.customer_id, c.name
FROM customers c
WHERE NOT EXISTS (
    SELECT 1 FROM orders o WHERE o.customer_id = c.customer_id
);
```

---

### PYQ 7: Find Employees Who Earn More Than Their Manager (SELF JOIN) ⭐⭐⭐

```sql
SELECT e.name AS Employee, e.salary AS EmpSalary,
       m.name AS Manager, m.salary AS MgrSalary
FROM employees e
JOIN employees m ON e.manager_id = m.emp_id
WHERE e.salary > m.salary;
```

---

### PYQ 8: List All Employees with Their Manager's Name

```sql
SELECT e.name AS Employee, 
       COALESCE(m.name, 'No Manager') AS Manager
FROM employees e
LEFT JOIN employees m ON e.manager_id = m.emp_id;
```

---

## 3. GROUP BY, HAVING & Aggregates

### PYQ 9: Count Employees in Each Department ⭐

```sql
SELECT department, COUNT(*) AS emp_count
FROM employees
GROUP BY department
ORDER BY emp_count DESC;
```

---

### PYQ 10: Departments with More Than 5 Employees ⭐⭐

```sql
SELECT department, COUNT(*) AS emp_count
FROM employees
GROUP BY department
HAVING COUNT(*) > 5
ORDER BY emp_count DESC;
```

---

### PYQ 11: Average Salary by Department (Above 80K)

```sql
SELECT department, ROUND(AVG(salary), 2) AS avg_salary
FROM employees
GROUP BY department
HAVING AVG(salary) > 80000
ORDER BY avg_salary DESC;
```

---

### PYQ 12: Department-wise Salary Summary

```sql
SELECT department,
       COUNT(*) AS total_emp,
       MIN(salary) AS min_salary,
       MAX(salary) AS max_salary,
       ROUND(AVG(salary), 2) AS avg_salary,
       SUM(salary) AS total_salary
FROM employees
GROUP BY department
ORDER BY total_salary DESC;
```

---

### PYQ 13: Find Duplicate Emails

```sql
SELECT email, COUNT(*) AS count
FROM users
GROUP BY email
HAVING COUNT(*) > 1;
```

---

### PYQ 14: Find the Most Frequent Value in a Column

```sql
SELECT department, COUNT(*) AS cnt
FROM employees
GROUP BY department
ORDER BY cnt DESC
LIMIT 1;
```

---

## 4. Subqueries

### PYQ 15: Find the Second Highest Salary ⭐⭐⭐

```sql
-- Method 1: Subquery
SELECT MAX(salary) AS second_highest
FROM employees
WHERE salary < (SELECT MAX(salary) FROM employees);

-- Method 2: LIMIT OFFSET
SELECT DISTINCT salary
FROM employees
ORDER BY salary DESC
LIMIT 1 OFFSET 1;

-- Method 3: Using DENSE_RANK (Window Function)
SELECT salary FROM (
    SELECT salary, DENSE_RANK() OVER (ORDER BY salary DESC) AS rnk
    FROM employees
) ranked
WHERE rnk = 2;
```

---

### PYQ 16: Nth Highest Salary (Generic) ⭐⭐

```sql
-- Replace N with desired rank
SELECT DISTINCT salary
FROM employees
ORDER BY salary DESC
LIMIT 1 OFFSET N-1;

-- Using DENSE_RANK
SELECT salary FROM (
    SELECT salary, DENSE_RANK() OVER (ORDER BY salary DESC) AS rnk
    FROM employees
) ranked
WHERE rnk = N;
```

---

### PYQ 17: Employees Earning Above Average Salary

```sql
SELECT name, salary
FROM employees
WHERE salary > (SELECT AVG(salary) FROM employees)
ORDER BY salary DESC;
```

---

### PYQ 18: Find Department with Highest Total Salary

```sql
SELECT department, SUM(salary) AS total
FROM employees
GROUP BY department
ORDER BY total DESC
LIMIT 1;
```

---

## 5. Date Functions

### PYQ 19: Employees Who Joined in Last 30 Days

```sql
SELECT emp_id, name, join_date
FROM employees
WHERE join_date >= DATE_SUB(CURDATE(), INTERVAL 30 DAY);

-- Alternative:
WHERE DATEDIFF(CURDATE(), join_date) <= 30;
```

---

### PYQ 20: Employees Who Joined in a Specific Year

```sql
SELECT * FROM employees
WHERE YEAR(join_date) = 2024;

-- In a specific month:
WHERE MONTH(join_date) = 6 AND YEAR(join_date) = 2024;
```

---

### PYQ 21: Orders Placed in Last 7 Days

```sql
SELECT * FROM orders
WHERE order_date >= DATE_SUB(CURDATE(), INTERVAL 7 DAY)
ORDER BY order_date DESC;
```

---

### PYQ 22: Calculate Experience in Years

```sql
SELECT name, join_date,
       TIMESTAMPDIFF(YEAR, join_date, CURDATE()) AS experience_years
FROM employees
ORDER BY experience_years DESC;
```

---

## 6. DDL/DML/DCL Conceptual

### PYQ 23: DELETE vs TRUNCATE vs DROP

| Feature | DELETE | TRUNCATE | DROP |
|---------|--------|----------|------|
| Type | DML | DDL | DDL |
| Removes | Specific rows (WHERE) | All rows | Entire table |
| Rollback | ✅ Yes | ❌ No (auto-commit) | ❌ No |
| Logging | Row-by-row (slow) | Minimal (fast) | N/A |
| Triggers | ✅ Fires | ❌ No | ❌ No |
| Identity/Auto-increment | Preserved | Reset | N/A |
| WHERE clause | ✅ Yes | ❌ No | ❌ No |

```sql
DELETE FROM employees WHERE department = 'HR';  -- Removes specific rows
TRUNCATE TABLE employees;                        -- Removes ALL rows, keeps structure
DROP TABLE employees;                            -- Removes entire table
```

---

### PYQ 24: Types of SQL Commands

| Category | Commands | Purpose |
|----------|----------|---------|
| **DDL** (Data Definition) | CREATE, ALTER, DROP, TRUNCATE, RENAME | Define/modify structure |
| **DML** (Data Manipulation) | SELECT, INSERT, UPDATE, DELETE | Manipulate data |
| **DCL** (Data Control) | GRANT, REVOKE | Permissions |
| **TCL** (Transaction Control) | COMMIT, ROLLBACK, SAVEPOINT | Transaction management |

---

### PYQ 25: Constraints

```sql
CREATE TABLE students (
    id INT PRIMARY KEY,                          -- Unique + NOT NULL
    name VARCHAR(50) NOT NULL,                   -- Cannot be NULL
    email VARCHAR(100) UNIQUE,                   -- Must be unique
    age INT CHECK (age >= 18),                   -- Condition
    dept_id INT,
    FOREIGN KEY (dept_id) REFERENCES departments(id)  -- Referential integrity
);

-- DEFAULT constraint
ALTER TABLE students ADD COLUMN status VARCHAR(10) DEFAULT 'Active';
```

---

### PYQ 26: WHERE vs HAVING

| WHERE | HAVING |
|-------|--------|
| Filters **rows** before grouping | Filters **groups** after grouping |
| Cannot use aggregate functions | CAN use aggregate functions |
| Used without GROUP BY | Used WITH GROUP BY |
| Executes before GROUP BY | Executes after GROUP BY |

```sql
-- WHERE: filter individual rows
SELECT * FROM employees WHERE salary > 50000;

-- HAVING: filter groups
SELECT department, AVG(salary) FROM employees
GROUP BY department
HAVING AVG(salary) > 50000;
```

---

## 7. Window Functions (Bonus)

### PYQ 27: Rank Employees by Salary in Each Department

```sql
SELECT name, department, salary,
       RANK() OVER (PARTITION BY department ORDER BY salary DESC) AS rnk,
       DENSE_RANK() OVER (PARTITION BY department ORDER BY salary DESC) AS dense_rnk,
       ROW_NUMBER() OVER (PARTITION BY department ORDER BY salary DESC) AS row_num
FROM employees;
```

**RANK vs DENSE_RANK vs ROW_NUMBER:**

| Salary | RANK | DENSE_RANK | ROW_NUMBER |
|--------|------|------------|------------|
| 90000 | 1 | 1 | 1 |
| 90000 | 1 | 1 | 2 |
| 80000 | 3 | 2 | 3 |
| 70000 | 4 | 3 | 4 |

---

### PYQ 28: Running Total / Cumulative Sum

```sql
SELECT name, salary,
       SUM(salary) OVER (ORDER BY emp_id) AS running_total
FROM employees;
```

---

## 8. Quick Revision

### SQL Execution Order

```
FROM → WHERE → GROUP BY → HAVING → SELECT → DISTINCT → ORDER BY → LIMIT
```

### JOIN Types Visual

```
INNER JOIN    → Only rows with matches in BOTH tables
LEFT JOIN     → ALL rows from LEFT table + matching from right (NULL if no match)
RIGHT JOIN    → ALL rows from RIGHT table + matching from left (NULL if no match)
FULL OUTER    → ALL rows from BOTH tables (NULL where no match)
CROSS JOIN    → Cartesian product (every row × every row)
SELF JOIN     → Table joined with itself (e.g., employee-manager)
```

### Aggregate Functions

```sql
COUNT(*)        -- Count all rows
COUNT(column)   -- Count non-NULL values
SUM(column)     -- Sum of values
AVG(column)     -- Average
MIN(column)     -- Minimum
MAX(column)     -- Maximum
GROUP_CONCAT()  -- Concatenate grouped values
```

### Important String Functions

```sql
UPPER('hello')           -- 'HELLO'
LOWER('HELLO')           -- 'hello'
LENGTH('hello')          -- 5
TRIM('  hello  ')        -- 'hello'
SUBSTRING('hello', 2, 3) -- 'ell'
CONCAT('a', 'b')         -- 'ab'
REPLACE('hello', 'l', 'r') -- 'herro'
COALESCE(NULL, 'default')   -- 'default' (first non-NULL)
```

---

> **← Back to** [Cognizant Main](../README.md) | [SQL Concepts](./README.md)
