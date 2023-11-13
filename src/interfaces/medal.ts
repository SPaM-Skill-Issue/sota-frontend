export interface MedalTypeCount {
    gold: number;
    silver: number;
    bronze: number;
}

export interface MedalBySportCountry {
    [type: string]: number;
}