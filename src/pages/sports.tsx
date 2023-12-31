import React, { useEffect, useState } from 'react';
import SearchBar from '../components/searchBar';
import SportCard from '../components/sportCard';
import SportsIcons from '../components/sportsIcons';
import { Link } from 'react-router-dom';
import { SportDataIcon } from '../interfaces/sport';
import "../styles/scrollbar.css"
import { Spin } from 'antd';

const SPORTS_API_URL = 'https://sota-backend.fly.dev/sports';

const getSportIcon = (id: number): JSX.Element => {
    return <SportsIcons sportId={id} />;
};

const Sports: React.FC = () => {
    const [sportsIcons, setSportsIcons] = useState<SportDataIcon[]>([]);
    const [search, setSearch] = useState('')
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSports = async () => {
            setLoading(true);
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
            } finally {
                setLoading(false);
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
            {loading ? (
                <div className="flex items-center justify-center w-screen h-[75vh]">
                    <Spin size="large" />
                </div>
            ) : (
                <div className='scrollable-container mt-10 overflow-y-auto h-[70vh]'>
                    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 justify-evenly'>
                        {filteredSportsIcons.map((icon) => (
                            <div
                                key={icon.sportId}
                                className='flex justify-center bg-belft-blue w-11/12 rounded-2xl m-3 hover:opacity-75 transition-all duration-300 transform hover:scale-105 active:scale-95'
                            >
                                <Link to={`/sports/${icon.sportId}`}>
                                    <SportCard sportName={icon.sportName} sportIcon={icon.sportIcon} color='#4C9F70' />
                                </Link>
                            </div>
                        ))}

                    </div>
                </div>)}
        </div>
    );
};

export default Sports;
