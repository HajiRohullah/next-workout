"use client";
import AppHeader from '@/components/admin/AppHeader';
import AppNavbar from '@/components/admin/AppNavbar';
import { Anchor, AppShell, Footer, Header, Navbar, Text } from '@mantine/core'
import React, { useState } from 'react'



function AdminLayout({ children }) {
  const [opened, setOpened] = useState(false);

  return (
    <AppShell
      padding="md"
      navbar={<AppNavbar />}
      header={<AppHeader opened={opened} setOpened={setOpened} />}


      footer={
        <Footer height={40} p='xs'>
          <div className='flex justify-between w-full px-4'>
            <Text size={"sm"}>
              Design and Developed by
              <Anchor href='https://smartfriqi.com' target='_blank'>
                {" "}
                Smart Friqi
              </Anchor>
            </Text>
            <Text size={"sm"}>Copyright &copy; 2023</Text>
          </div>
        </Footer>
      }
      styles={(theme) => ({
        main: { backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0] },
      })}
    >
      {children}
    </AppShell>
  )
}

export default AdminLayout