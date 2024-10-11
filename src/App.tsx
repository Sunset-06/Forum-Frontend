import Router from "./Router.tsx";
import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';
import { AuthProvider } from "./auth/AuthContext.tsx";

export default function App() {
  return( 
    <MantineProvider defaultColorScheme="dark">
      <AuthProvider>
        {<Router></Router>}
      </AuthProvider>
    </MantineProvider>
  )
}