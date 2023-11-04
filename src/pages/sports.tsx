import React from 'react';
import SearchBar from '../components/searchBar';
import SportCard from '../components/sportCard';
import SportsIcons from '../components/sportsIcons';

const sportsData = [
    {
        sportName: "Archery",
        sportIcon: <SportsIcons sportId={1} />
    },
    {
        sportName: "Artistic Gymnastics",
        sportIcon: <SportsIcons sportId={2} />
    },
    {
        sportName: "Artistic Swimming",
        sportIcon: <SportsIcons sportId={3} />
    },
    {
        sportName: "Athletics",
        sportIcon: <SportsIcons sportId={4} />
    },
    {
        sportName: "Badminton",
        sportIcon: <SportsIcons sportId={5} />
    },
    {
        sportName: "Basketball",
        sportIcon: <SportsIcons sportId={6} />
    }
];

const Sports: React.FC = () => {
    const handleSearch = (value: string) => {
        console.log(`Searching for: ${value}`);
        // TODO: search logic 
    };

    return (
        <div className='w-full h-full'>
            <div className='flex justify-center'>
                <SearchBar onSearch={handleSearch} placeHolder='Find a sport...' />
            </div>
            <div className='mt-10'>
                {sportsData.length > 0 && (
                    <div className='flex flex-wrap justify-evenly'>
                        {sportsData.map((sport, index) => (
                            <div className='flex justify-center bg-belft-blue w-1/6 rounded-2xl m-3'>
                                <a><SportCard key={index} sportName={sport.sportName} sportIcon={sport.sportIcon} color='#4C9F70' /></a>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Sports;
