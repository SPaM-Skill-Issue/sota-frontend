import React, { useState } from 'react';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import Logo from '/sotaTransparentBgLogo.svg';

const items: MenuProps['items'] = [
    {
        label: (
        <a href='/' ><img src={Logo} alt='SoTA' /></a>
        ),
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
    return <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />;
}

export default HeaderNavigation;
