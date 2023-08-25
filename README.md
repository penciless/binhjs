# binhjs
A personal framework to develop web app.

The document is a tutorial using this framework.

# Table of Content

**Overview & Ideas**
  1. Diagram / Ideas how framework works
  2. Relationship: UI Components, Data State, Services
  3. UI Components: elements, features, layouts, pages

**Get Started**
  1. Create a project
  2. Project structure

**Routing**
  1. Router
  2. Sub router

**UI Components**
  1. Declaration
  2. Import components

# Get Started

In this section, the framework is learnt by practice.

For deeper understanding, please read [Overview & Ideas].

## 1. Create a project
> There are 2 ways of creating a binhjs project:
> * Frontend with traditional web files _(.html, .css, .js)_
> * Backend using NodeJS.
>
> In this tutorial, ***frontend*** is the main focus, please access [binhend] for tutorial with NodeJS.

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

### Explanation
* `Binh` is the framework object which can be accessed globally to use its utilities.
* `Binh(routes)` initializes web app with a routing map/object - _handled by `Binh.Router`_.
* `Binh.el('div')` creates an UI component `<div></div>` which then receives text node "Hello World" as child element.
* Default route `''` is also for URLs that not matched any pattern. _(e.g. `https://yourweb.com/any/invalid/pattern`)_
* On route `''`, UI component `<div>Hello World</div>` is loaded when _`https://yourweb.com/`_ is browsed.
* On route `'/home'`, UI component `HomePage` from relative URL `'/pages/HomePage.js'` is loaded when _`https://yourweb.com/home`_ is browsed.

### Done!!!
Web app should be ready to run on browser, but only with default route `''`.

Route `'/home'` is just an example about how UI component should be actually loaded.

Creating UI components will be introduced in later sections.

## 2. Project structure

In general, project structure is based on how components (files) are managed.

However, a convention should be declared to follow.

### Convention Structure
```
/project
    /elements  - UI components
    /features  - UI components
    /layouts   - UI components
    /pages     - UI components

    /services  - Service components
    /styles    - Style components / CSS files

    /resources - any files like images, json, text, etc.
    /others    - any directories that need (e.g. /vendors for local libraries)

    index.html
    index.css
    index.js
```

### Explanation

There are 4 directories for UI Components:
* ***elements***: most basic and independent components can be reused widely _(even outside project)_
* ***features***: components are dependent with other components (UI, State, Services) to implement a complete feature _(mainly reused cross project)_
* ***layouts***: group of elements/features is arranged and aligned in a portion of view
* ***pages***: group of elements/features/layouts is arranged and aligned on a web page specified by URL/route

### Conclusion

By splitting UI components into 4 types, it helps to reuse components in different levels more apparently.

However, this is just a convention, not guaranteed since it requires developers to design components correctly matching their type purposes.

All 4 types of UI component can be reused in other projects if get packaged carefully, which can be achieved easier using [binhend].

Example, website A can import UI components from website B (CORS allowed) via URL `https://websiteB.com/elements/ComponentB.js`.

Importing components is discussed in later sections.

# Routing

URL Address indicates which content should be display on web page.

Therefore, understanding Router is a good starting point.

## 1. Router

**Class:** `Binh.Router`
> Contructor `Binh(routes, options)` initializing web app is actually a `Binh.Router` under its implementation, but with extend settings.

**Constructor:** `Binh.Router(routes, options)`
> A router must associate with a HTML Element on webpage to render content inside.
> 
> To indicate which element should be associate, use `options.enode` _(prior)_, or `options.element`.
> 
> By default, if no declaration, it associates with a `<div>` element created by itself.
> 
> When using `Binh(routes, options)`, by default, router associates with `document.body`.

**Instance:** `new Binh.Router(routes, options)`

> `routes`: an object with `key` as URL pattern and `value` as Number, URL String, or UI Component
> 
> ```js
> {
>   '': DefaultPage, // a class of UI Component
> 
>   '/home': '/pages/HomePage.js', // URL pointing to script file that declares UI Component
> 
>   '/detail': 'https://another-web.com/pages/DetailPage.js', // Reuse UI Component from another website
> 
>   '/dumb1': Binh.el('div')('Hello World'), // short-hand code creating a simple UI Component
> 
>   '/dum2': 123, // a text node of 123 is created as UI Component
> 
>   '/custom': function() {
>       // any code
>       return undefined || 123 || 'url/to/ui/component' || ComponentUI || Binh.el('div') || anotherFunction;
>   }
> }
> ```
> 
> `options`: an object holding settings of a router instance's behaviours
> 
> ```js
> {
>     enode: Binh.el('div')('Hello World'), // since this option is prior, options.element will be ignored
> 
>     element: document.body // by default, if no declaration, a '<div>' element is created to hold the content
> }
> ```
> 

