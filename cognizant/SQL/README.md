# 🗄️ SQL (MySQL) - Cognizant Assessment Preparation

## 📋 Topics Covered
1. [SQL Basics & Categories](#1-sql-basics--categories)
2. [DDL - Data Definition Language](#2-ddl---data-definition-language)
3. [DML - Data Manipulation Language](#3-dml---data-manipulation-language)
4. [DCL - Data Control Language](#4-dcl---data-control-language)
5. [TCL - Transaction Control Language](#5-tcl---transaction-control-language)
6. [Constraints](#6-constraints-and-their-types)
7. [SQL Operators](#7-sql-operators)
8. [SQL Clauses](#8-clauses-in-sql)
9. [SQL Functions](#9-sql-functions)
10. [Joins and Their Types](#10-joins-and-their-types)
11. [Sub-Queries](#11-sub-queries)
12. [Views](#12-views)
13. [Indexes](#13-indexes)
14. [Practice Problems](#14-practice-problems)

---

## 1. SQL Basics & Categories

### 📌 Definition
**SQL (Structured Query Language)** is a standard language for managing and manipulating relational databases.

### SQL Command Categories

| Category | Full Form | Commands | Purpose |
|----------|-----------|----------|---------|
| **DDL** | Data Definition Language | CREATE, ALTER, DROP, TRUNCATE, RENAME | Define/modify database structure |
| **DML** | Data Manipulation Language | SELECT, INSERT, UPDATE, DELETE | Manipulate data |
| **DCL** | Data Control Language | GRANT, REVOKE | Control access/permissions |
| **TCL** | Transaction Control Language | COMMIT, ROLLBACK, SAVEPOINT | Manage transactions |

---

## 2. DDL - Data Definition Language

> **Definition**: DDL commands define the structure (schema) of the database objects like tables, indexes, views, etc.

### 2.1 CREATE

```sql
-- Create Database
CREATE DATABASE company_db;
USE company_db;

-- Create Table with various data types
CREATE TABLE employees (
    emp_id      INT PRIMARY KEY AUTO_INCREMENT,
    first_name  VARCHAR(50) NOT NULL,
    last_name   VARCHAR(50) NOT NULL,
    email       VARCHAR(100) UNIQUE,
    phone       VARCHAR(15),
    hire_date   DATE NOT NULL,
    salary      DECIMAL(10, 2) DEFAULT 0.00,
    department  VARCHAR(50),
    manager_id  INT,
    is_active   BOOLEAN DEFAULT TRUE,
    created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create Table with Foreign Key
CREATE TABLE departments (
    dept_id     INT PRIMARY KEY AUTO_INCREMENT,
    dept_name   VARCHAR(100) NOT NULL UNIQUE,
    location    VARCHAR(100),
    budget      DECIMAL(15, 2)
);

CREATE TABLE projects (
    project_id   INT PRIMARY KEY AUTO_INCREMENT,
    project_name VARCHAR(100) NOT NULL,
    dept_id      INT,
    start_date   DATE,
    end_date     DATE,
    budget       DECIMAL(12, 2),
    FOREIGN KEY (dept_id) REFERENCES departments(dept_id)
        ON DELETE SET NULL
        ON UPDATE CASCADE
);

-- Create Table from another table
CREATE TABLE emp_backup AS
SELECT * FROM employees WHERE is_active = TRUE;
```

### 2.2 ALTER

```sql
-- Add a new column
ALTER TABLE employees ADD COLUMN address VARCHAR(200);

-- Add multiple columns
ALTER TABLE employees 
    ADD COLUMN city VARCHAR(50),
    ADD COLUMN state VARCHAR(50);

-- Modify column data type
ALTER TABLE employees MODIFY COLUMN phone VARCHAR(20);

-- Rename a column
ALTER TABLE employees CHANGE COLUMN phone contact_number VARCHAR(20);

-- Drop a column
ALTER TABLE employees DROP COLUMN address;

-- Add constraint
ALTER TABLE employees ADD CONSTRAINT chk_salary CHECK (salary >= 0);

-- Drop constraint
ALTER TABLE employees DROP CONSTRAINT chk_salary;

-- Add foreign key
ALTER TABLE employees 
    ADD CONSTRAINT fk_manager 
    FOREIGN KEY (manager_id) REFERENCES employees(emp_id);

-- Rename table
ALTER TABLE employees RENAME TO staff;
-- OR
RENAME TABLE staff TO employees;
```

### 2.3 DROP

```sql
-- Drop table (removes table and all data permanently)
DROP TABLE employees;

-- Drop table if it exists (prevents error)
DROP TABLE IF EXISTS employees;

-- Drop database
DROP DATABASE company_db;

-- Drop database if exists
DROP DATABASE IF EXISTS company_db;
```

### 2.4 TRUNCATE

```sql
-- Remove ALL data from table but keep the structure
-- Cannot be rolled back (no transaction log)
-- Faster than DELETE for large tables
-- Resets AUTO_INCREMENT counter
TRUNCATE TABLE employees;
```

### DROP vs TRUNCATE vs DELETE

| Feature | DROP | TRUNCATE | DELETE |
|---------|------|----------|--------|
| Type | DDL | DDL | DML |
| Removes | Table + Data | Data only | Specific rows |
| WHERE clause | ❌ | ❌ | ✅ |
| Rollback | ❌ | ❌ | ✅ |
| Speed | Fast | Fast | Slow (row by row) |
| AUTO_INCREMENT | Removed | Reset | Not reset |
| Triggers | ❌ | ❌ | ✅ Fires |

---

## 3. DML - Data Manipulation Language

> **Definition**: DML commands are used to manipulate the data stored in database tables.

### 3.1 INSERT

```sql
-- Insert single row
INSERT INTO employees (first_name, last_name, email, hire_date, salary, department)
VALUES ('Dilip', 'Kumar', 'dilip@email.com', '2026-01-15', 50000, 'IT');

-- Insert multiple rows
INSERT INTO employees (first_name, last_name, email, hire_date, salary, department)
VALUES 
    ('Alice', 'Smith', 'alice@email.com', '2025-03-10', 60000, 'HR'),
    ('Bob', 'Johnson', 'bob@email.com', '2025-06-20', 55000, 'IT'),
    ('Charlie', 'Brown', 'charlie@email.com', '2024-11-05', 70000, 'Finance'),
    ('Diana', 'Williams', 'diana@email.com', '2025-08-15', 65000, 'IT'),
    ('Eve', 'Davis', 'eve@email.com', '2026-02-01', 48000, 'HR');

-- Insert from another table
INSERT INTO emp_backup
SELECT * FROM employees WHERE department = 'IT';
```

### 3.2 SELECT

```sql
-- Select all columns
SELECT * FROM employees;

-- Select specific columns
SELECT first_name, last_name, salary FROM employees;

-- Select with alias
SELECT first_name AS "First Name", salary AS "Monthly Salary" FROM employees;

-- Select with expressions
SELECT first_name, salary, salary * 12 AS annual_salary FROM employees;

-- Select DISTINCT (unique values)
SELECT DISTINCT department FROM employees;

-- Select with LIMIT
SELECT * FROM employees LIMIT 5;         -- First 5 rows
SELECT * FROM employees LIMIT 5 OFFSET 2; -- Skip 2, get next 5
```

### 3.3 UPDATE

```sql
-- Update single column
UPDATE employees SET salary = 55000 WHERE emp_id = 1;

-- Update multiple columns
UPDATE employees 
SET salary = 60000, department = 'Management' 
WHERE emp_id = 1;

-- Update with expression
UPDATE employees SET salary = salary * 1.10;  -- 10% raise for all

-- Update with condition
UPDATE employees 
SET salary = salary * 1.15 
WHERE department = 'IT' AND salary < 60000;

-- Update using subquery
UPDATE employees 
SET salary = (SELECT AVG(salary) FROM employees WHERE department = 'IT')
WHERE emp_id = 5;
```

### 3.4 DELETE

```sql
-- Delete specific rows
DELETE FROM employees WHERE emp_id = 5;

-- Delete with condition
DELETE FROM employees WHERE department = 'HR' AND salary < 50000;

-- Delete all rows (can be rolled back, unlike TRUNCATE)
DELETE FROM employees;
```

---

## 4. DCL - Data Control Language

> **Definition**: DCL commands are used to control access to the database by granting or revoking privileges to users.

```sql
-- ===== GRANT - Give permissions =====
-- Grant all privileges on a database
GRANT ALL PRIVILEGES ON company_db.* TO 'username'@'localhost';

-- Grant specific privileges
GRANT SELECT, INSERT ON company_db.employees TO 'reader'@'localhost';

-- Grant with grant option (user can grant to others)
GRANT SELECT ON company_db.* TO 'admin'@'localhost' WITH GRANT OPTION;

-- Grant on specific columns
GRANT SELECT (first_name, last_name, email) ON company_db.employees TO 'limited_user'@'localhost';

-- ===== REVOKE - Remove permissions =====
-- Revoke specific privilege
REVOKE INSERT ON company_db.employees FROM 'reader'@'localhost';

-- Revoke all privileges
REVOKE ALL PRIVILEGES ON company_db.* FROM 'username'@'localhost';

-- Show grants for a user
SHOW GRANTS FOR 'username'@'localhost';
```

### Common Privileges

| Privilege | Description |
|-----------|-------------|
| SELECT | Read data |
| INSERT | Add new data |
| UPDATE | Modify existing data |
| DELETE | Remove data |
| CREATE | Create tables/databases |
| DROP | Delete tables/databases |
| ALTER | Modify table structure |
| INDEX | Create/drop indexes |
| ALL PRIVILEGES | All of the above |

---

## 5. TCL - Transaction Control Language

> **Definition**: TCL commands manage transactions in the database. A **transaction** is a set of SQL statements that must ALL succeed or ALL fail (atomicity).

### ACID Properties

| Property | Description |
|----------|-------------|
| **A**tomicity | All or nothing - entire transaction succeeds or fails |
| **C**onsistency | Database moves from one valid state to another |
| **I**solation | Concurrent transactions don't interfere |
| **D**urability | Committed changes are permanent |

```sql
-- ===== COMMIT - Save changes permanently =====
START TRANSACTION;      -- OR BEGIN

UPDATE employees SET salary = salary + 5000 WHERE dept_id = 1;
INSERT INTO audit_log (action) VALUES ('Salary updated for dept 1');

COMMIT;   -- Permanently saves both changes

-- ===== ROLLBACK - Undo changes =====
START TRANSACTION;

DELETE FROM employees WHERE dept_id = 3;
-- Oops! Wrong department!

ROLLBACK;  -- Undoes the delete, data is restored

-- ===== SAVEPOINT - Partial rollback =====
START TRANSACTION;

INSERT INTO employees (first_name, last_name, email, hire_date, salary, department) 
VALUES ('Frank', 'Miller', 'frank@email.com', '2026-05-20', 52000, 'IT');
SAVEPOINT sp1;

INSERT INTO employees (first_name, last_name, email, hire_date, salary, department) 
VALUES ('Grace', 'Lee', 'grace@email.com', '2026-05-20', 48000, 'HR');
SAVEPOINT sp2;

-- Undo only Grace's insert, keep Frank's
ROLLBACK TO SAVEPOINT sp1;

COMMIT;  -- Only Frank is saved
```

---

## 6. Constraints and Their Types

> **Definition**: Constraints are rules enforced on table columns to ensure data integrity and validity.

| Constraint | Description |
|------------|-------------|
| `NOT NULL` | Column cannot have NULL values |
| `UNIQUE` | All values in column must be unique |
| `PRIMARY KEY` | NOT NULL + UNIQUE, uniquely identifies each row |
| `FOREIGN KEY` | Links to PRIMARY KEY in another table |
| `CHECK` | Validates values based on a condition |
| `DEFAULT` | Sets default value if none provided |
| `AUTO_INCREMENT` | Automatically generates sequential numbers |

```sql
-- All constraints demonstrated in one table
CREATE TABLE students (
    -- PRIMARY KEY: uniquely identifies each row (NOT NULL + UNIQUE)
    student_id INT PRIMARY KEY AUTO_INCREMENT,
    
    -- NOT NULL: value must be provided
    first_name VARCHAR(50) NOT NULL,
    last_name  VARCHAR(50) NOT NULL,
    
    -- UNIQUE: no duplicate values allowed
    email VARCHAR(100) UNIQUE,
    
    -- CHECK: validates value against condition
    age INT CHECK (age >= 16 AND age <= 30),
    
    -- DEFAULT: sets default value
    enrollment_date DATE DEFAULT (CURRENT_DATE),
    status VARCHAR(20) DEFAULT 'Active',
    
    -- FOREIGN KEY: references another table
    dept_id INT,
    FOREIGN KEY (dept_id) REFERENCES departments(dept_id)
        ON DELETE CASCADE       -- Delete student if department is deleted
        ON UPDATE CASCADE       -- Update FK if parent PK changes
);

-- Composite Primary Key
CREATE TABLE enrollments (
    student_id INT,
    course_id  INT,
    grade      CHAR(2),
    PRIMARY KEY (student_id, course_id),
    FOREIGN KEY (student_id) REFERENCES students(student_id),
    FOREIGN KEY (course_id) REFERENCES courses(course_id)
);
```

### Foreign Key Actions

| Action | ON DELETE | ON UPDATE |
|--------|-----------|-----------|
| CASCADE | Delete child rows | Update child FK values |
| SET NULL | Set child FK to NULL | Set child FK to NULL |
| SET DEFAULT | Set to default value | Set to default value |
| RESTRICT | Prevent deletion if children exist | Prevent update |
| NO ACTION | Same as RESTRICT | Same as RESTRICT |

---

## 7. SQL Operators

### 7.1 Comparison Operators

```sql
-- Equal
SELECT * FROM employees WHERE department = 'IT';

-- Not Equal
SELECT * FROM employees WHERE department != 'HR';
SELECT * FROM employees WHERE department <> 'HR';  -- Same as !=

-- Greater Than / Less Than
SELECT * FROM employees WHERE salary > 50000;
SELECT * FROM employees WHERE salary < 60000;
SELECT * FROM employees WHERE salary >= 55000;
SELECT * FROM employees WHERE salary <= 70000;
```

### 7.2 Logical Operators

```sql
-- AND - both conditions must be true
SELECT * FROM employees 
WHERE department = 'IT' AND salary > 50000;

-- OR - at least one condition must be true
SELECT * FROM employees 
WHERE department = 'IT' OR department = 'HR';

-- NOT - negates a condition
SELECT * FROM employees 
WHERE NOT department = 'Finance';

-- Combined
SELECT * FROM employees 
WHERE (department = 'IT' OR department = 'HR') AND salary > 50000;
```

### 7.3 Special Operators

```sql
-- BETWEEN - range (inclusive)
SELECT * FROM employees WHERE salary BETWEEN 50000 AND 70000;
SELECT * FROM employees WHERE hire_date BETWEEN '2025-01-01' AND '2025-12-31';

-- IN - matches any value in a list
SELECT * FROM employees WHERE department IN ('IT', 'HR', 'Finance');

-- NOT IN
SELECT * FROM employees WHERE department NOT IN ('IT', 'HR');

-- LIKE - pattern matching
SELECT * FROM employees WHERE first_name LIKE 'A%';      -- Starts with A
SELECT * FROM employees WHERE last_name LIKE '%son';      -- Ends with 'son'
SELECT * FROM employees WHERE email LIKE '%@gmail.com';   -- Gmail addresses
SELECT * FROM employees WHERE first_name LIKE '_a%';      -- Second char is 'a'
SELECT * FROM employees WHERE first_name LIKE '____';     -- Exactly 4 characters

-- LIKE Wildcards:
-- %  → zero or more characters
-- _  → exactly one character

-- IS NULL / IS NOT NULL
SELECT * FROM employees WHERE manager_id IS NULL;
SELECT * FROM employees WHERE email IS NOT NULL;

-- EXISTS
SELECT * FROM departments d
WHERE EXISTS (
    SELECT 1 FROM employees e WHERE e.department = d.dept_name
);
```

### 7.4 Arithmetic Operators

```sql
SELECT first_name, 
       salary,
       salary + 5000 AS raised_salary,       -- Addition
       salary - 2000 AS after_deduction,      -- Subtraction
       salary * 12 AS annual_salary,          -- Multiplication
       salary / 30 AS daily_salary,           -- Division
       salary % 1000 AS remainder             -- Modulus
FROM employees;
```

---

## 8. Clauses in SQL

### 8.1 WHERE Clause

```sql
-- Filter rows based on conditions
SELECT * FROM employees WHERE salary > 50000;
SELECT * FROM employees WHERE department = 'IT' AND salary > 55000;
SELECT * FROM employees WHERE hire_date > '2025-06-01';
```

### 8.2 ORDER BY Clause

```sql
-- Sort results
-- Ascending (default)
SELECT * FROM employees ORDER BY salary;
SELECT * FROM employees ORDER BY salary ASC;

-- Descending
SELECT * FROM employees ORDER BY salary DESC;

-- Multiple columns
SELECT * FROM employees ORDER BY department ASC, salary DESC;

-- Order by column position
SELECT first_name, department, salary FROM employees ORDER BY 2, 3 DESC;
```

### 8.3 GROUP BY Clause

```sql
-- Group rows and apply aggregate functions
-- Total employees per department
SELECT department, COUNT(*) AS total_employees
FROM employees
GROUP BY department;

-- Average salary per department
SELECT department, AVG(salary) AS avg_salary
FROM employees
GROUP BY department;

-- Multiple aggregations
SELECT department,
       COUNT(*) AS total_employees,
       SUM(salary) AS total_salary,
       AVG(salary) AS avg_salary,
       MIN(salary) AS min_salary,
       MAX(salary) AS max_salary
FROM employees
GROUP BY department;
```

### 8.4 HAVING Clause

```sql
-- Filter groups (like WHERE but for GROUP BY)
-- WHERE filters rows BEFORE grouping
-- HAVING filters groups AFTER grouping

-- Departments with more than 3 employees
SELECT department, COUNT(*) AS total
FROM employees
GROUP BY department
HAVING COUNT(*) > 3;

-- Departments with average salary > 55000
SELECT department, AVG(salary) AS avg_salary
FROM employees
GROUP BY department
HAVING AVG(salary) > 55000;

-- Combined WHERE and HAVING
SELECT department, AVG(salary) AS avg_salary
FROM employees
WHERE is_active = TRUE           -- Filter rows first
GROUP BY department              -- Then group
HAVING AVG(salary) > 50000      -- Then filter groups
ORDER BY avg_salary DESC;        -- Then sort
```

### SQL Query Execution Order

```
1. FROM       → Choose table(s)
2. JOIN       → Join tables
3. WHERE      → Filter rows
4. GROUP BY   → Group rows
5. HAVING     → Filter groups
6. SELECT     → Choose columns
7. DISTINCT   → Remove duplicates
8. ORDER BY   → Sort results
9. LIMIT      → Limit output rows
```

### 8.5 LIMIT and OFFSET

```sql
-- Get first 5 rows
SELECT * FROM employees LIMIT 5;

-- Get rows 6-10 (pagination)
SELECT * FROM employees LIMIT 5 OFFSET 5;

-- Top 3 highest paid employees
SELECT first_name, salary FROM employees 
ORDER BY salary DESC LIMIT 3;

-- Second highest salary
SELECT DISTINCT salary FROM employees 
ORDER BY salary DESC LIMIT 1 OFFSET 1;

-- Nth highest salary
SELECT DISTINCT salary FROM employees 
ORDER BY salary DESC LIMIT 1 OFFSET N-1;  -- Replace N with desired rank
```

---

## 9. SQL Functions

### 9.1 Aggregate Functions

```sql
-- COUNT - count rows
SELECT COUNT(*) FROM employees;                       -- Total rows
SELECT COUNT(email) FROM employees;                    -- Non-null email count
SELECT COUNT(DISTINCT department) FROM employees;      -- Unique departments

-- SUM - total of a column
SELECT SUM(salary) FROM employees;                    -- Total salary
SELECT SUM(salary) FROM employees WHERE department = 'IT';

-- AVG - average value
SELECT AVG(salary) FROM employees;                    -- Average salary
SELECT AVG(salary) AS avg_salary FROM employees WHERE department = 'Finance';

-- MIN / MAX
SELECT MIN(salary) AS lowest, MAX(salary) AS highest FROM employees;
SELECT MIN(hire_date) AS first_hire, MAX(hire_date) AS latest_hire FROM employees;
```

### 9.2 String Functions

```sql
-- CONCAT - combine strings
SELECT CONCAT(first_name, ' ', last_name) AS full_name FROM employees;

-- CONCAT_WS - concat with separator
SELECT CONCAT_WS(', ', last_name, first_name) AS name FROM employees;

-- LENGTH / CHAR_LENGTH
SELECT first_name, LENGTH(first_name) AS len FROM employees;

-- UPPER / LOWER
SELECT UPPER(first_name) AS upper_name FROM employees;
SELECT LOWER(email) AS lower_email FROM employees;

-- SUBSTRING / SUBSTR
SELECT SUBSTRING(first_name, 1, 3) FROM employees;    -- First 3 chars
SELECT SUBSTR(email, 1, INSTR(email, '@') - 1) AS username FROM employees;

-- TRIM / LTRIM / RTRIM
SELECT TRIM('  Hello  ');              -- 'Hello'
SELECT LTRIM('  Hello  ');             -- 'Hello  '
SELECT RTRIM('  Hello  ');             -- '  Hello'
SELECT TRIM(BOTH 'x' FROM 'xxHelloxx');  -- 'Hello'

-- REPLACE
SELECT REPLACE(email, '@email.com', '@company.com') FROM employees;

-- LEFT / RIGHT
SELECT LEFT(first_name, 3) FROM employees;    -- First 3 chars
SELECT RIGHT(phone, 4) FROM employees;         -- Last 4 chars

-- REVERSE
SELECT REVERSE(first_name) FROM employees;

-- LPAD / RPAD (pad to length)
SELECT LPAD(emp_id, 5, '0') AS emp_code FROM employees;  -- 00001, 00002...

-- FORMAT
SELECT FORMAT(salary, 2) FROM employees;        -- 50,000.00

-- LOCATE / INSTR / POSITION
SELECT LOCATE('@', email) FROM employees;       -- Position of '@'
```

### 9.3 Numeric / Math Functions

```sql
-- ROUND - round to N decimal places
SELECT ROUND(3.14159, 2);          -- 3.14
SELECT ROUND(salary, -3) FROM employees;  -- Round to nearest thousand

-- CEIL / FLOOR
SELECT CEIL(4.1);                 -- 5 (round up)
SELECT FLOOR(4.9);                -- 4 (round down)

-- ABS - absolute value
SELECT ABS(-15);                  -- 15

-- MOD / % - modulus
SELECT MOD(10, 3);                -- 1
SELECT 10 % 3;                    -- 1

-- POWER / POW
SELECT POWER(2, 3);               -- 8

-- SQRT
SELECT SQRT(144);                 -- 12

-- TRUNCATE (removes decimal without rounding)
SELECT TRUNCATE(3.14159, 2);      -- 3.14
```

### 9.4 Date Functions

```sql
-- Current date/time
SELECT CURDATE();                  -- 2026-05-20
SELECT CURTIME();                  -- 20:06:56
SELECT NOW();                      -- 2026-05-20 20:06:56
SELECT CURRENT_TIMESTAMP;         -- Same as NOW()

-- Extract parts of a date
SELECT YEAR(hire_date) FROM employees;      -- 2026
SELECT MONTH(hire_date) FROM employees;     -- 5
SELECT DAY(hire_date) FROM employees;       -- 20
SELECT DAYNAME(hire_date) FROM employees;   -- Wednesday
SELECT MONTHNAME(hire_date) FROM employees; -- May
SELECT DAYOFWEEK(hire_date) FROM employees; -- 4 (1=Sunday)
SELECT DAYOFYEAR(hire_date) FROM employees; -- 140
SELECT QUARTER(hire_date) FROM employees;   -- 2

-- Date arithmetic
SELECT DATE_ADD(hire_date, INTERVAL 30 DAY) FROM employees;
SELECT DATE_ADD(hire_date, INTERVAL 6 MONTH) FROM employees;
SELECT DATE_SUB(hire_date, INTERVAL 1 YEAR) FROM employees;
SELECT hire_date + INTERVAL 7 DAY FROM employees;

-- Date difference
SELECT DATEDIFF('2026-12-31', '2026-01-01');   -- 364
SELECT DATEDIFF(CURDATE(), hire_date) AS days_employed FROM employees;
SELECT TIMESTAMPDIFF(MONTH, hire_date, CURDATE()) AS months_employed FROM employees;
SELECT TIMESTAMPDIFF(YEAR, hire_date, CURDATE()) AS years_employed FROM employees;

-- Format dates
SELECT DATE_FORMAT(hire_date, '%d/%m/%Y') FROM employees;     -- 20/05/2026
SELECT DATE_FORMAT(hire_date, '%W, %M %d, %Y') FROM employees; -- Wednesday, May 20, 2026
SELECT DATE_FORMAT(NOW(), '%h:%i %p') AS time_12hr;            -- 08:06 PM

-- Date formatting codes:
-- %Y = 4-digit year    %y = 2-digit year
-- %M = Full month name  %m = Month number (01-12)
-- %D = Day with suffix  %d = Day (01-31)
-- %W = Full day name    %w = Day of week (0=Sunday)
-- %H = Hour (00-23)     %h = Hour (01-12)
-- %i = Minutes (00-59)  %s = Seconds (00-59)
-- %p = AM/PM

-- STR_TO_DATE (parse string to date)
SELECT STR_TO_DATE('20-05-2026', '%d-%m-%Y');  -- 2026-05-20
```

### 9.5 Conditional Functions

```sql
-- IF function
SELECT first_name, salary,
    IF(salary > 60000, 'High', 'Low') AS salary_level
FROM employees;

-- IFNULL - replace NULL with a value
SELECT first_name, IFNULL(phone, 'No Phone') AS phone FROM employees;

-- COALESCE - return first non-null value
SELECT COALESCE(phone, email, 'No Contact') AS contact FROM employees;

-- CASE WHEN (most powerful)
SELECT first_name, salary,
    CASE
        WHEN salary >= 70000 THEN 'Senior'
        WHEN salary >= 55000 THEN 'Mid-Level'
        WHEN salary >= 40000 THEN 'Junior'
        ELSE 'Intern'
    END AS level
FROM employees;

-- CASE WHEN with GROUP BY
SELECT 
    CASE
        WHEN salary >= 70000 THEN 'High'
        WHEN salary >= 50000 THEN 'Medium'
        ELSE 'Low'
    END AS salary_band,
    COUNT(*) AS employee_count
FROM employees
GROUP BY salary_band;

-- Simple CASE
SELECT first_name, department,
    CASE department
        WHEN 'IT' THEN 'Technology'
        WHEN 'HR' THEN 'Human Resources'
        WHEN 'Finance' THEN 'Financial Services'
        ELSE 'Other'
    END AS dept_full_name
FROM employees;

-- NULLIF - returns NULL if two values are equal
SELECT NULLIF(10, 10);    -- NULL
SELECT NULLIF(10, 20);    -- 10
```

---

## 10. Joins and Their Types

> **Definition**: JOINs combine rows from two or more tables based on a related column between them.

### Sample Tables for JOIN Examples

```sql
-- employees table
-- | emp_id | name    | dept_id | salary |
-- |--------|---------|---------|--------|
-- | 1      | Alice   | 1       | 60000  |
-- | 2      | Bob     | 2       | 55000  |
-- | 3      | Charlie | 1       | 70000  |
-- | 4      | Diana   | 3       | 65000  |
-- | 5      | Eve     | NULL    | 48000  |

-- departments table
-- | dept_id | dept_name  |
-- |---------|------------|
-- | 1       | IT         |
-- | 2       | HR         |
-- | 3       | Finance    |
-- | 4       | Marketing  |
```

### 10.1 INNER JOIN

> Returns only matching rows from both tables.

```sql
SELECT e.name, e.salary, d.dept_name
FROM employees e
INNER JOIN departments d ON e.dept_id = d.dept_id;

-- Result:
-- | name    | salary | dept_name |
-- |---------|--------|-----------|
-- | Alice   | 60000  | IT        |
-- | Bob     | 55000  | HR        |
-- | Charlie | 70000  | IT        |
-- | Diana   | 65000  | Finance   |
-- Note: Eve is excluded (NULL dept_id)
-- Note: Marketing is excluded (no employees)
```

### 10.2 LEFT JOIN (LEFT OUTER JOIN)

> Returns ALL rows from the left table + matching rows from the right table. Non-matching right side = NULL.

```sql
SELECT e.name, e.salary, d.dept_name
FROM employees e
LEFT JOIN departments d ON e.dept_id = d.dept_id;

-- Result:
-- | name    | salary | dept_name |
-- |---------|--------|-----------|
-- | Alice   | 60000  | IT        |
-- | Bob     | 55000  | HR        |
-- | Charlie | 70000  | IT        |
-- | Diana   | 65000  | Finance   |
-- | Eve     | 48000  | NULL      |  ← Eve included even without dept
```

### 10.3 RIGHT JOIN (RIGHT OUTER JOIN)

> Returns ALL rows from the right table + matching rows from the left table. Non-matching left side = NULL.

```sql
SELECT e.name, e.salary, d.dept_name
FROM employees e
RIGHT JOIN departments d ON e.dept_id = d.dept_id;

-- Result:
-- | name    | salary | dept_name  |
-- |---------|--------|------------|
-- | Alice   | 60000  | IT         |
-- | Charlie | 70000  | IT         |
-- | Bob     | 55000  | HR         |
-- | Diana   | 65000  | Finance    |
-- | NULL    | NULL   | Marketing  |  ← Marketing included even without employees
```

### 10.4 FULL OUTER JOIN

> Returns ALL rows from both tables. MySQL doesn't support FULL OUTER JOIN directly, use UNION.

```sql
-- MySQL workaround using UNION
SELECT e.name, e.salary, d.dept_name
FROM employees e
LEFT JOIN departments d ON e.dept_id = d.dept_id

UNION

SELECT e.name, e.salary, d.dept_name
FROM employees e
RIGHT JOIN departments d ON e.dept_id = d.dept_id;

-- Result:
-- | name    | salary | dept_name  |
-- |---------|--------|------------|
-- | Alice   | 60000  | IT         |
-- | Bob     | 55000  | HR         |
-- | Charlie | 70000  | IT         |
-- | Diana   | 65000  | Finance    |
-- | Eve     | 48000  | NULL       |  ← From LEFT JOIN
-- | NULL    | NULL   | Marketing  |  ← From RIGHT JOIN
```

### 10.5 CROSS JOIN (Cartesian Product)

> Returns every combination of rows from both tables.

```sql
SELECT e.name, d.dept_name
FROM employees e
CROSS JOIN departments d;

-- Result: 5 employees × 4 departments = 20 rows
-- Every employee paired with every department
```

### 10.6 SELF JOIN

> A table joined with itself. Used for hierarchical data (e.g., employee-manager).

```sql
-- Find employees and their managers
SELECT e.name AS employee, m.name AS manager
FROM employees e
LEFT JOIN employees m ON e.manager_id = m.emp_id;

-- Result:
-- | employee | manager |
-- |----------|---------|
-- | Alice    | Charlie |
-- | Bob      | Alice   |
-- | Charlie  | NULL    |  ← Charlie has no manager (top level)
```

### 10.7 NATURAL JOIN

> Automatically joins on columns with the same name.

```sql
-- Joins on dept_id since both tables have it
SELECT * FROM employees NATURAL JOIN departments;
-- Equivalent to: INNER JOIN on matching column names
-- ⚠️ Be careful: may join on unintended columns
```

### JOIN Summary

| JOIN Type | Left Table | Right Table | Description |
|-----------|-----------|-------------|-------------|
| INNER | Matching only | Matching only | Only rows that match in both |
| LEFT | All rows | Matching only | All from left + matching from right |
| RIGHT | Matching only | All rows | All from right + matching from left |
| FULL OUTER | All rows | All rows | All rows from both tables |
| CROSS | All rows | All rows | Cartesian product |
| SELF | Same table | Same table | Table joined with itself |

### Multiple JOINs

```sql
-- Join 3 tables
SELECT e.name, d.dept_name, p.project_name
FROM employees e
INNER JOIN departments d ON e.dept_id = d.dept_id
INNER JOIN projects p ON d.dept_id = p.dept_id
WHERE e.salary > 50000
ORDER BY e.name;
```

---

## 11. Sub-Queries

> **Definition**: A sub-query (nested query / inner query) is a query within another query. The inner query runs first, and its result is used by the outer query.

### 11.1 Sub-Query in WHERE

```sql
-- Find employees earning more than average salary
SELECT * FROM employees
WHERE salary > (SELECT AVG(salary) FROM employees);

-- Find employees in IT department
SELECT * FROM employees
WHERE dept_id = (SELECT dept_id FROM departments WHERE dept_name = 'IT');

-- Find employees who are also managers
SELECT * FROM employees
WHERE emp_id IN (SELECT DISTINCT manager_id FROM employees WHERE manager_id IS NOT NULL);

-- Find employees earning max salary
SELECT * FROM employees
WHERE salary = (SELECT MAX(salary) FROM employees);

-- Second highest salary
SELECT * FROM employees
WHERE salary = (
    SELECT MAX(salary) FROM employees 
    WHERE salary < (SELECT MAX(salary) FROM employees)
);
```

### 11.2 Sub-Query in FROM (Derived Table)

```sql
-- Average of department averages
SELECT AVG(dept_avg) AS overall_avg
FROM (
    SELECT department, AVG(salary) AS dept_avg
    FROM employees
    GROUP BY department
) AS dept_averages;

-- Top earner from each department
SELECT * FROM (
    SELECT *, RANK() OVER (PARTITION BY department ORDER BY salary DESC) AS rank_num
    FROM employees
) AS ranked
WHERE rank_num = 1;
```

### 11.3 Sub-Query in SELECT

```sql
-- Show each employee's salary vs department average
SELECT first_name, salary, department,
    (SELECT AVG(salary) FROM employees e2 WHERE e2.department = e1.department) AS dept_avg
FROM employees e1;
```

### 11.4 Correlated Sub-Query

> A correlated sub-query references the outer query and runs once per row.

```sql
-- Employees earning above their department's average
SELECT * FROM employees e1
WHERE salary > (
    SELECT AVG(salary) FROM employees e2 
    WHERE e2.department = e1.department
);

-- Departments with at least 2 employees
SELECT * FROM departments d
WHERE (
    SELECT COUNT(*) FROM employees e WHERE e.dept_id = d.dept_id
) >= 2;
```

### 11.5 Sub-Query with EXISTS

```sql
-- Departments that have employees
SELECT * FROM departments d
WHERE EXISTS (
    SELECT 1 FROM employees e WHERE e.dept_id = d.dept_id
);

-- Departments that have NO employees
SELECT * FROM departments d
WHERE NOT EXISTS (
    SELECT 1 FROM employees e WHERE e.dept_id = d.dept_id
);
```

### 11.6 ANY / ALL

```sql
-- Salary greater than ANY IT employee's salary (at least one)
SELECT * FROM employees
WHERE salary > ANY (SELECT salary FROM employees WHERE department = 'IT');

-- Salary greater than ALL IT employees' salary (every one)
SELECT * FROM employees
WHERE salary > ALL (SELECT salary FROM employees WHERE department = 'IT');
```

---

## 12. Views

> **Definition**: A view is a **virtual table** created from a SQL query. It doesn't store data physically but provides a way to simplify complex queries, restrict access, or present data differently.

```sql
-- ===== CREATE VIEW =====
CREATE VIEW employee_details AS
SELECT e.emp_id, e.first_name, e.last_name, e.salary, d.dept_name
FROM employees e
JOIN departments d ON e.dept_id = d.dept_id;

-- Use the view like a regular table
SELECT * FROM employee_details;
SELECT * FROM employee_details WHERE dept_name = 'IT';

-- View with calculations
CREATE VIEW salary_summary AS
SELECT department,
       COUNT(*) AS total_employees,
       AVG(salary) AS avg_salary,
       MAX(salary) AS max_salary,
       MIN(salary) AS min_salary
FROM employees
GROUP BY department;

-- ===== MODIFY VIEW =====
CREATE OR REPLACE VIEW employee_details AS
SELECT e.emp_id, CONCAT(e.first_name, ' ', e.last_name) AS full_name, 
       e.salary, d.dept_name, e.hire_date
FROM employees e
JOIN departments d ON e.dept_id = d.dept_id;

-- ===== DROP VIEW =====
DROP VIEW IF EXISTS employee_details;
```

### View Advantages & Limitations

| Advantage | Limitation |
|-----------|------------|
| Simplifies complex queries | Cannot always INSERT/UPDATE/DELETE |
| Provides data security (restrict columns) | No indexes on views |
| Presents data in different format | Performance can be slower |
| Acts as abstraction layer | Depends on underlying tables |

---

## 13. Indexes

> **Definition**: An index is a data structure that improves the speed of data retrieval from a table. Think of it like a book's index - helps find data without scanning every page.

```sql
-- ===== CREATE INDEX =====
-- Single column index
CREATE INDEX idx_salary ON employees(salary);

-- Composite index (multiple columns)
CREATE INDEX idx_dept_salary ON employees(department, salary);

-- Unique index
CREATE UNIQUE INDEX idx_email ON employees(email);

-- ===== SHOW INDEXES =====
SHOW INDEX FROM employees;

-- ===== DROP INDEX =====
DROP INDEX idx_salary ON employees;
ALTER TABLE employees DROP INDEX idx_email;
```

### When to Use / Not Use Indexes

| ✅ Use Index When | ❌ Don't Use When |
|------------------|------------------|
| Column used in WHERE frequently | Small tables |
| Column used in JOIN conditions | Columns that change frequently |
| Column used in ORDER BY | Columns with many NULL values |
| Column used in GROUP BY | Columns with few unique values |
| High SELECT, Low INSERT/UPDATE | Tables with heavy INSERT/UPDATE |

### Types of Indexes

| Type | Description |
|------|-------------|
| **Primary Index** | Automatically created on PRIMARY KEY |
| **Unique Index** | Enforces uniqueness |
| **Composite Index** | Index on multiple columns |
| **Full-Text Index** | For text searching |
| **Clustered** | Determines physical order of data (only 1 per table) |
| **Non-Clustered** | Separate structure pointing to data (multiple allowed) |

---

## 14. Practice Problems

### Problem 1: Employee Database Queries

```sql
-- Setup
CREATE TABLE emp (
    id INT PRIMARY KEY,
    name VARCHAR(50),
    dept VARCHAR(50),
    salary DECIMAL(10,2),
    manager_id INT,
    hire_date DATE
);

INSERT INTO emp VALUES
(1, 'Alice', 'IT', 75000, NULL, '2020-01-15'),
(2, 'Bob', 'HR', 55000, 1, '2021-03-20'),
(3, 'Charlie', 'IT', 80000, 1, '2019-06-10'),
(4, 'Diana', 'Finance', 65000, 3, '2022-09-05'),
(5, 'Eve', 'IT', 60000, 3, '2023-01-12'),
(6, 'Frank', 'HR', 50000, 2, '2023-07-22'),
(7, 'Grace', 'Finance', 72000, 4, '2020-11-30'),
(8, 'Henry', 'IT', 85000, 1, '2018-04-15');

-- Q1: Find the second highest salary
SELECT MAX(salary) AS second_highest
FROM emp 
WHERE salary < (SELECT MAX(salary) FROM emp);

-- Q2: Find employees earning more than department average
SELECT e.* FROM emp e
WHERE salary > (
    SELECT AVG(salary) FROM emp WHERE dept = e.dept
);

-- Q3: Find departments with total salary > 100000
SELECT dept, SUM(salary) AS total_salary
FROM emp
GROUP BY dept
HAVING SUM(salary) > 100000;

-- Q4: Find employees who joined in the last 3 years
SELECT * FROM emp
WHERE hire_date >= DATE_SUB(CURDATE(), INTERVAL 3 YEAR);

-- Q5: Rank employees by salary within each department
SELECT name, dept, salary,
    RANK() OVER (PARTITION BY dept ORDER BY salary DESC) AS salary_rank
FROM emp;

-- Q6: Find employees with no subordinates
SELECT * FROM emp e
WHERE NOT EXISTS (
    SELECT 1 FROM emp WHERE manager_id = e.id
);

-- Q7: Display department-wise employee count and average salary
SELECT dept,
       COUNT(*) AS emp_count,
       ROUND(AVG(salary), 2) AS avg_salary,
       GROUP_CONCAT(name ORDER BY name SEPARATOR ', ') AS employees
FROM emp
GROUP BY dept;

-- Q8: Find the Nth highest salary (e.g., 3rd highest)
SELECT DISTINCT salary FROM emp
ORDER BY salary DESC
LIMIT 1 OFFSET 2;  -- N-1 = 3-1 = 2

-- Alternative using subquery
SELECT salary FROM emp e1
WHERE 3 - 1 = (
    SELECT COUNT(DISTINCT salary) FROM emp e2
    WHERE e2.salary > e1.salary
);

-- Q9: Find duplicate salary values
SELECT salary, COUNT(*) AS count
FROM emp
GROUP BY salary
HAVING COUNT(*) > 1;

-- Q10: Find employees and their manager names
SELECT e.name AS employee, m.name AS manager
FROM emp e
LEFT JOIN emp m ON e.manager_id = m.id;
```

### Problem 2: E-Commerce Database

```sql
-- Setup
CREATE TABLE customers (
    customer_id INT PRIMARY KEY,
    name VARCHAR(100),
    city VARCHAR(50),
    email VARCHAR(100)
);

CREATE TABLE orders (
    order_id INT PRIMARY KEY,
    customer_id INT,
    order_date DATE,
    total_amount DECIMAL(10,2),
    FOREIGN KEY (customer_id) REFERENCES customers(customer_id)
);

CREATE TABLE products (
    product_id INT PRIMARY KEY,
    product_name VARCHAR(100),
    category VARCHAR(50),
    price DECIMAL(10,2)
);

CREATE TABLE order_items (
    order_id INT,
    product_id INT,
    quantity INT,
    PRIMARY KEY (order_id, product_id),
    FOREIGN KEY (order_id) REFERENCES orders(order_id),
    FOREIGN KEY (product_id) REFERENCES products(product_id)
);

-- Q1: Find customers who have placed more than 3 orders
SELECT c.name, COUNT(o.order_id) AS order_count
FROM customers c
JOIN orders o ON c.customer_id = o.customer_id
GROUP BY c.customer_id, c.name
HAVING COUNT(o.order_id) > 3;

-- Q2: Find the most ordered product
SELECT p.product_name, SUM(oi.quantity) AS total_ordered
FROM products p
JOIN order_items oi ON p.product_id = oi.product_id
GROUP BY p.product_id, p.product_name
ORDER BY total_ordered DESC
LIMIT 1;

-- Q3: Find customers who haven't placed any orders
SELECT c.* FROM customers c
LEFT JOIN orders o ON c.customer_id = o.customer_id
WHERE o.order_id IS NULL;

-- Q4: Monthly revenue report
SELECT DATE_FORMAT(order_date, '%Y-%m') AS month,
       COUNT(*) AS total_orders,
       SUM(total_amount) AS revenue
FROM orders
GROUP BY DATE_FORMAT(order_date, '%Y-%m')
ORDER BY month;

-- Q5: Find products that have never been ordered
SELECT p.* FROM products p
WHERE p.product_id NOT IN (
    SELECT DISTINCT product_id FROM order_items
);
```

### Problem 3: Window Functions (Advanced)

```sql
-- ROW_NUMBER - assign sequential number
SELECT name, dept, salary,
    ROW_NUMBER() OVER (ORDER BY salary DESC) AS row_num
FROM emp;

-- RANK - same rank for ties, skips next
SELECT name, dept, salary,
    RANK() OVER (ORDER BY salary DESC) AS salary_rank
FROM emp;

-- DENSE_RANK - same rank for ties, doesn't skip
SELECT name, dept, salary,
    DENSE_RANK() OVER (ORDER BY salary DESC) AS salary_rank
FROM emp;

-- ROW_NUMBER vs RANK vs DENSE_RANK
-- Salary: 85000, 80000, 75000, 75000, 65000
-- ROW_NUMBER: 1, 2, 3, 4, 5
-- RANK:       1, 2, 3, 3, 5  (skips 4)
-- DENSE_RANK: 1, 2, 3, 3, 4  (no skip)

-- PARTITION BY - window functions within groups
SELECT name, dept, salary,
    ROW_NUMBER() OVER (PARTITION BY dept ORDER BY salary DESC) AS rank_in_dept
FROM emp;

-- Running total
SELECT name, salary,
    SUM(salary) OVER (ORDER BY hire_date) AS running_total
FROM emp;

-- LAG / LEAD - access previous/next row
SELECT name, salary,
    LAG(salary, 1) OVER (ORDER BY salary) AS prev_salary,
    LEAD(salary, 1) OVER (ORDER BY salary) AS next_salary
FROM emp;
```

---

## 🔑 Quick Reference Cheat Sheet

### Most Common Query Patterns

```sql
-- Pattern 1: Find Nth highest/lowest
SELECT DISTINCT column FROM table ORDER BY column DESC LIMIT 1 OFFSET (N-1);

-- Pattern 2: Find duplicates
SELECT column, COUNT(*) FROM table GROUP BY column HAVING COUNT(*) > 1;

-- Pattern 3: Find max per group
SELECT * FROM table t1 WHERE column = (SELECT MAX(column) FROM table t2 WHERE t2.group = t1.group);

-- Pattern 4: Employees above department average
SELECT * FROM emp e WHERE salary > (SELECT AVG(salary) FROM emp WHERE dept = e.dept);

-- Pattern 5: Records with no match in another table
SELECT * FROM table1 LEFT JOIN table2 ON condition WHERE table2.id IS NULL;

-- Pattern 6: Count per category
SELECT category, COUNT(*) AS cnt FROM table GROUP BY category ORDER BY cnt DESC;
```

---

> 📌 **Practice Tip**: The SQL section typically gives you a schema and asks you to write queries. Practice writing queries by hand without running them - you need to be confident about syntax!
