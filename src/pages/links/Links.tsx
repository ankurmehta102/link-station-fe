import {
  Button,
  Center,
  Container,
  Divider,
  LoadingOverlay,
  Title,
} from '@mantine/core';
import { useQuery } from '@tanstack/react-query';
import { fetchLinks } from '../../features/links/services/links.services';
import { useParams } from 'react-router-dom';
import LinkCard from '../../features/links/components/LinkCard';
import type { Link } from '../../lib/types';
import { useEffect, useState } from 'react';

import { useUIStore } from '../../stores/uiStore';
import AddLinkModal from '../../features/links/components/AddLinkModal';
import { useDataStore } from '../../stores/dataStore';

function Links() {
  const [isAddLinkModal, setIsAddLinkModal] = useState(false);
  const { userId } = useParams();
  const { isLoading, setErrMsg } = useUIStore();
  const { links, setLinks } = useDataStore();
  const { data, isPending, error } = useQuery<Link[], any>({
    queryKey: ['userLinks', userId],
    queryFn: () => fetchLinks(Number(userId)),
  });

  useEffect(() => {
    if (data) {
      setLinks(data);
    }
  }, [data]);

  useEffect(() => {
    if (error) {
      const errMessage = error.response?.data?.message || error.message || '';
      setErrMsg(errMessage);
    }
  }, [error]);

  return (
    <>
      <LoadingOverlay
        visible={isPending || isLoading}
        overlayProps={{ blur: 2 }}
        zIndex={99}
      />
      <AddLinkModal
        opened={isAddLinkModal}
        onClose={() => {
          setIsAddLinkModal(false);
        }}
      />

      <Container size={600}>
        <Title ta="start" order={1} pt="md">
          Links
        </Title>
        <Divider mb={40} />

        {links && links.length ? (
          links.map((link: Link) => <LinkCard key={link.linkId} link={link} />)
        ) : (
          <Title ta="center" fw="bold" order={2}>
            Add links to show.
          </Title>
        )}
        <Center>
          <Button
            variant="light"
            size="md"
            onClick={() => {
              setIsAddLinkModal(true);
            }}
          >
            Add Link
          </Button>
        </Center>
      </Container>
    </>
  );
}

export default Links;
