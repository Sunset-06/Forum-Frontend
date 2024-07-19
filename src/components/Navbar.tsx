import { Button, Autocomplete, Group, rem } from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';
import classes from './Navbar.module.css';

export default function Navbar() {

  return (
    <header className={classes.header}>
      <div className={classes.inner}> 
          {/* <Burger opened={opened} onClick={toggle} size="sm" hiddenFrom="sm" /> */}
          <img src="../assets/react.svg" />

        <Group>
          <Autocomplete
            className={classes.search}
            placeholder="Search"
            leftSection={<IconSearch style={{ width: rem(16), height: rem(16) }} stroke={1.5} />}
            data={['React', 'Angular', 'Vue', 'Next.js', 'Riot.js', 'Svelte', 'Blitz.js']}
            visibleFrom="xs"
          />
          <Button variant='filled' component='a' href='/auth' >Sign In</Button>
        </Group>
      </div>
    </header>
  );
}