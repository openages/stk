export declare function isFontOSBad(userAgentOS: string, fonts: string[]): boolean;
export default function getFonts(): Promise<{
    fontFaceLoadFonts: string[];
    platformVersion: string;
    apps: any[];
    emojiSet: any[];
    pixelSizeSystemSum: number;
    lied: number;
}>;
export declare function fontsHTML(fp: any): string;
