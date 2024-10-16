export declare function getFeaturesLie(fp: any): boolean;
export default function getEngineFeatures({ cssComputed, navigatorComputed, windowFeaturesComputed }: {
    cssComputed: any;
    navigatorComputed: any;
    windowFeaturesComputed: any;
}): Promise<{
    versionRange: any;
    version: any;
    cssVersion: any;
    windowVersion: any;
    jsVersion: any;
    cssFeatures: unknown[];
    windowFeatures: unknown[];
    jsFeatures: unknown[];
    jsFeaturesKeys: any[];
}>;
export declare function featuresHTML(fp: any): string;
