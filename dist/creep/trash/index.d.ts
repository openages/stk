declare const proxyBehavior: (x: any) => boolean;
declare const gibberish: (str: string, { strict }?: {
    strict?: boolean;
}) => string[];
declare const trustInteger: (name: any, val: any) => any;
declare function compressWebGLRenderer(x: string): string | undefined;
declare const getWebGLRendererParts: (x: any) => string;
declare const hardenWebGLRenderer: (x: any) => any;
declare const getWebGLRendererConfidence: (x: any) => {
    parts: string;
    warnings: string[];
    gibbers: string;
    confidence: string;
    grade: string;
};
declare const trashBin: {
    getBin: () => any[];
    sendToTrash: (name: any, val: any, response?: any) => any;
};
declare const sendToTrash: (name: any, val: any, response?: any) => any;
declare const getTrash: () => {
    trashBin: any[];
};
declare function trashHTML(fp: any, pointsHTML: any): string;
export { sendToTrash, proxyBehavior, gibberish, trustInteger, compressWebGLRenderer, getWebGLRendererParts, hardenWebGLRenderer, getWebGLRendererConfidence, trashBin, getTrash, trashHTML };
