import { render } from '@testing-library/react';
import SportCard from '../components/sportCard';
import "@testing-library/jest-dom";
import SportsIcons from '../components/sportsIcons';

describe('SportCard component', () => {
    const sportName = 'Archery';
    const color = '#FF0000';
    const sportIcon = <SportsIcons sportId={1} />;

    it('should renders correctly', () => {
        const wrapper = render(
            <SportCard sportName={sportName} sportIcon={sportIcon} color={color} />
        );

        expect(wrapper).toMatchSnapshot();
    })

    it('should renders correctly with provided props', () => {
        const { getByText } = render(
            <SportCard sportName={sportName} sportIcon={sportIcon} color={color} />
        );

        expect(getByText(sportName)).toBeInTheDocument();
        expect(getByText(sportName)).toHaveStyle(`color: ${color}`);
    });

    it('should applies correct styles based on color prop', () => {
        const { getByText } = render(
            <SportCard sportName={sportName} sportIcon={sportIcon} color={color} />
        );

        const sportNameElement = getByText(sportName);
        expect(sportNameElement).toHaveStyle(`color: ${color}`);

        const iconContainer = sportNameElement.parentElement?.firstChild as HTMLElement;
        expect(iconContainer).toHaveStyle(`fill: ${color}`);
    });
});
