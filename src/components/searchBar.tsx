import React from 'react';
import { Input, ConfigProvider } from 'antd';

interface SearchBarProps {
    onSearch: (value: string) => void;
    placeHolder: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, placeHolder }) => {
    const handleSearch = (value: string) => {
        onSearch(value);
    };

    return (
        <ConfigProvider theme={{
            token: {
                colorBgContainer: "#949896",
            }
        }}>
            <Input.Search
                placeholder={placeHolder}
                onSearch={handleSearch}
                onChange={(e) => {handleSearch(e.target.value)}}
                enterButton
                className='w-1/2 font-body text-white'
            />
        </ConfigProvider>
    );
};

export default SearchBar;
