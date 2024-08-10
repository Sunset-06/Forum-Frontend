import { useState, useEffect } from 'react';
import { Tooltip, Stack, rem } from '@mantine/core';
import { Link, useLocation } from 'react-router-dom';
import {
  IconHome,
  IconCat,
  IconCategory2,
  IconBread,
  IconPlus,
} from '@tabler/icons-react';
import classes from './Sidebar.module.css';

interface NavbarLinkProps {
  icon: typeof IconHome;
  label: string;
  to: string;
  active?: boolean;
  onClick?(): void;
}

function NavbarLink({ icon: Icon, label, to, active, onClick }: NavbarLinkProps) {
  return (
    <Tooltip label={label} position="right" transitionProps={{ duration: 0 }}>
      <Link to={to} className={classes.link} onClick={onClick} data-active={active || undefined}>
        <Icon style={{ width: rem(20), height: rem(20) }} stroke={1.5} />
      </Link>
    </Tooltip>
  );
}

const mockdata = [
  { icon: IconBread, label: 'Saved', to: '/saved' },
  { icon: IconCategory2, label: 'Categories', to: '/cats' },
  { icon: IconHome, label: 'Home', to: '/' },
  { icon: IconCat, label: 'Profile', to: '/profile/username' },
];

export default function Sidebar() {
  const location = useLocation();
  const [active, setActive] = useState(2);

  useEffect(() => {
    const currentPath = location.pathname;
    const activeIndex = mockdata.findIndex(link => link.to === currentPath);
    setActive(activeIndex);
  }, [location]);

  const links = mockdata.map((link, index) => (
    <NavbarLink
      {...link}
      key={link.label}
      active={index === active}
      onClick={() => setActive(index)}
    />
  ));

  return (
    <nav className={classes.navbar}>
      <div className={classes.navbarMain}>
        <Stack justify="center" gap={0}>
          {links}
        </Stack>
      </div>
      <Stack justify="center" gap={0}>
        <NavbarLink icon={IconPlus} label="Create a Thread" to="/create" active={location.pathname === '/create'} />
      </Stack>
    </nav>
  );
}
