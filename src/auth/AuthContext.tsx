import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth } from '../firebaseConfig.ts'; 
import { Flex, Loader } from '@mantine/core';
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
          const pfp = await getUserPfp(user.uid);
          setCurrentUser({ ...profile, pfp });
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

    return unsubscribe; // Cleanup subscription on unmount
  }, []);

  if (loading) {
    return <Flex align="center" justify="center" style={{width:'100vw'}}><Loader size="lg" color='teal' /></Flex>;
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
