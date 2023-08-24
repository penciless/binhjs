# binhjs
A personal framework to develop web app.

The document is a tutorial using this framework.

# Table of Content

### Z. Overview & Ideas
  1. Diagram / Ideas how framework works
  2. Relationship: UI Components, Data State, Services
  3. UI Components: elements, features, layouts, pages

### I. Get Started
  1. Create a project
  2. Project structure

### II. Routing
  1. Router
  2. Sub router

### III. UI Components
  1. Declaration
  2. Import components

# Content

## I. Get Started

In this section, the framework is learnt by practice.

For deeper understanding, please read [Overview & Ideas].

### 1. Create a project
There are 2 ways of creating a binhjs project:
* Frontend with traditional web files _(.html, .css, .js)_
* Backend using NodeJS.

In this tutorial, ***frontend*** is the main focus, please access [binhend] for tutorial with NodeJS.

Let's start!!!

First, creating files `index.html`, `index.js` and `index.css (optional)`.

In HTML file, a standard web page is declared as follows:

`index.html`
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <title>My Website</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- Optional CSS: beautify layout/UI -->
    <link rel="stylesheet" href="/index.css">

    <!-- Required script: BinhJS Framework -->
    <script src="https://binhjs.pages.dev/dist/binh.min.js"></script>

    <!-- Required script: the main script file holds code implementaion using BinhJS -->
    <script src="/index.js"></script>
  </head>

  <body></body>
</html>
```

In the main script, web app is initialized with mappings between UI components and URL patterns.

`index.js`
```js
Binh({
    '': Binh.el('div')('Hello World'), // Create an UI Component mapping default route
    '/home': '/pages/HomePage.js' // Fetching UI Component 'HomePage' on loading route '/home'
});
```

Explain:
* `Binh` is the framework object which can be accessed globally to use its utilities.
* `Binh(routes)` initializes web app with a routing map/object - _handled by `Binh.Router`_.
* `Binh.el('div')` creates an UI component `<div></div>` which then receives text node "Hello World" as child element.
* Default route `''` is also for URLs that not matched any pattern. _(e.g. `https://yourweb.com/any/invalid/pattern`)_
* On route `''`, UI component `<div>Hello World</div>` is loaded when _`https://yourweb.com/`_ is browsed.
* On route `'/home'`, UI component `HomePage` from relative URL `'/pages/HomePage.js'` is fetched and loaded when _`https://yourweb.com/home`_ is browsed.

