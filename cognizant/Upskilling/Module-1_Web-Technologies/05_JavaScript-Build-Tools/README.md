# 🔧 JavaScript Build Tools (Babel + Webpack) — Complete Study Guide

> **Module 1 | Digital Nurture 5.0 — Java FSE Upskilling**

---

## 📋 Topics Covered

1. [Babel](#1-babel)
2. [Webpack](#2-webpack)
3. [Practice Questions](#3-practice-questions)

---

## 1. Babel

### 📌 What is Babel?

**Babel** is a JavaScript **compiler/transpiler** that converts modern JavaScript (ES6+) into backwards-compatible JavaScript that can run in older browsers.

```
ES6+ Code (Modern)  →  Babel  →  ES5 Code (Compatible)
```

### Why Use Babel?

| Problem | Babel Solution |
|---------|---------------|
| Older browsers don't support ES6+ | Transpiles to ES5 |
| Arrow functions, `let/const`, classes | Converts to `function`, `var`, prototypes |
| New APIs missing in old browsers | Adds polyfills |
| JSX (React) not valid JS | Transforms JSX to `React.createElement()` |

### Core Concepts

#### Transpiling

**Transpiling** = Transforming + Compiling. Babel takes modern syntax and converts it to equivalent older syntax.

```javascript
// INPUT (ES6+)
const greet = (name) => `Hello, ${name}!`;
const [a, b] = [1, 2];
class Animal {
    constructor(name) { this.name = name; }
}

// OUTPUT (ES5 — after Babel transpilation)
var greet = function(name) { return "Hello, " + name + "!"; };
var _ref = [1, 2], a = _ref[0], b = _ref[1];
function Animal(name) { this.name = name; }
```

#### Polyfills

**Polyfills** add missing functionality to older environments (e.g., `Promise`, `Array.includes`, `Object.assign`).

```javascript
// Babel can automatically add polyfills
// Example: Promise polyfill for IE11

// Using @babel/polyfill (deprecated) or core-js
import "core-js/stable";
import "regenerator-runtime/runtime";

// Now Promise, async/await, etc. work in old browsers
```

| Concept | What it Does | Example |
|---------|-------------|---------|
| **Transpiling** | Converts new syntax to old syntax | Arrow → function |
| **Polyfill** | Adds missing APIs/methods | Promise, Array.from |

### Setup and Configuration

#### Installing Babel

```bash
# Initialize project
npm init -y

# Install Babel core and CLI
npm install --save-dev @babel/core @babel/cli

# Install preset for ES6+ transpilation
npm install --save-dev @babel/preset-env

# For polyfills
npm install core-js regenerator-runtime
```

#### Configuring Babel

**Method 1: `.babelrc` (project-level, JSON format)**

```json
{
    "presets": [
        ["@babel/preset-env", {
            "targets": {
                "browsers": ["> 1%", "last 2 versions", "not dead"]
            },
            "useBuiltIns": "usage",
            "corejs": 3
        }]
    ],
    "plugins": []
}
```

**Method 2: `babel.config.js` (root-level, JavaScript format — RECOMMENDED)**

```javascript
module.exports = {
    presets: [
        ["@babel/preset-env", {
            targets: {
                browsers: ["> 1%", "last 2 versions", "not dead"],
                node: "current"
            },
            useBuiltIns: "usage",  // Only include polyfills that are used
            corejs: 3
        }]
    ],
    plugins: [
        "@babel/plugin-proposal-class-properties",
        "@babel/plugin-transform-runtime"
    ]
};
```

| Config File | Format | Scope | Best For |
|-------------|--------|-------|----------|
| `.babelrc` | JSON | Per-directory | Simple projects |
| `babel.config.js` | JavaScript | Project root | Monorepos, complex configs |
| `babel.config.json` | JSON | Project root | Simple root configs |

#### Running Babel

```bash
# Transpile a single file
npx babel src/app.js --out-file dist/app.js

# Transpile a directory
npx babel src --out-dir dist

# Watch mode (auto-transpile on save)
npx babel src --out-dir dist --watch
```

### Plugins and Presets

#### Plugins

**Plugins** are small programs that tell Babel how to transform specific syntax features.

```javascript
// Example plugins
"plugins": [
    "@babel/plugin-transform-arrow-functions",      // arrow → function
    "@babel/plugin-transform-template-literals",     // template literals → concat
    "@babel/plugin-transform-classes",               // class → prototype
    "@babel/plugin-proposal-class-properties",       // class fields
    "@babel/plugin-transform-runtime"                // helpers reuse
]
```

#### Presets

**Presets** are collections of plugins bundled together. Instead of adding 20 plugins individually, use one preset.

| Preset | Purpose |
|--------|---------|
| `@babel/preset-env` | Transpile ES6+ based on target environments |
| `@babel/preset-react` | Transform JSX for React |
| `@babel/preset-typescript` | Transform TypeScript |
| `@babel/preset-flow` | Transform Flow type annotations |

```javascript
// @babel/preset-env with configuration
module.exports = {
    presets: [
        ["@babel/preset-env", {
            targets: "> 0.25%, not dead",
            modules: false,          // Don't transform ES modules (let Webpack handle)
            useBuiltIns: "usage",    // Auto-add polyfills
            corejs: 3
        }]
    ]
};
```

### Integration with Build Tools (Webpack)

```javascript
// webpack.config.js
module.exports = {
    module: {
        rules: [
            {
                test: /\.js$/,                // Match .js files
                exclude: /node_modules/,       // Skip node_modules
                use: {
                    loader: 'babel-loader',    // Use babel-loader
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            }
        ]
    }
};
```

### Performance Optimization

```javascript
// 1. CACHING — speeds up rebuilds
// babel-loader has caching built-in
{
    loader: 'babel-loader',
    options: {
        cacheDirectory: true    // Cache transpiled files
    }
}

// 2. MINIFICATION — reduce file size
// Use terser-webpack-plugin (Webpack 5 has it built-in)
const TerserPlugin = require('terser-webpack-plugin');
module.exports = {
    optimization: {
        minimize: true,
        minimizer: [new TerserPlugin()]
    }
};

// 3. Exclude node_modules
{
    test: /\.js$/,
    exclude: /node_modules/,   // Don't transpile dependencies
    use: 'babel-loader'
}
```

---

## 2. Webpack

### 📌 What is Webpack?

**Webpack** is a **module bundler** for JavaScript applications. It takes all your files (JS, CSS, images, etc.) and bundles them into optimized output files for the browser.

```
Multiple source files → Webpack → Bundled output files

src/
├── index.js        →  Webpack  →  dist/
├── utils.js                       ├── bundle.js
├── style.css                      ├── style.css
└── logo.png                       └── logo.png
```

### Why Use Webpack?

| Problem | Webpack Solution |
|---------|-----------------|
| Many small files = many HTTP requests | Bundles into fewer files |
| ES Modules not supported everywhere | Bundles modules into compatible code |
| Need to process CSS, images, fonts | Loaders handle any file type |
| Code optimization needed | Minification, tree shaking, code splitting |
| Development experience | Dev server with hot reload |

### Core Concepts

#### Entry and Output

```javascript
// webpack.config.js
const path = require('path');

module.exports = {
    // ENTRY — starting point of dependency graph
    entry: './src/index.js',

    // Multiple entry points
    // entry: {
    //     app: './src/app.js',
    //     admin: './src/admin.js'
    // },

    // OUTPUT — where to put bundled files
    output: {
        filename: 'bundle.js',
        // For multiple entries: filename: '[name].bundle.js'
        path: path.resolve(__dirname, 'dist'),
        clean: true  // Clean dist folder before each build
    }
};
```

### Setup and Configuration

#### Installing Webpack

```bash
# Initialize project
npm init -y

# Install Webpack and CLI
npm install --save-dev webpack webpack-cli

# Install dev server
npm install --save-dev webpack-dev-server
```

#### Basic Configuration (`webpack.config.js`)

```javascript
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    // Mode: 'development' or 'production'
    mode: 'development',

    // Entry point
    entry: './src/index.js',

    // Output
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
        clean: true
    },

    // Dev server
    devServer: {
        static: './dist',
        port: 3000,
        hot: true,        // Hot Module Replacement
        open: true         // Auto-open browser
    },

    // Source maps (for debugging)
    devtool: 'inline-source-map',

    // Plugins
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            title: 'My App'
        })
    ],

    // Module rules (loaders)
    module: {
        rules: [
            // JavaScript (Babel)
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: 'babel-loader'
            },
            // CSS
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            // Images
            {
                test: /\.(png|jpg|gif|svg)$/,
                type: 'asset/resource'
            },
            // Fonts
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                type: 'asset/resource'
            }
        ]
    }
};
```

#### Package.json Scripts

```json
{
    "scripts": {
        "start": "webpack serve --mode development",
        "build": "webpack --mode production",
        "watch": "webpack --watch --mode development"
    }
}
```

### Modules and Dependencies

```javascript
// src/index.js — Entry point
import { add, multiply } from './math.js';   // ES Module import
import './style.css';                          // CSS import
import logo from './logo.png';                 // Image import

console.log(add(2, 3));
console.log(multiply(4, 5));

// src/math.js — Module
export function add(a, b) { return a + b; }
export function multiply(a, b) { return a * b; }
export default function subtract(a, b) { return a - b; }
```

Webpack builds a **dependency graph** starting from the entry point, following all `import`/`require` statements.

### Loaders

**Loaders** tell Webpack how to process non-JavaScript files (CSS, images, TypeScript, etc.).

```bash
# Install common loaders
npm install --save-dev babel-loader @babel/core @babel/preset-env
npm install --save-dev css-loader style-loader
npm install --save-dev sass-loader sass
npm install --save-dev ts-loader typescript
npm install --save-dev file-loader url-loader
```

| Loader | Purpose | Install |
|--------|---------|---------|
| `babel-loader` | Transpile JS (ES6+ → ES5) | `babel-loader @babel/core @babel/preset-env` |
| `css-loader` | Resolve CSS imports | `css-loader` |
| `style-loader` | Inject CSS into DOM | `style-loader` |
| `sass-loader` | Compile SCSS to CSS | `sass-loader sass` |
| `ts-loader` | Compile TypeScript | `ts-loader typescript` |
| `file-loader` | Copy files to output (deprecated in Webpack 5) | `file-loader` |

```javascript
// Loader configuration in webpack.config.js
module: {
    rules: [
        // babel-loader — transpile JavaScript
        {
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env'],
                    cacheDirectory: true
                }
            }
        },
        // css-loader + style-loader — process CSS
        {
            test: /\.css$/,
            use: ['style-loader', 'css-loader']
            // Loaders execute RIGHT to LEFT:
            // 1. css-loader: resolves @import and url()
            // 2. style-loader: injects CSS into <style> tag
        },
        // sass-loader — compile SCSS
        {
            test: /\.scss$/,
            use: ['style-loader', 'css-loader', 'sass-loader']
        }
    ]
}
```

### Plugins

**Plugins** extend Webpack's functionality for optimization, asset management, and more.

```bash
# Install common plugins
npm install --save-dev html-webpack-plugin
npm install --save-dev mini-css-extract-plugin
npm install --save-dev clean-webpack-plugin
npm install --save-dev copy-webpack-plugin
```

| Plugin | Purpose |
|--------|---------|
| `HtmlWebpackPlugin` | Generates HTML file with bundled scripts injected |
| `CleanWebpackPlugin` | Cleans output directory before each build |
| `MiniCssExtractPlugin` | Extracts CSS into separate files |
| `CopyWebpackPlugin` | Copies static files to output |
| `DefinePlugin` | Define global constants at compile time |
| `TerserPlugin` | Minify JavaScript (built-in for production) |

```javascript
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    plugins: [
        // Generate HTML file
        new HtmlWebpackPlugin({
            template: './src/index.html',
            title: 'My Application',
            minify: {
                collapseWhitespace: true,
                removeComments: true
            }
        }),

        // Extract CSS to separate file (for production)
        new MiniCssExtractPlugin({
            filename: 'styles/[name].[contenthash].css'
        }),

        // Clean dist folder
        new CleanWebpackPlugin()
    ],

    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,  // Instead of style-loader
                    'css-loader'
                ]
            }
        ]
    }
};
```

### Performance Optimization

#### Caching

```javascript
module.exports = {
    output: {
        // Content hash in filename — browser cache busting
        filename: '[name].[contenthash].js',
        path: path.resolve(__dirname, 'dist'),
        clean: true
    },

    optimization: {
        // Split vendor code into separate bundle
        splitChunks: {
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    chunks: 'all'
                }
            }
        }
    }
};
```

#### Minification

```javascript
const TerserPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

module.exports = {
    mode: 'production',  // Enables minification by default

    optimization: {
        minimize: true,
        minimizer: [
            new TerserPlugin({
                terserOptions: {
                    compress: { drop_console: true }  // Remove console.log
                }
            }),
            new CssMinimizerPlugin()  // Minify CSS
        ]
    }
};
```

#### Bundle Analysis

```bash
# Install bundle analyzer
npm install --save-dev webpack-bundle-analyzer
```

```javascript
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

module.exports = {
    plugins: [
        new BundleAnalyzerPlugin()  // Visual report of bundle sizes
    ]
};
```

#### Tree Shaking

```javascript
// Webpack automatically removes unused exports in production mode
// For tree shaking to work:
// 1. Use ES module syntax (import/export)
// 2. Set mode: 'production'
// 3. Avoid side effects or mark them in package.json

// package.json
{
    "sideEffects": false     // All files are pure (safe to tree shake)
    // OR specify files with side effects:
    // "sideEffects": ["./src/polyfills.js", "*.css"]
}
```

### Integration with TypeScript

```bash
npm install --save-dev typescript ts-loader
```

```javascript
// webpack.config.js
module.exports = {
    entry: './src/index.ts',
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: 'ts-loader',
                exclude: /node_modules/
            }
        ]
    },
    resolve: {
        extensions: ['.ts', '.js']   // Import without extensions
    }
};
```

```json
// tsconfig.json
{
    "compilerOptions": {
        "outDir": "./dist",
        "sourceMap": true,
        "module": "es6",
        "target": "es5",
        "strict": true,
        "moduleResolution": "node"
    },
    "include": ["src/**/*"]
}
```

### Complete Project Example

```
my-project/
├── package.json
├── webpack.config.js
├── babel.config.js
├── src/
│   ├── index.html
│   ├── index.js
│   ├── style.css
│   └── utils/
│       └── math.js
└── dist/                 ← Generated by Webpack
    ├── index.html
    ├── bundle.[hash].js
    └── style.[hash].css
```

---

## 3. Practice Questions

### Multiple Choice Questions

**Q1.** What is the primary purpose of Babel?
- a) Bundle JavaScript files
- b) Transpile modern JavaScript to older versions for browser compatibility ✅
- c) Minify CSS files
- d) Run JavaScript on the server

**Q2.** What is a polyfill?
- a) A CSS framework
- b) Code that adds missing features to older environments ✅
- c) A type of JavaScript loop
- d) A build tool

**Q3.** Which Babel preset handles ES6+ to ES5 conversion?
- a) `@babel/preset-react`
- b) `@babel/preset-env` ✅
- c) `@babel/preset-es5`
- d) `@babel/preset-typescript`

**Q4.** What is the main purpose of Webpack?
- a) Transpile JavaScript
- b) Bundle modules and assets into optimized output files ✅
- c) Write unit tests
- d) Deploy applications

**Q5.** What does the `entry` property in Webpack config specify?
- a) The output file
- b) The starting point of the dependency graph ✅
- c) The development server port
- d) The plugins to use

**Q6.** What are Webpack loaders used for?
- a) Loading web pages
- b) Processing non-JavaScript files (CSS, images, TypeScript) ✅
- c) Loading plugins
- d) Loading configuration files

**Q7.** Which plugin generates an HTML file with bundled scripts automatically injected?
- a) `CleanWebpackPlugin`
- b) `MiniCssExtractPlugin`
- c) `HtmlWebpackPlugin` ✅
- d) `CopyWebpackPlugin`

**Q8.** In which order do Webpack loaders execute?
- a) Left to right
- b) Right to left ✅
- c) Top to bottom
- d) Alphabetically

**Q9.** What does tree shaking do?
- a) Adds new features to code
- b) Removes unused code from the bundle ✅
- c) Converts TypeScript to JavaScript
- d) Adds polyfills

**Q10.** Which Babel configuration file uses JavaScript format?
- a) `.babelrc`
- b) `babel.config.js` ✅
- c) `babel.json`
- d) `babelrc.js`

---

> ✅ **Build Tools Complete!** Module 1 finished! Next: [Module 2 — ANSI SQL using MySQL →](../../Module-2_Database/01_ANSI-SQL-MySQL/README.md)
