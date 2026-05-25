# 🎨 CSS3 — Complete Study Guide

> **Module 1 | Digital Nurture 5.0 — Java FSE Upskilling**

---

## 📋 Topics Covered

1. [Introduction to CSS](#1-introduction-to-css)
2. [Selectors](#2-selectors)
3. [Styling Properties](#3-styling-properties)
4. [Box Model](#4-box-model)
5. [Advanced — Media Queries & RWD](#5-advanced--media-queries--rwd)
6. [Practice Questions](#6-practice-questions)

---

## 1. Introduction to CSS

### 📌 What is CSS?

**CSS (Cascading Style Sheets)** is a language used to describe the visual presentation of HTML elements — colors, layout, fonts, spacing, and animations.

### Need and Benefits of CSS

| Benefit | Description |
|---------|-------------|
| **Separation of Concerns** | Content (HTML) is separated from presentation (CSS) |
| **Reusability** | One stylesheet can style multiple pages |
| **Consistency** | Uniform look across the entire website |
| **Maintainability** | Change styles in one place, reflected everywhere |
| **Performance** | External CSS files are cached by the browser |
| **Responsive Design** | Adapt layouts for different screen sizes |
| **Accessibility** | Better control over visual presentation for all users |

### CSS Syntax

```css
selector {
    property: value;
    property: value;
}

/* Example */
h1 {
    color: #333;
    font-size: 24px;
    text-align: center;
}
```

| Part | Description | Example |
|------|-------------|---------|
| **Selector** | Targets HTML element(s) to style | `h1`, `.card`, `#header` |
| **Property** | The style aspect to change | `color`, `font-size`, `margin` |
| **Value** | The setting for the property | `red`, `16px`, `10px 20px` |
| **Declaration** | One property-value pair | `color: red;` |
| **Declaration Block** | Group of declarations in `{}` | `{ color: red; font-size: 16px; }` |

### CSS Comments

```css
/* This is a single-line comment */

/*
   This is a
   multi-line comment
*/

/* Comments are ignored by the browser */
/* Use them to explain your code or temporarily disable styles */
```

### Including CSS in HTML (3 Methods)

#### 1. Inline Styles (directly on element)

```html
<p style="color: red; font-size: 18px;">This is red text.</p>
```
- **Highest specificity** (overrides most other styles)
- ❌ Not reusable, hard to maintain
- Use sparingly (only for one-off overrides)

#### 2. Embedded / Internal Styles (`<style>` in `<head>`)

```html
<head>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f5f5f5;
        }
        h1 {
            color: #333;
        }
        .highlight {
            background-color: yellow;
        }
    </style>
</head>
```
- Applies to the **single page** only
- Good for page-specific styles
- ❌ Not reusable across pages

#### 3. External Stylesheet (separate `.css` file — RECOMMENDED)

```html
<!-- In HTML <head> -->
<link rel="stylesheet" href="style.css">
```

```css
/* style.css */
body {
    font-family: Arial, sans-serif;
    margin: 0;
    padding: 0;
}

h1 {
    color: #2c3e50;
    text-align: center;
}
```
- ✅ Reusable across multiple pages
- ✅ Cached by browser (faster loading)
- ✅ Clean separation of HTML and CSS
- **Best practice for real projects**

### CSS Precedence (Cascade Order)

```
1. !important          → Highest priority (avoid overusing)
2. Inline styles       → style="..."
3. ID selectors        → #header
4. Class selectors     → .card
5. Element selectors   → p, h1
6. Browser defaults    → Lowest priority
```

> If two rules have equal specificity, the **last one defined** wins.

---

## 2. Selectors

### 📌 Definition

**CSS Selectors** are patterns used to target and style specific HTML elements.

### Universal Selector

```css
/* Targets ALL elements */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}
```

### Element Type Selector

```css
/* Targets all elements of that type */
p {
    color: #333;
    line-height: 1.6;
}

h1 {
    font-size: 32px;
}

a {
    text-decoration: none;
}
```

### ID Selector (`#`)

```css
/* Targets ONE unique element by its id attribute */
#header {
    background-color: #2c3e50;
    color: white;
    padding: 20px;
}

#main-content {
    max-width: 1200px;
    margin: 0 auto;
}
```

```html
<div id="header">This is the header</div>
```

> ⚠️ Each `id` should be **unique** on the page. Use `class` for repeated styles.

### Class Selector (`.`)

```css
/* Targets all elements with that class */
.card {
    background: white;
    border-radius: 8px;
    padding: 20px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.text-center {
    text-align: center;
}

.text-bold {
    font-weight: bold;
}
```

```html
<div class="card text-center">Card 1</div>
<div class="card text-bold">Card 2</div>
```

### Grouping Selectors

```css
/* Apply same styles to multiple selectors */
h1, h2, h3 {
    font-family: 'Georgia', serif;
    color: #2c3e50;
}

.btn-primary, .btn-secondary {
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}
```

### Combinator Selectors

```css
/* Descendant (space) — all p inside div */
div p {
    color: blue;
}

/* Child (>) — direct children only */
div > p {
    color: red;
}

/* Adjacent Sibling (+) — immediately after */
h1 + p {
    font-size: 18px;
    color: gray;
}

/* General Sibling (~) — all siblings after */
h1 ~ p {
    margin-left: 20px;
}
```

### Attribute Selectors

```css
/* Has attribute */
input[required] {
    border-color: red;
}

/* Exact value */
input[type="text"] {
    border: 1px solid #ccc;
}

/* Starts with */
a[href^="https"] {
    color: green;
}

/* Ends with */
a[href$=".pdf"] {
    color: red;
}

/* Contains */
a[href*="google"] {
    font-weight: bold;
}
```

### Pseudo-Class Selectors

```css
/* Link states */
a:link    { color: blue; }       /* Unvisited */
a:visited { color: purple; }     /* Visited */
a:hover   { color: red; }        /* Mouse over */
a:active  { color: orange; }     /* Being clicked */

/* Input states */
input:focus    { border-color: blue; outline: none; }
input:disabled { opacity: 0.5; }
input:checked  { accent-color: green; }
input:valid    { border-color: green; }
input:invalid  { border-color: red; }

/* Structural */
li:first-child  { font-weight: bold; }
li:last-child   { color: red; }
li:nth-child(2) { background: #eee; }
li:nth-child(odd)  { background: #f9f9f9; }
li:nth-child(even) { background: #fff; }
li:nth-child(3n)   { color: blue; }   /* Every 3rd item */

/* Negation */
p:not(.special) { color: gray; }
```

### Pseudo-Element Selectors

```css
/* First line / letter of text */
p::first-line   { font-weight: bold; }
p::first-letter { font-size: 2em; color: red; }

/* Before / After (add generated content) */
h1::before { content: "🔥 "; }
h1::after  { content: " →"; }

/* Placeholder text styling */
input::placeholder { color: #999; font-style: italic; }

/* Text selection styling */
::selection { background: yellow; color: black; }
```

### Selector Specificity (Priority)

```
Inline style (style="") → 1000
ID selector (#id)       → 100
Class/Pseudo-class (.c) → 10
Element/Pseudo-element  → 1

!important             → Overrides everything (use sparingly)

Examples:
p                → 1
.card            → 10
#header          → 100
div p            → 1 + 1 = 2
.content p       → 10 + 1 = 11
#main .text p    → 100 + 10 + 1 = 111
```

---

## 3. Styling Properties

### CSS Colors

```css
/* Named Colors */
color: red;
color: blue;
color: darkgreen;

/* Hexadecimal */
color: #FF5733;          /* 6-digit hex */
color: #F53;             /* 3-digit shorthand = #FF5533 */
color: #FF573380;        /* 8-digit hex with alpha */

/* RGB */
color: rgb(255, 87, 51);

/* RGBA (with transparency) */
color: rgba(255, 87, 51, 0.5);   /* 50% transparent */

/* HSL (Hue, Saturation, Lightness) */
color: hsl(14, 100%, 60%);

/* HSLA */
color: hsla(14, 100%, 60%, 0.7);
```

| Format | Syntax | Transparency |
|--------|--------|-------------|
| Named | `red`, `blue` | ❌ |
| Hex | `#RRGGBB` | ✅ (8-digit) |
| RGB | `rgb(R, G, B)` | ❌ |
| RGBA | `rgba(R, G, B, A)` | ✅ |
| HSL | `hsl(H, S%, L%)` | ❌ |
| HSLA | `hsla(H, S%, L%, A)` | ✅ |

### CSS Background

```css
.element {
    /* Solid color */
    background-color: #f0f0f0;

    /* Image */
    background-image: url('bg.jpg');
    background-size: cover;            /* cover, contain, 100% 100% */
    background-position: center;       /* center, top left, 50% 50% */
    background-repeat: no-repeat;      /* repeat, repeat-x, repeat-y */
    background-attachment: fixed;      /* fixed, scroll */

    /* Gradient */
    background: linear-gradient(to right, #667eea, #764ba2);
    background: linear-gradient(135deg, #f093fb, #f5576c);
    background: radial-gradient(circle, #667eea, #764ba2);

    /* Shorthand */
    background: #f0f0f0 url('bg.jpg') no-repeat center/cover;
}
```

### CSS Fonts

```css
.element {
    /* Font Family (use web-safe fonts or Google Fonts) */
    font-family: 'Arial', 'Helvetica', sans-serif;
    font-family: 'Georgia', 'Times New Roman', serif;
    font-family: 'Courier New', monospace;

    /* Font Size */
    font-size: 16px;          /* Pixels (absolute) */
    font-size: 1em;           /* Relative to parent */
    font-size: 1rem;          /* Relative to root (html) */
    font-size: 100%;          /* Percentage of parent */

    /* Font Weight */
    font-weight: normal;       /* 400 */
    font-weight: bold;         /* 700 */
    font-weight: 100;          /* Thin */
    font-weight: 900;          /* Black (heaviest) */

    /* Font Style */
    font-style: normal;
    font-style: italic;
    font-style: oblique;

    /* Line Height */
    line-height: 1.6;          /* Unitless (multiplier of font-size) */
    line-height: 24px;
}

/* Google Fonts (add in HTML <head>) */
/* <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap" rel="stylesheet"> */
body {
    font-family: 'Inter', sans-serif;
}
```

### CSS Text

```css
.element {
    text-align: center;            /* left, right, center, justify */
    text-decoration: none;          /* none, underline, overline, line-through */
    text-transform: uppercase;      /* uppercase, lowercase, capitalize */
    text-indent: 40px;             /* Indent first line */
    letter-spacing: 2px;           /* Space between letters */
    word-spacing: 5px;             /* Space between words */
    white-space: nowrap;           /* Prevent text wrapping */
    text-overflow: ellipsis;       /* Show ... for overflow */
    overflow: hidden;
    text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
}
```

### CSS Links

```css
/* Link states (order matters: LVHA) */
a:link    { color: #007bff; text-decoration: none; }
a:visited { color: #6c757d; }
a:hover   { color: #0056b3; text-decoration: underline; }
a:active  { color: #ff6600; }

/* Styled button link */
a.btn {
    display: inline-block;
    padding: 10px 20px;
    background-color: #007bff;
    color: white;
    border-radius: 5px;
    text-decoration: none;
    transition: background-color 0.3s;
}
a.btn:hover {
    background-color: #0056b3;
}
```

### CSS Lists

```css
/* Remove default bullets */
ul {
    list-style-type: none;
    padding: 0;
}

/* Custom bullet types */
ul { list-style-type: disc; }          /* ● (default) */
ul { list-style-type: circle; }        /* ○ */
ul { list-style-type: square; }        /* ■ */
ul { list-style-type: none; }          /* No bullet */

ol { list-style-type: decimal; }       /* 1, 2, 3 */
ol { list-style-type: lower-alpha; }   /* a, b, c */
ol { list-style-type: upper-roman; }   /* I, II, III */

/* Custom bullet image */
ul {
    list-style-image: url('bullet.png');
}

/* Bullet position */
ul {
    list-style-position: inside;    /* Bullet inside content area */
    list-style-position: outside;   /* Bullet outside (default) */
}
```

### CSS Tables

```css
table {
    width: 100%;
    border-collapse: collapse;      /* Merge borders */
    /* border-collapse: separate; */  /* Separate borders (default) */
    border-spacing: 0;
}

th, td {
    border: 1px solid #ddd;
    padding: 12px 15px;
    text-align: left;
}

th {
    background-color: #2c3e50;
    color: white;
    font-weight: bold;
}

/* Zebra striping */
tr:nth-child(even) {
    background-color: #f2f2f2;
}

/* Hover effect */
tr:hover {
    background-color: #e0e0e0;
}

/* Responsive table */
.table-responsive {
    overflow-x: auto;
}
```

---

## 4. Box Model

### 📌 Definition

The **CSS Box Model** describes how every HTML element is rendered as a rectangular box with four layers:

```
┌──────────────────────────────────────┐
│              MARGIN                  │  ← Space OUTSIDE the border
│  ┌──────────────────────────────┐    │
│  │          BORDER              │    │  ← Border around the element
│  │  ┌──────────────────────┐    │    │
│  │  │      PADDING         │    │    │  ← Space INSIDE the border
│  │  │  ┌──────────────┐    │    │    │
│  │  │  │   CONTENT    │    │    │    │  ← The actual content
│  │  │  └──────────────┘    │    │    │
│  │  └──────────────────────┘    │    │
│  └──────────────────────────────┘    │
└──────────────────────────────────────┘
```

### Content, Padding, Border, Margin

```css
.box {
    /* Content */
    width: 300px;
    height: 200px;

    /* Padding — space inside the border */
    padding: 20px;
    padding: 10px 20px;            /* top/bottom  left/right */
    padding: 10px 20px 15px;       /* top  left/right  bottom */
    padding: 10px 20px 15px 25px;  /* top  right  bottom  left (clockwise) */

    /* Border */
    border: 2px solid #333;
    border-width: 2px;
    border-style: solid;           /* solid, dashed, dotted, double, groove, ridge, none */
    border-color: #333;
    border-radius: 10px;           /* Rounded corners */
    border-radius: 50%;            /* Perfect circle */

    /* Margin — space outside the border */
    margin: 20px;
    margin: 0 auto;                /* Center horizontally */
    margin-top: 10px;
    margin-bottom: 20px;

    /* Total width calculation (default):
       Total = width + padding-left + padding-right + border-left + border-right + margin-left + margin-right
       Total = 300 + 20 + 20 + 2 + 2 + 0 + 0 = 344px
    */
}
```

### Box-Sizing

```css
/* Default (content-box) — width/height = content only */
.box-default {
    box-sizing: content-box;    /* Default */
    width: 300px;
    padding: 20px;
    border: 2px solid black;
    /* Actual width = 300 + 40 + 4 = 344px */
}

/* Border-box — width/height = content + padding + border */
.box-better {
    box-sizing: border-box;
    width: 300px;
    padding: 20px;
    border: 2px solid black;
    /* Actual width = 300px (padding and border are INSIDE) */
}

/* Best practice: apply to all elements */
*, *::before, *::after {
    box-sizing: border-box;
}
```

### Outline

```css
.element {
    /* Outline is drawn OUTSIDE the border */
    /* It does NOT affect element size or position */
    outline: 2px solid blue;
    outline-offset: 5px;    /* Space between border and outline */
}

/* Common use: focus indicator */
input:focus {
    outline: 2px solid #007bff;
    outline-offset: 2px;
}

/* Remove default outline (add custom focus styles instead) */
button:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.5);
}
```

| Feature | Border | Outline |
|---------|--------|---------|
| Part of box model? | ✅ Yes | ❌ No |
| Affects element size? | ✅ Yes | ❌ No |
| Individual sides? | ✅ (`border-top`, etc.) | ❌ (all sides only) |
| Can be rounded? | ✅ (`border-radius`) | ❌ |

### Visibility vs Display

```css
/* display: none — removes element completely */
.hidden {
    display: none;
    /* Element is gone — takes NO space */
    /* Other elements fill in the gap */
}

/* visibility: hidden — hides element but keeps space */
.invisible {
    visibility: hidden;
    /* Element is invisible but still takes up space */
    /* Other elements are NOT affected */
}
```

| Property | Element Visible? | Takes Space? | Clickable? |
|----------|:----------------:|:------------:|:----------:|
| `display: none` | ❌ | ❌ | ❌ |
| `visibility: hidden` | ❌ | ✅ | ❌ |
| `opacity: 0` | ❌ | ✅ | ✅ |

### Multiple Columns

```css
/* CSS3 Multi-Column Layout */
.article {
    column-count: 3;           /* Number of columns */
    column-gap: 30px;          /* Space between columns */
    column-rule: 1px solid #ccc;  /* Vertical line between columns */
}

/* OR use column-width */
.article {
    column-width: 250px;       /* Minimum column width, browser auto-calculates count */
}

/* Span across all columns */
.article h2 {
    column-span: all;          /* Heading spans all columns */
}

/* Shorthand */
.article {
    columns: 3 250px;          /* count  width */
}
```

```html
<div class="article">
    <h2>Breaking News</h2>
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.
       Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
       Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.
       Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore.</p>
</div>
```

---

## 5. Advanced — Media Queries & RWD

### 📌 What is Responsive Web Design (RWD)?

**Responsive Web Design** makes websites look good on all devices (desktops, tablets, phones) by adapting the layout based on screen size.

### Key Principles of RWD

| Principle | How |
|-----------|-----|
| **Fluid Grids** | Use percentages instead of fixed pixels |
| **Flexible Images** | `max-width: 100%` so images scale down |
| **Media Queries** | Apply different CSS based on screen size |
| **Mobile-First** | Design for small screens first, then enhance for larger |

### Viewport Meta Tag (Required for RWD)

```html
<!-- MUST be in <head> for responsive design -->
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```

| Attribute | Purpose |
|-----------|---------|
| `width=device-width` | Match page width to device screen |
| `initial-scale=1.0` | No zoom on load |

### Media Queries

```css
/* Basic Syntax */
@media (condition) {
    /* CSS rules */
}

/* ===== MOBILE-FIRST APPROACH (Recommended) ===== */

/* Base styles (for mobile — smallest screens) */
.container {
    width: 100%;
    padding: 10px;
}

.sidebar {
    display: none;    /* Hide sidebar on mobile */
}

/* Tablet (768px and up) */
@media (min-width: 768px) {
    .container {
        width: 750px;
        margin: 0 auto;
    }
    .sidebar {
        display: block;
    }
}

/* Desktop (1024px and up) */
@media (min-width: 1024px) {
    .container {
        width: 960px;
    }
}

/* Large Desktop (1200px and up) */
@media (min-width: 1200px) {
    .container {
        width: 1140px;
    }
}
```

### Common Breakpoints

| Device | Breakpoint |
|--------|-----------|
| Small phones | < 576px |
| Phones | 576px – 767px |
| Tablets | 768px – 991px |
| Small desktops | 992px – 1199px |
| Large desktops | ≥ 1200px |

### Media Query Features

```css
/* Screen width */
@media (min-width: 768px) { }
@media (max-width: 767px) { }
@media (min-width: 768px) and (max-width: 1023px) { }

/* Orientation */
@media (orientation: portrait) { }
@media (orientation: landscape) { }

/* Device type */
@media screen { }     /* Computer screens */
@media print { }      /* Printed pages */
@media all { }        /* All devices */

/* Combined */
@media screen and (min-width: 768px) and (orientation: landscape) {
    /* Landscape tablets and larger */
}

/* Dark mode preference */
@media (prefers-color-scheme: dark) {
    body { background: #1a1a1a; color: #fff; }
}
```

### Responsive Layout Example

```css
/* Mobile-first responsive grid */
.grid {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
}

.card {
    width: 100%;              /* Full width on mobile */
    padding: 20px;
    background: white;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

/* Tablet — 2 columns */
@media (min-width: 768px) {
    .card {
        width: calc(50% - 10px);
    }
}

/* Desktop — 3 columns */
@media (min-width: 1024px) {
    .card {
        width: calc(33.333% - 14px);
    }
}
```

### Responsive Images

```css
/* Make images responsive */
img {
    max-width: 100%;
    height: auto;
}

/* Hide images on small screens */
@media (max-width: 576px) {
    .hero-image {
        display: none;
    }
}
```

### Responsive Typography

```css
/* Fluid font sizes */
h1 { font-size: 1.5rem; }

@media (min-width: 768px) {
    h1 { font-size: 2rem; }
}

@media (min-width: 1024px) {
    h1 { font-size: 2.5rem; }
}

/* Modern: clamp() for fluid typography */
h1 {
    font-size: clamp(1.5rem, 4vw, 3rem);
    /* min: 1.5rem, preferred: 4vw, max: 3rem */
}
```

---

## 6. Practice Questions

### Multiple Choice Questions

**Q1.** Which of the following has the HIGHEST specificity?
- a) Element selector (`p`)
- b) Class selector (`.card`)
- c) ID selector (`#header`) ✅
- d) Universal selector (`*`)

**Q2.** What is the correct order for link pseudo-classes?
- a) `:hover`, `:link`, `:visited`, `:active`
- b) `:link`, `:visited`, `:hover`, `:active` ✅ (LVHA)
- c) `:active`, `:hover`, `:link`, `:visited`
- d) `:visited`, `:link`, `:active`, `:hover`

**Q3.** What does `box-sizing: border-box` do?
- a) Removes the border from the element
- b) Makes width/height include padding and border ✅
- c) Adds an extra border around the element
- d) Sets the border to the box shape

**Q4.** What is the difference between `display: none` and `visibility: hidden`?
- a) No difference
- b) `display: none` removes the element from the flow; `visibility: hidden` keeps the space ✅
- c) `visibility: hidden` removes the element from the flow
- d) Both remove the element from the flow

**Q5.** Which CSS property is used to create rounded corners?
- a) `corner-radius`
- b) `border-radius` ✅
- c) `border-round`
- d) `round-corner`

**Q6.** What does the `@media (min-width: 768px)` rule mean?
- a) Apply styles when screen width is less than 768px
- b) Apply styles when screen width is 768px or more ✅
- c) Apply styles only at exactly 768px
- d) Apply styles for all screen sizes

**Q7.** Which CSS property creates a multi-column text layout?
- a) `columns`
- b) `column-count` ✅
- c) `multi-column`
- d) Both a and b ✅

**Q8.** What does `margin: 0 auto` do?
- a) Sets all margins to 0
- b) Centers the element horizontally ✅
- c) Sets top margin to auto
- d) Removes all margins

**Q9.** Which is the BEST way to include CSS in an HTML document?
- a) Inline styles
- b) Internal `<style>` tag
- c) External stylesheet via `<link>` ✅
- d) Using JavaScript

**Q10.** What CSS property makes an image never exceed its container width?
- a) `width: 100%`
- b) `max-width: 100%` ✅
- c) `overflow: hidden`
- d) `object-fit: cover`

**Q11.** What is the universal selector in CSS?
- a) `#`
- b) `.`
- c) `*` ✅
- d) `@`

**Q12.** What does `p::first-letter` select?
- a) The first paragraph
- b) The first character of every paragraph ✅
- c) The first word of every paragraph
- d) The first line of every paragraph

**Q13.** What is the viewport meta tag used for?
- a) Setting the page title
- b) Controlling page width on mobile devices ✅
- c) Adding SEO keywords
- d) Linking to a CSS file

**Q14.** In the box model, what is the order from inside to outside?
- a) Margin → Border → Padding → Content
- b) Content → Padding → Border → Margin ✅
- c) Content → Border → Padding → Margin
- d) Padding → Content → Border → Margin

**Q15.** What does `column-rule` do?
- a) Sets the number of columns
- b) Creates a vertical line between columns ✅
- c) Sets column width
- d) Sets column gap

---

> ✅ **CSS3 Complete!** Next: [JavaScript →](../03_JavaScript/README.md)
