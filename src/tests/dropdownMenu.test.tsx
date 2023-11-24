import { render } from '@testing-library/react';
import "@testing-library/jest-dom";
import DropdownMenu from '../components/dropdownMenu';

const data = [
    { label: 'Option 1', key: 'option1' },
    { label: 'Option 2', key: 'option2' },
];

const handleSelect = jest.fn();

describe('DropdownMenu component', () => {
    it('should renders correctly', () => {
        const wrapper = render(<DropdownMenu data={data} handleSelect={handleSelect} currentValue={''} />);
        expect(wrapper).toMatchSnapshot();
    });

    it('should renders without errors', () => {
        const { container } = render(<DropdownMenu data={data} handleSelect={handleSelect} currentValue={''} />);
        const selectElement = container.querySelector('.ant-select');
        expect(selectElement).toBeInTheDocument();
    });
});
