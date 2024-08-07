import { useState } from 'react';
import { Button, Autocomplete, Group, Text, rem, Avatar } from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';
import classes from './Navbar.module.css';

export default function Navbar() {
  const [auth, setAuth] = useState(false);
  const user = {
    id: 'user123',
    name: 'John Doe',
    avatarUrl: 'localhost:5173/src/assets/cats-temp.jpg',
  };

  return (
    <header className={classes.header}>
      <div className={classes.inner}> 
          <Text>Forumeong</Text>

        <Group>
          <Autocomplete
            className={classes.search}
            placeholder="Search"
            leftSection={<IconSearch style={{ width: rem(16), height: rem(16) }} stroke={1.5} />}
            data={['Roland Cattos', 'Whiskas', 'Owners', 'Territory Updates', 'Fish Market', 'Metal Gear Solid 2: Paws of Liberty']}
            visibleFrom="xs"
          />
          
          {auth ? (
            <Avatar
              src={user.avatarUrl}
              alt={user.name}
              component="a"
              href={`/profile/${user.id}`}
              radius="md"
              size={rem(32)}
              className={classes.avatar}
            />
          ) : (
            <Button
              variant="filled"
              component="a"
              /* href="/signin" */
              onClick={() => setAuth(true)}
            >
              Sign In
            </Button>
          )}

        </Group>
      </div>
    </header>
  );
}