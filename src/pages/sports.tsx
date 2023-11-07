import React, { useEffect, useState } from 'react';
import SearchBar from '../components/searchBar';
import SportCard from '../components/sportCard';
import SportsIcons from '../components/sportsIcons';
import { Link } from 'react-router-dom';
import { SportDataIcon } from '../interfaces/sport';
import "../styles/scrollbar.css"

const SPORTS_API_URL = 'https://sota-backend.fly.dev/sports';

const getSportIcon = (id: number): JSX.Element => {
    return <SportsIcons sportId={id} />;
};

const Sports: React.FC = () => {
    const [sportsIcons, setSportsIcons] = useState<SportDataIcon[]>([]);
    const [search, setSearch] = useState('')

    useEffect(() => {
        const fetchSports = async () => {
            try {
                const res = await fetch(SPORTS_API_URL);
                const data: { [key: string]: string } = await res.json();
                const sportDataIcons: SportDataIcon[] = Object.entries(data).map(([id, name]) => ({
                    sportId: parseInt(id, 10),
                    sportName: name,
                    sportIcon: getSportIcon(parseInt(id, 10))
                }))
                setSportsIcons(sportDataIcons)
            } catch (error) {
                console.error("Error fetching sport data: ", error);
            }
        };
        fetchSports();
    }, [])

    const handleSearch = (value: string) => {
        setSearch(value.toLowerCase());
    };

    const filteredSportsIcons = sportsIcons.filter((item) => {
        return search === '' || item.sportName.toLowerCase().includes(search);
    });

    return (
        <div className='w-full h-full flex flex-col'>
            <div className='flex justify-center'>
                <SearchBar onSearch={handleSearch} placeHolder='Find a sport...' />
            </div>
            <div className='scrollable-container mt-10 overflow-y-auto h-[70vh]'> 
                <div className='flex flex-wrap justify-evenly'>
                    {filteredSportsIcons.map((icon) => (
                        <div key={icon.sportId} className='flex justify-center bg-belft-blue w-1/6 rounded-2xl m-3'>
                            <Link to={`/sports/${icon.sportId}`}>
                                <SportCard sportName={icon.sportName} sportIcon={icon.sportIcon} color='#4C9F70' />
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Sports;
