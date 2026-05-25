# 🌐 HTML5 — Complete Study Guide

> **Module 1 | Digital Nurture 5.0 — Java FSE Upskilling**

---

## 📋 Topics Covered

1. [Introduction to HTML5](#1-introduction-to-html5)
2. [Getting Started — VS Code & Chrome DevTools](#2-getting-started--vs-code--chrome-devtools)
3. [Elements & Attributes](#3-elements--attributes)
4. [Navigation](#4-navigation)
5. [Events](#5-events)
6. [Web Forms 2.0](#6-web-forms-20)
7. [Web Storage](#7-web-storage)
8. [Web SQL Database](#8-web-sql-database)
9. [Geolocation API](#9-geolocation-api)
10. [Practice Questions](#10-practice-questions)

---

## 1. Introduction to HTML5

### 📌 What is HTML?

**HTML (HyperText Markup Language)** is the standard language used to create and structure content on the web. It defines the structure of a web page using a system of **tags** and **attributes**.

### Need and Benefits of HTML

| Benefit | Description |
|---------|-------------|
| **Foundation of the Web** | Every web page is built with HTML |
| **Browser Compatibility** | Supported by all web browsers |
| **SEO Friendly** | Semantic elements improve search rankings |
| **Multimedia Support** | Native audio, video, and canvas support |
| **Offline Storage** | Web Storage and Application Cache |
| **Geolocation** | Access user's geographical location |
| **Easy to Learn** | Simple tag-based syntax |

### HTML5 vs Earlier Versions

| Feature | HTML4 | HTML5 |
|---------|-------|-------|
| DOCTYPE | `<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN">` | `<!DOCTYPE html>` |
| Multimedia | Requires plugins (Flash) | Native `<audio>` and `<video>` |
| Graphics | No native support | `<canvas>` and `<svg>` |
| Storage | Cookies only | localStorage, sessionStorage |
| Semantics | `<div>` for everything | `<header>`, `<nav>`, `<section>`, etc. |
| Forms | Basic input types | email, date, range, color, etc. |
| Geolocation | Not supported | Geolocation API |

### DOCTYPE Declaration

```html
<!DOCTYPE html>
```
- **Purpose**: Tells the browser which version of HTML the page is written in
- **HTML5**: Uses the simplified `<!DOCTYPE html>`
- **Must be the first line** of every HTML document
- **Not case-sensitive** but conventionally written in uppercase

### Character Encoding

```html
<meta charset="UTF-8">
```
- **UTF-8**: Universal character encoding that supports virtually all characters and symbols
- Should be declared within the first 1024 bytes of the page
- Prevents garbled text (mojibake)

### BOM (Browser Object Model) vs DOM (Document Object Model)

| Feature | BOM | DOM |
|---------|-----|-----|
| **What** | Browser window and its properties | HTML document structure |
| **Root Object** | `window` | `document` |
| **Controls** | Browser history, location, screen, navigator | HTML elements, attributes, text |
| **Examples** | `window.alert()`, `window.location`, `navigator.userAgent` | `document.getElementById()`, `document.querySelector()` |
| **Standard** | Not fully standardized | W3C Standard |

```javascript
// BOM Examples
window.alert("Hello!");                    // Alert dialog
window.location.href;                     // Current URL
window.navigator.userAgent;               // Browser info
window.screen.width;                      // Screen width
window.history.back();                    // Go back

// DOM Examples
document.getElementById("title");         // Get element by ID
document.querySelector(".card");          // Get first element matching CSS selector
document.createElement("div");            // Create new element
```

### Including Scripts and Stylesheets

```html
<!-- External CSS (in <head>) -->
<link rel="stylesheet" href="style.css">

<!-- Inline CSS -->
<style>
    body { font-family: Arial; }
</style>

<!-- External JavaScript (before </body> for better performance) -->
<script src="script.js"></script>

<!-- Inline JavaScript -->
<script>
    console.log("Hello World");
</script>

<!-- Script with defer (loads async, executes after HTML parsing) -->
<script src="script.js" defer></script>

<!-- Script with async (loads and executes async) -->
<script src="script.js" async></script>
```

| Attribute | Loading | Execution | Use When |
|-----------|---------|-----------|----------|
| None | Blocks parsing | Immediately | Script needs to run inline |
| `defer` | Parallel with parsing | After HTML is fully parsed | Script depends on DOM |
| `async` | Parallel with parsing | As soon as downloaded | Script is independent (analytics, ads) |

### HTML5 Document Structure

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="A sample HTML5 page">
    <title>My HTML5 Page</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <header>
        <h1>Website Title</h1>
        <nav>
            <ul>
                <li><a href="#home">Home</a></li>
                <li><a href="#about">About</a></li>
                <li><a href="#contact">Contact</a></li>
            </ul>
        </nav>
    </header>

    <main>
        <section id="home">
            <h2>Welcome</h2>
            <p>This is the main content area.</p>
        </section>

        <aside>
            <h3>Sidebar</h3>
            <p>Additional information here.</p>
        </aside>
    </main>

    <footer>
        <p>&copy; 2026 My Website</p>
    </footer>

    <script src="script.js"></script>
</body>
</html>
```

### HTML Comments

```html
<!-- This is a single-line comment -->

<!--
    This is a
    multi-line comment
-->

<!-- Comments are NOT displayed in the browser -->
<!-- Use comments to explain your code or temporarily disable elements -->
```

---

## 2. Getting Started — VS Code & Chrome DevTools

### Visual Studio Code Features

| Feature | Description | Shortcut |
|---------|-------------|----------|
| **Emmet Abbreviations** | Type `!` + Tab for HTML boilerplate | `!` + `Tab` |
| **IntelliSense** | Auto-complete for HTML tags and attributes | Auto |
| **Live Server** | Preview changes in real-time | Right-click → "Open with Live Server" |
| **Multi-cursor** | Edit multiple lines simultaneously | `Alt + Click` |
| **Format Document** | Auto-indent and format code | `Shift + Alt + F` |
| **Toggle Comment** | Comment/uncomment selected lines | `Ctrl + /` |
| **Peek Definition** | See CSS definitions inline | `Alt + F12` |

### Essential VS Code Extensions for HTML/CSS/JS

| Extension | Purpose |
|-----------|---------|
| **Live Server** | Auto-reload browser on file save |
| **Prettier** | Code formatter |
| **HTML CSS Support** | CSS IntelliSense in HTML files |
| **Auto Rename Tag** | Rename paired HTML tags together |
| **Path Intellisense** | Auto-complete file paths |

### Google Chrome Developer Tools

**Opening DevTools:**
- `F12` or `Ctrl + Shift + I` (Windows)
- Right-click → "Inspect"

| Tab | Purpose |
|-----|---------|
| **Elements** | Inspect/edit HTML and CSS live |
| **Console** | Run JavaScript, view errors and logs |
| **Sources** | View source files, set breakpoints |
| **Network** | Monitor network requests, loading times |
| **Application** | View localStorage, sessionStorage, cookies |
| **Performance** | Analyze page rendering performance |
| **Lighthouse** | Run audits for performance, SEO, accessibility |

### Inspect Document

```
1. Right-click any element on a web page → "Inspect"
2. The Elements panel highlights the selected element's HTML
3. You can:
   - Edit HTML directly (double-click text)
   - Modify CSS styles in the Styles pane
   - Toggle CSS properties on/off with checkboxes
   - Add new CSS rules
   - View computed styles (final calculated values)
   - Check the box model (margin, border, padding, content)
```

---

## 3. Elements & Attributes

### Formatting Tags

```html
<!-- Headings (h1 = largest, h6 = smallest) -->
<h1>Heading 1</h1>
<h2>Heading 2</h2>
<h3>Heading 3</h3>
<h4>Heading 4</h4>
<h5>Heading 5</h5>
<h6>Heading 6</h6>

<!-- Paragraph -->
<p>This is a paragraph of text.</p>

<!-- Bold and Strong -->
<b>Bold text (visual only)</b>
<strong>Strong text (semantic emphasis)</strong>

<!-- Italic and Emphasis -->
<i>Italic text (visual only)</i>
<em>Emphasized text (semantic)</em>

<!-- Other formatting -->
<u>Underlined text</u>
<s>Strikethrough text</s>
<del>Deleted text (semantic)</del>
<ins>Inserted text (semantic)</ins>
<sub>Subscript</sub> H<sub>2</sub>O
<sup>Superscript</sup> x<sup>2</sup>
<mark>Highlighted text</mark>
<small>Small text</small>
<code>Inline code</code>
<pre>Preformatted text (preserves whitespace)</pre>
<blockquote>Block quotation</blockquote>
<abbr title="HyperText Markup Language">HTML</abbr>
<hr> <!-- Horizontal rule / line -->
<br> <!-- Line break -->
```

### Lists

```html
<!-- Unordered List -->
<ul>
    <li>Item 1</li>
    <li>Item 2</li>
    <li>Item 3</li>
</ul>

<!-- Ordered List -->
<ol type="1">        <!-- 1, 2, 3 (default) -->
    <li>First</li>
    <li>Second</li>
    <li>Third</li>
</ol>
<ol type="A">        <!-- A, B, C -->
<ol type="a">        <!-- a, b, c -->
<ol type="I">        <!-- I, II, III -->
<ol type="i">        <!-- i, ii, iii -->
<ol start="5">       <!-- Start from 5 -->

<!-- Description List -->
<dl>
    <dt>HTML</dt>
    <dd>HyperText Markup Language</dd>
    <dt>CSS</dt>
    <dd>Cascading Style Sheets</dd>
</dl>

<!-- Nested List -->
<ul>
    <li>Fruits
        <ul>
            <li>Apple</li>
            <li>Banana</li>
        </ul>
    </li>
    <li>Vegetables
        <ul>
            <li>Carrot</li>
            <li>Potato</li>
        </ul>
    </li>
</ul>
```

### Tables

```html
<table border="1">
    <caption>Student Marks</caption>
    <thead>
        <tr>
            <th>Name</th>
            <th>Subject</th>
            <th>Marks</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>Alice</td>
            <td>Math</td>
            <td>95</td>
        </tr>
        <tr>
            <td>Bob</td>
            <td>Science</td>
            <td>88</td>
        </tr>
    </tbody>
    <tfoot>
        <tr>
            <td colspan="2">Average</td>
            <td>91.5</td>
        </tr>
    </tfoot>
</table>

<!-- Cell Spanning -->
<td colspan="2">Spans 2 columns</td>
<td rowspan="3">Spans 3 rows</td>
```

| Element | Purpose |
|---------|---------|
| `<table>` | Defines a table |
| `<caption>` | Table title/caption |
| `<thead>` | Table header group |
| `<tbody>` | Table body group |
| `<tfoot>` | Table footer group |
| `<tr>` | Table row |
| `<th>` | Header cell (bold, centered by default) |
| `<td>` | Data cell |
| `colspan` | Span across multiple columns |
| `rowspan` | Span across multiple rows |

### Forms & Input Tags

```html
<form action="/submit" method="POST" id="myForm">
    <!-- Text Input -->
    <label for="name">Name:</label>
    <input type="text" id="name" name="name" placeholder="Enter name" required>

    <!-- Email -->
    <label for="email">Email:</label>
    <input type="email" id="email" name="email" required>

    <!-- Password -->
    <label for="pass">Password:</label>
    <input type="password" id="pass" name="password" minlength="8">

    <!-- Number -->
    <label for="age">Age:</label>
    <input type="number" id="age" name="age" min="18" max="100" step="1">

    <!-- Date -->
    <input type="date" name="dob">

    <!-- Radio Buttons -->
    <input type="radio" id="male" name="gender" value="male">
    <label for="male">Male</label>
    <input type="radio" id="female" name="gender" value="female">
    <label for="female">Female</label>

    <!-- Checkbox -->
    <input type="checkbox" id="agree" name="terms">
    <label for="agree">I agree</label>

    <!-- Dropdown -->
    <select name="city">
        <option value="" disabled selected>Select City</option>
        <option value="mumbai">Mumbai</option>
        <option value="delhi">Delhi</option>
    </select>

    <!-- Textarea -->
    <textarea name="message" rows="4" cols="50" maxlength="500"></textarea>

    <!-- File Upload -->
    <input type="file" name="resume" accept=".pdf,.doc">

    <!-- Hidden Field -->
    <input type="hidden" name="formType" value="registration">

    <!-- Submit & Reset -->
    <button type="submit">Submit</button>
    <button type="reset">Clear</button>
</form>
```

### Images

```html
<!-- Basic Image -->
<img src="photo.jpg" alt="Description of image" width="300" height="200">

<!-- Figure with Caption -->
<figure>
    <img src="chart.png" alt="Sales chart">
    <figcaption>Fig 1: Annual sales chart</figcaption>
</figure>

<!-- Responsive Image -->
<img src="photo.jpg" alt="Photo" style="max-width:100%; height:auto;">
```

> **`alt` attribute**: Always include it — provides text description for screen readers and when images fail to load.

### Inline vs Block Elements

| Block Elements | Inline Elements |
|---------------|-----------------|
| Take full available width | Take only needed width |
| Start on a new line | Stay in the same line |
| Can contain inline elements | Cannot contain block elements |
| `<div>`, `<p>`, `<h1>`-`<h6>`, `<section>`, `<ul>`, `<table>`, `<form>` | `<span>`, `<a>`, `<strong>`, `<em>`, `<img>`, `<input>`, `<br>`, `<code>` |

```html
<!-- Block Element -->
<div style="background: lightblue;">This takes full width</div>
<p>This starts on a new line</p>

<!-- Inline Element -->
<span style="background: lightyellow;">This only takes needed width</span>
<a href="#">This stays inline</a>
```

### `id` vs `class` Attributes

| Feature | `id` | `class` |
|---------|------|---------|
| **Uniqueness** | Must be unique per page | Can be used multiple times |
| **CSS Selector** | `#myId` | `.myClass` |
| **JS Access** | `getElementById("myId")` | `getElementsByClassName("myClass")` |
| **Specificity** | Higher (100) | Lower (10) |
| **Usage** | One specific element | Group of similar elements |

```html
<!-- id — unique identifier -->
<div id="header">This is the only header</div>

<!-- class — reusable -->
<p class="highlight">Highlighted paragraph 1</p>
<p class="highlight">Highlighted paragraph 2</p>

<!-- Element can have both id and multiple classes -->
<div id="main-content" class="container dark-theme">Content</div>
```

### Common HTML5 Attributes

| Attribute | Purpose | Example |
|-----------|---------|---------|
| `id` | Unique identifier | `<div id="header">` |
| `class` | CSS class name(s) | `<p class="text-bold">` |
| `style` | Inline CSS styles | `<p style="color:red;">` |
| `title` | Tooltip text on hover | `<abbr title="HTML">HTML</abbr>` |
| `hidden` | Hides the element | `<div hidden>Hidden</div>` |
| `data-*` | Custom data attributes | `<div data-user-id="123">` |
| `contenteditable` | Makes content editable | `<p contenteditable="true">` |
| `draggable` | Makes element draggable | `<img draggable="true">` |
| `tabindex` | Tab order | `<input tabindex="1">` |

---

## 4. Navigation

### Navigation Tags

```html
<!-- Basic Navigation -->
<nav>
    <ul>
        <li><a href="index.html">Home</a></li>
        <li><a href="about.html">About</a></li>
        <li><a href="services.html">Services</a></li>
        <li><a href="contact.html">Contact</a></li>
    </ul>
</nav>

<!-- Breadcrumb Navigation -->
<nav aria-label="breadcrumb">
    <ol>
        <li><a href="/">Home</a></li>
        <li><a href="/products">Products</a></li>
        <li>Laptop</li>  <!-- Current page (no link) -->
    </ol>
</nav>
```

### Hyperlinks

```html
<!-- External Link (opens in new tab) -->
<a href="https://www.google.com" target="_blank" rel="noopener noreferrer">Google</a>

<!-- Internal Link (same site) -->
<a href="about.html">About Us</a>

<!-- Email Link -->
<a href="mailto:info@example.com">Email Us</a>

<!-- Phone Link -->
<a href="tel:+919876543210">Call Us</a>

<!-- Download Link -->
<a href="document.pdf" download>Download PDF</a>
```

| Target Value | Behavior |
|-------------|----------|
| `_self` | Opens in same tab (default) |
| `_blank` | Opens in new tab |
| `_parent` | Opens in parent frame |
| `_top` | Opens in full window |

### Reference to Intermediate Section (Anchors)

```html
<!-- Create anchor targets using id -->
<section id="introduction">
    <h2>Introduction</h2>
    <p>Welcome to our website.</p>
</section>

<section id="features">
    <h2>Features</h2>
    <p>Here are our key features.</p>
</section>

<section id="contact">
    <h2>Contact</h2>
    <p>Get in touch with us.</p>
</section>

<!-- Navigation links that jump to sections -->
<nav>
    <a href="#introduction">Go to Introduction</a>
    <a href="#features">Go to Features</a>
    <a href="#contact">Go to Contact</a>
    <a href="#">Back to Top</a>
</nav>
```

### HTML5 Semantic Sectioning Elements

```html
<body>
    <header>        <!-- Page or section header -->
        <nav>       <!-- Navigation links -->
        </nav>
    </header>

    <main>          <!-- Main unique content (one per page) -->
        <article>   <!-- Self-contained content (blog post, news) -->
            <section>   <!-- Thematic group of content -->
            </section>
        </article>

        <aside>     <!-- Side content (sidebar, related links) -->
        </aside>
    </main>

    <footer>        <!-- Page or section footer -->
    </footer>
</body>
```

---

## 5. Events

### 📌 Definition

**HTML Events** are actions or occurrences that happen in the browser (user clicks, page loads, key presses, etc.). JavaScript can "listen" for these events and execute code in response.

### Mouse Events

| Event | Triggers When |
|-------|--------------|
| `onclick` | Element is clicked |
| `ondblclick` | Element is double-clicked |
| `onmousedown` | Mouse button is pressed down |
| `onmouseup` | Mouse button is released |
| `onmouseover` | Mouse moves over element |
| `onmouseout` | Mouse leaves element |
| `onmousemove` | Mouse moves while over element |
| `oncontextmenu` | Right-click context menu |

```html
<!-- onclick -->
<button onclick="alert('Button clicked!')">Click Me</button>

<!-- ondblclick -->
<p ondblclick="this.style.color='red'">Double-click to turn red</p>

<!-- onmouseover / onmouseout -->
<div onmouseover="this.style.background='yellow'"
     onmouseout="this.style.background='white'">
    Hover over me!
</div>
```

### Keyboard Events

| Event | Triggers When |
|-------|--------------|
| `onkeydown` | Key is pressed down |
| `onkeyup` | Key is released |
| `onkeypress` | Key is pressed (deprecated, use `onkeydown`) |

```html
<input type="text" onkeydown="console.log('Key down:', event.key)"
                   onkeyup="console.log('Key up:', event.key)">

<script>
    // Detecting specific keys
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
            console.log('Enter was pressed');
        }
        if (e.ctrlKey && e.key === 's') {
            e.preventDefault(); // Prevent browser's save dialog
            console.log('Ctrl+S pressed');
        }
    });
</script>
```

### Form Events

| Event | Triggers When |
|-------|--------------|
| `onsubmit` | Form is submitted |
| `onreset` | Form is reset |
| `oninput` | Input value changes (real-time) |
| `onchange` | Input value changes (on blur) |
| `onfocus` | Element gains focus |
| `onblur` | Element loses focus |
| `oninvalid` | Input fails validation |

```html
<form onsubmit="return validateForm()" onreset="console.log('Form reset')">
    <input type="text" id="username"
           onfocus="this.style.borderColor='blue'"
           onblur="this.style.borderColor='gray'"
           oninput="showLength(this.value)"
           onchange="console.log('Value changed to:', this.value)">

    <input type="email" required oninvalid="this.setCustomValidity('Please enter a valid email')">

    <button type="submit">Submit</button>
</form>

<script>
    function validateForm() {
        let username = document.getElementById('username').value;
        if (username.length < 3) {
            alert('Username must be at least 3 characters');
            return false; // Prevent form submission
        }
        return true; // Allow submission
    }

    function showLength(value) {
        console.log('Current length:', value.length);
    }
</script>
```

### Load Events

| Event | Triggers When |
|-------|--------------|
| `onload` | Page or element has fully loaded |
| `onunload` | Page is being unloaded (navigating away) |
| `onbeforeunload` | Before the page is unloaded |
| `onresize` | Browser window is resized |
| `onscroll` | Page or element is scrolled |

```html
<body onload="init()" onresize="handleResize()">
    <img src="photo.jpg" onload="console.log('Image loaded')"
                         onerror="console.log('Image failed to load')">
</body>

<script>
    function init() {
        console.log('Page fully loaded!');
    }

    window.onbeforeunload = function() {
        return "Are you sure you want to leave?";
    };

    window.onscroll = function() {
        console.log('Scroll position:', window.scrollY);
    };

    function handleResize() {
        console.log('Window size:', window.innerWidth, 'x', window.innerHeight);
    }
</script>
```

### Media Events

| Event | Triggers When |
|-------|--------------|
| `oncanplay` | Media can start playing |
| `onplay` | Media starts playing |
| `onpause` | Media is paused |
| `onended` | Media has finished playing |
| `ontimeupdate` | Playback position changes |
| `onvolumechange` | Volume changes |

```html
<video id="myVideo" controls
       oncanplay="console.log('Video ready to play')"
       onplay="console.log('Video started')"
       onpause="console.log('Video paused')"
       onended="console.log('Video ended')">
    <source src="video.mp4" type="video/mp4">
</video>
```

### Adding Event Listeners (Best Practice)

```html
<button id="myBtn">Click Me</button>

<script>
    // Method 1: HTML attribute (inline) — avoid for large projects
    // <button onclick="handleClick()">

    // Method 2: DOM property
    document.getElementById('myBtn').onclick = function() {
        console.log('Clicked!');
    };

    // Method 3: addEventListener (RECOMMENDED)
    document.getElementById('myBtn').addEventListener('click', function(e) {
        console.log('Clicked!', e.target);
    });

    // Remove event listener
    function handleClick() { console.log('Clicked!'); }
    document.getElementById('myBtn').addEventListener('click', handleClick);
    document.getElementById('myBtn').removeEventListener('click', handleClick);
</script>
```

---

## 6. Web Forms 2.0

### 📌 HTML5 Input Types

HTML5 introduced many new input types with **built-in validation** and **specialized UI** (like date pickers, color pickers, etc.).

```html
<form>
    <!-- Email (validates email format) -->
    <input type="email" placeholder="user@example.com" required>

    <!-- URL (validates URL format) -->
    <input type="url" placeholder="https://example.com">

    <!-- Tel (phone keyboard on mobile) -->
    <input type="tel" pattern="[0-9]{10}" placeholder="9876543210">

    <!-- Number (spinner control) -->
    <input type="number" min="0" max="100" step="5" value="50">

    <!-- Range (slider) -->
    <input type="range" min="0" max="100" value="50" id="slider">
    <output for="slider">50</output>

    <!-- Date / Time pickers -->
    <input type="date">           <!-- Date picker -->
    <input type="time">           <!-- Time picker -->
    <input type="datetime-local">  <!-- Date + Time -->
    <input type="month">          <!-- Month picker -->
    <input type="week">           <!-- Week picker -->

    <!-- Color picker -->
    <input type="color" value="#ff0000">

    <!-- Search (with clear button in some browsers) -->
    <input type="search" placeholder="Search...">
</form>
```

### The `<output>` Element

```html
<!-- output displays the result of a calculation -->
<form oninput="result.value = parseInt(a.value) + parseInt(b.value)">
    <input type="number" id="a" value="10"> +
    <input type="number" id="b" value="20"> =
    <output name="result" for="a b">30</output>
</form>

<!-- Range slider with output -->
<form oninput="vol.value = volume.value">
    <label>Volume:</label>
    <input type="range" id="volume" name="volume" min="0" max="100" value="50">
    <output name="vol">50</output>
</form>
```

### Important Form Attributes

| Attribute | Purpose | Example |
|-----------|---------|---------|
| `placeholder` | Hint text inside the input | `<input placeholder="Enter name">` |
| `autofocus` | Automatically focuses on page load | `<input autofocus>` |
| `required` | Field must be filled before submission | `<input required>` |
| `pattern` | Regex pattern for validation | `<input pattern="[A-Za-z]{3,}">` |
| `min` / `max` | Minimum/maximum values | `<input type="number" min="0" max="100">` |
| `minlength` / `maxlength` | Min/max character length | `<input minlength="3" maxlength="50">` |
| `autocomplete` | Enable/disable autocomplete | `<input autocomplete="off">` |
| `readonly` | Value cannot be changed | `<input readonly>` |
| `disabled` | Element is disabled | `<input disabled>` |
| `multiple` | Allow multiple values | `<input type="file" multiple>` |
| `novalidate` | Skip form validation | `<form novalidate>` |
| `formaction` | Override form's action URL | `<button formaction="/other">` |

```html
<form>
    <!-- autofocus — cursor goes here on page load -->
    <input type="text" autofocus placeholder="This field is auto-focused">

    <!-- required — must be filled -->
    <input type="text" required placeholder="This is required">

    <!-- pattern — regex validation -->
    <input type="text" pattern="[A-Za-z]{3,}" title="Minimum 3 letters, no numbers">

    <!-- placeholder — hint text -->
    <input type="email" placeholder="you@example.com">

    <!-- autocomplete off -->
    <input type="password" autocomplete="off">

    <button type="submit">Submit</button>
</form>
```

### Datalist (Autocomplete Suggestions)

```html
<label for="browser">Choose browser:</label>
<input list="browsers" id="browser" name="browser">

<datalist id="browsers">
    <option value="Chrome">
    <option value="Firefox">
    <option value="Safari">
    <option value="Edge">
    <option value="Opera">
</datalist>
```

---

## 7. Web Storage

### 📌 Definition

**Web Storage** allows web applications to store data locally in the user's browser. It provides two mechanisms: **localStorage** and **sessionStorage**.

### localStorage vs sessionStorage

| Feature | localStorage | sessionStorage |
|---------|-------------|----------------|
| **Lifetime** | Persists until explicitly deleted | Cleared when tab/window is closed |
| **Scope** | Shared across all tabs of same origin | Per tab/window only |
| **Storage Limit** | ~5-10 MB | ~5-10 MB |
| **Survives refresh** | ✅ Yes | ✅ Yes |
| **Survives tab close** | ✅ Yes | ❌ No |

### Web Storage vs Cookies

| Feature | Web Storage | Cookies |
|---------|------------|---------|
| **Storage Limit** | ~5-10 MB | ~4 KB |
| **Sent to Server** | ❌ No | ✅ Yes (every HTTP request) |
| **API** | Simple JS API | Complex string manipulation |
| **Expiration** | Manual or on session end | Configurable expiry date |

### localStorage — Persistent Storage

```javascript
// ===== STORE DATA =====
localStorage.setItem("username", "Dilip");
localStorage.setItem("theme", "dark");
localStorage.setItem("age", "22");

// Store objects (must convert to JSON string)
const user = { name: "Dilip", role: "Developer" };
localStorage.setItem("user", JSON.stringify(user));

// ===== RETRIEVE DATA =====
let username = localStorage.getItem("username");    // "Dilip"
let theme = localStorage.getItem("theme");           // "dark"

// Retrieve objects (must parse JSON)
let storedUser = JSON.parse(localStorage.getItem("user"));
console.log(storedUser.name);  // "Dilip"

// ===== REMOVE DATA =====
localStorage.removeItem("theme");        // Remove one item

// ===== CLEAR ALL DATA =====
localStorage.clear();                     // Remove everything

// ===== OTHER USEFUL PROPERTIES =====
localStorage.length;                      // Number of stored items
localStorage.key(0);                      // Get key name by index
```

### sessionStorage — Session-Only Storage

```javascript
// Same API as localStorage, but data is session-scoped

// Store
sessionStorage.setItem("sessionId", "abc123");
sessionStorage.setItem("cart", JSON.stringify(["item1", "item2"]));

// Retrieve
let sessionId = sessionStorage.getItem("sessionId");    // "abc123"
let cart = JSON.parse(sessionStorage.getItem("cart"));   // ["item1", "item2"]

// Remove
sessionStorage.removeItem("sessionId");

// Clear all
sessionStorage.clear();
```

### Practical Example — Theme Toggle

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <title>Theme Toggle</title>
    <style>
        body.dark { background: #333; color: #fff; }
        body.light { background: #fff; color: #333; }
    </style>
</head>
<body>
    <h1>Theme Toggle Example</h1>
    <button onclick="toggleTheme()">Toggle Theme</button>

    <script>
        // Load saved theme on page load
        window.onload = function() {
            let savedTheme = localStorage.getItem("theme") || "light";
            document.body.className = savedTheme;
        };

        function toggleTheme() {
            let currentTheme = document.body.className;
            let newTheme = (currentTheme === "light") ? "dark" : "light";
            document.body.className = newTheme;
            localStorage.setItem("theme", newTheme);  // Persist choice
        }
    </script>
</body>
</html>
```

### Checking Storage Support

```javascript
if (typeof(Storage) !== "undefined") {
    // Web Storage is supported
    localStorage.setItem("key", "value");
} else {
    // No Web Storage support
    alert("Your browser does not support Web Storage.");
}
```

---

## 8. Web SQL Database

### 📌 Definition

**Web SQL Database** is a web page API for storing data in databases that can be queried using SQL. It provides a relational database on the client side.

> ⚠️ **Note**: Web SQL is **deprecated** and not supported in all browsers (not supported in Firefox). For modern applications, use **IndexedDB** instead. However, it may appear in assessments.

### Core Methods

| Method | Purpose |
|--------|---------|
| `openDatabase()` | Opens or creates a database |
| `transaction()` | Starts a transaction (group of SQL operations) |
| `executeSql()` | Executes a SQL statement within a transaction |

### Working with Web SQL

```javascript
// 1. Open (or create) a database
// openDatabase(name, version, description, size)
var db = openDatabase('myDB', '1.0', 'My Test Database', 2 * 1024 * 1024); // 2MB

// 2. Create a table
db.transaction(function(tx) {
    tx.executeSql('CREATE TABLE IF NOT EXISTS students (id INTEGER PRIMARY KEY, name TEXT, marks INTEGER)');
});

// 3. Insert data
db.transaction(function(tx) {
    tx.executeSql('INSERT INTO students (name, marks) VALUES (?, ?)', ['Alice', 95]);
    tx.executeSql('INSERT INTO students (name, marks) VALUES (?, ?)', ['Bob', 88]);
    tx.executeSql('INSERT INTO students (name, marks) VALUES (?, ?)', ['Charlie', 72]);
});

// 4. Read data
db.transaction(function(tx) {
    tx.executeSql('SELECT * FROM students', [], function(tx, results) {
        var len = results.rows.length;
        for (var i = 0; i < len; i++) {
            var row = results.rows.item(i);
            console.log(row.id + ' - ' + row.name + ' - ' + row.marks);
        }
    });
});

// 5. Update data
db.transaction(function(tx) {
    tx.executeSql('UPDATE students SET marks = ? WHERE name = ?', [98, 'Alice']);
});

// 6. Delete data
db.transaction(function(tx) {
    tx.executeSql('DELETE FROM students WHERE name = ?', ['Charlie']);
});
```

### openDatabase Parameters

| Parameter | Description |
|-----------|-------------|
| `name` | Database name |
| `version` | Version number (string) |
| `description` | Human-readable description |
| `size` | Estimated size in bytes |

---

## 9. Geolocation API

### 📌 Definition

The **HTML5 Geolocation API** allows web applications to access the user's geographical location. The user must **grant permission** before the location can be accessed.

### Geolocation Methods

| Method | Purpose |
|--------|---------|
| `getCurrentPosition()` | Gets the current position once |
| `watchPosition()` | Continuously monitors position changes |
| `clearWatch()` | Stops watching position |

### Getting Current Position

```javascript
// Check if Geolocation is supported
if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition, showError, options);
} else {
    console.log("Geolocation is not supported by this browser.");
}

// Success callback
function showPosition(position) {
    console.log("Latitude: " + position.coords.latitude);
    console.log("Longitude: " + position.coords.longitude);
    console.log("Accuracy: " + position.coords.accuracy + " meters");
    console.log("Altitude: " + position.coords.altitude);
    console.log("Speed: " + position.coords.speed);
    console.log("Timestamp: " + position.timestamp);
}
```

### Location Properties (position.coords)

| Property | Description |
|----------|-------------|
| `latitude` | Latitude in decimal degrees |
| `longitude` | Longitude in decimal degrees |
| `accuracy` | Accuracy of position in meters |
| `altitude` | Altitude in meters (may be null) |
| `altitudeAccuracy` | Accuracy of altitude in meters |
| `heading` | Direction of travel in degrees (0 = North) |
| `speed` | Speed in meters per second |

### Handling Errors

```javascript
function showError(error) {
    switch (error.code) {
        case error.PERMISSION_DENIED:
            console.log("User denied the request for Geolocation.");
            break;
        case error.POSITION_UNAVAILABLE:
            console.log("Location information is unavailable.");
            break;
        case error.TIMEOUT:
            console.log("The request to get user location timed out.");
            break;
        case error.UNKNOWN_ERROR:
            console.log("An unknown error occurred.");
            break;
    }
}
```

| Error Code | Constant | Description |
|-----------|----------|-------------|
| 1 | `PERMISSION_DENIED` | User denied location access |
| 2 | `POSITION_UNAVAILABLE` | Location info not available |
| 3 | `TIMEOUT` | Request timed out |

### Position Options

```javascript
var options = {
    enableHighAccuracy: true,   // Use GPS for more accurate results
    timeout: 5000,              // Maximum time to wait (milliseconds)
    maximumAge: 0               // Don't use cached position (0 = always fresh)
};

navigator.geolocation.getCurrentPosition(showPosition, showError, options);
```

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `enableHighAccuracy` | Boolean | `false` | Use GPS (more accurate, slower, more battery) |
| `timeout` | Number | Infinity | Max time to wait for position (ms) |
| `maximumAge` | Number | 0 | Accept cached position up to this age (ms) |

### Watching Position (Continuous Tracking)

```javascript
// Start watching
var watchId = navigator.geolocation.watchPosition(
    function(position) {
        console.log("Lat: " + position.coords.latitude);
        console.log("Lng: " + position.coords.longitude);
    },
    function(error) {
        console.log("Error: " + error.message);
    },
    { enableHighAccuracy: true }
);

// Stop watching
navigator.geolocation.clearWatch(watchId);
```

### Practical Example — Display Location on Page

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <title>Geolocation Demo</title>
</head>
<body>
    <h1>My Location</h1>
    <button onclick="getLocation()">Get My Location</button>
    <p id="output"></p>

    <script>
        function getLocation() {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    function(pos) {
                        document.getElementById("output").innerHTML =
                            "Latitude: " + pos.coords.latitude + "<br>" +
                            "Longitude: " + pos.coords.longitude + "<br>" +
                            "Accuracy: " + pos.coords.accuracy + " meters";
                    },
                    function(err) {
                        document.getElementById("output").innerHTML =
                            "Error: " + err.message;
                    },
                    { enableHighAccuracy: true, timeout: 10000 }
                );
            } else {
                document.getElementById("output").innerHTML =
                    "Geolocation is not supported.";
            }
        }
    </script>
</body>
</html>
```

---

## 10. Practice Questions

### Multiple Choice Questions

**Q1.** What does the `<!DOCTYPE html>` declaration do?
- a) It defines the HTML version as HTML5 ✅
- b) It creates a new HTML element
- c) It links to an external CSS file
- d) It starts the body section

**Q2.** Which of the following is NOT a semantic HTML5 element?
- a) `<header>`
- b) `<div>` ✅
- c) `<article>`
- d) `<section>`

**Q3.** What is the difference between `localStorage` and `sessionStorage`?
- a) localStorage is faster
- b) sessionStorage has more storage space
- c) localStorage persists after browser close, sessionStorage doesn't ✅
- d) There is no difference

**Q4.** Which input type provides a built-in date picker?
- a) `<input type="calendar">`
- b) `<input type="date">` ✅
- c) `<input type="datetime">`
- d) `<input type="picker">`

**Q5.** What does the `alt` attribute on an `<img>` tag do?
- a) Sets the image alignment
- b) Provides alternative text for screen readers and when images fail to load ✅
- c) Sets the image altitude
- d) Links to an alternate image source

**Q6.** Which HTML5 API is used to get the user's geographical location?
- a) Google Maps API
- b) Geolocation API ✅
- c) GPS API
- d) Location API

**Q7.** What is the `onblur` event?
- a) When an element is clicked
- b) When an element loses focus ✅
- c) When a page loads
- d) When a mouse hovers over an element

**Q8.** Which method is used to open a Web SQL database?
- a) `createDatabase()`
- b) `openDatabase()` ✅
- c) `newDatabase()`
- d) `initDatabase()`

**Q9.** What is the maximum storage capacity of `localStorage`?
- a) 4 KB
- b) 1 MB
- c) ~5-10 MB ✅
- d) Unlimited

**Q10.** What attribute makes an input field receive focus when the page loads?
- a) `focus`
- b) `autofocus` ✅
- c) `auto`
- d) `selected`

**Q11.** In the BOM vs DOM, what is the root object of the BOM?
- a) `document`
- b) `window` ✅
- c) `navigator`
- d) `screen`

**Q12.** What does the `defer` attribute on a `<script>` tag do?
- a) The script loads and executes immediately
- b) The script loads in parallel and executes after HTML parsing ✅
- c) The script is disabled
- d) The script loads synchronously

**Q13.** Which is an inline element?
- a) `<div>`
- b) `<p>`
- c) `<span>` ✅
- d) `<section>`

**Q14.** What is `colspan` used for in a table?
- a) To merge rows
- b) To merge columns ✅
- c) To add borders
- d) To change column color

**Q15.** Which `error.code` value represents "User denied location access"?
- a) 0
- b) 1 (PERMISSION_DENIED) ✅
- c) 2
- d) 3

---

> ✅ **HTML5 Complete!** Next: [CSS3 →](../02_CSS3/README.md)
