import {
  Button,
  FileInput,
  Flex,
  Modal,
  TextInput,
  Image,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { zod4Resolver } from 'mantine-form-zod-resolver';
import { useParams } from 'react-router-dom';
import z from 'zod';
import { createLink } from '../services/links.services';
import type { AddLinkFormValues } from '../types/links.types';
import { useUIStore } from '../../../stores/uiStore';
import { useState } from 'react';

type AddLinkModalProps = {
  opened: boolean;
  onClose: () => void;
};

const formSchema = z.object({
  linkName: z.string().min(1, 'minimum one character required '),
  linkUrl: z.string().min(1, 'minimum one character required '),
  linkImage: z
    .file()
    .max(2 * 1024 * 1024)
    .mime(['image/png', 'image/jpeg'])
    .nullable(),
});

function AddLinkModal({ opened, onClose }: AddLinkModalProps) {
  const [preview, setPreview] = useState<string | null>(null);
  const { setIsLoading, setErrMsg, setSuccessMsg } = useUIStore();

  const { userId } = useParams();
  const form = useForm<AddLinkFormValues>({
    initialValues: {
      linkName: '',
      linkUrl: '',
      linkImage: null,
    },
    validate: zod4Resolver(formSchema),
  });

  const handleClose = () => {
    form.setValues({ linkName: '', linkUrl: '', linkImage: null });
    setPreview(null);
    onClose();
  };

  const handleFileChange = (file: File | null) => {
    form.setFieldValue('linkImage', file);
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setPreview(imageUrl);
    } else {
      setPreview(null);
    }
  };

  const handleSubmit = async (values: AddLinkFormValues) => {
    handleClose();
    setIsLoading(true);
    try {
      await createLink(Number(userId), formSchema.parse(values));
      setSuccessMsg('Link added successfully');
    } catch (err: any) {
      const errMessage = err.response?.data?.message || err.message;
      setErrMsg(errMessage);
    }
    setIsLoading(false);
  };
  return (
    <Modal opened={opened} centered onClose={handleClose} title="Add Link">
      <form onSubmit={form.onSubmit(handleSubmit)}>
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
            w={55}
            h={55}
            fit="cover"
            style={{
              border: '2px solid var(--mantine-primary-color-light-color)',
              borderRadius: '50%',
            }}
          />

          <FileInput
            size="sm"
            placeholder="Click to upload image"
            accept="image/png,image/jpeg"
            clearable
            styles={{
              root: { flex: 1, overflow: 'hidden' },
              input: {
                maxWidth: '100%',
                border: '1px solid var(--mantine-primary-color-light-color)',
              },
            }}
            {...form.getInputProps('linkImage')}
            onChange={handleFileChange}
          />
        </Flex>
        <TextInput
          label="Name"
          placeholder="Instagram"
          size="md"
          my={'sm'}
          withAsterisk
          {...form.getInputProps('linkName')}
        />
        <TextInput
          label="Url"
          placeholder="www.instagram.com"
          size="md"
          mb={'md'}
          withAsterisk
          {...form.getInputProps('linkUrl')}
        />
        <Button variant="light" type="submit">
          Submit
        </Button>
      </form>
    </Modal>
  );
}

export default AddLinkModal;
