# Routing

URL Address indicates which content should be displayed on web page.

Router plays a role on detecting current URL parts and switching views.

Therefore, understanding Router is a good starting point.

## 1. Router

**Class:** `Binh.Router`
> Contructor `Binh(routes, options)` initializing web app is actually a `Binh.Router` under its implementation, but with extend settings.

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

**Instance:** `new Binh.Router(routes, options)`

> **@param** `routes`
>
> An object with `key` as URL pattern and `value` as Number, URL String, or UI Component
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
> **@param** `options`
> 
> An object holding settings of a router instance
> 
> ```js
> {
>     enode: Binh.el('div')('Hello World'), // since this option is prior, options.element will be ignored
> 
>     element: document.body // by default, if no declaration, a '<div>' element is created to hold the content
> }
> ```

**Method:** `Binh.Router.onroute(callback)`

> `callback`: a function that is invoked every time routing new path
>
> Note: navigate to same path, e.g. `/home` -> `/home`, won't invoke this function.
