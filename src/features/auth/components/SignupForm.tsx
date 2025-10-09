import {
  Anchor,
  Button,
  Container,
  Flex,
  Paper,
  PasswordInput,
  Stack,
  Text,
  TextInput,
  Title,
  useMantineTheme,
} from '@mantine/core';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { z } from 'zod';
import { zod4Resolver } from 'mantine-form-zod-resolver';

import classes from './auth.module.css';
import { useForm } from '@mantine/form';
import { signup } from '../services/auth.services';

const formSchema = z
  .object({
    firstName: z.string().trim().min(1, 'Invalid first name.'),
    lastName: z.string().trim(),
    username: z.string().trim().min(4, 'minimum 4 characters required'),
    email: z.string().trim().check(z.email()),
    password: z.string().trim().min(8, 'minimum 8 characters required.'),
    confirmPassword: z.string().trim().min(8, 'minimum 8 characters required.'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });
function SignupForm() {
  const [errMsg, setErrMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const theme = useMantineTheme();
  const navigate = useNavigate();

  const form = useForm<any>({
    initialValues: {
      firstName: '',
      lastName: '',
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    validate: zod4Resolver(formSchema),
  });

  const handleSubmit = async (values: any) => {
    setIsLoading(true);
    setErrMsg('');
    try {
      await signup(formSchema.parse(values));
      navigate('/login');
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
    <Container size={450} my={40}>
      <Title ta="center" className={classes.title}>
        Sign Up
      </Title>

      <Text className={classes.subtitle}>
        Already have an account?{' '}
        <Anchor component={Link} to="/login">
          Log in
        </Anchor>
      </Text>

      <Paper withBorder shadow="sm" p={22} mt={30} radius="md">
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Stack gap="sm">
            <Flex gap={'xs'} justify="space-between">
              <TextInput
                label="First Name"
                placeholder="Ankur"
                withAsterisk
                radius="md"
                {...form.getInputProps('firstName')}
                onFocus={handleFocus}
              />

              <TextInput
                label="Last Name"
                placeholder="Mehta"
                radius="md"
                {...form.getInputProps('lastName')}
                onFocus={handleFocus}
              />
            </Flex>
            <TextInput
              label="Username"
              placeholder="@ankur102"
              withAsterisk
              radius="md"
              {...form.getInputProps('username')}
              onFocus={handleFocus}
            />
            <TextInput
              label="Email"
              placeholder="you@mantine.dev"
              withAsterisk
              radius="md"
              {...form.getInputProps('email')}
              onFocus={handleFocus}
            />
            <Flex gap={'xs'} justify="space-between">
              <PasswordInput
                label="Password"
                placeholder="your password"
                withAsterisk
                radius="md"
                style={{ flex: 1 }}
                {...form.getInputProps('password')}
                onFocus={handleFocus}
              />
              <PasswordInput
                label="Confirm Password"
                placeholder="your password"
                withAsterisk
                radius="md"
                style={{ flex: 1 }}
                {...form.getInputProps('confirmPassword')}
                onFocus={handleFocus}
              />
            </Flex>
          </Stack>
          <Button
            fullWidth
            type="submit"
            variant="light"
            mt="xl"
            radius="md"
            loading={isLoading}
          >
            Sign up
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

export default SignupForm;
