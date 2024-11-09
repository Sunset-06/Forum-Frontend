import { Button, Autocomplete, Group, Text, rem, Avatar } from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';
import { useAuth } from '../auth/AuthContext';  // Import useAuth hook
import classes from './Navbar.module.css';
import { Link } from 'react-router-dom';

export default function Navbar() {
  const { currentUser, isSignedIn } = useAuth();

  return (
    <header className={classes.header}>
      <div className={classes.inner}> 
        <Link to={'/'} className={classes.name}><Text>Forumeong</Text></Link>

        <Group>
          <Autocomplete
            className={classes.search}
            placeholder="Search"
            leftSection={<IconSearch style={{ width: rem(16), height: rem(16) }} stroke={1.5} />}
            data={['Roland Cattos', 'Whiskas', 'Owners', 'Territory Updates', 'Fish Market', 'Metal Gear Solid 2: Paws of Liberty']}
            visibleFrom="xs"
          />
          
          {isSignedIn ? (
            <Avatar
              src={currentUser.pfp}
              component="a"
              href={`/profile/${currentUser.id}`}
              radius="md"
              size={rem(32)}
            />
          ) : (
            <Button
              variant="filled"
              component="a"
              href="/signin" 
            >
              Sign In
            </Button>
          )}
        </Group>
      </div>
    </header>
  );
}
