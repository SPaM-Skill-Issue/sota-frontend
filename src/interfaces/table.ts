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
    name?: string | undefined;
    sport_id: number;
    sport_name: string;
    total: number;
    gold: number;
    silver: number;
    bronze: number;
    sub_sports: SubSportEntry[];
}

export interface SubSportEntry {
    key: string;
    name?: string | undefined;
    sub_name: string;
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