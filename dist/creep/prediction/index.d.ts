export declare function getBlankIcons(): string;
export default function getPrediction({ hash, data }: {
    hash: any;
    data: any;
}): {
    decrypted: string;
    system: string;
    device: string;
    gpu: string;
    gpuBrand: string;
};
export declare function renderPrediction({ decryptionData, crowdBlendingScore, bot, }: {
    decryptionData: any;
    crowdBlendingScore: any;
    bot?: boolean;
}): any;
export declare function predictionErrorPatch(error: string): void;
