export declare function getWebRTCDevices(): Promise<MediaDeviceKind[] | null>;
export declare const getMediaCapabilities: () => Promise<void | {}>;
export default function getWebRTCData(): Promise<Record<string, unknown> | null>;
export declare function webrtcHTML(webRTC: any, mediaDevices: any): string;
