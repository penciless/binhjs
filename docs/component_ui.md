[<<< Back to Table of Content](../README.md)

# Components

Components are building units of the whole web page.

There are 3 types of them:

* UI: implement how HTML element is constructed and referenced.
* Style: rules of how UI should be arranged, aligned, or decorated.
* Service: a proxy to process data and communicate with server.

All 3 types of components are declared using JavaScript.

Simply speaking, HTML, CSS and JS are all written in JavaScript ONLY.

In [binhend], supporting CSS files _(.css)_ bundled into Style Component and shipped to front-end.

<br/>

***In this section, we discuss more detail about:***

# Component: UI

## 1. Declaration

`/elements/HelloText.js`
```js
Binh.ui(function() {
  // Create an enode (Element Node)
  var span = Binh.el('span');
  var styleText = Binh.style('/styles/Text.js');

  return span('Hello World').style(styleText);
});
```

### Component: Style

`/styles/Text.js`
```js
Binh.style(function(css) {
  // CSS selector '' means the root element which is applied this style sheet
  css('', [
    'color: black;'
  ]);

  // Example with a CSS selector
  css('.warning', [
    'color: red;',
    'margin-left: 10px'
  ]);

  // Example with a CSS text
  css(
  `@media (min-width: 600px) {
      .small-screen {
          color: green;
      }
  }`
  );

  // Even return pure text of CSS rules
  return '.info { color: blue; } .highlight { color: yellow; }';
});
```

