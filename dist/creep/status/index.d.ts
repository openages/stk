export declare function getStorage(): Promise<number | null>;
interface Status {
    charging?: boolean;
    chargingTime?: number;
    dischargingTime?: number;
    level?: number;
    memory: number | null;
    memoryInGigabytes: number | null;
    quota: number | null;
    quotaIsInsecure: boolean | null;
    quotaInGigabytes: number | null;
    downlink?: number;
    effectiveType?: string;
    rtt?: number | undefined;
    saveData?: boolean;
    downlinkMax?: number;
    type?: string;
    stackSize: number;
    timingRes: [number, number];
    clientLitter: string[];
    scripts: string[];
    scriptSize: number | null;
}
export declare function getStatus(): Promise<Status>;
export declare function statusHTML(status: Status): string;
export {};
