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
import classes from './Auth.module.css';
  
export default function Register() {
    return (
      <Container size={420} my={40}>
        <Title ta="center" className={classes.title}>
          Register!
        </Title>
        <Text c="dimmed" size="sm" ta="center" mt={5}>
          Already have an Account?{' '}
          <Anchor size="sm" component="a" href="/signin">
            Sign In
          </Anchor>
        </Text>
  
        <Paper withBorder shadow="md" p={30} mt={30} radius="md">
          <TextInput label="Email" placeholder="you@meowmeow.com" required />
          <PasswordInput label="Password" placeholder="Your password" required mt="md" />
          <Group justify="space-between" mt="lg">
            <Checkbox label="Remember me" />
          </Group>
          <Button fullWidth mt="xl">
            Register
          </Button>
        </Paper>
      </Container>
    );
}