import React from 'react';
import { Select } from 'antd';
const { Option } = Select;

interface DropdownMenuProps {
    data: {
        label: string;
        key: string
    }[];
    handleSelect: (value:string) => void;
    currentValue: string;
}

const DropdownMenu: React.FC<DropdownMenuProps> = ({ data, handleSelect, currentValue }) => {
    
    return (
        <Select value={currentValue} onSelect={handleSelect} className='w-1/3'>
            {data.map(item => (
                <Option key={item.key} value={item.key}>
                    {item.label}
                </Option>
            ))}
        </Select>
    );
};

export default DropdownMenu;
