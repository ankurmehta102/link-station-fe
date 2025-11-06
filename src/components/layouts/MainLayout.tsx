import { AppShell, Burger, Container, Group, NavLink } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useState } from 'react';
import { Link, Outlet, useParams } from 'react-router-dom';
import { IconLink, IconUserCog, IconPencil } from '@tabler/icons-react';

const NAV_LINK_KEYS = {
  PROFILE: 1,
  LINKS: 2,
  ACCOUNT: 3,
};

const getActiveNavLinkFromURL = (
  NavLinksKeys: typeof NAV_LINK_KEYS,
): number => {
  const path = window.location.pathname.split('/')[2] || '';
  for (const key in NavLinksKeys) {
    const typedKey = key as keyof typeof NavLinksKeys;
    if (typedKey.toLowerCase() === path.toLowerCase()) {
      return NavLinksKeys[typedKey];
    }
  }
  return 1;
};

function MainLayout() {
  const [mobileOpened, { toggle: toggleMobile }] = useDisclosure();
  const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure(true);
  const [active, setActive] = useState<number>(
    getActiveNavLinkFromURL(NAV_LINK_KEYS),
  );

  const { userId } = useParams();

  return (
    <AppShell
      // padding="md"
      header={{ height: 60 }}
      navbar={{
        width: 200,
        breakpoint: 'sm',
        collapsed: { mobile: !mobileOpened, desktop: !desktopOpened },
      }}
    >
      <AppShell.Header>
        <Group h="100%" px="md">
          <Burger
            opened={mobileOpened}
            onClick={toggleMobile}
            hiddenFrom="sm"
            size="sm"
          />
          <Burger
            opened={desktopOpened}
            onClick={toggleDesktop}
            visibleFrom="sm"
            size="sm"
          />
        </Group>
      </AppShell.Header>
      <AppShell.Navbar p="md">
        <NavLink
          component={Link}
          to={`/${userId}`}
          label="Edit Profile"
          active={active === NAV_LINK_KEYS.PROFILE}
          onClick={() => setActive(NAV_LINK_KEYS.PROFILE)}
          leftSection={<IconPencil size={20} stroke={2.0} />}
        />
        <NavLink
          component={Link}
          to={`/${userId}/links`}
          label="Manage Links"
          active={active === NAV_LINK_KEYS.LINKS}
          onClick={() => setActive(NAV_LINK_KEYS.LINKS)}
          leftSection={<IconLink size={20} stroke={2.0} />}
        />
        <NavLink
          component={Link}
          to={`/${userId}/account`}
          label="Account"
          active={active === NAV_LINK_KEYS.ACCOUNT}
          onClick={() => setActive(NAV_LINK_KEYS.ACCOUNT)}
          leftSection={<IconUserCog size={20} stroke={2.0} />}
        />
      </AppShell.Navbar>
      <AppShell.Main>
        <Container
          fluid
          style={{
            minHeight: 'calc(100dvh - var(--app-shell-header-offset))',
            position: 'relative',
          }}
        >
          <Outlet />
        </Container>
      </AppShell.Main>
    </AppShell>
  );
}

export default MainLayout;
