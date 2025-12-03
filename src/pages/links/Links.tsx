import {
  Button,
  Center,
  Container,
  Divider,
  LoadingOverlay,
  Modal,
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
import LinkForm from '../../features/links/components/LinkForm';
import { MODAL_KEYS } from '../../lib/helper';

function Links() {
  const [isAddLinkModal, setIsAddLinkModal] = useState(false);
  const { userId } = useParams();
  const { isLoading, setErrMsg, modalKey, setModalKey } = useUIStore();
  const { links, selectedLink, setLinks } = useDataStore();
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

      <Modal
        opened={modalKey === MODAL_KEYS.LINK_EDIT}
        keepMounted={false}
        centered
        onClose={() => setModalKey(MODAL_KEYS.CLOSE)}
        title="Add Link"
      >
        {selectedLink && (
          <LinkForm
            linkId={selectedLink.linkId}
            linkName={selectedLink.linkName}
            linkUrl={selectedLink.linkUrl}
            linkImageUrl={selectedLink.linkImageUrl}
          />
        )}
      </Modal>

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
