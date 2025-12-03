import { Paper, Text, Flex, Container, Avatar } from '@mantine/core';
import { IconPencil, IconTrash } from '@tabler/icons-react';
import ConfirmModal from './ConfirmModal';
import type { Link } from '../../../lib/types';
import { deleteLink } from '../services/links.services';
import { useParams } from 'react-router-dom';
import { useUIStore } from '../../../stores/uiStore';
import { useDataStore } from '../../../stores/dataStore';
import { MODAL_KEYS } from '../../../lib/helper';

type LinkCardProps = {
  link: Link;
};

function LinkCard({ link }: LinkCardProps) {
  const { modalKey, setIsLoading, setErrMsg, setSuccessMsg, setModalKey } =
    useUIStore();
  const { removeLink, setSelectedLink } = useDataStore();

  const { userId } = useParams();

  const handleEdit = () => {
    setModalKey(MODAL_KEYS.LINK_EDIT);
    setSelectedLink(link);
  };

  const handleDelete = () => {
    setModalKey(MODAL_KEYS.LINK_DELETE);
  };

  const onClickYes = async () => {
    setModalKey(MODAL_KEYS.CLOSE);
    setIsLoading(true);
    try {
      await deleteLink(Number(userId), link.linkId);
      removeLink(link.linkId);
      setModalKey(MODAL_KEYS.CLOSE);
      setSuccessMsg('Link delete successfully');
    } catch (err: any) {
      const errMessage = err.response?.data?.message || err.message;
      setErrMsg(errMessage);
    }
    setIsLoading(false);
  };
  return (
    <>
      <ConfirmModal
        opened={modalKey === MODAL_KEYS.LINK_DELETE}
        onClose={() => setModalKey(MODAL_KEYS.CLOSE)}
        onYes={onClickYes}
      />
      <Paper mb="md" shadow="md" h={70}>
        <Flex justify="space-between" align="center" h="100%">
          <Container
            h="100%"
            style={{
              display: 'flex',
              justifyContent: 'flex-start',
              alignItems: 'center',
              flex: 1,
            }}
          >
            <Avatar
              color="teal"
              name={link.linkName}
              radius="xl"
              size="md"
              src={link.linkImageUrl}
            />
          </Container>
          <Container
            h="100%"
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              flex: 4,
            }}
          >
            <Text ta="center" size="lg">
              {link.linkName}
            </Text>
          </Container>

          <Container
            h="100%"
            style={{
              display: 'flex',
              justifyContent: 'flex-end',
              alignItems: 'center',
              flex: 1,
            }}
          >
            <Avatar
              color="blue"
              radius="sm"
              onClick={handleEdit}
              style={{ cursor: 'pointer' }}
            >
              <IconPencil />
            </Avatar>
            <Avatar
              color="red"
              radius="sm"
              ml="xs"
              onClick={handleDelete}
              style={{ cursor: 'pointer' }}
            >
              <IconTrash />
            </Avatar>
          </Container>
        </Flex>
      </Paper>
    </>
  );
}

export default LinkCard;
