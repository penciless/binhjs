
export class State<T = any> {
    value: T | undefined;
    ids: string[];
    subs: Record<string, { enode: any; handler: (value: T, subscription: Subscription<T>) => void }>;

    get(defaultValue?: T): T | undefined;
    set(value: T, option?: SetOption): State<T>;
    patch(patch: T extends object ? Partial<T> : never, option?: SetOption): State<T>;
    edit(editor: (prev: T | undefined) => T, option?: SetOption): State<T>;
    emit(): void;

    listen(callback: (value: T, subscription: Subscription<T>) => void, enode?: any): void;
    request(callback: (value: T, subscription: Subscription<T>) => void, enode?: any): string | undefined;
    read(callback: (value: T, subscription: Subscription<T>) => void, enode?: any): void;

    size(): number;
    isSet(): boolean;
    onSet(): boolean;

    fork(initValue?: T): State<T>;
    map<U>(transform: (value: T) => U): State<U>;

    /** @deprecated Use a dedicated State instance instead */
    as(key: string): State<any>;

    static all<T extends Record<string, State | any>>(
        input: T,
        options?: { deep?: boolean }
    ): State<{ [K in keyof T]: T[K] extends State<infer V> ? V : T[K] }>;

    static all<T extends (State | any)[]>(
        input: T,
        options?: { deep?: boolean }
    ): State<{ [K in keyof T]: T[K] extends State<infer V> ? V : T[K] }>;
}

export interface Subscription<T = any> {
    enode: any;
    cancel: () => void;
}

export interface SetOption {
    emit?: boolean;
}

// Weak type for JS
export function state(sid: string): State<any>;

// Generic override for TS or JSDoc
export function state<T>(sid: string): State<T>;

// Infer from constructor
export function state<C extends new (...args: any[]) => any>(
    sid: string,
    options: { type: C }
): State<InstanceType<C>>;

// Infer from function's returned value
export function state<F extends (...args: any[]) => any>(
    sid: string,
    options: { type: F }
): State<ReturnType<F>>;
