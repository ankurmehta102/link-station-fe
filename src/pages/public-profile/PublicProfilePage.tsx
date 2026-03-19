import {
  Container,
  Image,
  Card,
  Flex,
  Stack,
  Title,
  Text,
  ScrollArea,
} from '@mantine/core';
import { useQuery } from '@tanstack/react-query';
import { fetchUser } from '../../features/link-station/services/linkStation.services';
import type { Link, UserWithLinks } from '../../lib/types';

import { useParams } from 'react-router-dom';
import PublicLinkCardProps from '../../features/link-station/components/PublicLinkCard';

function PublicProfilePage() {
  const { username } = useParams<{ username: string }>();

  const {
    data: userData,
    isPending,
    error,
  } = useQuery<UserWithLinks>({
    queryKey: ['user', username],
    queryFn: () => fetchUser(username || ''),
  });

  return (
    <Container
      fluid
      h="100dvh"
      style={{
        backgroundColor: '#000000',
        // opacity: 0.8,
        backgroundImage: 'radial-gradient(#fefefe 0.45px, #242424 0.45px)',
        backgroundSize: '9px 9px',
      }}
    >
      {!isPending && !error && (
        <Flex justify={'center'} align={'center'} h="100%">
          <Card
            shadow="sm"
            padding="lg"
            radius="none"
            w={450}
            h={500}
            bg={'white'}
          >
            <Card.Section>
              <Flex
                gap={'xs'}
                justify="flex-start"
                align="center"
                style={{
                  backgroundColor: 'black',
                }}
                p="md"
              >
                {userData?.profilePictureUrl && (
                  <Image
                    src={userData.profilePictureUrl}
                    alt="Profile preview"
                    w={90}
                    h={90}
                    fit="cover"
                    style={{
                      border: '2px solid white',
                      borderRadius: '50%',
                    }}
                  />
                )}

                <Stack gap={'0'} justify="center" align="flex-start" ml={'xs'}>
                  {userData?.firstName && (
                    <Title order={3} style={{ color: 'white' }}>
                      {userData?.firstName + ' ' + (userData?.lastName || '')}
                    </Title>
                  )}
                  {userData?.bio && (
                    <Text size="xs" fw={400}>
                      {userData?.bio}
                    </Text>
                  )}
                </Stack>
              </Flex>
            </Card.Section>

            <ScrollArea
              h="100%"
              scrollbarSize={4}
              my="sm"
              type="never"
              offsetScrollbars
            >
              {userData?.links.map((link: Link) => (
                <PublicLinkCardProps link={link} key={link.linkId} />
              ))}
            </ScrollArea>

            {userData?.displayEmail && (
              <Card.Section>
                <Flex gap={'xs'} justify="center" align="center">
                  <Text size="xs" c="dark">
                    {userData.displayEmail}
                  </Text>
                </Flex>
              </Card.Section>
            )}
          </Card>
        </Flex>
      )}
    </Container>
  );
}

export default PublicProfilePage;
