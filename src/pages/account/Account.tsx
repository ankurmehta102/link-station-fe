import { Container, Divider, Title } from '@mantine/core';
import ListSection from '../../features/account/components/ListSection';

function Account() {
  return (
    <Container size={600}>
      <Title ta="start" order={1} pt="md">
        Account
      </Title>
      <Divider mb={40} />
      <ListSection />
    </Container>
  );
}

export default Account;
