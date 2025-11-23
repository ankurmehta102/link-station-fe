import { Container, Divider, LoadingOverlay, Title } from '@mantine/core';
import { useQuery } from '@tanstack/react-query';
import { fetchLinks } from '../../features/links/services/links.services';
import { useParams } from 'react-router-dom';
import LinkCard from '../../features/links/components/LinkCard';
import type { Link } from '../../features/links/types/links.types';
import { useEffect } from 'react';

import { useUIStore } from '../../stores/uiStore';

function Links() {
  const { userId } = useParams();
  const { setErrMsg } = useUIStore();
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
