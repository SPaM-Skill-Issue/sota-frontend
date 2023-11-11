import React, { useEffect, useState } from 'react';
import { Radio, RadioChangeEvent } from 'antd';
import DropdownMenu from './dropdownMenu';
import { getCountryName } from '../util/iso31661a2';

interface Entry {
    label: string;
    key: string;
}

const FilterSportCountry: React.FC = () => {
    const [selectedCategory, setSelectedCategory] = useState<string>('sports'); // Set "sports" as default
    const [data, setData] = useState<Entry[]>([]); // Set "sportItems" as default

    const getCountryCode = async () => {
        try {
            const countryName = await fetch(`https://sota-backend.fly.dev/medals`);
            const countryData = await countryName.json();
            const countryKey = Object.keys(countryData)
            countryKey.sort((a, b) => getCountryName(a) > getCountryName(b) ? 0 : -1);
            setData(countryKey.map((c) => {return {
                label: getCountryName(c), 
                key: c
            }}))
        }
        catch {
            console.error("Error getting country code");
        }
    };

    const getSportCode = async () => {
        try {
            const sportName = await fetch(`https://sota-backend.fly.dev/sports`);
            const sportData = await sportName.json();
            const sportList = [];
            for (const [key, value] of Object.entries(sportData)) {
                sportList.push({
                    label: String(value),
                    key: key
                })
              }
            setData(sportList);
        }
        catch {
            console.error("Error getting sport code");
        }
    }
    useEffect(() => {
        getSportCode()
    }, []);

    const handleCategoryChange = async (e: RadioChangeEvent) => {
        const selectedValue = e.target.value;
        setSelectedCategory(selectedValue);
        if (selectedValue === 'sports') {
            await getSportCode();
        } else {
            await getCountryCode();
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

export default FilterSportCountry;
