# ⚡ JavaScript — Complete Study Guide

> **Module 1 | Digital Nurture 5.0 — Java FSE Upskilling**

---

## 📋 Topics Covered

1. [Introduction to JavaScript](#1-introduction-to-javascript)
2. [JavaScript Basics](#2-javascript-basics)
3. [Control Flow](#3-control-flow)
4. [Functions and Scope](#4-functions-and-scope)
5. [Objects and the DOM](#5-objects-and-the-dom)
6. [Arrays and Array Methods](#6-arrays-and-array-methods)
7. [Asynchronous JavaScript](#7-asynchronous-javascript)
8. [ES6+ Features](#8-es6-features)
9. [JavaScript in Web Development](#9-javascript-in-web-development)
10. [Debugging and Testing](#10-debugging-and-testing)
11. [Frameworks and Libraries](#11-frameworks-and-libraries)
12. [Practice Questions](#12-practice-questions)

---

## 1. Introduction to JavaScript

### 📌 What is JavaScript?

**JavaScript (JS)** is a lightweight, interpreted programming language used to make web pages interactive. It runs in the browser (client-side) and can also run on servers (Node.js).

| Feature | Description |
|---------|-------------|
| **Type** | Interpreted, dynamically typed |
| **Paradigm** | Multi-paradigm (OOP, Functional, Event-driven) |
| **Runs in** | Browser (V8, SpiderMonkey) and Server (Node.js) |
| **Purpose** | DOM manipulation, API calls, animations, form validation |

### Setting Up JavaScript Development Environment

```html
<!-- Method 1: Inline JavaScript -->
<script>
    console.log("Hello from inline JS!");
</script>

<!-- Method 2: External JavaScript File (recommended) -->
<script src="script.js"></script>

<!-- Method 3: With defer (loads async, runs after HTML) -->
<script src="script.js" defer></script>
```

### Using Browser Console
- Open: `F12` → Console tab
- Type JavaScript directly to test: `console.log("test")`

---

## 2. JavaScript Basics

### Syntax and Statements

```javascript
// Statements end with semicolon (optional but recommended)
let x = 10;
let y = 20;
let sum = x + y;
console.log(sum);    // 30

// Case-sensitive
let myVariable = "Hello";
let myvariable = "World";  // Different variable!

// Strict mode (catches common mistakes)
"use strict";
```

### Data Types

```javascript
// ===== PRIMITIVE TYPES (7) =====
let str = "Hello";            // String
let num = 42;                 // Number
let decimal = 3.14;           // Number (no separate float)
let big = 9007199254740991n;  // BigInt
let bool = true;              // Boolean
let nothing = null;           // Null (intentional empty)
let undef = undefined;        // Undefined (not assigned)
let sym = Symbol("id");       // Symbol (unique identifier)

// ===== REFERENCE TYPES =====
let arr = [1, 2, 3];                // Array
let obj = { name: "Dilip", age: 22 }; // Object
let func = function() {};            // Function
let date = new Date();               // Date
let regex = /pattern/;               // RegExp

// ===== typeof operator =====
typeof "Hello"       // "string"
typeof 42            // "number"
typeof true          // "boolean"
typeof undefined     // "undefined"
typeof null          // "object" (known JS quirk!)
typeof [1, 2]        // "object"
typeof { a: 1 }      // "object"
typeof function(){}  // "function"
```

### Variables — var vs let vs const

```javascript
// var — function scoped, hoisted, can be redeclared
var name = "Dilip";
var name = "Updated";  // OK

// let — block scoped, not redeclared, can reassign
let age = 22;
age = 23;              // OK
// let age = 25;       // ERROR: already declared

// const — block scoped, not redeclared, not reassigned
const PI = 3.14159;
// PI = 3;             // ERROR: Assignment to constant

// BUT: const objects/arrays can be modified
const person = { name: "Dilip" };
person.name = "Updated";   // OK (modifying property)
// person = {};            // ERROR (reassigning entire object)

const arr = [1, 2, 3];
arr.push(4);               // OK [1, 2, 3, 4]
// arr = [5, 6];           // ERROR
```

| Feature | `var` | `let` | `const` |
|---------|-------|-------|---------|
| Scope | Function | Block | Block |
| Redeclare | ✅ | ❌ | ❌ |
| Reassign | ✅ | ✅ | ❌ |
| Hoisting | ✅ (undefined) | ✅ (TDZ error) | ✅ (TDZ error) |
| Best for | Avoid using | Variables that change | Constants, objects |

### Operators

```javascript
// ===== ARITHMETIC =====
10 + 3     // 13  (Addition)
10 - 3     // 7   (Subtraction)
10 * 3     // 30  (Multiplication)
10 / 3     // 3.333... (Division)
10 % 3     // 1   (Modulus / Remainder)
2 ** 3     // 8   (Exponentiation)
let x = 5; x++;  // 6 (Post-increment)
let y = 5; ++y;  // 6 (Pre-increment)

// ===== COMPARISON =====
5 == "5"     // true  (loose equality — type coercion)
5 === "5"    // false (strict equality — no coercion) ⭐ USE THIS
5 != "5"     // false (loose inequality)
5 !== "5"    // true  (strict inequality)
5 > 3        // true
5 >= 5       // true

// ===== LOGICAL =====
true && false    // false (AND — both must be true)
true || false    // true  (OR — at least one true)
!true            // false (NOT — reverses)

// ===== ASSIGNMENT =====
let a = 10;
a += 5;     // a = 15
a -= 3;     // a = 12
a *= 2;     // a = 24
a /= 4;     // a = 6
a %= 4;     // a = 2
a **= 3;    // a = 8

// ===== TERNARY =====
let result = (age >= 18) ? "Adult" : "Minor";

// ===== NULLISH COALESCING (??) =====
let val = null ?? "default";    // "default"
let val2 = 0 ?? "default";     // 0 (only null/undefined trigger)

// ===== OPTIONAL CHAINING (?.) =====
let user = { address: { city: "Mumbai" } };
user?.address?.city       // "Mumbai"
user?.phone?.number       // undefined (no error)
```

### Type Conversion

```javascript
// ===== String Conversion =====
String(123)        // "123"
String(true)       // "true"
String(null)       // "null"
(123).toString()   // "123"

// ===== Number Conversion =====
Number("123")      // 123
Number("abc")      // NaN (Not a Number)
Number(true)       // 1
Number(false)      // 0
Number(null)       // 0
Number(undefined)  // NaN
parseInt("42px")   // 42  (parses until non-digit)
parseFloat("3.14") // 3.14

// ===== Boolean Conversion =====
// Falsy values (convert to false):
Boolean(0)           // false
Boolean("")          // false
Boolean(null)        // false
Boolean(undefined)   // false
Boolean(NaN)         // false

// Everything else is truthy:
Boolean(1)           // true
Boolean("hello")     // true
Boolean([])          // true (empty array is truthy!)
Boolean({})          // true (empty object is truthy!)
```

---

## 3. Control Flow

### Conditional Statements

```javascript
// ===== IF / ELSE IF / ELSE =====
let score = 85;

if (score >= 90) {
    console.log("Grade: A");
} else if (score >= 80) {
    console.log("Grade: B");
} else if (score >= 70) {
    console.log("Grade: C");
} else {
    console.log("Grade: F");
}

// ===== SWITCH =====
let day = "Mon";

switch (day) {
    case "Mon": case "Tue": case "Wed": case "Thu": case "Fri":
        console.log("Weekday");
        break;
    case "Sat": case "Sun":
        console.log("Weekend");
        break;
    default:
        console.log("Invalid");
}
```

### Loops

```javascript
// ===== FOR LOOP =====
for (let i = 0; i < 5; i++) {
    console.log(i);  // 0, 1, 2, 3, 4
}

// ===== WHILE LOOP =====
let i = 0;
while (i < 5) {
    console.log(i);
    i++;
}

// ===== DO-WHILE (executes at least once) =====
let j = 10;
do {
    console.log(j);  // Prints 10 even though condition is false
    j++;
} while (j < 5);

// ===== FOR...OF (iterate over values — arrays, strings) =====
for (let item of [10, 20, 30]) {
    console.log(item);  // 10, 20, 30
}

for (let char of "Hello") {
    console.log(char);  // H, e, l, l, o
}

// ===== FOR...IN (iterate over keys — objects) =====
let person = { name: "Dilip", age: 22 };
for (let key in person) {
    console.log(key + ": " + person[key]);
    // name: Dilip
    // age: 22
}

// ===== BREAK & CONTINUE =====
for (let i = 1; i <= 10; i++) {
    if (i === 5) break;       // Exit loop at 5
    console.log(i);           // 1, 2, 3, 4
}

for (let i = 1; i <= 10; i++) {
    if (i % 2 === 0) continue; // Skip even numbers
    console.log(i);             // 1, 3, 5, 7, 9
}
```

### Error Handling

```javascript
// ===== TRY / CATCH / FINALLY =====
try {
    let result = riskyFunction();
    console.log(result);
} catch (error) {
    console.error("Error:", error.message);
    console.error("Stack:", error.stack);
} finally {
    console.log("This always runs");
}

// ===== THROW custom errors =====
function divide(a, b) {
    if (b === 0) {
        throw new Error("Cannot divide by zero!");
    }
    return a / b;
}

try {
    divide(10, 0);
} catch (e) {
    console.log(e.message);  // "Cannot divide by zero!"
}

// ===== Error Types =====
// TypeError      — wrong type operation
// ReferenceError — using undeclared variable
// SyntaxError    — invalid syntax
// RangeError     — number out of range
// URIError       — invalid URI
```

---

## 4. Functions and Scope

### Function Basics

```javascript
// ===== FUNCTION DECLARATION (hoisted) =====
function greet(name) {
    return "Hello, " + name + "!";
}
greet("Dilip");  // "Hello, Dilip!"

// ===== FUNCTION EXPRESSION (not hoisted) =====
const greet2 = function(name) {
    return "Hello, " + name + "!";
};

// ===== ARROW FUNCTION (ES6) =====
const greet3 = (name) => "Hello, " + name + "!";
const square = x => x * x;          // Single param, no parens
const add = (a, b) => a + b;        // Multiple params
const doStuff = () => {              // Multi-line body
    let result = 42;
    return result;
};

// ===== DEFAULT PARAMETERS =====
function greet4(name = "Guest") {
    return "Hello, " + name;
}
greet4();        // "Hello, Guest"
greet4("Dilip"); // "Hello, Dilip"

// ===== REST PARAMETERS (...) =====
function sum(...numbers) {
    return numbers.reduce((total, n) => total + n, 0);
}
sum(1, 2, 3, 4);  // 10

// ===== IIFE (Immediately Invoked Function Expression) =====
(function() {
    console.log("Runs immediately!");
})();
```

### Scope and Closures

```javascript
// ===== GLOBAL SCOPE =====
let globalVar = "I'm global";

// ===== FUNCTION SCOPE =====
function myFunc() {
    let funcVar = "I'm function-scoped";
    console.log(globalVar);   // ✅ Accessible
}
// console.log(funcVar);      // ❌ ReferenceError

// ===== BLOCK SCOPE (let/const) =====
if (true) {
    let blockVar = "I'm block-scoped";
    var notBlockScoped = "I leak out!";
}
// console.log(blockVar);        // ❌ ReferenceError
console.log(notBlockScoped);     // ✅ "I leak out!"

// ===== CLOSURES =====
// A closure is a function that remembers variables from its outer scope,
// even after the outer function has returned.

function createCounter() {
    let count = 0;  // This variable is "closed over"
    return {
        increment: function() { count++; return count; },
        decrement: function() { count--; return count; },
        getCount: function() { return count; }
    };
}

const counter = createCounter();
counter.increment();  // 1
counter.increment();  // 2
counter.decrement();  // 1
counter.getCount();   // 1

// Practical use: data privacy, factory functions, callbacks
```

### Higher-Order Functions

```javascript
// A higher-order function either:
// 1. Takes a function as an argument, OR
// 2. Returns a function

// ===== Example: Takes function as argument =====
function calculate(a, b, operation) {
    return operation(a, b);
}
calculate(10, 5, (a, b) => a + b);   // 15
calculate(10, 5, (a, b) => a * b);   // 50

// ===== Example: Returns a function =====
function multiplier(factor) {
    return function(number) {
        return number * factor;
    };
}
const double = multiplier(2);
const triple = multiplier(3);
double(5);   // 10
triple(5);   // 15

// ===== Built-in Higher-Order Functions =====
const numbers = [1, 2, 3, 4, 5];

numbers.map(n => n * 2);           // [2, 4, 6, 8, 10]
numbers.filter(n => n > 3);        // [4, 5]
numbers.reduce((sum, n) => sum + n, 0);  // 15
numbers.forEach(n => console.log(n));     // Prints each
numbers.find(n => n > 3);          // 4 (first match)
numbers.every(n => n > 0);         // true (all pass)
numbers.some(n => n > 4);          // true (at least one passes)
```

---

## 5. Objects and the DOM

### Objects in JavaScript

```javascript
// ===== OBJECT CREATION =====
// Object literal
const person = {
    name: "Dilip",
    age: 22,
    skills: ["Java", "JavaScript"],
    address: {
        city: "Mumbai",
        state: "Maharashtra"
    },
    greet: function() {
        return "Hi, I'm " + this.name;
    },
    // Shorthand method (ES6)
    sayAge() {
        return "I'm " + this.age + " years old";
    }
};

// Accessing properties
person.name;              // "Dilip" (dot notation)
person["age"];            // 22 (bracket notation)
person.address.city;      // "Mumbai" (nested)
person.greet();           // "Hi, I'm Dilip"

// Adding/modifying properties
person.email = "dilip@email.com";
person.age = 23;

// Deleting properties
delete person.email;

// Check if property exists
"name" in person;              // true
person.hasOwnProperty("age");  // true

// Object methods
Object.keys(person);           // ["name", "age", "skills", ...]
Object.values(person);         // ["Dilip", 22, [...], ...]
Object.entries(person);        // [["name","Dilip"], ["age",22], ...]
Object.assign({}, person);     // Shallow copy
```

### JavaScript Prototypes

```javascript
// Every JS object has a prototype (object it inherits from)
function Animal(name) {
    this.name = name;
}

// Adding method to prototype (shared across all instances)
Animal.prototype.speak = function() {
    return this.name + " makes a sound";
};

const dog = new Animal("Buddy");
dog.speak();  // "Buddy makes a sound"

// ES6 Class syntax (syntactic sugar over prototypes)
class Person {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }

    greet() {
        return `Hello, I'm ${this.name}`;
    }

    static create(name, age) {
        return new Person(name, age);
    }
}

const p = new Person("Dilip", 22);
p.greet();  // "Hello, I'm Dilip"

// Inheritance
class Student extends Person {
    constructor(name, age, grade) {
        super(name, age);
        this.grade = grade;
    }

    study() {
        return `${this.name} is studying`;
    }
}
```

### The DOM (Document Object Model)

```javascript
// ===== SELECTING ELEMENTS =====
document.getElementById("myId");              // By ID (single)
document.getElementsByClassName("myClass");    // By class (HTMLCollection)
document.getElementsByTagName("p");            // By tag (HTMLCollection)
document.querySelector(".card");               // First match (CSS selector)
document.querySelectorAll(".card");            // All matches (NodeList)

// ===== MODIFYING CONTENT =====
let el = document.getElementById("title");
el.textContent = "New Text";           // Set text (no HTML parsing)
el.innerHTML = "<b>Bold Text</b>";     // Set HTML content
el.innerText = "Visible text only";    // Set visible text

// ===== MODIFYING ATTRIBUTES =====
el.setAttribute("class", "highlight");
el.getAttribute("class");              // "highlight"
el.removeAttribute("class");
el.id = "newId";
el.className = "card active";
el.classList.add("new-class");
el.classList.remove("old-class");
el.classList.toggle("dark-mode");
el.classList.contains("active");       // true/false

// ===== MODIFYING STYLES =====
el.style.color = "red";
el.style.backgroundColor = "#333";
el.style.fontSize = "18px";
el.style.display = "none";

// ===== CREATING ELEMENTS =====
let newDiv = document.createElement("div");
newDiv.textContent = "New Element";
newDiv.className = "card";
document.body.appendChild(newDiv);

// Insert before specific element
let parent = document.getElementById("container");
let reference = document.getElementById("existingChild");
parent.insertBefore(newDiv, reference);

// ===== REMOVING ELEMENTS =====
let child = document.getElementById("toRemove");
child.parentElement.removeChild(child);
// OR modern:
child.remove();
```

### Event Handling

```javascript
// ===== addEventListener (recommended) =====
let btn = document.getElementById("myBtn");

btn.addEventListener("click", function(event) {
    console.log("Button clicked!");
    console.log("Target:", event.target);
    console.log("Type:", event.type);
});

// ===== Common Events =====
// click, dblclick, mouseenter, mouseleave
// keydown, keyup, keypress
// submit, change, input, focus, blur
// load, DOMContentLoaded, scroll, resize

// ===== Event Object Properties =====
document.addEventListener("click", function(e) {
    e.target;          // Element that was clicked
    e.type;            // "click"
    e.clientX;         // Mouse X position
    e.clientY;         // Mouse Y position
    e.preventDefault();    // Prevent default action
    e.stopPropagation();   // Stop event bubbling
});

// ===== Event Delegation =====
// Instead of adding listeners to each child, add ONE to the parent
document.getElementById("list").addEventListener("click", function(e) {
    if (e.target.tagName === "LI") {
        console.log("Clicked:", e.target.textContent);
    }
});

// ===== DOMContentLoaded vs Load =====
document.addEventListener("DOMContentLoaded", function() {
    // Fires when HTML is parsed (before images/CSS finish loading)
    console.log("DOM ready!");
});

window.addEventListener("load", function() {
    // Fires when EVERYTHING is loaded (images, CSS, etc.)
    console.log("Page fully loaded!");
});
```

---

## 6. Arrays and Array Methods

### Array Basics

```javascript
// Creating arrays
let arr1 = [1, 2, 3, 4, 5];
let arr2 = new Array(5);              // [empty × 5]
let arr3 = Array.from("Hello");       // ["H", "e", "l", "l", "o"]
let arr4 = Array.of(1, 2, 3);        // [1, 2, 3]

// Accessing elements
arr1[0];       // 1 (first)
arr1[arr1.length - 1];  // 5 (last)

// Check if array
Array.isArray(arr1);    // true
Array.isArray("Hello"); // false
```

### Array Methods

```javascript
const arr = [1, 2, 3, 4, 5];

// ===== MUTATING METHODS (modify original array) =====
arr.push(6);              // Add to end → [1,2,3,4,5,6]
arr.pop();                // Remove from end → [1,2,3,4,5]
arr.unshift(0);           // Add to beginning → [0,1,2,3,4,5]
arr.shift();              // Remove from beginning → [1,2,3,4,5]
arr.splice(2, 1);         // Remove 1 at index 2 → [1,2,4,5]
arr.splice(2, 0, 3);      // Insert 3 at index 2 → [1,2,3,4,5]
arr.splice(1, 2, 10, 20); // Replace 2 items at index 1 → [1,10,20,4,5]
arr.reverse();            // Reverse in place
arr.sort();               // Sort (alphabetically by default)
arr.sort((a, b) => a - b);  // Sort numerically ascending
arr.sort((a, b) => b - a);  // Sort numerically descending
arr.fill(0);              // Fill all with 0

// ===== NON-MUTATING METHODS (return new array) =====
arr.concat([6, 7]);       // [1,2,3,4,5,6,7]
arr.slice(1, 3);          // [2, 3] (from index 1 to 3, exclusive)
arr.join(", ");           // "1, 2, 3, 4, 5"
arr.includes(3);          // true
arr.indexOf(3);           // 2
arr.lastIndexOf(3);       // 2
arr.flat();               // Flatten nested arrays
arr.flat(2);              // Flatten 2 levels deep

// ===== ITERATION / FUNCTIONAL METHODS =====

// forEach — execute function for each element (no return)
arr.forEach((item, index) => {
    console.log(index + ": " + item);
});

// map — transform each element, return NEW array
const doubled = arr.map(n => n * 2);          // [2, 4, 6, 8, 10]

// filter — keep elements that pass test, return NEW array
const evens = arr.filter(n => n % 2 === 0);   // [2, 4]

// reduce — accumulate to single value
const sum = arr.reduce((acc, n) => acc + n, 0);  // 15

// find — first element that passes test
const found = arr.find(n => n > 3);           // 4

// findIndex — index of first element that passes test
const idx = arr.findIndex(n => n > 3);        // 3

// every — ALL elements pass test?
arr.every(n => n > 0);     // true

// some — ANY element passes test?
arr.some(n => n > 4);      // true
```

### Chaining Array Methods

```javascript
const students = [
    { name: "Alice", score: 92 },
    { name: "Bob", score: 78 },
    { name: "Charlie", score: 85 },
    { name: "Diana", score: 95 },
    { name: "Eve", score: 68 }
];

// Get names of students who scored 80+ sorted by score
const topStudents = students
    .filter(s => s.score >= 80)
    .sort((a, b) => b.score - a.score)
    .map(s => s.name);
// ["Diana", "Alice", "Charlie"]

// Calculate average score
const avgScore = students
    .map(s => s.score)
    .reduce((sum, score, _, arr) => sum + score / arr.length, 0);
// 83.6
```

---

## 7. Asynchronous JavaScript

### 📌 Understanding Asynchronous Programming

JavaScript is **single-threaded** — it executes one task at a time. Async programming allows long-running tasks (API calls, file reads, timers) to run without blocking the main thread.

```javascript
// Synchronous (blocking)
console.log("1");
console.log("2");
console.log("3");
// Output: 1, 2, 3

// Asynchronous (non-blocking)
console.log("1");
setTimeout(() => console.log("2"), 1000);  // Runs after 1 second
console.log("3");
// Output: 1, 3, 2
```

### Callbacks

```javascript
// A callback is a function passed as an argument to another function
function fetchData(callback) {
    setTimeout(() => {
        const data = { name: "Dilip", role: "Developer" };
        callback(data);
    }, 2000);
}

fetchData(function(data) {
    console.log("Received:", data);
});
```

### Callback Hell (Pyramid of Doom)

```javascript
// Nested callbacks become unreadable
getUser(userId, function(user) {
    getOrders(user.id, function(orders) {
        getOrderDetails(orders[0].id, function(details) {
            getShipping(details.shippingId, function(shipping) {
                console.log("Shipping:", shipping);
                // More nesting...
            });
        });
    });
});
// Solution: Use Promises or async/await
```

### Promises

```javascript
// A Promise represents a future value
// States: Pending → Fulfilled (resolved) or Rejected

// Creating a Promise
const myPromise = new Promise((resolve, reject) => {
    let success = true;
    setTimeout(() => {
        if (success) {
            resolve("Data fetched successfully!");
        } else {
            reject("Error fetching data!");
        }
    }, 2000);
});

// Using a Promise
myPromise
    .then(result => {
        console.log("Success:", result);
        return "Processed: " + result;
    })
    .then(processed => {
        console.log(processed);
    })
    .catch(error => {
        console.error("Error:", error);
    })
    .finally(() => {
        console.log("Done (runs always)");
    });

// ===== Promise.all — wait for ALL =====
Promise.all([
    fetch("/api/users"),
    fetch("/api/posts"),
    fetch("/api/comments")
]).then(([users, posts, comments]) => {
    console.log("All data loaded!");
}).catch(error => {
    console.error("One failed:", error);
});

// ===== Promise.race — first to complete =====
Promise.race([
    fetch("/api/fast"),
    fetch("/api/slow")
]).then(result => {
    console.log("First to finish:", result);
});

// ===== Promise.allSettled — wait for all, even failures =====
Promise.allSettled([
    Promise.resolve("Success"),
    Promise.reject("Error")
]).then(results => {
    // [{status: "fulfilled", value: "Success"},
    //  {status: "rejected", reason: "Error"}]
});
```

### Async/Await

```javascript
// async/await is syntactic sugar over Promises
// Makes async code look and behave like synchronous code

async function fetchUserData(userId) {
    try {
        const response = await fetch(`/api/users/${userId}`);
        const user = await response.json();
        console.log("User:", user);
        return user;
    } catch (error) {
        console.error("Error fetching user:", error);
    } finally {
        console.log("Fetch attempt complete");
    }
}

// Calling async function
fetchUserData(1);

// Parallel async operations
async function loadAllData() {
    try {
        const [users, posts] = await Promise.all([
            fetch("/api/users").then(r => r.json()),
            fetch("/api/posts").then(r => r.json())
        ]);
        console.log("Users:", users);
        console.log("Posts:", posts);
    } catch (error) {
        console.error("Error:", error);
    }
}
```

| Feature | Callbacks | Promises | Async/Await |
|---------|-----------|----------|-------------|
| Readability | ❌ Poor (nesting) | ✅ Better (chaining) | ✅✅ Best (sync-like) |
| Error handling | Manual | `.catch()` | `try/catch` |
| Chaining | Callback hell | `.then().then()` | Sequential `await` |
| Debugging | Difficult | OK | Easy |
| Use when | Simple async | Multiple async ops | Modern code |

---

## 8. ES6+ Features

### let and const
(Covered in Section 2 — Variables)

### Template Literals

```javascript
const name = "Dilip";
const age = 22;

// Template literal (backticks)
const greeting = `Hello, ${name}! You are ${age} years old.`;

// Multi-line strings
const html = `
    <div class="card">
        <h2>${name}</h2>
        <p>Age: ${age}</p>
    </div>
`;

// Expressions inside template literals
console.log(`Sum: ${2 + 3}`);         // "Sum: 5"
console.log(`Adult: ${age >= 18}`);   // "Adult: true"
```

### Destructuring

```javascript
// ===== ARRAY DESTRUCTURING =====
const [a, b, c] = [1, 2, 3];
console.log(a, b, c);  // 1, 2, 3

const [first, , third] = [10, 20, 30];  // Skip middle
console.log(first, third);  // 10, 30

const [x, ...rest] = [1, 2, 3, 4, 5];
console.log(x);     // 1
console.log(rest);   // [2, 3, 4, 5]

// Swap variables
let p = 1, q = 2;
[p, q] = [q, p];    // p=2, q=1

// Default values
const [m = 10, n = 20] = [5];
console.log(m, n);   // 5, 20

// ===== OBJECT DESTRUCTURING =====
const person = { name: "Dilip", age: 22, city: "Mumbai" };

const { name: personName, age: personAge } = person;  // Rename
console.log(personName);  // "Dilip"

const { name, ...others } = person;  // Rest
console.log(others);  // { age: 22, city: "Mumbai" }

// Default values
const { phone = "N/A" } = person;
console.log(phone);  // "N/A"

// Nested destructuring
const student = { info: { grade: "A", roll: 101 } };
const { info: { grade } } = student;
console.log(grade);  // "A"

// Function parameter destructuring
function displayUser({ name, age }) {
    console.log(`${name} is ${age}`);
}
displayUser(person);
```

### Rest and Spread Operators

```javascript
// ===== SPREAD (...) — Expand elements =====
// Array spread
const arr1 = [1, 2, 3];
const arr2 = [...arr1, 4, 5];     // [1, 2, 3, 4, 5]
const copy = [...arr1];            // Shallow copy

// Object spread
const obj1 = { a: 1, b: 2 };
const obj2 = { ...obj1, c: 3 };   // { a: 1, b: 2, c: 3 }
const merged = { ...obj1, ...obj2 };

// Function call spread
Math.max(...arr1);                // 3

// ===== REST (...) — Collect remaining =====
// Function parameters
function sum(...numbers) {
    return numbers.reduce((a, b) => a + b, 0);
}
sum(1, 2, 3, 4);  // 10

// Destructuring
const [first, ...remaining] = [1, 2, 3, 4];
// first = 1, remaining = [2, 3, 4]
```

### Modules (import/export)

```javascript
// ===== NAMED EXPORTS =====
// math.js
export const PI = 3.14159;
export function add(a, b) { return a + b; }
export function subtract(a, b) { return a - b; }

// app.js
import { PI, add, subtract } from './math.js';
import { add as addition } from './math.js';   // Rename
import * as math from './math.js';              // Import all

// ===== DEFAULT EXPORT (one per file) =====
// User.js
export default class User {
    constructor(name) { this.name = name; }
}

// app.js
import User from './User.js';    // No curly braces for default

// In HTML
<script type="module" src="app.js"></script>
```

### Default Parameters

```javascript
function greet(name = "Guest", greeting = "Hello") {
    return `${greeting}, ${name}!`;
}

greet();                // "Hello, Guest!"
greet("Dilip");         // "Hello, Dilip!"
greet("Dilip", "Hi");   // "Hi, Dilip!"
```

---

## 9. JavaScript in Web Development

### Working with Forms

```javascript
// Accessing form elements
const form = document.getElementById("myForm");
const nameInput = document.getElementById("name");

// Get/Set values
nameInput.value;                    // Get value
nameInput.value = "New Value";      // Set value

// Form submission
form.addEventListener("submit", function(e) {
    e.preventDefault();  // Prevent page reload

    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    console.log(data);
    // { name: "Dilip", email: "dilip@email.com", ... }
});

// Form validation
function validateForm() {
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();

    if (name.length < 3) {
        alert("Name must be at least 3 characters");
        return false;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        alert("Invalid email format");
        return false;
    }

    return true;
}
```

### AJAX (Asynchronous JavaScript and XML)

```javascript
// XMLHttpRequest (older method)
const xhr = new XMLHttpRequest();
xhr.open("GET", "https://jsonplaceholder.typicode.com/users", true);

xhr.onload = function() {
    if (xhr.status === 200) {
        const data = JSON.parse(xhr.responseText);
        console.log(data);
    }
};

xhr.onerror = function() {
    console.error("Request failed");
};

xhr.send();
```

### Fetch API (Modern)

```javascript
// ===== GET Request =====
fetch("https://jsonplaceholder.typicode.com/users")
    .then(response => {
        if (!response.ok) throw new Error("HTTP error: " + response.status);
        return response.json();
    })
    .then(data => console.log(data))
    .catch(error => console.error("Error:", error));

// ===== GET with async/await =====
async function getUsers() {
    try {
        const response = await fetch("https://jsonplaceholder.typicode.com/users");
        if (!response.ok) throw new Error("HTTP error: " + response.status);
        const users = await response.json();
        console.log(users);
    } catch (error) {
        console.error("Error:", error);
    }
}

// ===== POST Request =====
async function createUser(userData) {
    try {
        const response = await fetch("https://jsonplaceholder.typicode.com/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userData)
        });
        const result = await response.json();
        console.log("Created:", result);
    } catch (error) {
        console.error("Error:", error);
    }
}

createUser({ name: "Dilip", email: "dilip@email.com" });

// ===== PUT / PATCH / DELETE =====
// PUT (replace entire resource)
fetch("/api/users/1", { method: "PUT", headers: {...}, body: JSON.stringify(data) });

// PATCH (partial update)
fetch("/api/users/1", { method: "PATCH", headers: {...}, body: JSON.stringify({ name: "Updated" }) });

// DELETE
fetch("/api/users/1", { method: "DELETE" });
```

| Feature | XMLHttpRequest (AJAX) | Fetch API |
|---------|----------------------|-----------|
| Syntax | Verbose, callback-based | Clean, Promise-based |
| Promises | ❌ | ✅ |
| Streaming | ❌ | ✅ |
| Request cancellation | ✅ (`abort()`) | ✅ (`AbortController`) |
| Modern? | Legacy | ✅ Recommended |

---

## 10. Debugging and Testing

### Debugging Tools

```javascript
// ===== console methods =====
console.log("Normal message");
console.error("Error message");        // Red in console
console.warn("Warning message");       // Yellow in console
console.info("Info message");
console.table([{a:1}, {a:2}]);        // Display as table
console.time("timer");                 // Start timer
// ... code ...
console.timeEnd("timer");             // End timer, show duration
console.group("Group Name");          // Group messages
console.log("Inside group");
console.groupEnd();
console.clear();                       // Clear console

// ===== debugger statement =====
function calculate(a, b) {
    debugger;  // Execution pauses here in DevTools
    return a + b;
}

// ===== Breakpoints in Chrome DevTools =====
// 1. Open Sources tab (F12)
// 2. Find your JS file
// 3. Click on line number to set breakpoint
// 4. Refresh page — execution pauses at breakpoint
// 5. Step through: F10 (over), F11 (into), Shift+F11 (out)
// 6. Watch expressions: add variables to watch panel
```

### Common Debugging Techniques

| Technique | How |
|-----------|-----|
| **Console logging** | `console.log()` at key points |
| **Breakpoints** | Pause execution in DevTools |
| **Watch expressions** | Monitor variable values |
| **Call stack** | See function call history |
| **Network tab** | Inspect API requests/responses |
| **Try/catch** | Wrap risky code in error handling |

### Testing JavaScript

```javascript
// ===== Simple assertion testing =====
function add(a, b) { return a + b; }

console.assert(add(2, 3) === 5, "add(2,3) should be 5");
console.assert(add(-1, 1) === 0, "add(-1,1) should be 0");
console.assert(add(0, 0) === 0, "add(0,0) should be 0");

// ===== Testing frameworks (Jest, Mocha) =====
// Install: npm install --save-dev jest

// add.js
function add(a, b) { return a + b; }
module.exports = add;

// add.test.js
const add = require('./add');

test('adds 1 + 2 to equal 3', () => {
    expect(add(1, 2)).toBe(3);
});

test('adds negative numbers', () => {
    expect(add(-1, -2)).toBe(-3);
});

// Run: npx jest
```

---

## 11. Frameworks and Libraries

### Popular JavaScript Frameworks

| Framework | Type | Key Feature |
|-----------|------|-------------|
| **React** | UI Library | Component-based, Virtual DOM |
| **Angular** | Full Framework | TypeScript, two-way binding |
| **Vue.js** | Progressive Framework | Simple, flexible, reactive |
| **Next.js** | React Framework | Server-side rendering, SEO |
| **Express.js** | Backend Framework | Node.js web server |
| **Svelte** | Compiler | No virtual DOM, fast |

### jQuery — DOM Manipulation

```javascript
// jQuery simplifies DOM manipulation, events, and AJAX
// Include: <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>

// ===== $ = jQuery =====

// Document ready
$(document).ready(function() {
    console.log("DOM ready!");
});
// Shorthand:
$(function() {
    console.log("DOM ready!");
});

// ===== SELECTORS =====
$("p");                // All <p> elements
$(".card");            // All elements with class "card"
$("#header");          // Element with id "header"
$("div > p");          // Direct child <p> of <div>
$("input[type='text']"); // Input with type text

// ===== DOM MANIPULATION =====
$("h1").text("New Title");             // Set text
$("h1").text();                        // Get text
$(".content").html("<b>Bold</b>");     // Set HTML
$("input").val("New Value");           // Set input value
$("input").val();                      // Get input value

// ===== CSS =====
$("p").css("color", "red");
$("p").css({ color: "red", fontSize: "18px" });
$("div").addClass("active");
$("div").removeClass("active");
$("div").toggleClass("active");
$("div").hasClass("active");           // true/false

// ===== ATTRIBUTES =====
$("a").attr("href");                   // Get attribute
$("a").attr("href", "https://google.com"); // Set attribute
$("input").prop("checked", true);      // Set property

// ===== SHOW / HIDE =====
$(".box").hide();           // display: none
$(".box").show();           // display: block
$(".box").toggle();         // Toggle visibility
$(".box").fadeIn(500);      // Fade in over 500ms
$(".box").fadeOut(500);     // Fade out
$(".box").slideDown();      // Slide down
$(".box").slideUp();        // Slide up

// ===== EVENTS =====
$("button").click(function() {
    alert("Clicked!");
});

$("input").on("input", function() {
    console.log($(this).val());
});

// ===== AJAX =====
$.ajax({
    url: "https://jsonplaceholder.typicode.com/users",
    method: "GET",
    success: function(data) {
        console.log(data);
    },
    error: function(err) {
        console.error(err);
    }
});

// Shorthand
$.get("/api/users", function(data) { console.log(data); });
$.post("/api/users", { name: "Dilip" }, function(data) { console.log(data); });

// ===== EACH =====
$("li").each(function(index, element) {
    console.log(index + ": " + $(element).text());
});

// ===== CREATE / APPEND / REMOVE =====
$("<p>New paragraph</p>").appendTo(".content");
$(".content").append("<p>Appended</p>");
$(".content").prepend("<p>Prepended</p>");
$(".old").remove();
$(".container").empty();   // Remove all children
```

| jQuery | Vanilla JavaScript Equivalent |
|--------|-------------------------------|
| `$(selector)` | `document.querySelector(selector)` |
| `.text()` | `.textContent` |
| `.html()` | `.innerHTML` |
| `.val()` | `.value` |
| `.css("color", "red")` | `.style.color = "red"` |
| `.addClass("x")` | `.classList.add("x")` |
| `.click(fn)` | `.addEventListener("click", fn)` |
| `.hide()` | `.style.display = "none"` |

---

## 12. Practice Questions

### Multiple Choice Questions

**Q1.** What is the output of `typeof null`?
- a) `"null"`
- b) `"undefined"`
- c) `"object"` ✅
- d) `"boolean"`

**Q2.** What is the difference between `==` and `===`?
- a) No difference
- b) `==` checks type and value, `===` checks only value
- c) `==` checks value with type coercion, `===` checks value and type strictly ✅
- d) `===` is deprecated

**Q3.** What is a closure?
- a) A function that closes the browser
- b) A function that has access to variables from its outer scope even after the outer function returns ✅
- c) A function that cannot access external variables
- d) A function with no return value

**Q4.** What does `Array.isArray([])` return?
- a) `false`
- b) `true` ✅
- c) `undefined`
- d) `null`

**Q5.** What is the output of `[1,2,3].map(x => x * 2)`?
- a) `[1, 2, 3]`
- b) `6`
- c) `[2, 4, 6]` ✅
- d) `undefined`

**Q6.** Which keyword makes a function asynchronous?
- a) `await`
- b) `promise`
- c) `async` ✅
- d) `defer`

**Q7.** What does `e.preventDefault()` do in an event handler?
- a) Stops event propagation
- b) Prevents the default browser action (like form submission, link navigation) ✅
- c) Removes the event listener
- d) Cancels the JavaScript execution

**Q8.** What is the Fetch API used for?
- a) Downloading files
- b) Making HTTP requests from the browser ✅
- c) Fetching HTML tags
- d) Loading CSS files

**Q9.** What is the output of `console.log(1 + "2")`?
- a) `3`
- b) `"12"` ✅
- c) `NaN`
- d) Error

**Q10.** Which jQuery method is equivalent to `document.querySelector()`?
- a) `$.get()`
- b) `$(selector)` ✅
- c) `$.find()`
- d) `$.select()`

**Q11.** What is a Promise in JavaScript?
- a) A guaranteed return value
- b) An object representing the eventual completion or failure of an async operation ✅
- c) A function that always resolves
- d) A type of callback

**Q12.** What does the spread operator `...` do?
- a) Delays execution
- b) Creates a loop
- c) Expands an iterable into individual elements ✅
- d) Converts string to array

**Q13.** What is the difference between `for...in` and `for...of`?
- a) No difference
- b) `for...in` iterates over keys/indices, `for...of` iterates over values ✅
- c) `for...of` iterates over keys
- d) `for...in` only works with arrays

**Q14.** What does `document.addEventListener("DOMContentLoaded", fn)` do?
- a) Waits for images to load
- b) Fires when the HTML document is fully parsed ✅
- c) Fires on every DOM change
- d) Fires when CSS is loaded

**Q15.** What will `Boolean("")` return?
- a) `true`
- b) `false` ✅
- c) `null`
- d) `""`

---

> ✅ **JavaScript Complete!** Next: [Bootstrap 5 →](../04_Bootstrap5/README.md)
