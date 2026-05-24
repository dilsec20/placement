# 🌐 Web UI — Previous Year Questions (PYQs) | Cognizant GenC Cluster 1

> **Section:** Technical — Web UI (1 Task) | **Time:** ~25 mins  
> **Technologies:** HTML, CSS, JavaScript

---

## 📑 Table of Contents

1. [HTML PYQs](#1-html-pyqs)
2. [CSS PYQs](#2-css-pyqs)
3. [JavaScript PYQs](#3-javascript-pyqs)
4. [Full Task PYQs (HTML+CSS+JS Combined)](#4-full-task-pyqs)
5. [Quick Reference](#5-quick-reference)

---

## 1. HTML PYQs

### PYQ 1: What is the output?

```html
<p>Hello <strong>World</strong></p>
```

**Answer:** Hello **World** — `<strong>` makes text bold.

---

### PYQ 2: Form with Input Validation

**Q:** Create a form with Name, Email, Phone fields. Name and Email are required.

```html
<form id="myForm">
    <label for="name">Name:</label><br>
    <input type="text" id="name" name="name" required><br><br>
    
    <label for="email">Email:</label><br>
    <input type="email" id="email" name="email" required><br><br>
    
    <label for="phone">Phone:</label><br>
    <input type="tel" id="phone" name="phone" pattern="[0-9]{10}" 
           placeholder="10-digit number"><br><br>
    
    <button type="submit">Submit</button>
</form>
```

---

### PYQ 3: Semantic HTML Elements

**Q:** Which is the correct semantic structure?

```html
<!-- ✅ Correct Semantic HTML -->
<header>
    <nav>
        <ul>
            <li><a href="#">Home</a></li>
            <li><a href="#">About</a></li>
        </ul>
    </nav>
</header>
<main>
    <article>
        <h1>Main Article</h1>
        <p>Content here...</p>
    </article>
    <aside>
        <p>Sidebar content</p>
    </aside>
</main>
<footer>
    <p>&copy; 2025</p>
</footer>
```

**Key Semantic Elements:**
| Tag | Purpose |
|-----|---------|
| `<header>` | Top section/banner |
| `<nav>` | Navigation links |
| `<main>` | Main content (one per page) |
| `<article>` | Self-contained content |
| `<section>` | Thematic grouping |
| `<aside>` | Sidebar/related content |
| `<footer>` | Bottom section |

---

### PYQ 4: HTML Table

```html
<table border="1">
    <thead>
        <tr>
            <th>ID</th>
            <th>Name</th>
            <th>City</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>1</td>
            <td>Alice</td>
            <td>Mumbai</td>
        </tr>
        <tr>
            <td>2</td>
            <td>Bob</td>
            <td>Delhi</td>
        </tr>
    </tbody>
</table>
```

---

### PYQ 5: Block vs Inline Elements

| Block Elements | Inline Elements |
|---------------|-----------------|
| `<div>`, `<p>`, `<h1>`-`<h6>` | `<span>`, `<a>`, `<strong>` |
| `<ul>`, `<ol>`, `<li>` | `<em>`, `<img>`, `<input>` |
| `<table>`, `<form>`, `<section>` | `<label>`, `<br>`, `<code>` |
| Takes full width | Takes only needed width |
| Starts on new line | Stays in same line |

---

## 2. CSS PYQs

### PYQ 6: CSS Selectors

**Q:** Match the selector with what it selects:

```css
#id           /* Selects element with specific id */
.class        /* Selects elements with specific class */
element       /* Selects all elements of that tag */
div > p       /* Selects direct child <p> inside <div> */
div p         /* Selects ANY descendant <p> inside <div> */
div + p       /* Selects first <p> immediately after <div> */
div ~ p       /* Selects all sibling <p> after <div> */
a:hover       /* Pseudo-class: when mouse hovers */
p::first-line /* Pseudo-element: first line of <p> */
input[type="text"]  /* Attribute selector */
```

**Specificity Order:** `inline > #id > .class > element`

---

### PYQ 7: Box Model

**Q:** What is the total width of this element?

```css
.box {
    width: 200px;
    padding: 20px;
    border: 5px solid black;
    margin: 10px;
}
```

**Answer:**  
- Content width: 200px  
- + Padding: 20×2 = 40px  
- + Border: 5×2 = 10px  
- = **Total box width: 250px** (+ 20px margin on each side)

**With `box-sizing: border-box`** → Total width = 200px (padding & border included inside width)

---

### PYQ 8: Flexbox Layout

**Q:** Center a div both horizontally and vertically:

```css
.container {
    display: flex;
    justify-content: center;  /* Horizontal center */
    align-items: center;      /* Vertical center */
    height: 100vh;
}
```

**Flexbox Properties:**

| Property | Values | Purpose |
|----------|--------|---------|
| `display` | `flex` | Enable flexbox |
| `flex-direction` | `row`, `column`, `row-reverse`, `column-reverse` | Main axis |
| `justify-content` | `flex-start`, `center`, `flex-end`, `space-between`, `space-around`, `space-evenly` | Main axis alignment |
| `align-items` | `flex-start`, `center`, `flex-end`, `stretch`, `baseline` | Cross axis alignment |
| `flex-wrap` | `nowrap`, `wrap`, `wrap-reverse` | Wrapping |
| `gap` | `10px` | Space between items |

---

### PYQ 9: CSS Grid Layout

```css
.grid-container {
    display: grid;
    grid-template-columns: repeat(3, 1fr);  /* 3 equal columns */
    grid-template-rows: auto;
    gap: 10px;
}

.item-1 {
    grid-column: 1 / 3;  /* Spans columns 1-2 */
    grid-row: 1 / 2;
}
```

---

### PYQ 10: Responsive Design — Media Query

```css
/* Mobile first approach */
.container {
    width: 100%;
    padding: 10px;
}

/* Tablet */
@media (min-width: 768px) {
    .container { width: 750px; margin: 0 auto; }
}

/* Desktop */
@media (min-width: 1024px) {
    .container { width: 960px; }
}
```

---

### PYQ 11: Position Property

| Value | Behavior |
|-------|----------|
| `static` | Default, normal flow |
| `relative` | Relative to its normal position |
| `absolute` | Relative to nearest positioned ancestor |
| `fixed` | Relative to viewport (doesn't scroll) |
| `sticky` | Switches between relative and fixed |

```css
.parent { position: relative; }
.child  { position: absolute; top: 10px; right: 10px; }
```

---

## 3. JavaScript PYQs

### PYQ 12: Data Types

```javascript
console.log(typeof 42);          // "number"
console.log(typeof "hello");     // "string"
console.log(typeof true);        // "boolean"
console.log(typeof undefined);   // "undefined"
console.log(typeof null);        // "object" (⚠️ known bug)
console.log(typeof [1,2,3]);     // "object"
console.log(typeof {a: 1});      // "object"
console.log(typeof function(){}); // "function"
```

---

### PYQ 13: `var` vs `let` vs `const`

| Feature | `var` | `let` | `const` |
|---------|-------|-------|---------|
| Scope | Function | Block | Block |
| Hoisting | ✅ (undefined) | ✅ (not initialized) | ✅ (not initialized) |
| Re-declaration | ✅ | ❌ | ❌ |
| Re-assignment | ✅ | ✅ | ❌ |

```javascript
var x = 1;   // Function-scoped
let y = 2;   // Block-scoped
const z = 3; // Block-scoped, cannot reassign

if (true) {
    var a = 10;   // Accessible outside block
    let b = 20;   // NOT accessible outside block
}
console.log(a);  // 10
// console.log(b); // ❌ ReferenceError
```

---

### PYQ 14: Array Methods ⭐

```javascript
let arr = [3, 1, 4, 1, 5, 9, 2, 6];

// Mutating methods
arr.push(7);              // Add to end → [3,1,4,1,5,9,2,6,7]
arr.pop();                // Remove from end → returns 7
arr.unshift(0);           // Add to start → [0,3,1,4,1,5,9,2,6]
arr.shift();              // Remove from start → returns 0
arr.splice(2, 1);         // Remove 1 element at index 2
arr.sort((a,b) => a-b);   // Sort ascending
arr.reverse();             // Reverse

// Non-mutating methods
arr.map(x => x * 2);           // [2,8,2,10,18,4,12]
arr.filter(x => x > 3);        // [4,5,9,6]
arr.reduce((sum, x) => sum + x, 0);  // 31 (sum)
arr.find(x => x > 4);          // 5 (first match)
arr.findIndex(x => x > 4);     // 3 (index of first match)
arr.includes(5);                // true
arr.some(x => x > 8);          // true (at least one)
arr.every(x => x > 0);         // true (all)
arr.slice(1, 4);                // [1,4,1] (from index 1 to 3)
arr.join(', ');                 // "3, 1, 4, 1, 5, 9, 2, 6"
[...new Set(arr)];              // Remove duplicates
```

---

### PYQ 15: DOM Manipulation ⭐⭐

```javascript
// Selecting elements
document.getElementById('myId');
document.querySelector('.myClass');
document.querySelectorAll('div');
document.getElementsByClassName('myClass');
document.getElementsByTagName('p');

// Modifying content
element.innerHTML = '<strong>Bold</strong>';  // HTML content
element.textContent = 'Plain text';            // Text only
element.value = 'input value';                 // Form inputs

// Modifying styles
element.style.color = 'red';
element.style.backgroundColor = '#333';
element.style.display = 'none';

// Modifying classes
element.classList.add('active');
element.classList.remove('active');
element.classList.toggle('active');
element.classList.contains('active');

// Creating elements
let div = document.createElement('div');
div.textContent = 'New element';
document.body.appendChild(div);

// Events
element.addEventListener('click', function(e) {
    console.log('Clicked!', e.target);
});
```

---

### PYQ 16: Event Handling

```html
<button id="btn">Click Me</button>
<p id="output"></p>

<script>
    // Method 1: addEventListener (recommended)
    document.getElementById('btn').addEventListener('click', function() {
        document.getElementById('output').textContent = 'Button clicked!';
    });
    
    // Method 2: Inline (not recommended)
    // <button onclick="alert('clicked')">Click</button>
</script>
```

**Common Events:**
| Event | Trigger |
|-------|---------|
| `click` | Mouse click |
| `dblclick` | Double click |
| `mouseover` / `mouseout` | Hover in/out |
| `keydown` / `keyup` | Key press/release |
| `change` | Input value changed |
| `submit` | Form submitted |
| `load` | Page fully loaded |
| `input` | Input value changing (real-time) |

---

### PYQ 17: Closures

```javascript
function counter() {
    let count = 0;
    return function() {
        count++;
        return count;
    };
}

let increment = counter();
console.log(increment());  // 1
console.log(increment());  // 2
console.log(increment());  // 3
```

> A **closure** is a function that retains access to its outer scope's variables even after the outer function has finished executing.

---

### PYQ 18: `==` vs `===`

```javascript
console.log(5 == '5');     // true  (type coercion)
console.log(5 === '5');    // false (strict comparison)
console.log(null == undefined);  // true
console.log(null === undefined); // false
console.log(0 == false);   // true
console.log(0 === false);  // false
console.log('' == false);  // true
console.log('' === false); // false
```

> **Always use `===`** (strict equality) in your code to avoid unexpected coercion bugs.

---

### PYQ 19: Promises & Async/Await (Conceptual)

```javascript
// Promise
function fetchData() {
    return new Promise((resolve, reject) => {
        setTimeout(() => resolve('Data loaded'), 2000);
    });
}

fetchData().then(data => console.log(data))
           .catch(err => console.error(err));

// Async/Await
async function getData() {
    try {
        let data = await fetchData();
        console.log(data);
    } catch (err) {
        console.error(err);
    }
}
```

---

## 4. Full Task PYQs (HTML+CSS+JS Combined)

### PYQ 20: Registration Form with Validation ⭐⭐

```html
<!DOCTYPE html>
<html>
<head>
    <style>
        body { font-family: Arial; padding: 30px; background: #f5f5f5; }
        .form-container { max-width: 400px; margin: auto; background: white; padding: 30px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
        h2 { text-align: center; color: #333; }
        .form-group { margin-bottom: 15px; }
        label { display: block; margin-bottom: 5px; font-weight: bold; color: #555; }
        input, select { width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 4px; box-sizing: border-box; }
        input:focus { border-color: #007bff; outline: none; }
        .btn { width: 100%; padding: 12px; background: #007bff; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 16px; }
        .btn:hover { background: #0056b3; }
        .error { color: red; font-size: 12px; margin-top: 5px; }
        .success { color: green; text-align: center; margin-top: 10px; }
    </style>
</head>
<body>
    <div class="form-container">
        <h2>Registration Form</h2>
        <form id="regForm">
            <div class="form-group">
                <label for="name">Full Name *</label>
                <input type="text" id="name" placeholder="Enter your name">
                <div class="error" id="nameError"></div>
            </div>
            <div class="form-group">
                <label for="email">Email *</label>
                <input type="email" id="email" placeholder="Enter your email">
                <div class="error" id="emailError"></div>
            </div>
            <div class="form-group">
                <label for="password">Password *</label>
                <input type="password" id="password" placeholder="Min 6 characters">
                <div class="error" id="passError"></div>
            </div>
            <div class="form-group">
                <label for="phone">Phone</label>
                <input type="tel" id="phone" placeholder="10-digit number">
                <div class="error" id="phoneError"></div>
            </div>
            <button type="submit" class="btn">Register</button>
            <div class="success" id="successMsg"></div>
        </form>
    </div>

    <script>
        document.getElementById('regForm').addEventListener('submit', function(e) {
            e.preventDefault();
            let valid = true;
            
            // Clear errors
            document.querySelectorAll('.error').forEach(el => el.textContent = '');
            document.getElementById('successMsg').textContent = '';
            
            // Name validation
            let name = document.getElementById('name').value.trim();
            if (name === '') {
                document.getElementById('nameError').textContent = 'Name is required';
                valid = false;
            }
            
            // Email validation
            let email = document.getElementById('email').value.trim();
            let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                document.getElementById('emailError').textContent = 'Enter a valid email';
                valid = false;
            }
            
            // Password validation
            let password = document.getElementById('password').value;
            if (password.length < 6) {
                document.getElementById('passError').textContent = 'Min 6 characters required';
                valid = false;
            }
            
            // Phone validation (optional but if entered must be valid)
            let phone = document.getElementById('phone').value.trim();
            if (phone !== '' && !/^[0-9]{10}$/.test(phone)) {
                document.getElementById('phoneError').textContent = 'Enter valid 10-digit number';
                valid = false;
            }
            
            if (valid) {
                document.getElementById('successMsg').textContent = 
                    'Registration Successful! Welcome, ' + name;
            }
        });
    </script>
</body>
</html>
```

---

### PYQ 21: Dynamic Color Changer

```html
<!DOCTYPE html>
<html>
<head>
    <style>
        .color-box { width: 200px; height: 200px; background: #3498db; margin: 20px auto; border-radius: 12px; transition: all 0.3s ease; display: flex; align-items: center; justify-content: center; color: white; font-size: 18px; }
        .btn-group { text-align: center; }
        button { padding: 10px 20px; margin: 5px; cursor: pointer; border: none; border-radius: 4px; color: white; font-size: 14px; }
        .red { background: #e74c3c; }
        .green { background: #2ecc71; }
        .blue { background: #3498db; }
        .random { background: #9b59b6; }
    </style>
</head>
<body>
    <div class="color-box" id="box">Click a button</div>
    <div class="btn-group">
        <button class="red" onclick="changeColor('#e74c3c')">Red</button>
        <button class="green" onclick="changeColor('#2ecc71')">Green</button>
        <button class="blue" onclick="changeColor('#3498db')">Blue</button>
        <button class="random" onclick="randomColor()">Random</button>
    </div>

    <script>
        function changeColor(color) {
            document.getElementById('box').style.background = color;
            document.getElementById('box').textContent = color;
        }
        function randomColor() {
            let color = '#' + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0');
            changeColor(color);
        }
    </script>
</body>
</html>
```

---

### PYQ 22: Employee Table with Add/Delete ⭐

```html
<!DOCTYPE html>
<html>
<head>
    <style>
        table { border-collapse: collapse; width: 100%; max-width: 600px; margin: 20px auto; }
        th, td { border: 1px solid #ddd; padding: 10px; text-align: left; }
        th { background: #007bff; color: white; }
        tr:nth-child(even) { background: #f2f2f2; }
        tr:hover { background: #e9e9e9; }
        .delete-btn { background: #e74c3c; color: white; border: none; padding: 5px 10px; cursor: pointer; border-radius: 3px; }
        .add-form { max-width: 600px; margin: 10px auto; }
        .add-form input { padding: 8px; margin: 5px; }
        .add-form button { padding: 8px 15px; background: #28a745; color: white; border: none; cursor: pointer; border-radius: 3px; }
    </style>
</head>
<body>
    <div class="add-form">
        <input type="text" id="empName" placeholder="Name">
        <input type="text" id="empDept" placeholder="Department">
        <input type="number" id="empSalary" placeholder="Salary">
        <button onclick="addEmployee()">Add Employee</button>
    </div>

    <table id="empTable">
        <thead>
            <tr><th>ID</th><th>Name</th><th>Department</th><th>Salary</th><th>Action</th></tr>
        </thead>
        <tbody>
            <tr><td>1</td><td>Alice</td><td>Engineering</td><td>85000</td>
                <td><button class="delete-btn" onclick="deleteRow(this)">Delete</button></td></tr>
            <tr><td>2</td><td>Bob</td><td>Marketing</td><td>72000</td>
                <td><button class="delete-btn" onclick="deleteRow(this)">Delete</button></td></tr>
        </tbody>
    </table>

    <script>
        let nextId = 3;
        
        function addEmployee() {
            let name = document.getElementById('empName').value;
            let dept = document.getElementById('empDept').value;
            let salary = document.getElementById('empSalary').value;
            
            if (!name || !dept || !salary) { alert('Fill all fields'); return; }
            
            let tbody = document.querySelector('#empTable tbody');
            let row = tbody.insertRow();
            row.innerHTML = '<td>' + nextId++ + '</td><td>' + name + '</td><td>' + dept + 
                '</td><td>' + salary + '</td><td><button class="delete-btn" onclick="deleteRow(this)">Delete</button></td>';
            
            document.getElementById('empName').value = '';
            document.getElementById('empDept').value = '';
            document.getElementById('empSalary').value = '';
        }
        
        function deleteRow(btn) {
            btn.closest('tr').remove();
        }
    </script>
</body>
</html>
```

---

### PYQ 23: To-Do List ⭐

```html
<!DOCTYPE html>
<html>
<head>
    <style>
        .todo-container { max-width: 400px; margin: 30px auto; font-family: Arial; }
        .input-group { display: flex; gap: 10px; margin-bottom: 15px; }
        .input-group input { flex: 1; padding: 10px; border: 1px solid #ddd; border-radius: 4px; }
        .input-group button { padding: 10px 15px; background: #28a745; color: white; border: none; border-radius: 4px; cursor: pointer; }
        .todo-item { display: flex; align-items: center; padding: 10px; border-bottom: 1px solid #eee; }
        .todo-item.done span { text-decoration: line-through; color: #999; }
        .todo-item span { flex: 1; }
        .todo-item button { background: #dc3545; color: white; border: none; padding: 5px 10px; margin-left: 5px; cursor: pointer; border-radius: 3px; }
        .todo-item input[type="checkbox"] { margin-right: 10px; }
    </style>
</head>
<body>
    <div class="todo-container">
        <h2>To-Do List</h2>
        <div class="input-group">
            <input type="text" id="todoInput" placeholder="Add a task...">
            <button onclick="addTodo()">Add</button>
        </div>
        <div id="todoList"></div>
    </div>

    <script>
        function addTodo() {
            let input = document.getElementById('todoInput');
            let text = input.value.trim();
            if (!text) return;
            
            let div = document.createElement('div');
            div.className = 'todo-item';
            div.innerHTML = '<input type="checkbox" onchange="toggleDone(this)">' +
                '<span>' + text + '</span>' +
                '<button onclick="this.parentElement.remove()">Delete</button>';
            
            document.getElementById('todoList').appendChild(div);
            input.value = '';
        }
        
        function toggleDone(checkbox) {
            checkbox.parentElement.classList.toggle('done');
        }
        
        document.getElementById('todoInput').addEventListener('keypress', function(e) {
            if (e.key === 'Enter') addTodo();
        });
    </script>
</body>
</html>
```

---

## 5. Quick Reference

### HTML Input Types
```html
<input type="text">       <!-- Plain text -->
<input type="email">      <!-- Email with validation -->
<input type="password">   <!-- Hidden characters -->
<input type="number">     <!-- Numbers only -->
<input type="tel">        <!-- Phone number -->
<input type="date">       <!-- Date picker -->
<input type="checkbox">   <!-- Checkbox -->
<input type="radio">      <!-- Radio button -->
<input type="file">       <!-- File upload -->
<input type="submit">     <!-- Submit button -->
<input type="hidden">     <!-- Hidden field -->
<textarea></textarea>     <!-- Multi-line text -->
<select><option></option></select> <!-- Dropdown -->
```

### CSS Display Values
```css
display: block;        /* Full width, new line */
display: inline;       /* Same line, no width/height */
display: inline-block; /* Same line, respects width/height */
display: flex;         /* Flexbox container */
display: grid;         /* Grid container */
display: none;         /* Hidden */
```

### JS String Methods
```javascript
str.length              // Length
str.charAt(0)           // Character at index
str.indexOf('hello')    // First occurrence index
str.includes('hello')   // Contains check (boolean)
str.slice(1, 5)         // Substring
str.split(' ')          // Split into array
str.trim()              // Remove whitespace
str.toUpperCase()       // UPPERCASE
str.toLowerCase()       // lowercase
str.replace('a', 'b')   // Replace first
str.replaceAll('a','b') // Replace all
str.startsWith('He')    // Starts with check
str.endsWith('ld')      // Ends with check
```

---

> **← Back to** [Cognizant Main](../README.md) | [Web UI Concepts](./README.md)
