import React from 'react';
import { ConfigProvider, Menu, theme } from 'antd';
import { Link } from 'react-router-dom';

const items = [
    {
        label: 'Home',
        key: 'home',
        path: '/',
    },
    {
        label: 'Audience',
        key: 'audience',
        path: '/audience',
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
];

const HeaderNavigation: React.FC = () => {
    return (
        <ConfigProvider theme={{
            token: {
                colorPrimary: "#dba94d",
                colorBgContainer: "#393F3F",
            },
            algorithm: theme.darkAlgorithm,
        }}>
            <Menu defaultSelectedKeys={['home']} mode="horizontal" className="bg-eeric-black-light w-fit font-primary text-xl">
                {items.map((item) => (
                    <Menu.Item key={item.key} className="text-white">
                        <Link to={item.path}>{item.label}</Link>
                    </Menu.Item>
                ))}
            </Menu>
        </ConfigProvider>
    )
}

export default HeaderNavigation;
