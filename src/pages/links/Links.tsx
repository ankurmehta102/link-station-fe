import { Container, Divider, LoadingOverlay, Text, Title } from '@mantine/core';
import { useQuery } from '@tanstack/react-query';
import { fetchLinks } from '../../features/links/services/links.services';
import { useParams } from 'react-router-dom';
import LinkCard from '../../features/links/components/LinkCard';
import type { Link } from '../../features/links/types/links.types';
import { useEffect, useState } from 'react';

function Links() {
  const [errMsg, setErrMsg] = useState('');

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

  const handleEdit = () => {
    console.log('handleEdit');
  };

  const handleDelete = () => {
    console.log('handleDelete');
  };

  return (
    <>
      <LoadingOverlay
        visible={isPending}
        overlayProps={{ blur: 2 }}
        zIndex={99}
      />
      {errMsg && (
        <Text
          ta="center"
          py="sm"
          style={{
            backgroundColor: 'var(--mantine-color-red-light)',
            color: 'var(--mantine-color-red-light-color)',
          }}
        >
          {errMsg}
        </Text>
      )}
      <Container size={600}>
        <Title ta="start" order={1} pt="md">
          Links
        </Title>
        <Divider mb={40} />
        <Container fluid>
          {links && links.length ? (
            links.map((link: Link) => (
              <LinkCard
                key={link.linkId}
                name={link.linkName}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
              />
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
