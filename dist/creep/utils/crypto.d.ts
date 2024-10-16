declare const hashMini: (x: any) => string;
declare const instanceId: string;
declare const hashify: (x: any, algorithm?: string) => Promise<string>;
declare function cipher(data: any): Promise<string[]>;
declare const getBotHash: (fp: any, imports: any) => {
    botHash: string;
    badBot: string;
};
declare const getFuzzyHash: (fp: any) => Promise<string>;
export { hashMini, instanceId, hashify, getBotHash, getFuzzyHash, cipher };
