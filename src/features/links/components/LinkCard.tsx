import { Paper, Text, Flex, Container, Avatar } from '@mantine/core';
import { IconPencil, IconTrash } from '@tabler/icons-react';

type LinkCardProps = {
  name: string;
  handleEdit: () => void;
  handleDelete: () => void;
};

function LinkCard({ name, handleEdit, handleDelete }: LinkCardProps) {
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
          <Avatar color="cyan" radius="xl" size="md">
            {name[0].toUpperCase()}
          </Avatar>
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
            {name}
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
