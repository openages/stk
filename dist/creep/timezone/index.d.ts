export default function getTimezone(): {
    zone: string;
    location: any;
    locationMeasured: any;
    locationEpoch: number;
    offset: number;
    offsetComputed: number;
    lied: number | boolean;
};
export declare function timezoneHTML(fp: any): string;
