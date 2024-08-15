import Router from "./Router.tsx";
import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';

export default function App() {
  return( 
    <MantineProvider defaultColorScheme="dark">{<Router></Router>}</MantineProvider>
  )
}