import { SportsIconsProps } from '../components/sportsIcons';

export interface SportType {
  type_id: number; // Assuming the type details include an ID
  type_name: string; // And any other relevant properties
  participating_countries: string[];
}

export interface Sport {
  sport_id: number;
  sport_name: string;
  sport_summary: string;
  participating_countries: string[];
  sport_types: SportType[]; // Array of SportType, assuming each type has its own set of properties
}

export interface SportDataIcon {
  sportId: number;
  sportName: string;
  sportIcon: JSX.Element;
}
