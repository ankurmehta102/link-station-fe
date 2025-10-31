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
  useMantineTheme,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { z } from 'zod';
import { zod4Resolver } from 'mantine-form-zod-resolver';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import classes from './auth.module.css';
import type { LoginFormValues } from '../types/auth.types';
import { login } from '../services/auth.services';

const formSchema = z.object({
  email: z.string().trim().check(z.email()),
  password: z.string().trim().min(1, 'Invalid Password'),
  // rememberMe: z.boolean(),
});

function LoginForm() {
  const [errMsg, setErrMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const theme = useMantineTheme();
  const navigate = useNavigate();
  const form = useForm<LoginFormValues>({
    initialValues: {
      email: '',
      password: '',
      // rememberMe: false,
    },
    validate: zod4Resolver(formSchema),
  });

  const handleSubmit = async (values: LoginFormValues) => {
    setIsLoading(true);
    setErrMsg('');
    try {
      const res = await login(formSchema.parse(values));
      navigate(`/${res.data.userId}`);
    } catch (err: any) {
      const errMessage = err.response?.data?.message || err.message;
      setErrMsg(errMessage);
    }
    setIsLoading(false);
  };

  const handleFocus = () => {
    errMsg !== '' && setErrMsg('');
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
            {...form.getInputProps('email')}
            onFocus={handleFocus}
          />
          <PasswordInput
            label="Password"
            placeholder="Your password"
            mt="md"
            radius="md"
            {...form.getInputProps('password')}
            onFocus={handleFocus}
          />
          {/* <Group justify="space-between" mt="lg">
            <Checkbox
              variant="outline"
              label="Remember me"
              key={form.key('rememberMe')}
              {...form.getInputProps('rememberMe')}
            />
          </Group> */}
          <Button
            fullWidth
            type="submit"
            variant="light"
            mt="xl"
            radius="md"
            loading={isLoading}
          >
            Sign in
          </Button>
        </form>
      </Paper>
      {errMsg !== '' && (
        <Text
          c={theme.colors.red[5]}
          size="sm"
          mt="xs"
          style={{ textAlign: 'center' }}
        >
          {errMsg}
        </Text>
      )}
    </Container>
  );
}

export default LoginForm;
