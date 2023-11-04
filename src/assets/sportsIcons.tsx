import React, { useState, useEffect } from 'react';

interface SportsIconsProps {
    sportId: number;
}

const SportsIcons: React.FC<SportsIconsProps> = ({ sportId }) => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchSportsIcons = async () => {
            try {
                const response = await fetch('src/assets/sportsIconsData.json');
                const sportsData = await response.json();
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
                <path key={sport.sport_id} d={sport.sport_icon[0]} />
            ))}
        </svg>
    );
};

export default SportsIcons;
