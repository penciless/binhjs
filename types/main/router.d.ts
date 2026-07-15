
type RouteComponent =
    | string
    | number
    | ((parameters: Record<string, string>, route: string) => Node | Node[] | { element: Node } | string | void)
    | { element: Node };

interface RouterOptions {
    enode?: any;
    element?: Element;
}

interface MatchedRoute {
    route: string;
    component: RouteComponent;
    parameters: Record<string, string>;
}

interface QueryOptions {
    decode?: boolean;
}

export class Router {
    enode: any;
    element: Element;

    constructor(routes: Record<string, RouteComponent>, options?: RouterOptions);

    getParameters(): Record<string, string>;
    load(event?: Event | any): void;

    static onroute(callback: () => void): void;
    static navigate(route: string, state?: object): void;
    static match(route: string): boolean;
    static matchParam(route: string): Record<string, string> | undefined;
    static query(options?: QueryOptions): Record<string, string>;
}
