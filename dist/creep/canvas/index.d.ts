export default function getCanvas2d(): Promise<{
    dataURI: string;
    paintURI: string;
    paintCpuURI: string;
    textURI: string;
    emojiURI: string;
    mods: void | {
        rgba: string;
        pixels: number;
        pixelImage: string;
    };
    textMetricsSystemSum: number;
    liedTextMetrics: number;
    emojiSet: unknown[];
    lied: number | boolean;
}>;
export declare function canvasHTML(fp: any): string;
