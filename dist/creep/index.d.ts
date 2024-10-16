export declare const getCode: () => Promise<{
    fingerprint: any;
    styleSystemHash: any;
    styleHash: any;
    domRectHash: any;
    mimeTypesHash: any;
    canvas2dImageHash: any;
    canvas2dPaintHash: any;
    canvas2dTextHash: any;
    canvas2dEmojiHash: any;
    canvasWebglImageHash: any;
    canvasWebglParametersHash: any;
    deviceOfTimezoneHash: any;
    storage: number;
}>;
export declare const getFingerprint: () => Promise<{
    code: string;
    err: any;
}>;
