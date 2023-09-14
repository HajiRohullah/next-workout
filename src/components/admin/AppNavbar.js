import React from 'react';
import { Box, NavLink, Navbar } from '@mantine/core';
import { MainLinks } from './navbar/MainLink';
import { IconUsersGroup } from '@tabler/icons-react';
import getMenuItems from '@/configs/menu';
export default function AppNavbar() {
  let menus = getMenuItems()
  const data = [
    { icon: <IconUsersGroup size="1rem" />, color: 'blue', label: 'User List', link: '/admin/user-list' },

  ];
  const links = (menus.map((row, index) => {
    return <MainLinks  {...row} key={index} />
  }
  ))

  return (
    <Navbar height={'100%'} p="xs" width={{ base: 300 }}>
      <Navbar.Section grow mt="md">
        {links}
      </Navbar.Section>
    </Navbar>
  );
}

