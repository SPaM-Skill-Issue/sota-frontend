import HeaderNavigation from '../components/headerNavigation';
import { render } from '@testing-library/react';
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";

const pagePath = [
    {
        label: 'Home',
        path: '/',
    },
    {
        label: 'Sports',
        path: '/sports',
    },
    {
        label: 'Medal',
        path: '/medal',
    },
    {
        label: 'Audience',
        path: '/audience',
    },
];

describe('HeaderNavigation Component', () => {
    it('should renders correctly', () => {
        const wrapper = render(
            <MemoryRouter>
                <HeaderNavigation />
            </MemoryRouter>
        );
        expect(wrapper).toMatchSnapshot();
    });

    it('should renders with correct active key for every page', () => {
        pagePath.forEach((page) => {
            const { container } = render(
                <MemoryRouter initialEntries={[page.path]}>
                    <HeaderNavigation />
                </MemoryRouter>
            );
            const activeMenuItem = container.querySelector('.ant-menu-item-selected');
            expect(activeMenuItem).toBeInTheDocument();
            expect(activeMenuItem).toHaveTextContent(page.label);
        });
    });
});