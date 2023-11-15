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
    
    // Custom cache object
    const cache: { [key: number]: SportsIconsData[] } = {};

    useEffect(() => {
        const fetchSportsIcons = async () => {
            try {
                if (cache[sportId]) {
                    // If icons are in cache, set data from cache
                    setData(cache[sportId]);
                } else {
                    const response = await fetch('/sportsIconsData.json');
                    const sportsData = await response.json() as SportsIconsData[];
                    const filteredData = sportsData.filter((sport) => sport.sport_id === sportId);
                    setData(filteredData);

                    // Cache the fetched icons
                    cache[sportId] = filteredData;
                }
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
