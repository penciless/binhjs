# binhjs
A personal framework to develop web app following personal references.
The content of this page is a tutorial how to use this framework.

# Table of Content

## I. Get Started
  1. Create a project
  2. Project directory structure

## II. Routing
  1. Router
  2. Sub router


# Content

## I. Get Started

In this section, we get our hands dirty by setup a web app project using the framework.

### 1. Create a project
There are 2 ways of creating a binhjs project:
* Frontend with traditional web files _(.html, .css, .js)_
* Backend using NodeJS.

In this tutorial, ***frontend*** is the main target, so please access [binhend] to learn how to start a project from backend with NodeJS.

Let's start!!!

First, we create a folder containing `index.html`, `index.js` and `index.css (optional)`.

In HTML file, we declare a standard web page as follows:

`index.html`
```
<!DOCTYPE html>
<html lang="en">
  <head>
    <title>My Website</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <script src="https://binhjs.pages.dev/dist/binh.min.js"></script>
    <link rel="stylesheet" href="/index.css">
    <script src="/index.js"></script>
  </head>

  <body></body>
</html>
```

In file `index.html`, all required files are declared to be loaded:
* Library `binhjs` to use the framework
* JavaScript file `index.js` to implement web app codebase
* CSS file `index.css` is optional to beautify layout/UI

Next, when HTML file is opened in browser, scripts are loaded and run.

In the main script `index.js`, a simple router is implemented to declare mappings between UI components and URL patterns.

`index.js`
```
Binh({
    '': Binh.el('div')('Hello World'),
    '/home': '/pages/HomePage.js'
});
```

Explain:
* `Binh` is the framework object which can be accessed globally to use its utilities.
* `Binh(routes)` constructor initializes webapp with input as a routing map/object
* `Binh.el('div')` create an UI component `<div></div>` which then receives text node "Hello World" as child element
* Route `''` will load UI component `<div>Hello World</div>` when URL _`https://yourweb.com/`_ is accessed.
* Route `''` is also a default route for URLs that not matched any pattern when accessed. _(e.g. `https://yourweb.com/any/invalid/pattern`)_
* Route `'/home'` will download UI component `HomePage` from relative URL `'/pages/HomePage.js'` and load that UI component onto web page when URL _`https://yourweb.com/home`_ is accessed.

