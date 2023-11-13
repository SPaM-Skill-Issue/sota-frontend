export interface MedalCount {
    type: string,
    value: number
}

export interface MedalBySportCountry {
    [type: string]: number;
}