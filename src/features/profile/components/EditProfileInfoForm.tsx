import {
  Button,
  Container,
  Divider,
  FileInput,
  Flex,
  LoadingOverlay,
  Stack,
  Textarea,
  TextInput,
  Title,
  Image,
} from '@mantine/core';
import { z } from 'zod';
import { useForm } from '@mantine/form';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { zod4Resolver } from 'mantine-form-zod-resolver';

import {
  fetchProfileData,
  updateProfileData,
} from '../services/profile.services';
import classes from './profile.module.css';
import type { User } from '../../../lib/types';
import { getErrMsg, STORAGE_KEYS } from '../../../lib/helper';
import type { EditProfileFormValues } from '../types/profile.type';
import { useUIStore } from '../../../stores/uiStore';

const formSchema = z.object({
  firstName: z
    .string()
    .trim()
    .min(1, 'Invalid first name.')
    .max(30, 'maximum 30 characters allowed'),
  lastName: z.string().trim().max(30, 'maximum 30 characters allowed'),
  displayEmail: z.string().trim().check(z.email()).or(z.literal('')),
  bio: z.string().trim().max(150, 'maximum 150 characters allowed'),
  profilePicture: z
    .file()
    .max(2 * 1024 * 1024)
    .mime(['image/png', 'image/jpeg'])
    .nullable(),
});

function EditProfileInfoForm() {
  const [preview, setPreview] = useState<string | null>(null);

  const { errMsg, isLoading, setErrMsg, setSuccessMsg, setIsLoading } =
    useUIStore();
  const { userId } = useParams();

  const form = useForm<EditProfileFormValues>({
    initialValues: {
      firstName: '',
      lastName: '',
      displayEmail: '',
      bio: '',
      profilePicture: null,
    },
    validate: zod4Resolver(formSchema),
  });

  const {
    data: user,
    isPending,
    error,
  } = useQuery<User, unknown>({
    queryKey: ['userProfile', userId],
    queryFn: () => fetchProfileData(Number(userId)),
  });

  useEffect(() => {
    if (!user) return;

    form.setValues({
      firstName: user.firstName || '',
      lastName: user.lastName || '',
      displayEmail: user.displayEmail || '',
      bio: user.bio || '',
    });

    setPreview(user.profilePictureUrl);

    localStorage.setItem(
      STORAGE_KEYS.PROFILE_PICTURE_URL,
      user.profilePictureUrl || '',
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  useEffect(() => {
    if (error) setErrMsg(getErrMsg(error));
  }, [error, setErrMsg]);

  const handleFileChange = (file: File | null) => {
    form.setFieldValue('profilePicture', file);
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setPreview(imageUrl);
    } else {
      setPreview(
        localStorage.getItem(STORAGE_KEYS.PROFILE_PICTURE_URL) || null,
      );
    }
  };

  const handleSubmit = async (values: EditProfileFormValues) => {
    setIsLoading(true);
    setErrMsg('');
    try {
      const res = await updateProfileData(
        Number(userId),
        formSchema.parse(values),
      );
      const user: User = res.data;
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(res.data));
      form.setValues({
        firstName: user.firstName,
        lastName: user.lastName || '',
        displayEmail: user.displayEmail || '',
        bio: user.bio || '',
        profilePicture: null,
      });
      localStorage.setItem(
        STORAGE_KEYS.PROFILE_PICTURE_URL,
        user.profilePictureUrl || '',
      );
      setSuccessMsg('Details updated successfully!');
    } catch (err: unknown) {
      setErrMsg(getErrMsg(err));
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
      <Container size={600} py="md">
        <Title ta="start" order={1} className={classes.title}>
          Edit Profile
        </Title>
        <Divider mb={40} />

        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Stack gap="sm">
            <Flex
              gap={'xs'}
              justify="flex-start"
              align="center"
              style={{
                backgroundColor: 'var(--mantine-primary-color-light-hover)',
                borderRadius: 'var(--mantine-radius-md)',
              }}
              p="md"
            >
              <Image
                src={preview}
                alt="Profile preview"
                w={110}
                h={110}
                fit="cover"
                style={{
                  border: '2px solid var(--mantine-primary-color-light-color)',
                  borderRadius: '50%',
                }}
              />

              <FileInput
                label="Upload Image"
                size="md"
                placeholder="Click to upload image"
                accept="image/png,image/jpeg"
                clearable
                styles={{
                  root: { flex: 1, overflow: 'hidden' },
                  input: {
                    maxWidth: '100%',
                    border:
                      '1px solid var(--mantine-primary-color-light-color)',
                  },
                }}
                {...form.getInputProps('profilePicture')}
                onChange={handleFileChange}
              />
            </Flex>

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
      </Container>
    </>
  );
}

export default EditProfileInfoForm;
