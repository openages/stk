declare function patch(oldEl: HTMLElement | null, newEl: DocumentFragment, fn?: () => any): any;
declare function html(templateStr: TemplateStringsArray, ...expressionSet: any[]): DocumentFragment;
declare const HTMLNote: {
    UNKNOWN: string;
    UNSUPPORTED: string;
    BLOCKED: string;
    LIED: string;
    SECRET: string;
};
declare const pluralify: (len: any) => "" | "s";
declare const count: (arr: any) => string;
declare const getDiffs: ({ stringA, stringB, charDiff, decorate }: {
    stringA: any;
    stringB: any;
    charDiff?: boolean;
    decorate?: (diff: any) => string;
}) => string;
declare const modal: (name: any, result: any, linkname?: string) => string;
export { patch, html, HTMLNote, pluralify, getDiffs, count, modal };
