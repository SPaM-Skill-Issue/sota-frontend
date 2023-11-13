export interface Audience {
    country_code: string;
    sport_id: number[];
    gender: string;
    age: number;
}

export interface GenderValue {
    gender: string;
    value: number;
}

export interface ResultForSport extends GenderValue{
    country: string;
}

export interface ResultForCountry extends GenderValue{
    sport: string;
}