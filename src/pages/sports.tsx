import React from 'react';
import SearchBar from '../components/searchBar';

const Sports: React.FC = () => {
  const handleSearch = (value: string) => {
    console.log(`Searching for: ${value}`);
    // TODO: search logic 
  };

  return (
    <div className='flex justify-center'>
      <SearchBar onSearch={handleSearch} placeHolder='Find a sport...'/>
    </div>
  );
};

export default Sports;
