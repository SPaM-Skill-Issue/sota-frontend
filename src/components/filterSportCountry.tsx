import React, { useEffect, useState } from 'react';
import { Radio, RadioChangeEvent } from 'antd';
import DropdownMenu from './dropdownMenu';
import { _countries } from '../util/iso31661a2';
import { _sports } from '../util/sportid';

interface Entry {
    label: string;
    key: string;
}

interface sendData {
    dataHandle: (value: string) => void;
    catagoryHandle: (value: string) => void;
}

const formattedCountries: Entry[] = Object.entries(_countries).map(
    ([key, label]) => ({
      label,
      key,
    })
);

const formattedSports: Entry[] = Object.entries(_sports).map(
    ([key, label]) => ({
        label,
        key,
      })
);

const FilterSportCountry: React.FC<sendData> = (sendData) => {
    const [selectedCategory, setSelectedCategory] = useState<string>('sports'); // Set "sports" as default
    const [data, setData] = useState<Entry[]>([]); // Set "sportItems" as default
    const [dropdowndata, setDropDown] = useState<string>('');

    useEffect(() => {
        setData(formattedSports);
        setDropDown("1");
    }, []);

    /* eslint-disable react-hooks/exhaustive-deps */
    useEffect(() => {
        sendData.dataHandle(dropdowndata);
        sendData.catagoryHandle(selectedCategory);
    }, [dropdowndata]);
     /* eslint-enable */

    const handleCategoryChange = async (e: RadioChangeEvent) => {
        const selectedValue = e.target.value;
        setSelectedCategory(selectedValue);
        if (selectedValue === 'sports') {
            setData(formattedSports);
            setDropDown("1");
        } else {
            setData(formattedCountries);
            setDropDown("AF");
        }
    };

    const handleSelect = (value: string) => {
        console.log(`Selected: ${value}`);
        // Do something with the selected value here
        setDropDown(value);
    };

    return (
        <div className='flex justify-center'>
            <div className='text-2xl font-primary text-white mr-5 font-semi-bold'>Filter:</div>
            <Radio.Group onChange={handleCategoryChange} value={selectedCategory} className='font-primary'>
                <Radio value="sports">Sports</Radio>
                <Radio value="country">Country</Radio>
            </Radio.Group>
            <DropdownMenu data={data} handleSelect={handleSelect} />
        </div>
    );
};

export default FilterSportCountry;
