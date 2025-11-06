import { Button, Modal, TextInput, useMantineTheme, Text } from '@mantine/core';
import { useForm } from '@mantine/form';
import { zod4Resolver } from 'mantine-form-zod-resolver';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import z from 'zod';
import { changeUsername } from '../services/account.services';
import type { UsernameModalFormValues } from '../types/account.types';

type ChangeUsernameModalProps = {
  opened: boolean;
  onClose: () => void;
};

const formSchema = z.object({
  username: z.string().trim().min(4, 'minimum 4 characters required'),
});

function ChangeUsernameModal({ opened, onClose }: ChangeUsernameModalProps) {
  const [errMsg, setErrMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const theme = useMantineTheme();
  const { userId } = useParams();

  const form = useForm<UsernameModalFormValues>({
    initialValues: {
      username: '',
    },
    validate: zod4Resolver(formSchema),
  });

  const handleSubmit = async (values: any) => {
    setErrMsg('');
    setSuccessMsg('');
    setIsLoading(true);
    try {
      await changeUsername(Number(userId), formSchema.parse(values).username);
      form.setValues({ username: '' });
      setSuccessMsg('Username changed successfully.');
    } catch (err: any) {
      const errMessage = err.response?.data?.message || err.message;
      setErrMsg(errMessage);
    }
    setIsLoading(false);
  };
  const handleFocus = () => {
    errMsg !== '' && setErrMsg('');
    successMsg !== '' && setSuccessMsg('');
  };

  const handleClose = () => {
    onClose();
    setErrMsg('');
    setSuccessMsg('');
    form.setValues({ username: '' });
  };
  return (
    <Modal opened={opened} onClose={handleClose} title="Change Username">
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
        <TextInput
          label="Username"
          placeholder="@username"
          size="md"
          {...form.getInputProps('username')}
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

export default ChangeUsernameModal;
