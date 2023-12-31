import React from 'react';
import { Menu } from 'antd';
import { Link, useLocation } from 'react-router-dom';

const items = [
    {
        label: 'Home',
        key: 'home',
        path: '/',
    },
    {
        label: 'Sports',
        key: 'sports',
        path: '/sports',
    },
    {
        label: 'Medal',
        key: 'medal',
        path: '/medal',
    },
    {
        label: 'Audience',
        key: 'audience',
        path: '/audience',
    },
];

const HeaderNavigation: React.FC = () => {
    const location = useLocation();
    const activeKey = items.find(item => location.pathname.includes(item.key))?.key || "home";

    return (
        <Menu selectedKeys={[activeKey]} mode="horizontal" className="bg-eeric-black-light w-fit font-primary text-xl">
            {items.map((item) => (
                <Menu.Item key={item.key} className="text-white">
                    <Link to={item.path}>{item.label}</Link>
                </Menu.Item>
            ))}
        </Menu>
    )
}

export default HeaderNavigation;
