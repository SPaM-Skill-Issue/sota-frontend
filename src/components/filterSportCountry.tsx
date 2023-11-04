import React, { useState } from 'react';
import { Radio, RadioChangeEvent } from 'antd';
import DropdownMenu from './dropdownMenu';

const sportItems = [
    {
        label: "Archery",
        key: '1',
    },
    {
        label: "Artistic Gymnastics",
        key: '2',
    },
    {
        label: 'Artistic Swimming',
        key: '3',
    },
];

const countryItems = [
    {
        label: 'Korea',
        key: 'KR',
    },
    {
        label: 'Thailand',
        key: 'TH',
    },
    {
        label: 'Japan',
        key: 'JP',
    },
];

const FilterComponent: React.FC = () => {
    const [selectedCategory, setSelectedCategory] = useState<string>('sports'); // Set "sports" as default
    const [data, setData] = useState(sportItems); // Set "sportItems" as default

    const handleCategoryChange = (e: RadioChangeEvent) => {
        const selectedValue = e.target.value;
        setSelectedCategory(selectedValue);
        if (selectedValue === 'sports') {
            setData(sportItems);
        } else {
            setData(countryItems);
        }
    };

    return (
        <div className='flex justify-center'>
            <div className='text-2xl font-primary text-white mr-5 font-semi-bold'>Filter:</div>
            <Radio.Group onChange={handleCategoryChange} value={selectedCategory} className='font-primary'>
                <Radio value="sports">Sports</Radio>
                <Radio value="country">Country</Radio>
            </Radio.Group>
            <DropdownMenu data={data} />
        </div>
    );
};

export default FilterComponent;
