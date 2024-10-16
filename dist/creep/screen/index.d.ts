export default function getScreen(log?: boolean): Promise<{
    width: any;
    height: any;
    availWidth: any;
    availHeight: any;
    colorDepth: any;
    pixelDepth: any;
    touch: boolean;
    lied: number | boolean;
}>;
export declare function screenHTML(fp: any): string;
