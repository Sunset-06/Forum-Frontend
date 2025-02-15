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
import { useNavigate } from 'react-router-dom';
import classes from './Auth.module.css';


export default function Register() {
  const [email, setEmail] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState("");
  const pfparray = [
    "/images/pfp-1.jpg",
    "/images/pfp-2.jpg",
    "/images/pfp-3.jpg",
    "/images/pfp-4.png",
    "/images/pfp-5.png"
  ];
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const userid= await register(email, password);
      const newUser={
        id: userid,
        username: username,
        email: email,
        bio: "I just joined Forumeong!!",
        pfpUrl: pfparray[Math.floor(Math.random() * 5)]
      }
      console.log("Pfp assigned:", newUser.pfpUrl);
      
      createUser(newUser);
      navigate("/");

    } catch (error: any) {
      if (error.message.includes('auth/invalid-email')) {
        setError("Invalid email, please try again.");
      }
      else if (error.message.includes('auth/email-already-exists')) {
        setError("Email already in use, please try again.");
      }
      else if (error.message.includes('auth/weak-password')) {
        setError("Password needs to be at least 6 characters long.");
      } 
      setError("Registration failed, try again later");
    }
  };  

  return (
    <Container size={420} my={100}>
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
