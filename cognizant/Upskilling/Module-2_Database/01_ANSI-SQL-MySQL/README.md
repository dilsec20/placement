# 🗄️ ANSI SQL using MySQL — Complete Study Guide

> **Module 2 | Digital Nurture 5.0 — Java FSE Upskilling**

---

## 📋 Topics Covered

1. [Introduction to ANSI SQL and MySQL](#1-introduction-to-ansi-sql-and-mysql)
2. [Data Retrieval with SELECT](#2-data-retrieval-with-select)
3. [Filtering and Sorting Data](#3-filtering-and-sorting-data)
4. [Aggregate Functions and Grouping](#4-aggregate-functions-and-grouping)
5. [Joins and Subqueries](#5-joins-and-subqueries)
6. [Data Modification (INSERT, UPDATE, DELETE)](#6-data-modification-insert-update-delete)
7. [Creating and Modifying Tables](#7-creating-and-modifying-tables)
8. [Indexes and Constraints](#8-indexes-and-constraints)
9. [Practice Questions](#9-practice-questions)

---

## Sample Database Setup

```sql
-- Create and use database
CREATE DATABASE company_db;
USE company_db;

-- Departments table
CREATE TABLE departments (
    dept_id    INT PRIMARY KEY AUTO_INCREMENT,
    dept_name  VARCHAR(50) NOT NULL UNIQUE,
    location   VARCHAR(100),
    budget     DECIMAL(15, 2)
);

INSERT INTO departments (dept_name, location, budget) VALUES
('IT', 'Mumbai', 500000),
('HR', 'Delhi', 300000),
('Finance', 'Bangalore', 450000),
('Marketing', 'Chennai', 350000);

-- Employees table
CREATE TABLE employees (
    emp_id      INT PRIMARY KEY AUTO_INCREMENT,
    first_name  VARCHAR(50) NOT NULL,
    last_name   VARCHAR(50) NOT NULL,
    email       VARCHAR(100) UNIQUE,
    salary      DECIMAL(10, 2),
    hire_date   DATE,
    dept_id     INT,
    manager_id  INT,
    is_active   BOOLEAN DEFAULT TRUE,
    FOREIGN KEY (dept_id) REFERENCES departments(dept_id),
    FOREIGN KEY (manager_id) REFERENCES employees(emp_id)
);

INSERT INTO employees (first_name, last_name, email, salary, hire_date, dept_id, manager_id) VALUES
('Alice',   'Smith',    'alice@company.com',   75000, '2023-01-15', 1, NULL),
('Bob',     'Johnson',  'bob@company.com',     60000, '2023-03-20', 1, 1),
('Charlie', 'Brown',    'charlie@company.com', 80000, '2022-06-10', 3, NULL),
('Diana',   'Williams', 'diana@company.com',   55000, '2024-02-01', 2, NULL),
('Eve',     'Davis',    'eve@company.com',     70000, '2023-09-15', 1, 1),
('Frank',   'Miller',   'frank@company.com',   65000, '2024-05-20', 3, 3),
('Grace',   'Lee',      'grace@company.com',   50000, '2024-08-01', 2, 4),
('Henry',   'Wilson',   'henry@company.com',   72000, '2023-11-10', 4, NULL),
('Ivy',     'Taylor',   'ivy@company.com',     58000, '2024-01-05', 4, 8),
('Jack',    'Anderson', 'jack@company.com',    90000, '2022-03-15', 1, NULL);
```

---

## 1. Introduction to ANSI SQL and MySQL

### 📌 What is ANSI SQL?

**ANSI SQL (American National Standards Institute SQL)** is the standardized version of SQL that defines a common syntax and functionality across all relational database systems.

### 📌 What is MySQL?

**MySQL** is an open-source **Relational Database Management System (RDBMS)** that uses ANSI SQL for querying and managing data.

### Importance of Standard SQL

| Benefit | Description |
|---------|-------------|
| **Portability** | SQL knowledge transfers across databases (MySQL, PostgreSQL, Oracle, SQL Server) |
| **Standardization** | ANSI defines a common baseline |
| **Interoperability** | Applications can switch databases with minimal changes |
| **Industry Standard** | Required skill for most developer roles |

### SQL Categories

| Category | Full Name | Commands | Purpose |
|----------|-----------|----------|---------|
| **DDL** | Data Definition Language | CREATE, ALTER, DROP, TRUNCATE | Define/modify database structure |
| **DML** | Data Manipulation Language | SELECT, INSERT, UPDATE, DELETE | Manipulate data |
| **DCL** | Data Control Language | GRANT, REVOKE | Control access/permissions |
| **TCL** | Transaction Control Language | COMMIT, ROLLBACK, SAVEPOINT | Manage transactions |

### MySQL Data Types

| Category | Type | Description | Example |
|----------|------|-------------|---------|
| **Numeric** | `INT` | Integer | `42` |
| | `DECIMAL(p,s)` | Fixed-point | `DECIMAL(10,2)` → `99999999.99` |
| | `FLOAT` | Floating-point | `3.14` |
| | `BIGINT` | Large integer | `9223372036854775807` |
| **String** | `VARCHAR(n)` | Variable-length string | `VARCHAR(100)` |
| | `CHAR(n)` | Fixed-length string | `CHAR(10)` |
| | `TEXT` | Long text | Up to 64KB |
| **Date/Time** | `DATE` | Date only | `'2026-05-25'` |
| | `TIME` | Time only | `'14:30:00'` |
| | `DATETIME` | Date + Time | `'2026-05-25 14:30:00'` |
| | `TIMESTAMP` | Auto-updating datetime | Current timestamp |
| **Boolean** | `BOOLEAN` | True/False | `TRUE`, `FALSE`, `1`, `0` |

---

## 2. Data Retrieval with SELECT

### Basic SELECT Syntax

```sql
-- Select all columns
SELECT * FROM employees;

-- Select specific columns
SELECT first_name, last_name, salary FROM employees;

-- Select with alias
SELECT first_name AS "First Name",
       last_name AS "Last Name",
       salary AS "Monthly Salary"
FROM employees;

-- Select with expressions
SELECT first_name,
       salary,
       salary * 12 AS annual_salary,
       salary * 0.10 AS bonus
FROM employees;

-- Select DISTINCT (unique values only)
SELECT DISTINCT dept_id FROM employees;

-- Select with LIMIT
SELECT * FROM employees LIMIT 5;            -- First 5 rows
SELECT * FROM employees LIMIT 5 OFFSET 3;   -- Skip 3, get next 5
```

### Filtering with WHERE

```sql
-- Comparison operators
SELECT * FROM employees WHERE salary > 60000;
SELECT * FROM employees WHERE salary >= 70000;
SELECT * FROM employees WHERE salary < 55000;
SELECT * FROM employees WHERE dept_id = 1;
SELECT * FROM employees WHERE dept_id != 2;
SELECT * FROM employees WHERE dept_id <> 2;   -- Same as !=

-- String comparison
SELECT * FROM employees WHERE first_name = 'Alice';
SELECT * FROM employees WHERE last_name LIKE 'S%';    -- Starts with S

-- NULL checks
SELECT * FROM employees WHERE manager_id IS NULL;
SELECT * FROM employees WHERE manager_id IS NOT NULL;

-- Date comparison
SELECT * FROM employees WHERE hire_date > '2024-01-01';
SELECT * FROM employees WHERE hire_date BETWEEN '2023-01-01' AND '2023-12-31';
```

### Sorting with ORDER BY

```sql
-- Ascending (default)
SELECT * FROM employees ORDER BY salary;
SELECT * FROM employees ORDER BY salary ASC;

-- Descending
SELECT * FROM employees ORDER BY salary DESC;

-- Multiple columns
SELECT * FROM employees ORDER BY dept_id ASC, salary DESC;

-- Order by column position
SELECT first_name, dept_id, salary FROM employees ORDER BY 2, 3 DESC;

-- Order by expression
SELECT first_name, salary FROM employees ORDER BY salary * 12 DESC;
```

---

## 3. Filtering and Sorting Data

### Logical Operators

```sql
-- AND — both conditions must be true
SELECT * FROM employees
WHERE dept_id = 1 AND salary > 60000;

-- OR — at least one condition must be true
SELECT * FROM employees
WHERE dept_id = 1 OR dept_id = 3;

-- NOT — negates a condition
SELECT * FROM employees
WHERE NOT dept_id = 2;

-- Combining operators (use parentheses for clarity)
SELECT * FROM employees
WHERE (dept_id = 1 OR dept_id = 3) AND salary > 65000;
```

### Special Operators

```sql
-- BETWEEN — range (inclusive)
SELECT * FROM employees WHERE salary BETWEEN 55000 AND 75000;
SELECT * FROM employees WHERE hire_date BETWEEN '2023-01-01' AND '2023-12-31';

-- IN — matches any value in list
SELECT * FROM employees WHERE dept_id IN (1, 3, 4);
SELECT * FROM employees WHERE first_name IN ('Alice', 'Bob', 'Eve');

-- NOT IN
SELECT * FROM employees WHERE dept_id NOT IN (2);

-- LIKE — pattern matching
SELECT * FROM employees WHERE first_name LIKE 'A%';       -- Starts with A
SELECT * FROM employees WHERE last_name LIKE '%son';       -- Ends with 'son'
SELECT * FROM employees WHERE email LIKE '%@company%';     -- Contains @company
SELECT * FROM employees WHERE first_name LIKE '_l%';       -- Second char is 'l'
SELECT * FROM employees WHERE first_name LIKE '____';      -- Exactly 4 characters

-- LIKE Wildcards:
-- %  → zero or more characters
-- _  → exactly one character

-- EXISTS
SELECT * FROM departments d
WHERE EXISTS (SELECT 1 FROM employees e WHERE e.dept_id = d.dept_id);
```

### Sorting with Multiple Columns

```sql
-- Sort by department first, then by salary within each department
SELECT first_name, dept_id, salary
FROM employees
ORDER BY dept_id ASC, salary DESC;

-- Top 3 highest paid per department approach
SELECT first_name, dept_id, salary
FROM employees
ORDER BY dept_id, salary DESC;
```

---

## 4. Aggregate Functions and Grouping

### Aggregate Functions

```sql
-- COUNT — count rows
SELECT COUNT(*) AS total_employees FROM employees;
SELECT COUNT(manager_id) AS managed_employees FROM employees;  -- Excludes NULL
SELECT COUNT(DISTINCT dept_id) AS departments FROM employees;

-- SUM — total of a column
SELECT SUM(salary) AS total_salary FROM employees;
SELECT SUM(salary) AS it_salary FROM employees WHERE dept_id = 1;

-- AVG — average value
SELECT AVG(salary) AS avg_salary FROM employees;
SELECT ROUND(AVG(salary), 2) AS avg_salary FROM employees;

-- MIN / MAX
SELECT MIN(salary) AS lowest_salary FROM employees;
SELECT MAX(salary) AS highest_salary FROM employees;
SELECT MIN(hire_date) AS first_hire, MAX(hire_date) AS latest_hire FROM employees;
```

### GROUP BY Clause

```sql
-- Group rows and apply aggregate functions

-- Employees per department
SELECT dept_id, COUNT(*) AS total_employees
FROM employees
GROUP BY dept_id;

-- Average salary per department
SELECT dept_id, ROUND(AVG(salary), 2) AS avg_salary
FROM employees
GROUP BY dept_id;

-- Multiple aggregations
SELECT dept_id,
       COUNT(*) AS total,
       SUM(salary) AS total_salary,
       ROUND(AVG(salary), 2) AS avg_salary,
       MIN(salary) AS min_salary,
       MAX(salary) AS max_salary
FROM employees
GROUP BY dept_id;

-- Group by with JOIN (department names)
SELECT d.dept_name,
       COUNT(e.emp_id) AS total,
       ROUND(AVG(e.salary), 2) AS avg_salary
FROM employees e
JOIN departments d ON e.dept_id = d.dept_id
GROUP BY d.dept_name;
```

### HAVING Clause

```sql
-- HAVING filters groups (like WHERE but for aggregated data)
-- WHERE filters ROWS before grouping
-- HAVING filters GROUPS after grouping

-- Departments with more than 2 employees
SELECT dept_id, COUNT(*) AS total
FROM employees
GROUP BY dept_id
HAVING COUNT(*) > 2;

-- Departments with average salary > 65000
SELECT dept_id, ROUND(AVG(salary), 2) AS avg_salary
FROM employees
GROUP BY dept_id
HAVING AVG(salary) > 65000;

-- Combined WHERE + HAVING
SELECT dept_id, ROUND(AVG(salary), 2) AS avg_salary
FROM employees
WHERE is_active = TRUE          -- Filter rows first
GROUP BY dept_id                -- Then group
HAVING AVG(salary) > 60000     -- Then filter groups
ORDER BY avg_salary DESC;       -- Then sort
```

### SQL Query Execution Order

```
1. FROM       → Choose table(s)
2. JOIN       → Join tables
3. WHERE      → Filter individual rows
4. GROUP BY   → Group remaining rows
5. HAVING     → Filter groups
6. SELECT     → Choose columns/expressions
7. DISTINCT   → Remove duplicates
8. ORDER BY   → Sort results
9. LIMIT      → Limit output
```

---

## 5. Joins and Subqueries

### 📌 What are Joins?

**JOINs** combine rows from two or more tables based on a related column.

### INNER JOIN (Most Common)

Returns rows that have matching values in **both** tables.

```sql
SELECT e.first_name, e.last_name, e.salary, d.dept_name
FROM employees e
INNER JOIN departments d ON e.dept_id = d.dept_id;

-- Only employees who belong to a department are returned
-- Employees with NULL dept_id are excluded
-- Departments with no employees are excluded
```

### LEFT JOIN (LEFT OUTER JOIN)

Returns **all rows from left table** + matching rows from right table. Non-matching right side = NULL.

```sql
SELECT e.first_name, d.dept_name
FROM employees e
LEFT JOIN departments d ON e.dept_id = d.dept_id;

-- All employees shown, even if dept_id is NULL
-- dept_name will be NULL for unmatched employees
```

### RIGHT JOIN (RIGHT OUTER JOIN)

Returns **all rows from right table** + matching rows from left table.

```sql
SELECT e.first_name, d.dept_name
FROM employees e
RIGHT JOIN departments d ON e.dept_id = d.dept_id;

-- All departments shown, even if they have no employees
-- first_name will be NULL for departments with no employees
```

### Self-Join

Joining a table to itself (e.g., employee-manager relationship).

```sql
-- Find each employee and their manager's name
SELECT e.first_name AS employee,
       m.first_name AS manager
FROM employees e
LEFT JOIN employees m ON e.manager_id = m.emp_id;

-- Result:
-- Alice   | NULL    (no manager)
-- Bob     | Alice
-- Charlie | NULL
-- Diana   | NULL
-- Eve     | Alice
```

### Cross Join

Returns the **Cartesian product** — every row from table1 paired with every row from table2.

```sql
SELECT e.first_name, d.dept_name
FROM employees e
CROSS JOIN departments d;

-- 10 employees × 4 departments = 40 rows
-- Rarely used in practice
```

### JOIN Summary

| Join Type | Returns |
|-----------|---------|
| `INNER JOIN` | Only matching rows from both tables |
| `LEFT JOIN` | All rows from left + matching from right |
| `RIGHT JOIN` | All rows from right + matching from left |
| `FULL OUTER JOIN` | All rows from both (MySQL: use UNION of LEFT + RIGHT) |
| `SELF JOIN` | Table joined to itself |
| `CROSS JOIN` | Cartesian product (every combination) |

### FULL OUTER JOIN (Simulated in MySQL)

```sql
-- MySQL doesn't support FULL OUTER JOIN directly
-- Simulate with UNION of LEFT JOIN and RIGHT JOIN
SELECT e.first_name, d.dept_name
FROM employees e
LEFT JOIN departments d ON e.dept_id = d.dept_id
UNION
SELECT e.first_name, d.dept_name
FROM employees e
RIGHT JOIN departments d ON e.dept_id = d.dept_id;
```

### Subqueries

A **subquery** is a query nested inside another query.

#### Subquery in WHERE Clause

```sql
-- Employees with salary above average
SELECT first_name, salary
FROM employees
WHERE salary > (SELECT AVG(salary) FROM employees);

-- Employees in the IT department (using subquery)
SELECT first_name, salary
FROM employees
WHERE dept_id = (SELECT dept_id FROM departments WHERE dept_name = 'IT');

-- Employees in departments that have a budget > 400000
SELECT first_name, dept_id
FROM employees
WHERE dept_id IN (SELECT dept_id FROM departments WHERE budget > 400000);
```

#### Subquery in SELECT Clause

```sql
-- Show each employee with their department name
SELECT first_name, salary,
       (SELECT dept_name FROM departments d WHERE d.dept_id = e.dept_id) AS department
FROM employees e;
```

#### Subquery in FROM Clause (Derived Table)

```sql
-- Get average salary per department, then filter
SELECT dept_id, avg_salary
FROM (
    SELECT dept_id, AVG(salary) AS avg_salary
    FROM employees
    GROUP BY dept_id
) AS dept_averages
WHERE avg_salary > 65000;
```

#### Correlated Subqueries

A **correlated subquery** references the outer query — it runs once per outer row.

```sql
-- Find employees who earn more than their department's average
SELECT e.first_name, e.salary, e.dept_id
FROM employees e
WHERE e.salary > (
    SELECT AVG(salary)
    FROM employees
    WHERE dept_id = e.dept_id   -- References outer query
);

-- Find the highest paid employee in each department
SELECT e.first_name, e.salary, e.dept_id
FROM employees e
WHERE e.salary = (
    SELECT MAX(salary)
    FROM employees
    WHERE dept_id = e.dept_id
);
```

---

## 6. Data Modification (INSERT, UPDATE, DELETE)

### INSERT

```sql
-- Insert single row
INSERT INTO employees (first_name, last_name, email, salary, hire_date, dept_id)
VALUES ('Kate', 'Adams', 'kate@company.com', 62000, '2026-05-25', 1);

-- Insert multiple rows
INSERT INTO employees (first_name, last_name, email, salary, hire_date, dept_id) VALUES
    ('Leo', 'Brown', 'leo@company.com', 55000, '2026-06-01', 2),
    ('Mia', 'Clark', 'mia@company.com', 68000, '2026-06-15', 3);

-- Insert from another query
INSERT INTO emp_backup (first_name, last_name, salary)
SELECT first_name, last_name, salary
FROM employees
WHERE dept_id = 1;
```

### UPDATE

```sql
-- Update single column
UPDATE employees SET salary = 65000 WHERE emp_id = 4;

-- Update multiple columns
UPDATE employees
SET salary = 70000, dept_id = 1
WHERE emp_id = 4;

-- Update with expression
UPDATE employees SET salary = salary * 1.10;   -- 10% raise for all

-- Update with condition
UPDATE employees
SET salary = salary * 1.15
WHERE dept_id = 1 AND salary < 70000;

-- Update with subquery
UPDATE employees
SET salary = (SELECT AVG(salary) FROM employees WHERE dept_id = 1)
WHERE emp_id = 7;
```

### DELETE

```sql
-- Delete specific rows
DELETE FROM employees WHERE emp_id = 10;

-- Delete with condition
DELETE FROM employees WHERE dept_id = 2 AND salary < 52000;

-- Delete all rows (can be rolled back)
DELETE FROM employees;

-- TRUNCATE — faster, cannot be rolled back
TRUNCATE TABLE employees;
```

### DROP vs TRUNCATE vs DELETE

| Feature | DROP | TRUNCATE | DELETE |
|---------|------|----------|--------|
| **Type** | DDL | DDL | DML |
| **Removes** | Table structure + data | Data only | Specific rows |
| **WHERE clause** | ❌ | ❌ | ✅ |
| **Rollback** | ❌ | ❌ | ✅ |
| **Speed** | Fast | Fast | Slower (row by row) |
| **AUTO_INCREMENT** | Removed | Reset to 1 | Not reset |
| **Triggers** | ❌ | ❌ | ✅ (fires triggers) |

---

## 7. Creating and Modifying Tables

### CREATE TABLE

```sql
CREATE TABLE products (
    product_id   INT PRIMARY KEY AUTO_INCREMENT,
    name         VARCHAR(100) NOT NULL,
    category     VARCHAR(50),
    price        DECIMAL(10, 2) NOT NULL CHECK (price >= 0),
    stock        INT DEFAULT 0,
    created_at   TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_available BOOLEAN DEFAULT TRUE
);

-- Create table from another table
CREATE TABLE products_backup AS
SELECT * FROM products WHERE is_available = TRUE;
```

### ALTER TABLE

```sql
-- Add column
ALTER TABLE products ADD COLUMN description TEXT;

-- Add multiple columns
ALTER TABLE products
    ADD COLUMN weight DECIMAL(5, 2),
    ADD COLUMN brand VARCHAR(50);

-- Modify column type
ALTER TABLE products MODIFY COLUMN name VARCHAR(200);

-- Rename column
ALTER TABLE products CHANGE COLUMN name product_name VARCHAR(200);

-- Drop column
ALTER TABLE products DROP COLUMN weight;

-- Add constraint
ALTER TABLE products ADD CONSTRAINT chk_stock CHECK (stock >= 0);

-- Drop constraint
ALTER TABLE products DROP CONSTRAINT chk_stock;

-- Add foreign key
ALTER TABLE products
    ADD COLUMN dept_id INT,
    ADD CONSTRAINT fk_dept FOREIGN KEY (dept_id) REFERENCES departments(dept_id);

-- Rename table
ALTER TABLE products RENAME TO items;
```

### DROP TABLE

```sql
-- Drop table (permanently removes table and data)
DROP TABLE products;

-- Drop if exists (prevents error)
DROP TABLE IF EXISTS products;

-- Drop database
DROP DATABASE IF EXISTS company_db;
```

---

## 8. Indexes and Constraints

### Indexes

**Indexes** speed up data retrieval by creating a fast lookup structure (like a book's index).

```sql
-- Create index on a single column
CREATE INDEX idx_last_name ON employees(last_name);

-- Create index on multiple columns (composite)
CREATE INDEX idx_dept_salary ON employees(dept_id, salary);

-- Create unique index
CREATE UNIQUE INDEX idx_email ON employees(email);

-- Show indexes on a table
SHOW INDEX FROM employees;

-- Drop index
DROP INDEX idx_last_name ON employees;
```

| Index Type | Purpose | Example |
|-----------|---------|---------|
| **Single Column** | Speed up queries on one column | `CREATE INDEX idx_name ON employees(last_name)` |
| **Composite** | Speed up queries on multiple columns | `CREATE INDEX idx ON employees(dept_id, salary)` |
| **Unique** | Ensure uniqueness + speed | `CREATE UNIQUE INDEX idx ON employees(email)` |
| **Primary Key** | Auto-indexed, unique + NOT NULL | Defined at table creation |

### When to Use Indexes

| ✅ Use Index When | ❌ Avoid Index When |
|-------------------|---------------------|
| Column is used in WHERE frequently | Table is very small |
| Column is used in JOIN conditions | Column has very few distinct values |
| Column is used in ORDER BY | Table has heavy INSERT/UPDATE/DELETE |
| Column has high cardinality (many unique values) | Column is rarely used in queries |

### Constraints

**Constraints** enforce rules on data to maintain integrity.

```sql
CREATE TABLE students (
    -- PRIMARY KEY: Unique + NOT NULL identifier
    student_id INT PRIMARY KEY AUTO_INCREMENT,

    -- NOT NULL: Must have a value
    first_name VARCHAR(50) NOT NULL,
    last_name  VARCHAR(50) NOT NULL,

    -- UNIQUE: No duplicates allowed
    email VARCHAR(100) UNIQUE,

    -- CHECK: Validates against a condition
    age INT CHECK (age >= 16 AND age <= 30),
    gpa DECIMAL(3,2) CHECK (gpa >= 0.0 AND gpa <= 4.0),

    -- DEFAULT: Auto-fills with this value
    enrollment_date DATE DEFAULT (CURRENT_DATE),
    status VARCHAR(20) DEFAULT 'Active',

    -- FOREIGN KEY: References another table
    dept_id INT,
    CONSTRAINT fk_student_dept
        FOREIGN KEY (dept_id) REFERENCES departments(dept_id)
        ON DELETE SET NULL
        ON UPDATE CASCADE
);
```

### Constraint Summary

| Constraint | Purpose | Example |
|-----------|---------|---------|
| `NOT NULL` | Cannot be NULL | `name VARCHAR(50) NOT NULL` |
| `UNIQUE` | No duplicates | `email VARCHAR(100) UNIQUE` |
| `PRIMARY KEY` | Unique + NOT NULL, one per table | `id INT PRIMARY KEY` |
| `FOREIGN KEY` | Links to another table's PK | `FOREIGN KEY (dept_id) REFERENCES departments(dept_id)` |
| `CHECK` | Validates a condition | `CHECK (age >= 18)` |
| `DEFAULT` | Sets default value | `status VARCHAR(20) DEFAULT 'Active'` |
| `AUTO_INCREMENT` | Auto-generates sequential numbers | `id INT AUTO_INCREMENT` |

### Foreign Key Actions

| Action | ON DELETE | ON UPDATE |
|--------|-----------|-----------|
| `CASCADE` | Delete child rows too | Update child FK values |
| `SET NULL` | Set child FK to NULL | Set child FK to NULL |
| `RESTRICT` | Prevent deletion | Prevent update |
| `NO ACTION` | Same as RESTRICT | Same as RESTRICT |
| `SET DEFAULT` | Set to default value | Set to default value |

### Composite Primary Key

```sql
CREATE TABLE enrollments (
    student_id INT,
    course_id  INT,
    grade      CHAR(2),
    PRIMARY KEY (student_id, course_id),   -- Composite PK
    FOREIGN KEY (student_id) REFERENCES students(student_id),
    FOREIGN KEY (course_id) REFERENCES courses(course_id)
);
```

---

## 9. Practice Questions

### Multiple Choice Questions

**Q1.** What does ANSI SQL stand for?
- a) Advanced Network SQL Interface
- b) American National Standards Institute SQL ✅
- c) Automated National SQL Index
- d) Application Network SQL Interface

**Q2.** Which SQL clause is used to filter rows BEFORE grouping?
- a) HAVING
- b) WHERE ✅
- c) GROUP BY
- d) ORDER BY

**Q3.** Which SQL clause is used to filter groups AFTER grouping?
- a) WHERE
- b) HAVING ✅
- c) ORDER BY
- d) LIMIT

**Q4.** What does `LEFT JOIN` return?
- a) Only matching rows from both tables
- b) All rows from the left table + matching rows from the right table ✅
- c) All rows from the right table
- d) Cartesian product

**Q5.** What is a correlated subquery?
- a) A query that runs once
- b) A subquery that references columns from the outer query ✅
- c) A query with no subquery
- d) A query that joins two tables

**Q6.** What is the difference between TRUNCATE and DELETE?
- a) No difference
- b) TRUNCATE removes all rows without logging individual deletions and cannot be rolled back; DELETE can be rolled back ✅
- c) DELETE is faster
- d) TRUNCATE allows WHERE clause

**Q7.** What does `AUTO_INCREMENT` do?
- a) Automatically increases salary
- b) Automatically generates sequential unique numbers for new rows ✅
- c) Increments all column values
- d) Auto-updates timestamps

**Q8.** Which wildcard matches "zero or more characters" in a LIKE query?
- a) `_`
- b) `*`
- c) `%` ✅
- d) `#`

**Q9.** What does `ORDER BY salary DESC` do?
- a) Sorts salary in ascending order
- b) Sorts salary from highest to lowest ✅
- c) Deletes rows with the highest salary
- d) Groups by salary

**Q10.** What is the correct SQL query execution order?
- a) SELECT → FROM → WHERE → GROUP BY
- b) FROM → WHERE → GROUP BY → HAVING → SELECT → ORDER BY ✅
- c) SELECT → WHERE → FROM → ORDER BY
- d) FROM → SELECT → WHERE → GROUP BY

**Q11.** Which constraint ensures a column cannot have duplicate values?
- a) NOT NULL
- b) CHECK
- c) UNIQUE ✅
- d) DEFAULT

**Q12.** What does `ON DELETE CASCADE` do in a foreign key?
- a) Prevents deletion of parent row
- b) Sets child foreign key to NULL
- c) Automatically deletes child rows when parent is deleted ✅
- d) Does nothing

**Q13.** Which aggregate function finds the total sum of a column?
- a) `COUNT()`
- b) `AVG()`
- c) `SUM()` ✅
- d) `TOTAL()`

**Q14.** How do you find the second highest salary?
- a) `SELECT MAX(salary) FROM employees`
- b) `SELECT DISTINCT salary FROM employees ORDER BY salary DESC LIMIT 1 OFFSET 1` ✅
- c) `SELECT MIN(salary) FROM employees`
- d) `SELECT salary FROM employees WHERE salary = 2`

**Q15.** What type of JOIN produces a Cartesian product?
- a) INNER JOIN
- b) LEFT JOIN
- c) RIGHT JOIN
- d) CROSS JOIN ✅

---

> ✅ **ANSI SQL using MySQL Complete!** Next: [Module 3 — Core Java →](../../Module-3_Core-Java/01_Core-Java/README.md)
