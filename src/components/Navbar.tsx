import { useEffect, useState } from 'react';
import { Button, Autocomplete, Group, Text, rem, Avatar } from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getUserPfp } from '../axios/userApi';
import classes from './Navbar.module.css';

export default function Navbar() {
  const[isSignedIn,setIsSignedIn]=useState(false);
  const [user, setUser] = useState({id:"",pfp:""});
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      const fetchpfp = async () =>{
        if (currentUser){
          try{
            const pfp = await getUserPfp(currentUser.uid);
            setUser({
              id: currentUser.uid,
              pfp: pfp
            });
            setIsSignedIn(true);
          }
          catch(error){
            console.error("Error fetching profile picture: "+ error);
          }
        } 
      else
        setIsSignedIn(false);
    };

    fetchpfp();
    });

    return () => unsubscribe();
  }, [auth]);

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
          
          {isSignedIn ? (
            <Avatar
              src={user.pfp}
              component="a"
              href={`/profile/${user.id}`}
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
