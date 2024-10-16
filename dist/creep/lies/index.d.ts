declare const lieRecords: {
    getRecords: () => Record<string, string[]>;
    documentLie: (name: string, lie: string | string[]) => number | string[];
};
declare const documentLie: (name: string, lie: string | string[]) => number | string[];
declare function getRandomValues(): string;
interface SearchConfig {
    target?: string[] | undefined;
    ignore?: string[] | undefined;
}
declare function createLieDetector(scope: Window & typeof globalThis): {
    getProps: () => Record<string, string[]>;
    getPropsSearched: () => string[];
    searchLies: (fn: Function, config?: SearchConfig) => void;
};
declare const PHANTOM_DARKNESS: Window, PARENT_PHANTOM: HTMLDivElement;
declare let lieProps: Record<string, number>;
declare let prototypeLies: any;
declare let PROTO_BENCHMARK: number;
declare const getPluginLies: (plugins: PluginArray, mimeTypes: MimeTypeArray) => {
    validPlugins: Plugin[];
    validMimeTypes: MimeType[];
    lies: any[];
};
declare const getLies: () => {
    data: Record<string, string[]>;
    totalLies: number;
};
interface LiesFingerprint {
    lies: {
        data: Record<string, string[]>;
        totalLies: number;
        $hash: string;
    };
}
declare function liesHTML(fp: LiesFingerprint, pointsHTML: string): string;
export { getRandomValues, documentLie, createLieDetector, PHANTOM_DARKNESS, PARENT_PHANTOM, lieProps, prototypeLies, lieRecords, getLies, getPluginLies, liesHTML, PROTO_BENCHMARK };
