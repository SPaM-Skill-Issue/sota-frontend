import React, { useState, useEffect } from 'react';

export interface SportsIconsProps {
    sportId: number;
}

interface SportsIconsData {
    sport_id: number;
    sport_name: string;
    sport_icon: string[];
}

const SportsIcons: React.FC<SportsIconsProps> = ({ sportId }) => {
    const [data, setData] = useState<SportsIconsData[]>([]);

    useEffect(() => {
        const fetchSportsIcons = async () => {
            try {
                let sportsData: SportsIconsData[] = [];
                const cachedData = localStorage.getItem('sportsIconsData');
                if (cachedData) {
                    sportsData = JSON.parse(cachedData) as SportsIconsData[];
                } else {
                    const response = await fetch('/sportsIconsData.json');
                    sportsData = await response.json() as SportsIconsData[];
                    localStorage.setItem('sportsIconsData', JSON.stringify(sportsData));
                }

                const filteredData = sportsData.filter((sport) => sport.sport_id === sportId);
                setData(filteredData);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchSportsIcons();
    }, [sportId]);

    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 504 504" xmlSpace="preserve">
            {data.map((sport) => (
                sport.sport_icon.map((icon) => (
                    <path d={icon} />
                ))
            ))}
        </svg>
    );
};

export default SportsIcons;
