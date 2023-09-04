[<<< Back to Table of Content](../README.md)

## 1. Create a project

`index.html`
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <title>My Website</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- Required script: BinhJS Framework -->
    <script src="https://binhjs.pages.dev/dist/binh.min.js"></script>

    <!-- Required script: the main script file holds code implementaion using BinhJS -->
    <script src="/index.js"></script>
  </head>

  <body></body>
</html>
```

`index.js`
```js
Binh({
    '': Binh.el('div')('Hello World'), // Create an UI Component mapping default route
    '/home': '/pages/HomePage.js' // Fetching UI Component 'HomePage' on loading route '/home'
});
```

## 2. Routing

```js
// Define route mapping object
var routes = {
  // a class of UI Component
  '': DefaultPage,

  // URL pointing to script file that declares UI Component
  '/home': '/pages/HomePage.js',

  // Reuse UI Component from another website
  '/detail': 'https://another-web.com/pages/DetailPage.js',

  // short-hand code creating a simple UI Component
  '/dumb1': Binh.el('div')('Hello World'),

  // a text node of 123 is created as UI Component
  '/dumb2': 123,

  '/custom': function() {
      // any code
      return undefined || 123 || 'url/to/ui/component' ||
             ComponentUI || Binh.el('div') || anotherFunction;
  }
};

// Initialize web app with default setup
Binh(routes, options);

var options = {
  // since this option is prior, options.element will be ignored
  enode: Binh.el('div')('Hello World'),

  // if no declaration, using '<body>' element by default
  element: document.body
};

// Initialize new router
new Binh.Router(routes, options);

var options = {
  // since this option is prior, options.element will be ignored
  enode: Binh.el('div')('Hello World'),

  // by default, if no declaration, a '<div>' element is created to hold the content
  element: document.getElementById('content')
};
```
