import { render, fireEvent } from '@testing-library/react';
import "@testing-library/jest-dom";
import FilterSportCountry from '../components/filterSportCountry';

const dataHandle = jest.fn();
const catagoryHandle = jest.fn();

describe('FilterSportCountry component', () => {
    it('should renders correctly', () => {
        const wrapper = render(
            <FilterSportCountry dataHandle={dataHandle} catagoryHandle={catagoryHandle} />
        );
        expect(wrapper).toMatchSnapshot();
    });
    
    it('should renders without errors', () => {
        const { container } = render(
            <FilterSportCountry dataHandle={dataHandle} catagoryHandle={catagoryHandle} />
        );
        const filterElement = container.querySelector('.flex.justify-center');
        expect(filterElement).toBeInTheDocument();
    });

    it('should allows switching between sports and country categories', () => {
        const { getByLabelText } = render(
            <FilterSportCountry dataHandle={dataHandle} catagoryHandle={catagoryHandle} />
        );

        const sportsRadioButton = getByLabelText('Sports');
        const countryRadioButton = getByLabelText('Country');

        fireEvent.click(countryRadioButton);
        expect(countryRadioButton).toBeChecked();
        fireEvent.click(sportsRadioButton);
        expect(sportsRadioButton).toBeChecked();
    });
});
