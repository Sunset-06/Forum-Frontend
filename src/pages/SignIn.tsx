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
  LoadingOverlay,
} from '@mantine/core';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import login from '../auth/signin';
import classes from './Auth.module.css';

export default function SignIn() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await login(email, password);
      navigate("/");
    } catch (error: any) {
      if (error.message.includes('auth/invalid-email')) {
        console.log("got invalid email error");
        setError("Invalid Username, please try again.");
      } 
      else if(error.message.includes('auth/invalid-credential')) {
        console.log("got invalid pass error");
        setError("Invalid password, please try again.");  
      }
      else {
        console.log("Error but not invalid");
        setError("Login failed, try again later.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container size={420} my={40}>
      <Title ta="center" className={classes.title}>
        Welcome back!
      </Title>
      <Text c="dimmed" size="sm" ta="center" mt={5}>
        Do not have an account yet?{' '}
        <Anchor size="sm" component="a" href='/register'>
          Create account
        </Anchor>
      </Text>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <LoadingOverlay visible={loading} />
        <form onSubmit={handleLogin}>
          <TextInput 
            label="Email" 
            placeholder="you@provider.com" 
            required 
            onChange={(e) => setEmail(e.target.value)} 
          />
          <PasswordInput 
            label="Password" 
            placeholder="Your password" 
            required 
            mt="md" 
            onChange={(e) => setPassword(e.target.value)} 
          />
          <Text c="red" size="sm" mt="md">{error}</Text>
          <Group mt="lg">
            <Checkbox label="Remember me" />
          </Group>
          <Button type="submit" fullWidth mt="xl" color="teal">
            Sign in
          </Button>
        </form>
      </Paper>
    </Container>
  );
}
