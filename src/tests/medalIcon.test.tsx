import "@testing-library/jest-dom";
import { render } from '@testing-library/react';
import MedalIcon from '../components/medalIcon';

describe('MedalIcon component', () => {
    it('should renders correctly', () => {
        const wrapper = render(<MedalIcon place={1} />);
        expect(wrapper).toMatchSnapshot();
    });

    it('should applies default props if specific props are missing', () => {
        const { container } = render(<MedalIcon place={1} />);
        const svgElement = container.querySelector('svg');
        expect(svgElement).toHaveAttribute('width', '64');
        expect(svgElement?.childNodes[0]).toHaveAttribute('fill', '#FFF');
    });

    it('should applies custom size and fill color to the icon', () => {
        const size = 48;
        const fill = '#FF0000';
        const { container } = render(<MedalIcon place={2} size={size} fill={fill} />);
        const svgElement = container.querySelector('svg');
        expect(svgElement).toHaveAttribute('width', size.toString());
        expect(svgElement?.childNodes[0]).toHaveAttribute('fill', fill);
    });
});
