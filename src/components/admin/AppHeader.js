import { Burger, Group, Header, Image, useMantineTheme } from '@mantine/core'
import { useViewportSize } from '@mantine/hooks';
import Link from 'next/link'
import React from 'react'


function AppHeader({ opened, setOpened }) {
  const theme = useMantineTheme();

  const { width, height } = useViewportSize();
  return (
    <Header
      className="custom-header flex items-center w-full"
      height={70}
      p="md"
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
        <Link href={"/"}>
          <Image
            width={100}
            height={40}
            src="/images/logo.png"
            alt="Million Experts"
          />
        </Link>
        <Group className="ms-auto">
        </Group>
      </div>
    </Header>
  )
}

export default AppHeader