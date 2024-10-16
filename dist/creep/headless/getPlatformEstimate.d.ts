export default function getPlatformEstimate(): [
    scores: Record<string, number>,
    highestScore: number,
    headlessEstimate: Record<string, boolean>
] | [];
