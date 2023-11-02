import React, { useState } from 'react';
import { Radio, RadioChangeEvent } from 'antd';
import SearchBar from '../components/searchBar';

const FilterComponent: React.FC = () => {
    const [selectedCategory, setSelectedCategory] = useState<string>('sports'); // Set "sports" as default
    const [placeholderText, setPlaceholderText] = useState<string>('Search sports...'); // Set default placeholder

    const handleCategoryChange = (e: RadioChangeEvent) => {
        const selectedValue = e.target.value;
        setSelectedCategory(selectedValue);

        if (selectedValue === 'sports') {
            setPlaceholderText('Search sports...');
        } else if (selectedValue === 'country') {
            setPlaceholderText('Search countries...');
        }
    };

    const handleSearch = (value: string) => {
        console.log(`Searching for: ${value}`);
        // TODO: search logic 
    };

    return (
        <div className='flex justify-center'>
            <div className='text-2xl font-primary text-white mr-5 font-semi-bold'>Filter:</div>
            <Radio.Group onChange={handleCategoryChange} value={selectedCategory} className='font-primary'>
                <Radio value="sports">Sports</Radio>
                <Radio value="country">Country</Radio>
            </Radio.Group>
            <SearchBar onSearch={handleSearch} placeHolder={placeholderText} />
        </div>
    );
};

export default FilterComponent;
