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
import {
  deleteLink,
  fetchLinks,
} from '../../features/links/services/links.services';
import { useParams } from 'react-router-dom';
import LinkCard from '../../features/links/components/LinkCard';
import type { Link } from '../../lib/types';
import { useEffect } from 'react';

import { useUIStore } from '../../stores/uiStore';
import { useDataStore } from '../../stores/dataStore';
import LinkForm from '../../features/links/components/LinkForm';
import { MODAL_KEYS } from '../../lib/helper';
import ConfirmModal from '../../features/links/components/ConfirmModal';

function Links() {
  const { userId } = useParams();
  const {
    isLoading,
    setErrMsg,
    modalKey,
    setModalKey,
    setSuccessMsg,
    setIsLoading,
  } = useUIStore();
  const { links, selectedLink, setLinks, removeLink, setSelectedLink } =
    useDataStore();
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

  const onClickYes = async () => {
    setModalKey(MODAL_KEYS.CLOSE);
    setIsLoading(true);
    try {
      if (selectedLink) {
        await deleteLink(Number(userId), selectedLink.linkId);
        removeLink(selectedLink.linkId);
      }
      setModalKey(MODAL_KEYS.CLOSE);
      setSuccessMsg('Link delete successfully');
    } catch (err: any) {
      const errMessage = err.response?.data?.message || err.message;
      setErrMsg(errMessage);
    }
    setSelectedLink(null);
    setIsLoading(false);
  };

  return (
    <>
      <LoadingOverlay
        visible={isPending || isLoading}
        overlayProps={{ blur: 2 }}
        zIndex={99}
      />
      <ConfirmModal
        opened={modalKey === MODAL_KEYS.DELETE_LINK}
        onClose={() => {
          setModalKey(MODAL_KEYS.CLOSE);
          setSelectedLink(null);
        }}
        onYes={onClickYes}
      />
      <Modal
        opened={modalKey === MODAL_KEYS.ADD_LINK}
        keepMounted={false}
        centered
        onClose={() => setModalKey(MODAL_KEYS.CLOSE)}
        title="Add Link"
      >
        <LinkForm userId={Number(userId)} />
      </Modal>

      <Modal
        opened={modalKey === MODAL_KEYS.EDIT_LINK}
        keepMounted={false}
        centered
        onClose={() => {
          setModalKey(MODAL_KEYS.CLOSE);
          setSelectedLink(null);
        }}
        title="Edit Link"
      >
        {selectedLink && (
          <LinkForm
            userId={Number(userId)}
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
              setModalKey(MODAL_KEYS.ADD_LINK);
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
