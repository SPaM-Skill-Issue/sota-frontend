export interface CountryEntry {
    rank: number;
    country: string;
    total: number;
    gold: number;
    silver: number;
    bronze: number;
}

export interface SportEntry {
    rank: number;
    sportId: number;
    sportName: string;
    total: number;
    gold: number;
    silver: number;
    bronze: number;
}

export interface SubSportEntry {
    subSportName: string;
    total: number;
    gold: number;
    silver: number;
    bronze: number;
}

export interface MedalObject {
    gold: number;
    silver: number;
    bronze: number;
}