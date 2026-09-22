import { Button, Modal, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { zod4Resolver } from 'mantine-form-zod-resolver';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import z from 'zod';
import { changeUsername } from '../services/account.services';
import type { UsernameModalFormValues } from '../types/account.types';
import { getErrMsg } from '../../../lib/helper';
import { toast } from 'react-toastora';

type ChangeUsernameModalProps = {
  opened: boolean;
  onClose: () => void;
};

const formSchema = z.object({
  username: z.string().trim().min(4, 'minimum 4 characters required'),
});

function ChangeUsernameModal({ opened, onClose }: ChangeUsernameModalProps) {
  const [isLoading, setIsLoading] = useState(false);

  const { userId } = useParams();

  const form = useForm<UsernameModalFormValues>({
    initialValues: {
      username: '',
    },
    validate: zod4Resolver(formSchema),
  });

  const handleSubmit = async (values: UsernameModalFormValues) => {
    setIsLoading(true);
    try {
      await changeUsername(Number(userId), formSchema.parse(values).username);
      form.setValues({ username: '' });
      toast.success('Username changed successfully.', { duration: 5000 });
    } catch (err: unknown) {
      toast.error(getErrMsg(err), { duration: 5000 });
    }
    setIsLoading(false);
  };

  const handleClose = () => {
    onClose();
    form.setValues({ username: '' });
  };
  return (
    <Modal opened={opened} onClose={handleClose} title="Change Username">
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <TextInput
          label="Username"
          placeholder="@username"
          size="md"
          {...form.getInputProps('username')}
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
