[<<< Back to Table of Content](../README.md)

# Routing

URL Address indicates which content should be displayed on webpage.

Router plays a role on handling URLs and switching views.

Therefore, understanding Router is a good point to get started.

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

**Method:** `Binh.Router.onroute(callback)`

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

**Method:** `Binh.Router.navigate(route)`

> Navigate the current route (current view) to another route (another view) by changing the URL but not reloading whole webpage.
>
> ***NOTE:***
> * Cannot navigate to same path, e.g. `/home` -> `/home`, nothing happens.
>
> **@param** `route` : string
> 
> **@return** : undefined

<br/>

**Method:** `Binh.Router.query(shouldDecode)`

> Get the current queries on URL as an object.
>
> **@param** `shouldDecode` : boolean
>
> By default, `shouldDecode` is `false`.
>
> When declared as `true`, decoding URL is processed using `JavaScript:decodeURIComponent()` before parsing values into object.
> 
> **@return** : Object
>
> `https://your-website.com/home?id=101&product=box`
> ```
> {
>   id: "10",
>   product: "box"
> }
> ```
> ***NOTE:*** Returned values are always type of `string`.


How to modify routes later?
How to get current route?
How to reload whole webpage?
Alternatives for getting query object?
