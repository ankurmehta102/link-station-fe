import { Button, FileInput, Flex, TextInput, Image } from '@mantine/core';
import { useForm } from '@mantine/form';
import { zod4Resolver } from 'mantine-form-zod-resolver';
import { useParams } from 'react-router-dom';
import z from 'zod';

import type { LinkFormValues } from '../types/links.types';
import { useUIStore } from '../../../stores/uiStore';
import { useState } from 'react';
import { MODAL_KEYS } from '../../../lib/helper';
import { updateLink } from '../services/links.services';

type LinkFormProps = {
  linkId?: number | null;
  linkName?: string;
  linkUrl?: string;
  linkImageUrl?: string | null;
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

function LinkForm({
  linkId = null,
  linkName = '',
  linkImageUrl = '',
  linkUrl = '',
}: LinkFormProps) {
  const [preview, setPreview] = useState<string | null>(linkImageUrl || null);
  const { setIsLoading, setErrMsg, setSuccessMsg, setModalKey } = useUIStore();

  const { userId } = useParams();

  const form = useForm<LinkFormValues>({
    initialValues: {
      linkName: linkName || '',
      linkUrl: linkUrl || '',
      linkImage: null,
    },
    validate: zod4Resolver(formSchema),
  });

  const handleFileChange = (file: File | null) => {
    form.setFieldValue('linkImage', file);
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setPreview(imageUrl);
    } else {
      setPreview(null);
    }
  };

  const handleSubmit = async (values: LinkFormValues) => {
    setIsLoading(true);
    try {
      if (linkId) {
        await updateLink(Number(userId), linkId, formSchema.parse(values));
        setSuccessMsg('Link updated successfully');
      }
      setModalKey(MODAL_KEYS.CLOSE);
    } catch (err: any) {
      const errMessage = err.response?.data?.message || err.message;
      setErrMsg(errMessage);
    }
    setIsLoading(false);
  };

  return (
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
  );
}

export default LinkForm;
