export default function getHeadlessFeatures({ webgl, workerScope }: {
    webgl: any;
    workerScope: any;
}): Promise<{
    likeHeadlessRating: number;
    headlessRating: number;
    stealthRating: number;
    systemFonts: string;
    platformEstimate: (number | Record<string, number>)[];
    chromium: boolean;
    likeHeadless: Record<string, boolean>;
    headless: Record<string, boolean>;
    stealth: Record<string, boolean>;
}>;
export declare function headlessFeaturesHTML(fp: any): string;
