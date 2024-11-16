import { useState, useEffect } from 'react';
import { Tooltip, Stack, rem } from '@mantine/core';
import { Link, useLocation } from 'react-router-dom';
import { 
  IconHome,
  IconCat, 
  IconCategory2, 
  IconBread, 
  IconPlus } from '@tabler/icons-react';
import { useAuth } from '../auth/AuthContext'; 
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
];

export default function Sidebar() {
  const location = useLocation();
  const { currentUser, isSignedIn } = useAuth(); 
  const [active, setActive] = useState(2); 
  useEffect(() => {
    const currentPath = location.pathname;
    const activeIndex = mockdata.findIndex(link => link.to === currentPath);
    setActive(activeIndex);
    if (isSignedIn && currentUser) {
      if (currentPath === `/profile/${currentUser.id}`) {
        setActive(mockdata.length);
      }
    }
  }, [location, isSignedIn, currentUser]);
  const profileLink = isSignedIn ? { icon: IconCat, label: 'Profile', to: `/profile/${currentUser.id}` } : null;
  const links = profileLink ? [...mockdata, profileLink] : mockdata;
  const renderedLinks = links.map((link, index) => (
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
          {renderedLinks}
        </Stack>
      </div>
      <Stack justify="center" gap={0}>
        <NavbarLink icon={IconPlus} label="Create a Thread" to="/create" active={location.pathname === '/create'} />
      </Stack>
    </nav>
  );
}
