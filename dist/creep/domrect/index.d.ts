export default function getClientRects(): Promise<{
    elementClientRects: Record<string, number>[];
    elementBoundingClientRect: Record<string, number>[];
    rangeClientRects: Record<string, number>[];
    rangeBoundingClientRect: Record<string, number>[];
    emojiSet: any[];
    domrectSystemSum: number;
    lied: number | boolean;
}>;
export declare function clientRectsHTML(fp: any): string;
