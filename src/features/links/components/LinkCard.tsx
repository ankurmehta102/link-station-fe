import { Paper, Text, Flex, Container, Avatar } from '@mantine/core';
import { IconPencil, IconTrash } from '@tabler/icons-react';
import { useState } from 'react';
import ConfirmModal from './ConfirmModal';
import type { Link } from '../../../lib/types';
import { deleteLink } from '../services/links.services';
import { useParams } from 'react-router-dom';
import { useUIStore } from '../../../stores/uiStore';

const MODAL_STATE_KEYS = {
  CLOSE: 0,
  EDIT: 1,
  DELETE: 2,
};

type LinkCardProps = {
  link: Link;
};

function LinkCard({ link: { linkName, linkId, linkImageUrl } }: LinkCardProps) {
  const [modalKey, setModalKey] = useState(MODAL_STATE_KEYS.CLOSE);
  const { setIsLoading, setErrMsg, setSuccessMsg } = useUIStore();

  const { userId } = useParams();

  const handleEdit = () => {
    console.log('handleEdit');
  };

  const handleDelete = () => {
    setModalKey(MODAL_STATE_KEYS.DELETE);
  };

  const onClickYes = async () => {
    setModalKey(MODAL_STATE_KEYS.CLOSE);
    setIsLoading(true);
    try {
      await deleteLink(Number(userId), linkId);
      setModalKey(MODAL_STATE_KEYS.CLOSE);
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
        opened={modalKey === MODAL_STATE_KEYS.DELETE}
        onClose={() => setModalKey(MODAL_STATE_KEYS.CLOSE)}
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
              name={linkName}
              radius="xl"
              size="md"
              src={linkImageUrl}
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
              {linkName}
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
