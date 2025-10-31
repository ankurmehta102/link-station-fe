import {
  Button,
  Container,
  Divider,
  Flex,
  LoadingOverlay,
  Stack,
  Text,
  Textarea,
  TextInput,
  Title,
  useMantineTheme,
} from '@mantine/core';
import { useEffect, useState } from 'react';
import { z } from 'zod';
import { zod4Resolver } from 'mantine-form-zod-resolver';

import classes from './profile.module.css';
import { useForm } from '@mantine/form';
import {
  fetchProfileData,
  updateProfileData,
} from '../services/profile.services';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import type { User } from '../../../lib/types';
import type { EditProfileFormValues } from '../types/profile.type';

const formSchema = z.object({
  firstName: z
    .string()
    .trim()
    .min(1, 'Invalid first name.')
    .max(30, 'maximum 30 characters allowed'),
  lastName: z.string().trim().max(30, 'maximum 30 characters allowed'),
  displayEmail: z.string().trim().check(z.email()).or(z.literal('')),
  bio: z.string().trim().max(150, 'maximum 150 characters allowed'),
});

const getEditProfileFormValues = (user: User): EditProfileFormValues => {
  return {
    firstName: user.firstName,
    lastName: user.lastName || '',
    displayEmail: user.displayEmail || '',
    bio: user.bio || '',
  };
};

function EditProfileInfoForm() {
  const [errMsg, setErrMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const theme = useMantineTheme();
  const { userId } = useParams();

  const form = useForm<EditProfileFormValues>({
    initialValues: {
      firstName: '',
      lastName: '',
      displayEmail: '',
      bio: '',
    },
    validate: zod4Resolver(formSchema),
  });

  const {
    data: user,
    isPending,
    error,
  } = useQuery<User, any>({
    queryKey: ['userProfile', userId],
    queryFn: () => fetchProfileData(Number(userId)),
  });

  useEffect(() => {
    if (user) form.setValues(getEditProfileFormValues(user));
  }, [user]);

  useEffect(() => {
    if (error) {
      const errMessage = error.response?.data?.message || error.message || '';
      setErrMsg(errMessage);
    }
  }, [error]);

  const handleSubmit = async (values: EditProfileFormValues) => {
    setIsLoading(true);
    setErrMsg('');
    try {
      const res = await updateProfileData(
        Number(userId),
        formSchema.parse(values),
      );
      form.setValues(getEditProfileFormValues(res.data));
    } catch (err: any) {
      const errMessage = err.response?.data?.message || err.message || '';
      setErrMsg(errMessage);
    }
    setIsLoading(false);
  };

  // Remove the input error when the user starts typing
  const handleFocus = () => {
    if (errMsg) setErrMsg('');
  };

  return (
    <>
      <LoadingOverlay
        visible={isPending || isLoading}
        overlayProps={{ blur: 2 }}
        zIndex={99}
      />
      <Container size={600}>
        <Title ta="start" order={1} className={classes.title} pt="md">
          Edit Profile
        </Title>
        <Divider mb={40} />

        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Stack gap="sm">
            <Flex gap={'xs'} justify="space-between">
              <TextInput
                label="First Name"
                placeholder="Ankur"
                size="md"
                style={{ flex: 1 }}
                {...form.getInputProps('firstName')}
                onFocus={handleFocus}
              />

              <TextInput
                label="Last Name"
                placeholder="Mehta"
                size="md"
                style={{ flex: 1 }}
                {...form.getInputProps('lastName')}
                onFocus={handleFocus}
              />
            </Flex>
            <TextInput
              label="Contact Email"
              placeholder="you@mantine.dev"
              size="md"
              {...form.getInputProps('displayEmail')}
              onFocus={handleFocus}
            />
            <Textarea
              label="Bio"
              size="md"
              placeholder="Write you bio here."
              {...form.getInputProps('bio')}
              onFocus={handleFocus}
            />
          </Stack>
          <Flex gap={'xs'}>
            {' '}
            <Button type="submit" variant="light" mt="xl" radius="md" size="md">
              Save
            </Button>{' '}
            {/* <Button
              variant="light"
              mt="xl"
              radius="md"
              size="md"
              color={theme.colors.red[4]}
              loading={isLoading}
            >
              Cancel
            </Button> */}
          </Flex>
        </form>
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
    </>
  );
}

export default EditProfileInfoForm;
