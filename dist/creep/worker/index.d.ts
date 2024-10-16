export declare const enum Scope {
    WORKER = 0,
    WINDOW = 1
}
export declare let WORKER_TYPE: string;
export declare let WORKER_NAME: string;
export declare function spawnWorker(): Promise<Scope>;
export default function getBestWorkerScope(): Promise<any>;
export declare function workerScopeHTML(fp: any): string;
