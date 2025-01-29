import { useState, useEffect } from 'react';
import { Tooltip, Flex, rem } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
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

export default function Sidebar() {
  const location = useLocation();
  const { currentUser, isSignedIn } = useAuth();
  const [active, setActive] = useState(2);
  const isMobile = useMediaQuery('(max-width: 768px)');
    
  const links = [
    isSignedIn && { icon: IconBread, label: 'Saved', to: '/saved' },
    isSignedIn && { icon: IconCategory2, label: 'Categories', to: '/cats' },
    { icon: IconHome, label: 'Home', to: '/' },
    isSignedIn && currentUser && { icon: IconCat, label: 'Profile', to: `/profile/${currentUser.id}` },
    isMobile && isSignedIn && { icon: IconPlus, label: 'Create a Thread', to: '/create' }, 
  ].filter(Boolean); 

  useEffect(() => {
    const currentPath = location.pathname;
    const activeIndex = links.findIndex(link => link.to === currentPath);
    setActive(activeIndex);
  }, [location, links]);

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
        <Flex justify="center" gap={0} direction={isMobile ? 'row' : 'column'}>
          {renderedLinks}
        </Flex>
      </div>
      {isSignedIn && (
        <Flex justify="center" gap={0}>
          <NavbarLink icon={IconPlus} label="Create a Thread" to="/create" active={location.pathname === '/create'} />
        </Flex>
      )}
    </nav>
  );
}
