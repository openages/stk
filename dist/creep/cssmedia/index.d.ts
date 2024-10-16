export default function getCSSMedia(): {
    mediaCSS: {
        "prefers-reduced-motion": string;
        "prefers-color-scheme": string;
        monochrome: string;
        "inverted-colors": string;
        "forced-colors": string;
        "any-hover": string;
        hover: string;
        "any-pointer": string;
        pointer: string;
        "device-aspect-ratio": string;
        "device-screen": string;
        "display-mode": string;
        "color-gamut": string;
        orientation: string;
    };
    matchMediaCSS: {
        "prefers-reduced-motion": string;
        "prefers-color-scheme": string;
        monochrome: string;
        "inverted-colors": string;
        "forced-colors": string;
        "any-hover": string;
        hover: string;
        "any-pointer": string;
        pointer: string;
        "device-aspect-ratio": string;
        "device-screen": string;
        "display-mode": string;
        "color-gamut": string;
        orientation: string;
    };
    screenQuery: {
        width: any;
        height: any;
    };
};
export declare function cssMediaHTML(fp: any): string;
