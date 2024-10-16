declare const errorsCaptured: {
    getErrors: () => any[];
    captureError: (error: any, customMessage?: string) => any;
};
declare const captureError: (error: any, customMessage?: string) => any;
declare const attempt: (fn: any, customMessage?: string) => any;
declare const caniuse: (fn: any, objChainList?: any[], args?: any[], method?: boolean) => any;
declare const timer: (logStart?: boolean) => (logEnd?: boolean | string) => number;
declare const getCapturedErrors: () => {
    data: any[];
};
declare const errorsHTML: (fp: any, pointsHTML: any) => string;
export { captureError, attempt, caniuse, timer, errorsCaptured, getCapturedErrors, errorsHTML };
