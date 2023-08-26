[<<< Back to Table of Content](../README.md)

# Routing

URL Address indicates which content should be displayed on web page.

Router plays a role on detecting current URL parts and switching views.

Therefore, understanding Router is a good starting point.

## 1. Router

**Class:** `Binh.Router`
> Contructor `Binh(routes, options)` initializing web app is actually a `Binh.Router` under its implementation, but with extend settings.

<br/>

**Constructor:** `Binh.Router(routes, options)`
> A router must associate with a HTML Element on webpage to render content inside.
> 
> To indicate which element should be associated, use `options.enode` _(prior)_, or `options.element`.
> 
> By default, if no declaration, it associates with a `<div>` element created by itself.
> 
> When using `Binh(routes, options)`, by default, router associates with `document.body`.
>
> ***NOTE:*** if the element is not rendered on DOM, all routing settings is removed and unavailable.

<br/>

**Instance:** `new Binh.Router(routes, options)`

> **@param** `routes` : Object
>
> An object with `key` as URL pattern and `value` as Number, URL String, or UI Component
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
>   '/dum2': 123,
> 
>   '/custom': function() {
>       // any code
>       return undefined || 123 || 'url/to/ui/component' ||
>              ComponentUI || Binh.el('div') || anotherFunction;
>   }
> }
> ```
> 
> **@param** `options` : Object
> 
> An object holding settings of a router instance
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

> **@param** `callback` : Object
> 
> A function invoked every time a new path/route is loaded.
>
> Note:
> * navigate to same path, e.g. `/home` -> `/home`, won't invoke this function.
> * the function is unique and works for all instances of Router.
> * which means further new callback declaration will override the old one.
>
> **@return** : undefined

<br/>

**Method:** `Binh.Router.navigate(route)`

> **@param** `route` : string
> 
> Navigate the current route (current web page)
> to another route (another web page)
>
> Note:
> * Cannot navigate to same path, e.g. `/home` -> `/home`, nothing happens.
>
> **@return** : undefined
