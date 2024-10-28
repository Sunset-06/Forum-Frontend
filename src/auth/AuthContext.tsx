import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth } from '../firebaseConfig.ts'; 
import { Flex, Loader } from '@mantine/core';
import { getUserById } from '../axios/userApi.ts';

const AuthContext = createContext<any>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        const profile = getUserById(user.uid);
        setCurrentUser(profile);
      } else {
        setCurrentUser(null);
      }
      setLoading(false);
    });

    return unsubscribe; // Cleanup subscription on unmount
  }, []);

  if (loading) {
    return <Flex align="center" justify="center" style={{width:'100vw'}}><Loader size="lg" color='teal' /></Flex>;
  }

  return (
    <AuthContext.Provider value={{ currentUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
