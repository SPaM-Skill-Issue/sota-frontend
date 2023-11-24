import { render, fireEvent } from '@testing-library/react';
import SearchBar from '../components/searchBar';
import "@testing-library/jest-dom";

const onSearch = jest.fn();
const placeholderText = 'Search...';

describe('SearchBar component', () => {
    it('should renders correctly', () => {
        const wrapper = render(
            <SearchBar onSearch={onSearch} placeHolder={placeholderText} />
        );
        expect(wrapper).toMatchSnapshot();
    });
    
    it('should renders without errors', () => {
        const { getByPlaceholderText } = render(
            <SearchBar onSearch={onSearch} placeHolder={placeholderText} />
        );
        const inputElement = getByPlaceholderText(placeholderText);
        expect(inputElement).toBeInTheDocument();
    });

    it('should triggers search action on enter button click', () => {
        const { getByPlaceholderText, getByRole } = render(
            <SearchBar onSearch={onSearch} placeHolder={placeholderText} />
        );

        const inputElement = getByPlaceholderText(placeholderText);
        const enterButton = getByRole('button', { name: 'search' });
        fireEvent.change(inputElement, { target: { value: 'Test Search' } });
        fireEvent.click(enterButton);
        expect(onSearch).toHaveBeenCalledWith('Test Search');
    });

    it('should triggers search action on input change', () => {
        const { getByPlaceholderText } = render(
            <SearchBar onSearch={onSearch} placeHolder={placeholderText} />
        );

        const inputElement = getByPlaceholderText(placeholderText);
        fireEvent.change(inputElement, { target: { value: 'Test Input Change' } });
        expect(onSearch).toHaveBeenCalledWith('Test Input Change');
    });
});
