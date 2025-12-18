import {
  Button,
  Modal,
  PasswordInput,
  Text,
  useMantineTheme,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { useState } from 'react';
import { z } from 'zod';
import { zod4Resolver } from 'mantine-form-zod-resolver';
import { changePassword } from '../services/account.services';
import { useParams } from 'react-router-dom';
import type { PasswordModalFormValues } from '../types/account.types';
import { getErrMsg } from '../../../lib/helper';

type ChangePasswordModalProps = {
  opened: boolean;
  onClose: () => void;
};

const formSchema = z
  .object({
    password: z.string().trim().min(8, 'minimum 8 characters required.'),
    confirmPassword: z.string().trim().min(8, 'minimum 8 characters required.'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

function ChangePasswordModal({ opened, onClose }: ChangePasswordModalProps) {
  const [errMsg, setErrMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const theme = useMantineTheme();
  const { userId } = useParams();
  const form = useForm<PasswordModalFormValues>({
    initialValues: {
      password: '',
      confirmPassword: '',
    },
    validate: zod4Resolver(formSchema),
  });

  const handleSubmit = async (values: PasswordModalFormValues) => {
    setErrMsg('');
    setSuccessMsg('');
    setIsLoading(true);
    try {
      await changePassword(Number(userId), formSchema.parse(values).password);
      form.setValues({ password: '', confirmPassword: '' });
      setSuccessMsg('Password changed successfully.');
    } catch (err: unknown) {
      setErrMsg(getErrMsg(err));
    }
    setIsLoading(false);
  };
  const handleFocus = () => {
    if (errMsg !== '') setErrMsg('');
    if (successMsg !== '') setSuccessMsg('');
  };
  const handleClose = () => {
    onClose();
    setErrMsg('');
    setSuccessMsg('');
    form.setValues({ password: '', confirmPassword: '' });
  };
  return (
    <Modal opened={opened} onClose={handleClose} title="Change Password">
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
      {successMsg !== '' && (
        <Text
          c={theme.colors.green[5]}
          size="sm"
          mt="xs"
          style={{ textAlign: 'center' }}
        >
          {successMsg}
        </Text>
      )}
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <PasswordInput
          label="New Password"
          placeholder="your password"
          withAsterisk
          size="md"
          style={{ flex: 1 }}
          {...form.getInputProps('password')}
          onFocus={handleFocus}
        />
        <PasswordInput
          label="Confirm New Password"
          placeholder="your password"
          withAsterisk
          size="md"
          mt="sm"
          style={{ flex: 1 }}
          {...form.getInputProps('confirmPassword')}
          onFocus={handleFocus}
        />
        <Button
          fullWidth
          type="submit"
          variant="light"
          mt="xl"
          radius="md"
          loading={isLoading}
        >
          Change
        </Button>
      </form>
    </Modal>
  );
}

export default ChangePasswordModal;
