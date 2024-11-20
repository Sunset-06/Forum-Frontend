import {
  TextInput,
  PasswordInput,
  Checkbox,
  Anchor,
  Paper,
  Title,
  Text,
  Container,
  Group,
  Button,
} from '@mantine/core';
import { useState } from 'react';
import { register } from '../auth/authFunctions.ts';
import { createUser } from '../axios/userApi';
import classes from './Auth.module.css';
import pfp_1 from '../assets/pfp-1.jpg';
import pfp_2 from '../assets/pfp-2.jpg';
import pfp_3 from '../assets/pfp-3.jpg';
import pfp_4 from '../assets/pfp-4.png';
import pfp_5 from '../assets/pfp-5.png'; 


export default function Register() {
  const [email, setEmail] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState("");
  const pfparray=[pfp_1,pfp_2,pfp_3,pfp_4,pfp_5];

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const userid= await register(email, password);
      const newUser={
        id: userid,
        username: username,
        email: email,
        bio: "I just joined Forumeong!!",
        pfp: pfparray[Math.floor(Math.random() * 5)]
      }
      createUser(newUser);

    } catch (error: any) {
      if (error.message.includes('auth/invalid-email')) {
        setError("Invalid email, please try again.");
      }
      else if (error.message.includes('auth/email-already-in-use')) {
        setError("Email already in use, please try again.");
      } 
      setError("Registration failed, try again later");
    }
  };  

  return (
    <Container size={420} my={40}>
      <Title ta="center" className={classes.title}>
        Register
      </Title>
      <Text c="dimmed" size="sm" ta="center" mt={5}>
        Already have an account?{' '}
        <Anchor size="sm" component="a" href="/signin">
          Sign In
        </Anchor>
      </Text>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <form onSubmit={handleRegister}>
          <TextInput
            label="Email"
            placeholder="you@meowmeow.com"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextInput
            label="Username"
            placeholder="Pick a cool username!"
            required
            mt="sm"
            onChange={(e) => setUsername(e.target.value)}
          />
          <PasswordInput
            label="Password"
            placeholder="Your password"
            required
            mt="sm"
            onChange={(e) => setPassword(e.target.value)}
          />
          <Text c="red" size="sm" mt="md">{error}</Text>
          <Group mt="lg">
            <Checkbox label="Remember me" />
          </Group>
          <Button type="submit" fullWidth mt="xl" color="teal">
            Register
          </Button>
        </form>
      </Paper>
    </Container>
  );
}
