import {
  Anchor,
  Button,
  // Checkbox,
  Container,
  // Group,
  Paper,
  PasswordInput,
  Text,
  TextInput,
  Title,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { z } from 'zod';
import { zod4Resolver } from 'mantine-form-zod-resolver';
import classes from './auth.module.css';
import type { LoginFormValues } from '../types/auth.types';
import { Link } from 'react-router-dom';

const formSchema = z.object({
  email: z.string().trim().check(z.email()),
  password: z.string().trim().min(1, 'Invalid Password'),
  // rememberMe: z.boolean(),
});

function LoginForm() {
  const form = useForm<LoginFormValues>({
    initialValues: {
      email: '',
      password: '',
      // rememberMe: false,
    },
    validate: zod4Resolver(formSchema),
  });

  const handleSubmit = (values: LoginFormValues) => {
    formSchema.parse(values);
  };
  return (
    <Container size={420} my={40}>
      <Title ta="center" className={classes.title}>
        Welcome back!
      </Title>

      <Text className={classes.subtitle}>
        Do not have an account yet?{' '}
        <Anchor component={Link} to="/signup">
          Create account
        </Anchor>
      </Text>

      <Paper withBorder shadow="sm" p={22} mt={30} radius="md">
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <TextInput
            label="Email"
            placeholder="you@mantine.dev"
            radius="md"
            key={form.key('email')}
            {...form.getInputProps('email')}
          />
          <PasswordInput
            label="Password"
            placeholder="Your password"
            mt="md"
            radius="md"
            key={form.key('password')}
            {...form.getInputProps('password')}
          />
          {/* <Group justify="space-between" mt="lg">
            <Checkbox
              variant="outline"
              label="Remember me"
              key={form.key('rememberMe')}
              {...form.getInputProps('rememberMe')}
            />
          </Group> */}
          <Button fullWidth type="submit" variant="light" mt="xl" radius="md">
            Sign in
          </Button>
        </form>
      </Paper>
    </Container>
  );
}

export default LoginForm;
