export default function getCanvasWebgl(): Promise<{
    gpu: {
        compressedGPU: string;
        parts?: string;
        warnings?: string[];
        gibbers?: string;
        confidence?: string;
        grade?: string;
    };
    extensions: any[];
    pixels: any;
    pixels2: any;
    dataURI: any;
    dataURI2: any;
    parameters: {
        MAX_DRAW_BUFFERS_WEBGL: any;
        antialias: any;
        MAX_VIEWPORT_DIMS: any;
        MAX_TEXTURE_MAX_ANISOTROPY_EXT: any;
        UNMASKED_VENDOR_WEBGL?: undefined;
        UNMASKED_RENDERER_WEBGL?: undefined;
    } | {
        MAX_DRAW_BUFFERS_WEBGL: any;
        antialias: any;
        MAX_VIEWPORT_DIMS: any;
        MAX_TEXTURE_MAX_ANISOTROPY_EXT: any;
        UNMASKED_VENDOR_WEBGL: any;
        UNMASKED_RENDERER_WEBGL: any;
    } | {
        MAX_DRAW_BUFFERS_WEBGL: any;
        antialias: any;
        MAX_VIEWPORT_DIMS: any;
        MAX_TEXTURE_MAX_ANISOTROPY_EXT: any;
        UNMASKED_VENDOR_WEBGL: any;
        UNMASKED_RENDERER_WEBGL: any;
    } | {
        MAX_DRAW_BUFFERS_WEBGL: any;
        antialias: any;
        MAX_VIEWPORT_DIMS: any;
        MAX_TEXTURE_MAX_ANISOTROPY_EXT: any;
        UNMASKED_VENDOR_WEBGL: any;
        UNMASKED_RENDERER_WEBGL: any;
    };
    parameterOrExtensionLie: number;
    lied: number | boolean;
}>;
export declare function webglHTML(fp: any): string;
