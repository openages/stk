export default function getCSS(): {
    computedStyle: {
        keys: any[];
        interfaceName: string;
    };
    system: {
        colors: {
            [x: string]: string;
        }[];
        fonts: {
            [x: string]: string;
        }[];
    };
};
export declare function cssHTML(fp: any): string;
