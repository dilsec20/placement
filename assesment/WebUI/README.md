# 🌐 Web UI (HTML, CSS & JavaScript) - Cognizant Assessment Preparation

## 📋 Topics Covered
1. [HTML5 Fundamentals](#1-html5-fundamentals)
2. [CSS Fundamentals](#2-css-fundamentals)
3. [JavaScript Fundamentals](#3-javascript-fundamentals)
4. [Practice Problems](#4-practice-problems)

---

## 1. HTML5 Fundamentals

### 📌 Definition
**HTML (HyperText Markup Language)** is the standard language for creating web pages. HTML5 is the latest version with semantic elements, form enhancements, and multimedia support.

### 1.1 HTML Document Structure

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Page Title</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <header>
        <nav>
            <ul>
                <li><a href="#home">Home</a></li>
                <li><a href="#about">About</a></li>
            </ul>
        </nav>
    </header>

    <main>
        <section id="home">
            <h1>Welcome</h1>
            <p>This is the main content.</p>
        </section>
    </main>

    <footer>
        <p>&copy; 2026 Company Name</p>
    </footer>

    <script src="script.js"></script>
</body>
</html>
```

### 1.2 Semantic HTML5 Elements

| Element | Purpose |
|---------|---------|
| `<header>` | Page/section header |
| `<nav>` | Navigation links |
| `<main>` | Main content (one per page) |
| `<section>` | Thematic grouping of content |
| `<article>` | Self-contained content (blog post, news) |
| `<aside>` | Side content (sidebar, ads) |
| `<footer>` | Page/section footer |
| `<figure>` | Image with caption |
| `<figcaption>` | Caption for `<figure>` |
| `<details>` | Expandable details |
| `<summary>` | Summary for `<details>` |
| `<mark>` | Highlighted text |
| `<time>` | Date/time |

### 1.3 HTML Forms

```html
<form action="/submit" method="POST" id="registrationForm">
    <!-- Text Input -->
    <label for="name">Full Name:</label>
    <input type="text" id="name" name="name" placeholder="Enter name" required>

    <!-- Email -->
    <label for="email">Email:</label>
    <input type="email" id="email" name="email" required>

    <!-- Password -->
    <label for="password">Password:</label>
    <input type="password" id="password" name="password" minlength="8" required>

    <!-- Number -->
    <label for="age">Age:</label>
    <input type="number" id="age" name="age" min="18" max="100">

    <!-- Date -->
    <label for="dob">Date of Birth:</label>
    <input type="date" id="dob" name="dob">

    <!-- Radio Buttons -->
    <p>Gender:</p>
    <input type="radio" id="male" name="gender" value="male">
    <label for="male">Male</label>
    <input type="radio" id="female" name="gender" value="female">
    <label for="female">Female</label>

    <!-- Checkbox -->
    <input type="checkbox" id="terms" name="terms" required>
    <label for="terms">I agree to terms</label>

    <!-- Select Dropdown -->
    <label for="city">City:</label>
    <select id="city" name="city">
        <option value="" disabled selected>Select city</option>
        <option value="mumbai">Mumbai</option>
        <option value="delhi">Delhi</option>
        <option value="bangalore">Bangalore</option>
    </select>

    <!-- Textarea -->
    <label for="bio">Bio:</label>
    <textarea id="bio" name="bio" rows="4" cols="50" maxlength="500"></textarea>

    <!-- File Upload -->
    <label for="resume">Upload Resume:</label>
    <input type="file" id="resume" name="resume" accept=".pdf,.doc">

    <!-- Range Slider -->
    <label for="experience">Experience (years):</label>
    <input type="range" id="experience" name="experience" min="0" max="30" value="5">

    <!-- Hidden Field -->
    <input type="hidden" name="formType" value="registration">

    <!-- Submit & Reset -->
    <button type="submit">Register</button>
    <button type="reset">Clear</button>
</form>
```

### Input Types Summary

| Type | Example | Purpose |
|------|---------|---------|
| `text` | `<input type="text">` | Single line text |
| `password` | `<input type="password">` | Hidden text |
| `email` | `<input type="email">` | Email with validation |
| `number` | `<input type="number">` | Numbers only |
| `tel` | `<input type="tel">` | Phone number |
| `url` | `<input type="url">` | URL with validation |
| `date` | `<input type="date">` | Date picker |
| `time` | `<input type="time">` | Time picker |
| `color` | `<input type="color">` | Color picker |
| `range` | `<input type="range">` | Slider |
| `file` | `<input type="file">` | File upload |
| `checkbox` | `<input type="checkbox">` | Multiple choices |
| `radio` | `<input type="radio">` | Single choice |
| `hidden` | `<input type="hidden">` | Hidden data |

### 1.4 HTML Tables

```html
<table border="1">
    <caption>Employee List</caption>
    <thead>
        <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Department</th>
            <th>Salary</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>1</td>
            <td>Alice</td>
            <td>IT</td>
            <td>60,000</td>
        </tr>
        <tr>
            <td>2</td>
            <td>Bob</td>
            <td>HR</td>
            <td>55,000</td>
        </tr>
    </tbody>
    <tfoot>
        <tr>
            <td colspan="3">Total</td>
            <td>1,15,000</td>
        </tr>
    </tfoot>
</table>

<!-- Cell spanning -->
<td colspan="2">Spans 2 columns</td>
<td rowspan="3">Spans 3 rows</td>
```

### 1.5 HTML Media & Links

```html
<!-- Images -->
<img src="photo.jpg" alt="Description" width="300" height="200">

<!-- Links -->
<a href="https://google.com" target="_blank" rel="noopener">Open Google</a>
<a href="#section1">Jump to Section 1</a>
<a href="mailto:test@email.com">Send Email</a>

<!-- Audio -->
<audio controls>
    <source src="song.mp3" type="audio/mpeg">
</audio>

<!-- Video -->
<video controls width="400">
    <source src="video.mp4" type="video/mp4">
</video>

<!-- iframe -->
<iframe src="https://example.com" width="600" height="400"></iframe>

<!-- Lists -->
<ul>
    <li>Unordered item 1</li>
    <li>Unordered item 2</li>
</ul>

<ol type="1">
    <li>Ordered item 1</li>
    <li>Ordered item 2</li>
</ol>

<dl>
    <dt>HTML</dt>
    <dd>HyperText Markup Language</dd>
    <dt>CSS</dt>
    <dd>Cascading Style Sheets</dd>
</dl>
```

---

## 2. CSS Fundamentals

### 📌 Definition
**CSS (Cascading Style Sheets)** controls the visual presentation of HTML elements — colors, layout, fonts, spacing, and animations.

### 2.1 CSS Selectors

```css
/* ===== BASIC SELECTORS ===== */

/* Element Selector */
p { color: blue; }
h1 { font-size: 24px; }

/* Class Selector (.) */
.highlight { background-color: yellow; }
.btn-primary { background: #007bff; color: white; }

/* ID Selector (#) */
#header { background-color: #333; }
#main-content { padding: 20px; }

/* Universal Selector (*) */
* { margin: 0; padding: 0; box-sizing: border-box; }

/* ===== COMBINATOR SELECTORS ===== */

/* Descendant (space) - all p inside div */
div p { color: red; }

/* Child (>) - direct children only */
div > p { color: blue; }

/* Adjacent Sibling (+) - immediately after */
h1 + p { font-size: 18px; }

/* General Sibling (~) - all siblings after */
h1 ~ p { color: gray; }

/* ===== ATTRIBUTE SELECTORS ===== */
input[type="text"] { border: 1px solid #ccc; }
a[href^="https"] { color: green; }   /* starts with */
a[href$=".pdf"] { color: red; }      /* ends with */
a[href*="google"] { font-weight: bold; } /* contains */

/* ===== PSEUDO-CLASS SELECTORS ===== */
a:hover { color: red; }
a:visited { color: purple; }
a:active { color: orange; }
input:focus { border-color: blue; outline: none; }
li:first-child { font-weight: bold; }
li:last-child { color: red; }
li:nth-child(2) { background: #eee; }   /* 2nd child */
li:nth-child(odd) { background: #f5f5f5; }
li:nth-child(even) { background: #fff; }
tr:nth-child(2n) { background: #f0f0f0; } /* even rows */
input:checked { accent-color: green; }
input:disabled { opacity: 0.5; }
p:not(.special) { color: gray; }

/* ===== PSEUDO-ELEMENT SELECTORS ===== */
p::first-line { font-weight: bold; }
p::first-letter { font-size: 2em; }
h1::before { content: "→ "; }
h1::after { content: " ←"; }
::placeholder { color: #999; }
::selection { background: yellow; color: black; }
```

### CSS Selector Specificity (Priority)

```
Inline style (style="") → 1000
ID (#id)                → 100
Class (.class), pseudo  → 10
Element (p, div)        → 1

!important              → Overrides everything

Example:
div p          → 1 + 1 = 2
.content p     → 10 + 1 = 11
#main p        → 100 + 1 = 101
#main .text p  → 100 + 10 + 1 = 111
```

### 2.2 Box Model

```css
/* Every HTML element is a box:
   Content → Padding → Border → Margin */

.box {
    width: 300px;
    height: 200px;
    padding: 20px;              /* Space inside border */
    border: 2px solid black;    /* Border around element */
    margin: 10px;               /* Space outside border */

    /* Total width = 300 + 20*2 + 2*2 + 10*2 = 364px (without box-sizing) */

    /* Fix with box-sizing */
    box-sizing: border-box;     /* Width INCLUDES padding + border */
    /* Now total width = 300px */
}

/* Shorthand */
padding: 10px;                  /* All sides */
padding: 10px 20px;            /* Top/Bottom  Left/Right */
padding: 10px 20px 15px;       /* Top  Left/Right  Bottom */
padding: 10px 20px 15px 25px;  /* Top  Right  Bottom  Left (clockwise) */

margin: 0 auto;                /* Center block element horizontally */
```

### 2.3 Display Property

```css
/* Block - takes full width, starts on new line */
.block { display: block; }     /* div, p, h1-h6, section */

/* Inline - only takes needed width, stays in line */
.inline { display: inline; }   /* span, a, strong, em */

/* Inline-Block - inline but can set width/height */
.inline-block { display: inline-block; }

/* None - hides element completely */
.hidden { display: none; }

/* visibility: hidden - hides but keeps space */
.invisible { visibility: hidden; }
```

### 2.4 CSS Flexbox

```css
/* ===== FLEX CONTAINER (Parent) ===== */
.container {
    display: flex;

    /* Main axis direction */
    flex-direction: row;              /* default: left to right */
    flex-direction: column;           /* top to bottom */
    flex-direction: row-reverse;      /* right to left */
    flex-direction: column-reverse;   /* bottom to top */

    /* Wrap items */
    flex-wrap: nowrap;     /* default: single line */
    flex-wrap: wrap;       /* wrap to next line */

    /* Align on MAIN axis (horizontal for row) */
    justify-content: flex-start;      /* default */
    justify-content: flex-end;
    justify-content: center;
    justify-content: space-between;   /* equal space between items */
    justify-content: space-around;    /* equal space around items */
    justify-content: space-evenly;    /* equal space everywhere */

    /* Align on CROSS axis (vertical for row) */
    align-items: stretch;             /* default: fill height */
    align-items: flex-start;
    align-items: flex-end;
    align-items: center;

    gap: 10px;                        /* Gap between items */
}

/* ===== FLEX ITEMS (Children) ===== */
.item {
    flex-grow: 1;    /* How much item should grow (0 = don't grow) */
    flex-shrink: 0;  /* How much item should shrink */
    flex-basis: 200px; /* Initial size before grow/shrink */

    /* Shorthand */
    flex: 1;           /* grow:1, shrink:1, basis:0 */
    flex: 0 0 200px;   /* Don't grow/shrink, fix at 200px */

    align-self: center; /* Override align-items for this item */
    order: 2;           /* Change visual order */
}

/* ===== COMMON FLEXBOX PATTERNS ===== */

/* Center everything */
.center-all {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
}

/* Navbar with logo left, links right */
.navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 20px;
}

/* Equal-width columns */
.columns {
    display: flex;
    gap: 20px;
}
.columns > div {
    flex: 1;
}

/* Card grid */
.card-grid {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
}
.card {
    flex: 1 1 300px; /* Grow, shrink, min 300px */
}
```

### 2.5 CSS Grid

```css
.grid-container {
    display: grid;

    /* Define columns */
    grid-template-columns: 200px 200px 200px;      /* 3 fixed columns */
    grid-template-columns: 1fr 1fr 1fr;             /* 3 equal columns */
    grid-template-columns: repeat(3, 1fr);           /* Same as above */
    grid-template-columns: 1fr 2fr 1fr;             /* Middle is double */
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); /* Responsive */

    /* Define rows */
    grid-template-rows: 100px auto 50px;

    gap: 20px;                /* Gap between cells */
    row-gap: 10px;
    column-gap: 20px;
}

/* Grid item placement */
.item1 {
    grid-column: 1 / 3;       /* Span column 1 to 3 */
    grid-row: 1 / 2;
}
.item2 {
    grid-column: span 2;       /* Span 2 columns */
}
```

### 2.6 Positioning

```css
/* Static (default) - normal document flow */
.static { position: static; }

/* Relative - offset from normal position */
.relative {
    position: relative;
    top: 10px;
    left: 20px;
}

/* Absolute - relative to nearest positioned ancestor */
.absolute {
    position: absolute;
    top: 0;
    right: 0;
}

/* Fixed - relative to viewport (stays on scroll) */
.fixed {
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 1000;
}

/* Sticky - switches between relative and fixed */
.sticky {
    position: sticky;
    top: 0;
}
```

### 2.7 CSS Colors, Fonts & Common Properties

```css
/* Colors */
color: red;                        /* Named */
color: #FF5733;                    /* Hex */
color: rgb(255, 87, 51);          /* RGB */
color: rgba(255, 87, 51, 0.5);   /* RGBA (with transparency) */
color: hsl(14, 100%, 60%);       /* HSL */

/* Fonts */
font-family: 'Arial', sans-serif;
font-size: 16px;
font-weight: bold;     /* 100-900, normal, bold */
font-style: italic;
line-height: 1.6;
text-align: center;    /* left, right, center, justify */
text-decoration: none;  /* underline, overline, line-through */
text-transform: uppercase; /* lowercase, capitalize */
letter-spacing: 2px;
word-spacing: 5px;

/* Background */
background-color: #f0f0f0;
background-image: url('bg.jpg');
background-size: cover;
background-position: center;
background-repeat: no-repeat;
background: linear-gradient(to right, #667eea, #764ba2);

/* Border */
border: 2px solid #333;
border-radius: 10px;      /* Rounded corners */
border-radius: 50%;        /* Circle */

/* Shadow */
box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);

/* Overflow */
overflow: hidden;
overflow: scroll;
overflow: auto;

/* Opacity */
opacity: 0.7;

/* Cursor */
cursor: pointer;
cursor: not-allowed;

/* Transition */
transition: all 0.3s ease;

/* Transform */
transform: rotate(45deg);
transform: scale(1.1);
transform: translateX(50px);
```

### 2.8 Media Queries (Responsive Design)

```css
/* Mobile First Approach */
.container { width: 100%; padding: 10px; }

/* Tablet */
@media (min-width: 768px) {
    .container { width: 750px; margin: 0 auto; }
}

/* Desktop */
@media (min-width: 1024px) {
    .container { width: 960px; }
}

/* Large Desktop */
@media (min-width: 1200px) {
    .container { width: 1140px; }
}

/* Common breakpoints */
/* Mobile:  < 768px */
/* Tablet:  768px - 1023px */
/* Desktop: >= 1024px */
```

---

## 3. JavaScript Fundamentals

### 📌 Definition
**JavaScript** is a programming language that makes web pages interactive. It runs in the browser and can manipulate HTML/CSS dynamically.

### 3.1 Variables & Data Types

```javascript
// Variable declarations
var name = "Dilip";        // Function scoped, can be redeclared (avoid using)
let age = 22;              // Block scoped, can be reassigned
const PI = 3.14159;        // Block scoped, cannot be reassigned

// Data Types
let str = "Hello";          // String
let num = 42;               // Number
let decimal = 3.14;         // Number (no separate float)
let bool = true;            // Boolean
let nothing = null;         // Null (intentional empty)
let undef = undefined;      // Undefined (not assigned)
let arr = [1, 2, 3];       // Array (object)
let obj = {name: "Dilip"}; // Object
let sym = Symbol("id");    // Symbol

// typeof operator
typeof "Hello"     // "string"
typeof 42          // "number"
typeof true        // "boolean"
typeof undefined   // "undefined"
typeof null        // "object" (known JS quirk)
typeof [1,2]       // "object"
typeof {a:1}       // "object"

// Type conversion
String(123)        // "123"
Number("123")      // 123
Number("abc")      // NaN
parseInt("42px")   // 42
parseFloat("3.14") // 3.14
Boolean(0)         // false
Boolean("")        // false
Boolean(null)      // false
Boolean(1)         // true
Boolean("hello")   // true
```

### var vs let vs const

| Feature | var | let | const |
|---------|-----|-----|-------|
| Scope | Function | Block | Block |
| Redeclare | ✅ | ❌ | ❌ |
| Reassign | ✅ | ✅ | ❌ |
| Hoisting | ✅ (undefined) | ✅ (TDZ error) | ✅ (TDZ error) |

### 3.2 Operators

```javascript
// Arithmetic: +  -  *  /  %  **
10 % 3     // 1 (modulus)
2 ** 3     // 8 (exponent)

// Comparison
5 == "5"    // true  (loose equality - type coercion)
5 === "5"   // false (strict equality - no coercion)
5 != "5"    // false
5 !== "5"   // true

// Logical
true && false   // false (AND)
true || false   // true  (OR)
!true           // false (NOT)

// Nullish Coalescing (??)
let val = null ?? "default";  // "default"
let val2 = 0 ?? "default";   // 0 (only null/undefined trigger default)

// Optional Chaining (?.)
let user = { address: { city: "Mumbai" } };
user?.address?.city      // "Mumbai"
user?.phone?.number      // undefined (no error)

// Ternary
let result = age >= 18 ? "Adult" : "Minor";

// Spread operator (...)
let arr1 = [1, 2, 3];
let arr2 = [...arr1, 4, 5];  // [1, 2, 3, 4, 5]
let obj1 = {a: 1};
let obj2 = {...obj1, b: 2};  // {a: 1, b: 2}

// Destructuring
let [a, b, c] = [1, 2, 3];
let {name: n, age: a2} = {name: "Dilip", age: 22};
```

### 3.3 Control Flow

```javascript
// if-else
if (score >= 90) {
    grade = "A";
} else if (score >= 80) {
    grade = "B";
} else {
    grade = "C";
}

// switch
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

// for loop
for (let i = 0; i < 5; i++) { console.log(i); }

// while
let i = 0;
while (i < 5) { console.log(i); i++; }

// do-while
do { console.log(i); i++; } while (i < 5);

// for...of (arrays)
for (let item of [10, 20, 30]) { console.log(item); }

// for...in (objects)
for (let key in {a: 1, b: 2}) { console.log(key); }
```

### 3.4 Functions

```javascript
// Function Declaration (hoisted)
function greet(name) {
    return "Hello, " + name;
}

// Function Expression (not hoisted)
const greet2 = function(name) {
    return "Hello, " + name;
};

// Arrow Function (ES6)
const greet3 = (name) => "Hello, " + name;
const square = x => x * x;            // Single param, no parens needed
const add = (a, b) => a + b;

// Default Parameters
function greet4(name = "Guest") {
    return "Hello, " + name;
}

// Rest Parameters
function sum(...numbers) {
    return numbers.reduce((total, n) => total + n, 0);
}
sum(1, 2, 3, 4);  // 10

// Callback Functions
function processData(data, callback) {
    let result = data.map(callback);
    return result;
}
processData([1, 2, 3], x => x * 2);  // [2, 4, 6]

// IIFE (Immediately Invoked Function Expression)
(function() {
    console.log("Runs immediately!");
})();
```

### 3.5 Strings

```javascript
let str = "Hello World";

str.length              // 11
str.charAt(0)           // "H"
str[0]                  // "H"
str.indexOf("World")    // 6
str.lastIndexOf("l")    // 9
str.includes("World")   // true
str.startsWith("Hello") // true
str.endsWith("World")   // true
str.slice(0, 5)         // "Hello"
str.slice(-5)           // "World"
str.substring(6)        // "World"
str.toUpperCase()       // "HELLO WORLD"
str.toLowerCase()       // "hello world"
str.trim()              // Remove whitespace
str.split(" ")          // ["Hello", "World"]
str.replace("World", "JS")  // "Hello JS"
str.replaceAll("l", "L")    // "HeLLo WorLd"
str.repeat(3)           // "Hello WorldHello WorldHello World"
str.padStart(15, "*")   // "****Hello World"
str.padEnd(15, "*")     // "Hello World****"

// Template Literals (ES6)
let name = "Dilip";
let greeting = `Hello, ${name}! You are ${22} years old.`;
let multiline = `Line 1
Line 2
Line 3`;
```

### 3.6 Arrays

```javascript
let arr = [10, 20, 30, 40, 50];

// Basic operations
arr.length            // 5
arr.push(60)          // Add to end → [10,20,30,40,50,60]
arr.pop()             // Remove from end → returns 60
arr.unshift(5)        // Add to start → [5,10,20,30,40,50]
arr.shift()           // Remove from start → returns 5
arr.indexOf(30)       // 2
arr.includes(40)      // true

// Slice & Splice
arr.slice(1, 3)       // [20, 30] (doesn't modify original)
arr.splice(1, 2)      // Removes 2 elements from index 1 (modifies original)
arr.splice(1, 0, 15)  // Insert 15 at index 1

// Higher-Order Array Methods (VERY IMPORTANT)

// map - transform each element
let doubled = [1, 2, 3].map(x => x * 2);           // [2, 4, 6]

// filter - keep elements that pass test
let evens = [1, 2, 3, 4, 5].filter(x => x % 2 === 0);  // [2, 4]

// reduce - accumulate to single value
let sum = [1, 2, 3, 4].reduce((acc, x) => acc + x, 0);  // 10

// find - first element that matches
let found = [1, 5, 10, 15].find(x => x > 7);       // 10

// findIndex - index of first match
let idx = [1, 5, 10, 15].findIndex(x => x > 7);    // 2

// some - at least one matches?
[1, 2, 3].some(x => x > 2);     // true

// every - all match?
[1, 2, 3].every(x => x > 0);    // true

// forEach - iterate (no return)
[1, 2, 3].forEach((val, idx) => console.log(idx, val));

// sort
[3,1,4,1,5].sort((a, b) => a - b);   // Ascending  [1,1,3,4,5]
[3,1,4,1,5].sort((a, b) => b - a);   // Descending [5,4,3,1,1]

// flat
[[1,2],[3,4],[5]].flat();             // [1,2,3,4,5]

// Array.from
Array.from("Hello");                  // ["H","e","l","l","o"]
Array.from({length: 5}, (_, i) => i); // [0,1,2,3,4]

// join
[1, 2, 3].join("-");                  // "1-2-3"

// reverse
[1, 2, 3].reverse();                 // [3, 2, 1]

// Chaining methods
let result = [1,2,3,4,5,6,7,8,9,10]
    .filter(x => x % 2 === 0)         // [2,4,6,8,10]
    .map(x => x * x)                   // [4,16,36,64,100]
    .reduce((acc, x) => acc + x, 0);   // 220
```

### 3.7 Objects

```javascript
// Object creation
let person = {
    name: "Dilip",
    age: 22,
    hobbies: ["coding", "reading"],
    address: { city: "Mumbai", state: "MH" },
    greet() { return `Hi, I'm ${this.name}`; }
};

// Access
person.name              // "Dilip"
person["age"]            // 22
person.address.city      // "Mumbai"
person.greet()           // "Hi, I'm Dilip"

// Modify
person.age = 23;
person.email = "dilip@email.com";  // Add new property
delete person.email;                // Delete property

// Object methods
Object.keys(person)      // ["name", "age", "hobbies", "address", "greet"]
Object.values(person)    // ["Dilip", 23, [...], {...}, f]
Object.entries(person)   // [["name","Dilip"], ["age",23], ...]
Object.assign({}, person) // Shallow copy
Object.freeze(person)    // Make immutable

// Iterate object
for (let key in person) {
    console.log(key + ": " + person[key]);
}

// Destructuring
let { name, age, address: { city } } = person;
```

### 3.8 DOM Manipulation (VERY IMPORTANT)

```javascript
// ===== SELECTING ELEMENTS =====
document.getElementById("myId")
document.getElementsByClassName("myClass")    // HTMLCollection
document.getElementsByTagName("p")            // HTMLCollection
document.querySelector(".myClass")            // First match
document.querySelectorAll(".myClass")         // NodeList (all matches)

// ===== MODIFYING CONTENT =====
let el = document.getElementById("myId");
el.textContent = "New text";          // Plain text
el.innerHTML = "<b>Bold text</b>";    // HTML content
el.innerText = "Visible text";       // Visible text only

// ===== MODIFYING ATTRIBUTES =====
el.setAttribute("class", "active");
el.getAttribute("class");
el.removeAttribute("class");
el.id = "newId";
el.src = "image.jpg";

// ===== MODIFYING STYLES =====
el.style.color = "red";
el.style.backgroundColor = "#f0f0f0";
el.style.fontSize = "20px";
el.style.display = "none";

// ===== CSS CLASSES =====
el.classList.add("active");
el.classList.remove("active");
el.classList.toggle("active");
el.classList.contains("active");    // true/false
el.className = "class1 class2";

// ===== CREATING ELEMENTS =====
let newDiv = document.createElement("div");
newDiv.textContent = "Hello";
newDiv.classList.add("card");
document.body.appendChild(newDiv);

// Insert before
let parent = document.getElementById("container");
let reference = document.getElementById("existingChild");
parent.insertBefore(newDiv, reference);

// Remove element
parent.removeChild(reference);
// OR
reference.remove();

// Clone
let clone = el.cloneNode(true); // true = deep clone
```

### 3.9 Event Handling

```javascript
// ===== METHOD 1: addEventListener (preferred) =====
let btn = document.getElementById("myBtn");

btn.addEventListener("click", function(event) {
    console.log("Button clicked!");
    console.log("Target:", event.target);
});

// Arrow function
btn.addEventListener("click", (e) => {
    e.preventDefault();  // Prevent default behavior
    e.stopPropagation(); // Stop event bubbling
});

// ===== COMMON EVENTS =====
// Mouse Events
element.addEventListener("click", handler);
element.addEventListener("dblclick", handler);
element.addEventListener("mouseover", handler);
element.addEventListener("mouseout", handler);
element.addEventListener("mousedown", handler);
element.addEventListener("mouseup", handler);

// Keyboard Events
document.addEventListener("keydown", (e) => {
    console.log(e.key);     // "Enter", "a", "Escape"
    console.log(e.keyCode); // 13, 65, 27
});
document.addEventListener("keyup", handler);

// Form Events
form.addEventListener("submit", (e) => {
    e.preventDefault(); // Prevent page reload
    // Process form data
});
input.addEventListener("input", handler);    // On every keystroke
input.addEventListener("change", handler);   // On value change + blur
input.addEventListener("focus", handler);
input.addEventListener("blur", handler);

// Window Events
window.addEventListener("load", handler);
window.addEventListener("resize", handler);
window.addEventListener("scroll", handler);

// ===== EVENT DELEGATION =====
// Instead of adding listeners to each child, add to parent
document.getElementById("list").addEventListener("click", (e) => {
    if (e.target.tagName === "LI") {
        e.target.classList.toggle("completed");
    }
});

// ===== METHOD 2: Inline (avoid) =====
// <button onclick="handleClick()">Click</button>

// ===== METHOD 3: Property (avoid) =====
// btn.onclick = function() { ... };
```

### 3.10 Form Validation Example

```javascript
document.getElementById("myForm").addEventListener("submit", function(e) {
    e.preventDefault();
    
    let name = document.getElementById("name").value.trim();
    let email = document.getElementById("email").value.trim();
    let password = document.getElementById("password").value;
    let errors = [];
    
    // Name validation
    if (name === "") {
        errors.push("Name is required");
    } else if (name.length < 3) {
        errors.push("Name must be at least 3 characters");
    }
    
    // Email validation
    let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        errors.push("Invalid email format");
    }
    
    // Password validation
    if (password.length < 8) {
        errors.push("Password must be at least 8 characters");
    }
    if (!/[A-Z]/.test(password)) {
        errors.push("Password must contain uppercase letter");
    }
    if (!/[0-9]/.test(password)) {
        errors.push("Password must contain a number");
    }
    
    // Show errors or submit
    let errorDiv = document.getElementById("errors");
    if (errors.length > 0) {
        errorDiv.innerHTML = errors.map(e => `<p style="color:red">${e}</p>`).join("");
    } else {
        errorDiv.innerHTML = '<p style="color:green">Form submitted successfully!</p>';
    }
});
```

### 3.11 ES6+ Important Features

```javascript
// Template Literals
`Hello ${name}, you are ${age} years old`;

// Destructuring
let [a, b] = [1, 2];
let { name, age } = person;

// Spread/Rest
let merged = [...arr1, ...arr2];
function sum(...nums) { return nums.reduce((a,b) => a+b, 0); }

// Arrow Functions
const add = (a, b) => a + b;

// Promises
fetch("https://api.example.com/data")
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error(error));

// Async/Await
async function getData() {
    try {
        let response = await fetch("https://api.example.com/data");
        let data = await response.json();
        console.log(data);
    } catch (error) {
        console.error(error);
    }
}

// Map & Set
let map = new Map();
map.set("key", "value");
map.get("key");           // "value"
map.has("key");            // true
map.size;                  // 1

let set = new Set([1, 2, 2, 3, 3]);
console.log(set);          // Set {1, 2, 3}
set.add(4);
set.has(2);                // true
```

---

## 4. Practice Problems

### Problem 1: Dynamic Table from Data

```html
<!DOCTYPE html>
<html>
<head>
    <style>
        table { border-collapse: collapse; width: 100%; }
        th, td { border: 1px solid #ddd; padding: 10px; text-align: left; }
        th { background-color: #4CAF50; color: white; }
        tr:nth-child(even) { background-color: #f2f2f2; }
        tr:hover { background-color: #ddd; }
    </style>
</head>
<body>
    <h2>Employee Table</h2>
    <div id="tableContainer"></div>

    <script>
        const employees = [
            { id: 1, name: "Alice", dept: "IT", salary: 60000 },
            { id: 2, name: "Bob", dept: "HR", salary: 55000 },
            { id: 3, name: "Charlie", dept: "Finance", salary: 70000 },
            { id: 4, name: "Diana", dept: "IT", salary: 65000 }
        ];

        function createTable(data) {
            let table = document.createElement("table");
            // Header
            let thead = table.createTHead();
            let headerRow = thead.insertRow();
            Object.keys(data[0]).forEach(key => {
                let th = document.createElement("th");
                th.textContent = key.toUpperCase();
                headerRow.appendChild(th);
            });
            // Body
            let tbody = table.createTBody();
            data.forEach(emp => {
                let row = tbody.insertRow();
                Object.values(emp).forEach(val => {
                    let td = row.insertCell();
                    td.textContent = val;
                });
            });
            document.getElementById("tableContainer").appendChild(table);
        }

        createTable(employees);
    </script>
</body>
</html>
```

### Problem 2: To-Do List

```html
<!DOCTYPE html>
<html>
<head>
    <style>
        .container { max-width: 400px; margin: 50px auto; font-family: Arial; }
        input[type="text"] { width: 70%; padding: 10px; }
        button { padding: 10px 15px; background: #4CAF50; color: white; border: none; cursor: pointer; }
        ul { list-style: none; padding: 0; }
        li { padding: 10px; background: #f4f4f4; margin: 5px 0; display: flex; justify-content: space-between; }
        li.completed { text-decoration: line-through; color: #888; }
        .delete-btn { background: #f44336; color: white; border: none; cursor: pointer; padding: 5px 10px; }
    </style>
</head>
<body>
    <div class="container">
        <h2>To-Do List</h2>
        <input type="text" id="taskInput" placeholder="Add a task...">
        <button onclick="addTask()">Add</button>
        <ul id="taskList"></ul>
    </div>

    <script>
        function addTask() {
            let input = document.getElementById("taskInput");
            let text = input.value.trim();
            if (text === "") return alert("Please enter a task!");

            let li = document.createElement("li");
            li.innerHTML = `
                <span onclick="this.parentElement.classList.toggle('completed')">${text}</span>
                <button class="delete-btn" onclick="this.parentElement.remove()">✕</button>
            `;
            document.getElementById("taskList").appendChild(li);
            input.value = "";
            input.focus();
        }

        document.getElementById("taskInput").addEventListener("keypress", (e) => {
            if (e.key === "Enter") addTask();
        });
    </script>
</body>
</html>
```

### Problem 3: Calculator

```html
<!DOCTYPE html>
<html>
<head>
    <style>
        .calculator { width: 300px; margin: 50px auto; background: #333; padding: 20px; border-radius: 10px; }
        #display { width: 100%; padding: 15px; font-size: 24px; text-align: right; margin-bottom: 10px; border: none; border-radius: 5px; }
        .buttons { display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px; }
        .buttons button { padding: 15px; font-size: 18px; border: none; border-radius: 5px; cursor: pointer; }
        .buttons button:hover { opacity: 0.8; }
        .operator { background: #f39c12; color: white; }
        .number { background: #555; color: white; }
        .equals { background: #2ecc71; color: white; }
        .clear { background: #e74c3c; color: white; }
    </style>
</head>
<body>
    <div class="calculator">
        <input type="text" id="display" readonly>
        <div class="buttons">
            <button class="clear" onclick="clearDisplay()">C</button>
            <button class="operator" onclick="appendToDisplay('(')">(</button>
            <button class="operator" onclick="appendToDisplay(')')">)</button>
            <button class="operator" onclick="appendToDisplay('/')">÷</button>
            <button class="number" onclick="appendToDisplay('7')">7</button>
            <button class="number" onclick="appendToDisplay('8')">8</button>
            <button class="number" onclick="appendToDisplay('9')">9</button>
            <button class="operator" onclick="appendToDisplay('*')">×</button>
            <button class="number" onclick="appendToDisplay('4')">4</button>
            <button class="number" onclick="appendToDisplay('5')">5</button>
            <button class="number" onclick="appendToDisplay('6')">6</button>
            <button class="operator" onclick="appendToDisplay('-')">−</button>
            <button class="number" onclick="appendToDisplay('1')">1</button>
            <button class="number" onclick="appendToDisplay('2')">2</button>
            <button class="number" onclick="appendToDisplay('3')">3</button>
            <button class="operator" onclick="appendToDisplay('+')">+</button>
            <button class="number" onclick="appendToDisplay('0')" style="grid-column:span 2">0</button>
            <button class="number" onclick="appendToDisplay('.')">.</button>
            <button class="equals" onclick="calculate()">=</button>
        </div>
    </div>
    <script>
        function appendToDisplay(value) { document.getElementById("display").value += value; }
        function clearDisplay() { document.getElementById("display").value = ""; }
        function calculate() {
            try {
                document.getElementById("display").value = eval(document.getElementById("display").value);
            } catch { document.getElementById("display").value = "Error"; }
        }
    </script>
</body>
</html>
```

### Problem 4: Form with Validation & Display

```html
<!DOCTYPE html>
<html>
<head>
    <style>
        body { font-family: Arial; max-width: 500px; margin: 30px auto; }
        input, select { width: 100%; padding: 8px; margin: 5px 0 15px; box-sizing: border-box; }
        .error { color: red; font-size: 12px; }
        .success { color: green; padding: 10px; background: #e8f5e9; border-radius: 5px; }
        button { padding: 10px 20px; background: #2196F3; color: white; border: none; cursor: pointer; }
    </style>
</head>
<body>
    <h2>Registration Form</h2>
    <form id="regForm">
        <label>Name:</label>
        <input type="text" id="name" required>
        <span class="error" id="nameError"></span>

        <label>Email:</label>
        <input type="email" id="email" required>
        <span class="error" id="emailError"></span>

        <label>Age:</label>
        <input type="number" id="age" min="18" max="60" required>
        <span class="error" id="ageError"></span>

        <label>City:</label>
        <select id="city" required>
            <option value="">Select</option>
            <option value="Mumbai">Mumbai</option>
            <option value="Delhi">Delhi</option>
            <option value="Bangalore">Bangalore</option>
        </select>

        <button type="submit">Submit</button>
    </form>
    <div id="output"></div>

    <script>
        document.getElementById("regForm").addEventListener("submit", function(e) {
            e.preventDefault();
            let valid = true;
            
            // Clear errors
            document.querySelectorAll(".error").forEach(el => el.textContent = "");
            
            let name = document.getElementById("name").value.trim();
            let email = document.getElementById("email").value.trim();
            let age = parseInt(document.getElementById("age").value);
            let city = document.getElementById("city").value;
            
            if (name.length < 3) {
                document.getElementById("nameError").textContent = "Name must be 3+ characters";
                valid = false;
            }
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                document.getElementById("emailError").textContent = "Invalid email";
                valid = false;
            }
            if (isNaN(age) || age < 18 || age > 60) {
                document.getElementById("ageError").textContent = "Age must be 18-60";
                valid = false;
            }
            
            if (valid) {
                document.getElementById("output").innerHTML = `
                    <div class="success">
                        <h3>Submitted Successfully!</h3>
                        <p><b>Name:</b> ${name}</p>
                        <p><b>Email:</b> ${email}</p>
                        <p><b>Age:</b> ${age}</p>
                        <p><b>City:</b> ${city}</p>
                    </div>`;
            }
        });
    </script>
</body>
</html>
```

---

## 🔑 Quick Reference

| HTML | CSS | JavaScript |
|------|-----|------------|
| `<div>` block container | `.class` selector | `document.getElementById()` |
| `<span>` inline container | `#id` selector | `addEventListener()` |
| `<form>` forms | `display: flex` | `querySelector()` |
| `<table>` data tables | `position: relative/absolute` | `.map()`, `.filter()`, `.reduce()` |
| `<input>` user input | `@media` responsive | `e.preventDefault()` |
| `<a href="">` links | `box-sizing: border-box` | `fetch()` / `async-await` |
| `<img>` images | `transition / animation` | Template literals `` ` `` |

---

> 📌 **Assessment Tip**: The Web UI section usually asks you to build a small UI component (form, table, calculator) or fix/complete existing HTML/CSS/JS code. Practice writing complete working examples!
