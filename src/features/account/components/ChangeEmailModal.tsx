import { Modal, TextInput, useMantineTheme, Text, Button } from '@mantine/core';
import { useForm } from '@mantine/form';
import { zod4Resolver } from 'mantine-form-zod-resolver';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import z from 'zod';
import { changeEmail } from '../services/account.services';
import type { EmailModalFormValues } from '../types/account.types';

type ChangeEmailModalProps = {
  opened: boolean;
  onClose: () => void;
};

const formSchema = z.object({ email: z.email().trim() });

function ChangeEmailModal({ opened, onClose }: ChangeEmailModalProps) {
  const [errMsg, setErrMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const theme = useMantineTheme();
  const { userId } = useParams();

  const form = useForm<EmailModalFormValues>({
    initialValues: {
      email: '',
    },
    validate: zod4Resolver(formSchema),
  });

  const handleSubmit = async (values: any) => {
    setErrMsg('');
    setSuccessMsg('');
    setIsLoading(true);
    try {
      await changeEmail(Number(userId), formSchema.parse(values).email);
      form.setValues({ email: '' });
      setSuccessMsg('Email changed successfully.');
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
    form.setValues({ email: '' });
  };

  return (
    <Modal opened={opened} onClose={handleClose} title="Change Email">
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
          label="Email"
          placeholder="you@mantine.dev"
          size="md"
          {...form.getInputProps('email')}
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

export default ChangeEmailModal;
