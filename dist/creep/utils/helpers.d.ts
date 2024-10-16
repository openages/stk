import { PlatformClassifier } from './types';
export declare const IS_WORKER_SCOPE: any;
declare const ENGINE_IDENTIFIER: any;
declare const IS_BLINK: boolean;
declare const IS_GECKO: boolean;
declare const IS_WEBKIT: boolean;
declare const JS_ENGINE: any;
declare const LIKE_BRAVE: boolean;
declare const LIKE_BRAVE_RESISTANCE: boolean;
declare function braveBrowser(): Promise<boolean>;
declare function getBraveMode(): {
    unknown: boolean;
    allow: boolean;
    standard: boolean;
    strict: boolean;
};
declare const getBraveUnprotectedParameters: (parameters: any) => {};
declare const getOS: (userAgent: any) => "Windows" | "Linux" | "Other" | "Windows Phone" | "Android" | "Chrome OS" | "iPad" | "iPhone" | "iPod" | "iOS" | "Mac";
declare function getReportedPlatform(userAgent: string, platform?: string): PlatformClassifier[];
declare const USER_AGENT_OS: PlatformClassifier, PLATFORM_OS: PlatformClassifier;
declare const decryptUserAgent: ({ ua, os, isBrave }: {
    ua: any;
    os: any;
    isBrave: any;
}) => string;
declare const getUserAgentPlatform: ({ userAgent, excludeBuild }: {
    userAgent: any;
    excludeBuild?: boolean;
}) => any;
declare const computeWindowsRelease: ({ platform, platformVersion, fontPlatformVersion }: {
    platform: any;
    platformVersion: any;
    fontPlatformVersion: any;
}) => string;
declare const attemptWindows11UserAgent: ({ userAgent, userAgentData, fontPlatformVersion }: {
    userAgent: any;
    userAgentData: any;
    fontPlatformVersion: any;
}) => any;
declare const isUAPostReduction: (userAgent: any) => boolean;
declare const getUserAgentRestored: ({ userAgent, userAgentData, fontPlatformVersion }: {
    userAgent: any;
    userAgentData: any;
    fontPlatformVersion: any;
}) => any;
declare const performanceLogger: {
    logTestResult: ({ test, passed, time }: {
        test: any;
        passed: any;
        time?: number;
    }) => void;
    getLog: () => Record<string, string>;
    getTotal: () => number;
};
declare const logTestResult: ({ test, passed, time }: {
    test: any;
    passed: any;
    time?: number;
}) => void;
declare const getPromiseRaceFulfilled: ({ promise, responseType, limit }: {
    promise: any;
    responseType: any;
    limit?: number;
}) => Promise<any>;
declare const createTimer: () => {
    stop: () => any;
    start: () => number;
};
declare const queueEvent: (timer: any, delay?: number) => Promise<unknown>;
declare const queueTask: () => Promise<unknown>;
declare const formatEmojiSet: (emojiSet: any, limit?: number) => any;
declare const EMOJIS: string[];
declare const CSS_FONT_FAMILY = "\n\t'Segoe Fluent Icons',\n\t'Ink Free',\n\t'Bahnschrift',\n\t'Segoe MDL2 Assets',\n\t'HoloLens MDL2 Assets',\n\t'Leelawadee UI',\n\t'Javanese Text',\n\t'Segoe UI Emoji',\n\t'Aldhabi',\n\t'Gadugi',\n\t'Myanmar Text',\n\t'Nirmala UI',\n\t'Lucida Console',\n\t'Cambria Math',\n\t'Bai Jamjuree',\n\t'Chakra Petch',\n\t'Charmonman',\n\t'Fahkwang',\n\t'K2D',\n\t'Kodchasan',\n\t'KoHo',\n\t'Sarabun',\n\t'Srisakdi',\n\t'Galvji',\n\t'MuktaMahee Regular',\n\t'InaiMathi Bold',\n\t'American Typewriter Semibold',\n\t'Futura Bold',\n\t'SignPainter-HouseScript Semibold',\n\t'PingFang HK Light',\n\t'Kohinoor Devanagari Medium',\n\t'Luminari',\n\t'Geneva',\n\t'Helvetica Neue',\n\t'Droid Sans Mono',\n\t'Dancing Script',\n\t'Roboto',\n\t'Ubuntu',\n\t'Liberation Mono',\n\t'Source Code Pro',\n\t'DejaVu Sans',\n\t'OpenSymbol',\n\t'Chilanka',\n\t'Cousine',\n\t'Arimo',\n\t'Jomolhari',\n\t'MONO',\n\t'Noto Color Emoji',\n\tsans-serif !important\n";
declare const hashSlice: (x: any) => any;
declare function getGpuBrand(gpu: string): string | null;
declare const Analysis: Record<string, unknown>;
declare const LowerEntropy: Record<string, boolean>;
export { IS_BLINK, IS_GECKO, IS_WEBKIT, JS_ENGINE, LIKE_BRAVE, LIKE_BRAVE_RESISTANCE, ENGINE_IDENTIFIER, braveBrowser, getBraveMode, getBraveUnprotectedParameters, getOS, getReportedPlatform, USER_AGENT_OS, PLATFORM_OS, decryptUserAgent, getUserAgentPlatform, computeWindowsRelease, attemptWindows11UserAgent, isUAPostReduction, getUserAgentRestored, logTestResult, performanceLogger, getPromiseRaceFulfilled, queueEvent, queueTask, createTimer, formatEmojiSet, EMOJIS, CSS_FONT_FAMILY, hashSlice, Analysis, LowerEntropy, getGpuBrand };
