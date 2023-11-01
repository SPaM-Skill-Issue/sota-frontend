import React, { useState } from 'react';
import type { MenuProps } from 'antd';
import { ConfigProvider, Menu, theme } from 'antd';

const items: MenuProps['items'] = [
    {
        label: (<a href='/'>Home</a>),
        key: 'home',
    },
    {
        label: (<a href='/sports'>Sports</a>),
        key: 'sports',
    },
    {
        label: (<a href='/medal'>Medal</a>),
        key: 'medal',
    },
    {
        label: (<a href='/audience'>Audience</a>),
        key: 'audience',
    },
];

const HeaderNavigation: React.FC = () => {
    const [current, setCurrent] = useState('home');
    const onClick: MenuProps['onClick'] = (e) => {
        setCurrent(e.key);
    };
    return (
        <ConfigProvider theme={{
            token: {
                colorPrimary: "#dba94d",
                colorBgContainer: "#393F3F",
                
            },
            algorithm: theme.darkAlgorithm,
        }}>
            <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} className="font-primary text-2xl" />
        </ConfigProvider>
    )
}


export default HeaderNavigation;
