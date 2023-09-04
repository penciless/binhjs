[<<< Back to Table of Content](../README.md)

# Routing

URL Address indicates which content should be displayed on webpage.

Router plays a role on handling URLs and switching views.

Therefore, understanding Router is a good point to get started.

<br/>

## 1. Router

**Class:** `Binh.Router`
> Contructor `Binh(routes, options)` initializing web app is actually a `Binh.Router` under its implementation, but with default settings.

<br/>

**Constructor:** `Binh.Router(routes, options)`
> A router must associate with a HTML Element on webpage to render content inside.
> 
> To indicate which element should be associated, use `options.enode` _(prior)_, or `options.element`.
> 
> By default, if no declaration, reouter associates with a `<div>` element created by itself.
> 
> When using `Binh(routes, options)`, by default, router associates with `document.body`.
>
> ***NOTE:***
> * If the associated element is not present on DOM, all routing settings is removed and unavailable.

<br/>

**Instance:** `new Binh.Router(routes, options)`

> **@param** `routes` : Object
>
> An object `{ route : target }` with `route` as URL pattern and `target` as Number, URL String, or UI Component.
> 
> ```js
> {
>   // a class of UI Component
>   '': DefaultPage,
>
>   // URL pointing to script file that declares UI Component
>   '/home': '/pages/HomePage.js',
>
>   // Reuse UI Component from another website
>   '/detail': 'https://another-web.com/pages/DetailPage.js',
> 
>   // short-hand code creating a simple UI Component
>   '/dumb1': Binh.el('div')('Hello World'),
>
>   // a text node of 123 is created as UI Component
>   '/dumb2': 123,
> 
>   '/custom': function() {
>       // any code
>       return undefined || 123 || 'url/to/ui/component' ||
>              ComponentUI || Binh.el('div') || anotherFunction;
>   }
> }
> ```
>
> * Routes `'/'` and `''` _are different_ and might point to same target.
> * Route `'/'` _only works_ for empty path, e.g. `https://website.com/`.
> * Route `''` _is a default route_ for URLs not matching any declared pattern, e.g. `https://website.com/any/unknown/path`.
> * Other pairs like `'/any'` and `'any'` _are the same route_ and always point to same target.
> 
> **@param** `options` : Object
> 
> An object holding settings of a router instance.
> 
> ```js
> {
>   // since this option is prior, options.element will be ignored
>   enode: Binh.el('div')('Hello World'),
>
>   // by default, if no declaration, a '<div>' element is created to hold the content
>   element: document.body
> }
> ```
>
> **@return** : Object
> 
> An instance of Router

<br/>

**Class Method:** `Binh.Router.onroute(callback)`

> A function invoked every time a new path/route is loaded.
> 
> ***NOTE:***
> * navigate to same path, e.g. `/home` -> `/home`, won't invoke this function.
> * the function is unique and run before all instances of Router,
> * which means further new callback declarations will override the old one.
> 
> **@param** `callback` : Function
>
> **@return** : undefined

<br/>

**Class Method:** `Binh.Router.navigate(route)`

> Navigate the current route (current view) to another route (another view) by changing the URL but not reloading whole webpage.
>
> ***NOTE:***
> * Cannot navigate to same path, e.g. `/home` -> `/home`, nothing happens.
>
> **@param** `route` : string
> 
> **@return** : undefined

<br/>

**Class Method:** `Binh.Router.query(ignoreDecode)`

> Get the current queries on URL as an object.
>
> **@param** `ignoreDecode` : boolean
>
> `false` by default, decoding URL is processed using `JavaScript:decodeURIComponent()` before parsing values into object.
>
> When declared as `true`, decoding URL is ignored, returning raw values from URL which might be encoded by browser.
>
> Moreover, when declared as `false`, values encountering decoding error will also return raw values.
> 
> **@return** : Object
>
> `https://your-website.com/home?id=101&product=box`
> ```json
> {
>   "id": "101",
>   "product": "box"
> }
> ```
>
> `https://your-website.com/home?id=99&product=&key&encode=test%20it&=empty`
> ```json
> {
>   "id": "99",
>   "product": "",
>   "key": "",
>   "encode": "test it",
>   "": "empty"
> }
> ```
> 
> ***NOTE:*** Returned values are always type of `string`.

<br/>

**Instance Method:** `new Binh.Router(routes, options).load()`

> Force reload the current view handled by router.
>
> **@return** : undefined

<br/>

## 2. Nested routing

Every route is defined using absolute path, always starting from hostname.

`https://yourwebsite.com/goto/path`
```
hostname: yourwebsite.com
route: /goto/path
```

Routers are independent instances and not relevant to each others, which means routers declaring different targets for the same route will not conflict with each others.

Each router only changes content of its associated element _(container holding content)_ based on the current route _(URL pathname)_ and queries.

If so, how can nested routing be implemented?

***Please look at the following example:***

`Main Router` associated with `document.body` _(or `<body>`)_
```js
{
  '/home': HomePage,
  '/home/categories': HomePage,
  '/home/list': HomePage,
  '/product': ProductPage
}
```

`Sub Router` associated with `<div>` inside `<body>`
```js
{
  '/home': Categories,
  '/home/categories': Categories,
  '/home/list': ListView
}
```

`Main Router`: as long as the route is matched, `HomePage` will be rendered inside `<body>`.

`Sub Router`: as long as the route is matched and `<div>` exists inside `<body>`, `Categories` or `ListView` will be rendered inside `<div>` _(depending on which route is matched)_.

In other words,
* `Main Router` matches route `/home` and renders `HomePage` into `<body>`.
* By somehow, `HomePage` in `<body>` contains `<div>` which associted with `Sub Router`.
* `Sub Router` also matches route `/home` and renders `Categories` into `<div>`.

Thus, no link between routers, but there is link between elements associated with routers and the current route.

If `HomePage` is not rendered by `Main Router`, there is no `<div>` and no place for `Sub Router` to render `Categories`.

That's how nested routing is implemented.

***Bonus, another way to switch view with router:***

`Sub Router` associated with `<div>` inside `<body>`

```js
{
  '/home': function() {
    var query = Binh.Router.query();

    if (query.view === 'list') return ListView;
    if (query.view === 'categories') return Categories;
    else return Categories; // default
  }
}
```

`ListView` is rendered when `https://yourwebsite.com/home?view=list`.

`Categories` is rendered when `https://yourwebsite.com/home?view=categories`.

`Categories` is rendered when `https://yourwebsite.com/home`. _(default)_

<br/>

## 3. URL parameters (Not supported)

Not support URL parameters like `/route_name/:id/:product`, only support URL query `/route_name?id=123&product=anything`.

<br/>

## 4. How to modify routes later?

In statement `new Binh.Router(routes, options)`, object `routes` can be used for later modification _(add, update, delete)_.

<br/>

## 5. How to get current route?

Use pure JavaScript `location.pathname` to get the current route.

<br/>

## 6. How to reload whole webpage?

Use pure JavaScript `location.reload()` to reload whole webpage.

<br/>

## 7. Alternatives for getting query object?
