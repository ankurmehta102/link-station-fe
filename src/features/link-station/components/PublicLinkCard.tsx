import {
  Container,
  Flex,
  Text,
  Paper,
  Avatar,
  ActionIcon,
  Tooltip,
} from '@mantine/core';
import type { Link } from '../../../lib/types';

import { IconExternalLink } from '@tabler/icons-react';

type PublicLinkCardProps = {
  link: Link;
};
function PublicLinkCard({ link }: PublicLinkCardProps) {
  return (
    <Paper
      mb="md"
      px="xs"
      py="sm"
      bg={'transparent'}
      withBorder
      style={{
        borderRadius: '0',
      }}
    >
      <Flex justify="space-evenly" align="center" h="100%">
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
          <Text ta="center" size="md" ml={'sm'} c="dark" fw={700}>
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
          <Tooltip
            arrowOffset={25}
            arrowSize={8}
            label="Visit"
            withArrow
            position="top"
            color="dark"
          >
            <ActionIcon
              variant="subtle"
              aria-label="More"
              color="black"
              onClick={() => {
                window.open(link.linkUrl);
              }}
            >
              <IconExternalLink size={18} />
            </ActionIcon>
          </Tooltip>
        </Container>
      </Flex>
    </Paper>
  );
}

export default PublicLinkCard;
