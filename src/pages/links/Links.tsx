import {
  Container,
  Divider,
  LoadingOverlay,
  Notification,
  Title,
} from '@mantine/core';
import { useQuery } from '@tanstack/react-query';
import { fetchLinks } from '../../features/links/services/links.services';
import { useParams } from 'react-router-dom';
import LinkCard from '../../features/links/components/LinkCard';
import type { Link } from '../../features/links/types/links.types';
import { useEffect, useState } from 'react';
import { IconAlertTriangle, IconCircleCheck } from '@tabler/icons-react';

function Links() {
  const [errMsg, setErrMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const { userId } = useParams();
  const {
    data: links,
    isPending,
    error,
  } = useQuery<Link[], any>({
    queryKey: ['userLinks', userId],
    queryFn: () => fetchLinks(Number(userId)),
  });

  useEffect(() => {
    if (error) {
      const errMessage = error.response?.data?.message || error.message || '';
      setErrMsg(errMessage);
    }
  }, [error]);

  return (
    <>
      <LoadingOverlay
        visible={isPending}
        overlayProps={{ blur: 2 }}
        zIndex={99}
      />
      {errMsg && (
        <Notification
          px="xl"
          fw="bold"
          icon={<IconAlertTriangle size={20} />}
          onClose={() => setErrMsg('')}
          styles={{
            root: {
              backgroundColor: 'var(--mantine-color-red-light)',
              borderRadius: '0px',
            },

            description: {
              color: 'var(--mantine-color-red-light-color)',
            },
            icon: {
              backgroundColor: 'transparent',
              color: 'var(--mantine-color-red-light-color)',
            },
            closeButton: {
              color: 'var(--mantine-color-red-light-color)',
            },
          }}
        >
          {errMsg}
        </Notification>
      )}
      {successMsg && (
        <Notification
          px="xl"
          fw="bold"
          icon={<IconCircleCheck size={23} />}
          onClose={() => setSuccessMsg('')}
          styles={{
            root: {
              backgroundColor: 'var(--mantine-color-green-light)',
              borderRadius: '0px',
            },

            description: {
              color: 'var(--mantine-color-green-light-color)',
            },
            icon: {
              backgroundColor: 'transparent',
              color: 'var(--mantine-color-green-light-color)',
            },
            closeButton: {
              color: 'var(--mantine-color-green-light-color)',
            },
          }}
        >
          {successMsg}
        </Notification>
      )}

      <Container size={600}>
        <Title ta="start" order={1} pt="md">
          Links
        </Title>
        <Divider mb={40} />
        <Container fluid>
          {links && links.length ? (
            links.map((link: Link) => (
              <LinkCard key={link.linkId} link={link} />
            ))
          ) : (
            <Title ta="center" fw="bold" order={2}>
              Add links to show.
            </Title>
          )}
        </Container>
      </Container>
    </>
  );
}

export default Links;
