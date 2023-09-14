import { Burger, Group, Header, Image, useMantineTheme } from '@mantine/core'
import { useViewportSize } from '@mantine/hooks';
import Link from 'next/link'
import React from 'react'


function AppHeader({ opened, setOpened }) {
  const theme = useMantineTheme();

  const { width, height } = useViewportSize();
  return (
    <Header
      className="custom-header flex items-center w-full px-3 py-2"
      height={70}
    >
      <div className="flex items-center w-full">
        {width < theme.breakpoints.sm && (
          <Burger
            opened={opened}
            onClick={() => setOpened((o) => !o)}
            size="sm"
            color={theme.colors.gray[6]}
            mr="xl"
          />
        )}
        <Link href={"/"} className='flex align-middle'>
          <Image
            height={30}
            src="/images/logo.png"
            alt="Million Experts"
          />
          <p className='mb-0 font-[600] text-[22px] ps-2 text-greyDark'>Logo</p>
        </Link>
        <Group className="ms-auto">
        </Group>
      </div>
    </Header>
  )
}

export default AppHeader