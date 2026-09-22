import { Modal, TextInput, Button } from '@mantine/core';
import { useForm } from '@mantine/form';
import { zod4Resolver } from 'mantine-form-zod-resolver';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import z from 'zod';
import { changeEmail } from '../services/account.services';
import type { EmailModalFormValues } from '../types/account.types';
import { getErrMsg } from '../../../lib/helper';
import { toast } from 'react-toastora';

type ChangeEmailModalProps = {
  opened: boolean;
  onClose: () => void;
};

const formSchema = z.object({ email: z.email().trim() });

function ChangeEmailModal({ opened, onClose }: ChangeEmailModalProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { userId } = useParams();

  const form = useForm<EmailModalFormValues>({
    initialValues: {
      email: '',
    },
    validate: zod4Resolver(formSchema),
  });

  const handleSubmit = async (values: EmailModalFormValues) => {
    setIsLoading(true);
    try {
      await changeEmail(Number(userId), formSchema.parse(values).email);
      form.setValues({ email: '' });
      toast.success('Email changed successfully.', { duration: 5000 });
    } catch (err: unknown) {
      toast.error(getErrMsg(err), { duration: 5000 });
    }
    setIsLoading(false);
  };

  const handleClose = () => {
    onClose();
    form.setValues({ email: '' });
  };

  return (
    <Modal opened={opened} onClose={handleClose} title="Change Email">
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <TextInput
          label="Email"
          placeholder="you@mantine.dev"
          size="md"
          {...form.getInputProps('email')}
          // onFocus={handleFocus}
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
