//===================================
// Add your custom types here.
//===================================

import Lenis from "lenis";

export type AsyncReturnType<T extends (...args: any) => any> = T extends (
    ...args: any
) => Promise<infer R>
    ? R
    : any;
export type SearchParams = Promise<{
    [key: string]: string | string[] | undefined;
}>;
export type LenisScrolltoProperties = {
    offset?: number;
    immediate?: boolean;
    lock?: boolean;
    duration?: number;
    easing?: any;
    lerp?: number;
    onStart?: (lenis: Lenis) => void;
    onComplete?: (lenis: Lenis) => void;
    force?: boolean;
    programmatic?: boolean;
    userData?: object;
};
