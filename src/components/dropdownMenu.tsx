import React from 'react';
import { Select } from 'antd';
const { Option } = Select;

interface DropdownMenuProps {
  data: Array<{ label: string; key: string }>;
}

const handleSelect = (value: string) => {
  console.log(`Selected: ${value}`);
  // Do something with the selected value here
};

const DropdownMenu: React.FC<DropdownMenuProps> = ({ data }) => {

  return (
    <Select onSelect={handleSelect} className=' w-1/4' >
      {data.map(item => (
        <Option key={item.key} value={item.key}>
          {item.label}
        </Option>
      ))}
    </Select>
  );
};

export default DropdownMenu;
