import { Paper, Text, Flex, Container, Avatar } from '@mantine/core';
import { IconPencil, IconTrash } from '@tabler/icons-react';
import type { Link } from '../../../lib/types';
import { useUIStore } from '../../../stores/uiStore';
import { useDataStore } from '../../../stores/dataStore';
import { MODAL_KEYS } from '../../../lib/helper';

type LinkCardProps = {
  link: Link;
};

function LinkCard({ link }: LinkCardProps) {
  const { setModalKey } = useUIStore();
  const { setSelectedLink } = useDataStore();

  const handleEdit = () => {
    setModalKey(MODAL_KEYS.EDIT_LINK);
    setSelectedLink(link);
  };

  const handleDelete = () => {
    setModalKey(MODAL_KEYS.DELETE_LINK);
    setSelectedLink(link);
  };

  return (
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
  );
}

export default LinkCard;
