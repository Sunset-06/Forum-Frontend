import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth } from '../firebaseConfig.ts'; 
import { Flex, Loader, Text } from '@mantine/core';
import { getUserById, getUserPfp } from '../axios/userApi.ts';

const AuthContext = createContext<any>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      setLoading(true);
      if (user) {
        try {
          const profile = await getUserById(user.uid);
          const pfpUrl = await getUserPfp(user.uid);
          setCurrentUser({ ...profile, pfpUrl });
          setIsSignedIn(true);
        } catch (error) {
          console.error('Error fetching profile:', error);
        }
      } else {
        setCurrentUser(null);
        setIsSignedIn(false);
      }
      setLoading(false);
    });

    return unsubscribe; 
  }, []);

  //For fun, really
  const loadingQuotes = [
    "This could take some time",
    "Page is loading! (I hope.)",
    "The cat images make this slow.",
    "I test in production. This is production.",
    "Give it a bit of time",
    "It's not your internet, it's my server."
  ];

  if (loading) {
    return(
      <Flex align="center" justify="center" direction="column" style={{width:"100vw", height: "100vh"}}>
        <Loader size="lg" color='teal' mb="sm" />
        <Text>{loadingQuotes[Math.floor(Math.random() * loadingQuotes.length)]}</Text>
      </Flex>
    );
  }

  return (
    <AuthContext.Provider value={{ currentUser, isSignedIn }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
