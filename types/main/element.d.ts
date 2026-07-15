
import { AliasState } from './state';
import { Router } from './router';

// ---------------------------------------------------------------------------
// Types used by ElementNode methods
// ---------------------------------------------------------------------------

/** A value that can be appended into an ElementNode as child content. */
type EnodeInput =
    | string
    | number
    | boolean
    | null
    | undefined
    | Node
    | ElementNode
    | EnodeInput[]
    | Record<string, any>
    | AliasState<any>
    | ((element: Element) => EnodeInput);

/** CSS property map, supporting custom properties (--var) and standard ones. */
type StyleObject = Partial<CSSStyleDeclaration> & Record<`--${string}`, string>;

/** A style object or a style id string registered via Binh.style(). */
type StyleInput = string | { id: string };

/**
 * Callback passed to `enode.resize()`.
 * `match` is a function that receives a boolean condition plus optional
 * class-name or handler to apply when the condition changes.
 */
type ResizeMatchFn = (
    matched: boolean,
    input?: string | ((matched: boolean) => void),
    enodes?: ElementNode[]
) => void;

/** Callback signature for `enode.resize()`. */
type ResizeCallback = (match: ResizeMatchFn) => void;

/**
 * An action descriptor returned by `enode.action(name)`.
 * Calling it invokes the registered handler and returns `{ value }` or
 * `undefined` if no handler is registered.
 */
type ActionResult<T = any> = () => { value: T } | undefined;

/**
 * A callable ElementNode instance.
 *
 * When called as a function it appends children / sets attributes on the
 * underlying DOM element and returns itself (chainable).
 */
export interface ElementNode {
    // ----- callable signature -----
    (...inputs: EnodeInput[]): ElementNode;

    // ----- instance properties -----
    element: Element;
    constructor: typeof ElementNode;
    fake?: boolean;
    queue?: Array<(enode: ElementNode) => void>;
    onref?: ((element: Element) => void) & { enodes?: ElementNode[] };
    router?: Router;
    actions?: Record<string, (...args: any[]) => any>;
    styles?: string[];
    customs?: string[];

    // ----- core lifecycle -----

    /** Replace the underlying DOM element this enode tracks. */
    set(element: Element): ElementNode;

    /**
     * Link two enodes together so they always share the same DOM element
     * (swapping when one of them is placed in the DOM).
     */
    ref(enodeTarget: ElementNode): ElementNode;

    /** Replace this enode's DOM element with `enodeTarget`'s element in the DOM. */
    swap(enodeTarget: ElementNode): ElementNode;

    /** Queue `callback` to run once the enode is ready (element is available). */
    ready(callback: (enode: ElementNode) => void): ElementNode;

    // ----- events -----

    /** Dispatch a custom DOM event on the element. */
    emit(eventType: string): ElementNode;

    /**
     * Add an event listener.
     *
     * `eventType` can be a string like `'click'` or `'click .child-selector'`,
     * or an array of such strings.
     */
    on(
        eventType: string | string[],
        eventCallback: (event: Event & { enode: ElementNode; currentEnode: ElementNode }) => void,
        options?: AddEventListenerOptions | boolean
    ): ElementNode;

    /**
     * Remove an event listener.
     *
     * When called with no arguments it removes the element from the DOM
     * (legacy behaviour — prefer `enode.remove()`).
     */
    off(
        eventType?: string | string[],
        eventCallback?: (event: Event) => void,
        options?: EventListenerOptions | boolean
    ): ElementNode;

    /**
     * Listen for the first occurring event among a space-separated list of
     * event types, then re-attach only that event type's listener.
     */
    race(
        eventType: string,
        eventCallback: (event: Event) => void,
        options?: AddEventListenerOptions | boolean
    ): ElementNode;

    /** Remove the element from the DOM. */
    remove(): ElementNode;

    // ----- state -----

    /**
     * Register a named action handler (or a map of name → handler).
     *
     * @example
     * enode.when('reset', () => { ... });
     * enode.when({ reset: () => { ... }, submit: () => { ... } });
     */
    when(name: string, callback: (...args: any[]) => any): ElementNode;
    when(handlers: Record<string, (...args: any[]) => any>): ElementNode;

    /**
     * Return a function that, when called, invokes the named action handler
     * registered via `enode.when()`.
     */
    action<T = any>(name: string): ActionResult<T>;

    /** Get the current `.value` of the underlying form element. */
    value(): string;
    /**
     * Set the `.value` of the underlying form element.
     * Optionally emit an event after setting.
     */
    value(value: string, eventName?: string): ElementNode;

    /** Subscribe to state changes (continuous — fires on every change). */
    listen(key: symbol | string | AliasState<any>, callback: (value: any, subscription: any) => void): ElementNode;

    /** Subscribe to state changes (fires immediately with current value, then on every change). */
    read(key: symbol | string | AliasState<any>, callback: (value: any, subscription: any) => void): ElementNode;

    /** Subscribe to state (one-shot — fires once for the current/next value). */
    request(key: symbol | string | AliasState<any>, callback: (value: any, subscription: any) => void): ElementNode;

    // ----- DOM manipulation -----

    /** Clone the element (optionally deep). Returns a new ElementNode wrapping the clone. */
    clone(deep?: boolean): ElementNode;

    /** Clear all child content of the element. */
    empty(): ElementNode;

    /** Clear all child content then append new children (equivalent to `empty` + call). */
    new(...inputs: EnodeInput[]): ElementNode;

    // ----- styling -----

    /** Apply inline styles via a CSS property map. */
    css(styleObject: StyleObject): ElementNode;
    /** Apply a single inline style property. */
    css(property: string, value: string): ElementNode;

    /**
     * Apply one or more registered styles (by id or string name) to the element's
     * class list, replacing any previously applied styles.
     */
    style(...styles: StyleInput[]): ElementNode;

    /** Remove all styles previously applied via `enode.style()`. */
    nostyle(): ElementNode;

    /**
     * Replace the element's custom class list with the given class strings
     * (whitespace-separated class names are split automatically).
     */
    custom(...classStrings: string[]): ElementNode;

    /**
     * Add or remove a class based on a boolean flag.
     * `bool === false` → `removeClass`; anything else → `addClass`.
     */
    class(classString: string, bool?: boolean): ElementNode;

    /** Add one or more class names (whitespace-separated strings are split). */
    addClass(...classStrings: string[]): ElementNode;

    /** Remove one or more class names (whitespace-separated strings are split). */
    removeClass(...classStrings: string[]): ElementNode;

    /** Toggle one or more class names. */
    toggleClass(...classStrings: string[]): ElementNode;

    // ----- iteration -----

    /**
     * Iterate over an array (or a reactive `AliasState` array) and append
     * the result of `callback(item, index, array)` for each item.
     *
     * @deprecated Prefer external array transforms or `enode(array)`.
     */
    each<T>(
        input: T[] | AliasState<T[]>,
        callback?: (item: T, index: number, array: T[]) => EnodeInput
    ): ElementNode;

    // ----- utilities -----

    /**
     * Assign this enode to `object[key]` (or `object.enode` if no key given).
     * Returns `this` for chaining.
     */
    as(object: Record<string, any>, key?: string): ElementNode;

    /**
     * Conditionally call `enode(input)` only when `input` is a meaningful
     * value (not `NaN`, `null`, or `undefined`).
     *
     * @deprecated
     */
    for(input: any, deepCheck?: boolean | ((input: any, enode: ElementNode) => any)): ElementNode | undefined;

    // ----- responsive -----

    /**
     * Run `callback(match)` on every `window resize` event (debounced via
     * `requestAnimationFrame`) while the element remains in the DOM.
     */
    resize(callback: ResizeCallback): ElementNode;

    /**
     * Apply `input` (class name or handler) based on whether the screen width
     * is ≤ `value` pixels, and update reactively on resize.
     */
    screen(
        value: number,
        input: string | ((matched: boolean) => void)
    ): ElementNode;

    // ----- routing -----

    /**
     * Attach a `Binh.Router` instance to this enode using the given route map.
     * The router's root element is managed by this enode.
     */
    route(routes: Record<string, any>): ElementNode;

    // ----- DOM traversal -----

    /** Apply the given arguments to this enode's parent element. */
    parent(...inputs: EnodeInput[]): ElementNode;

    // ----- reactive rendering -----

    /**
     * Listen to a `AliasState` and re-render this enode's children whenever
     * the state changes.
     *
     * - If `callback` returns `undefined` → no change.
     * - If `callback` returns `null` → empties the element.
     * - Otherwise → calls `enode.new(output)`.
     */
    append<T>(
        state: AliasState<T>,
        callback: (value: T, subscription: any) => EnodeInput | null | undefined
    ): ElementNode;
}

// ---------------------------------------------------------------------------
// ElementNode constructor / factory
// ---------------------------------------------------------------------------

/**
 * Create (or retrieve) an `ElementNode` wrapping the given DOM `element`.
 *
 * @example
 * const enode = new Binh.ElementNode(document.getElementById('app'));
 */
export declare class ElementNode {
    constructor(element: Element);
}

// ---------------------------------------------------------------------------
// TagHTML factory
// ---------------------------------------------------------------------------

/**
 * A tag factory function returned by `Binh.el(tagname)`.
 * Calling it creates a new `ElementNode` for an HTML element of that tag and
 * appends the given inputs as children / attributes.
 */
export interface TagFactory {
    (...inputs: EnodeInput[]): ElementNode;
    constructor: Function;
}

/**
 * A tag factory function returned by `Binh.svg(tagname)`.
 * Same as `TagFactory` but creates SVG elements in the SVG namespace.
 */
export interface SVGTagFactory {
    (...inputs: EnodeInput[]): ElementNode;
    constructor: Function;
}

// ---------------------------------------------------------------------------
// Binh.el / Binh.element / Binh.els
// ---------------------------------------------------------------------------

/**
 * Define (or retrieve) a cached HTML tag factory for `tagname`.
 *
 * `tagname` is automatically converted to kebab-case when creating the element
 * (e.g. `'myButton'` → `<my-button>`).
 *
 * @example
 * const div = Binh.el('div');
 * div({ class: 'container' }, 'Hello');
 */
export declare function el(tagname: string): TagFactory;

/**
 * Pre-define one or more HTML tag factories and return the shared `elements`
 * cache object.
 *
 * @example
 * const { div, span } = Binh.element('div', 'span');
 */
export declare function element(...tagnames: string[]): Record<string, TagFactory>;

/** Shared cache of all HTML tag factories defined via `Binh.el()` / `Binh.element()`. */
export declare const els: Record<string, TagFactory>;

// ---------------------------------------------------------------------------
// Binh.svg / Binh.svgs / Binh.SVGs
// ---------------------------------------------------------------------------

/**
 * Define (or retrieve) a cached SVG tag factory for `tagname`.
 *
 * SVG tag names are kept as-is (no kebab-case conversion) to support tags
 * like `<clipPath>`.
 *
 * @example
 * const circle = Binh.svg('circle');
 * circle({ cx: 50, cy: 50, r: 40 });
 */
export declare function svg(tagname: string): SVGTagFactory;

/**
 * Pre-define one or more SVG tag factories and return the shared `SVGs`
 * cache object.
 *
 * @example
 * const { circle, rect } = Binh.svgs('circle', 'rect');
 */
export declare function svgs(...tagnames: string[]): Record<string, SVGTagFactory>;

/** Shared cache of all SVG tag factories defined via `Binh.svg()` / `Binh.svgs()`. */
export declare const SVGs: Record<string, SVGTagFactory>;
