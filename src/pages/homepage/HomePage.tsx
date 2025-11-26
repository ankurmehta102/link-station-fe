import { Container, Title, Text, Button } from '@mantine/core';
import { useNavigate } from 'react-router-dom';

function HomePage() {
  const navigate = useNavigate();
  return (
    <Container
      fluid
      style={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
      }}
    >
      <Title order={1} mb="md">
        Welcome to Link Station
      </Title>

      <Text size="lg" c="dimmed" mb="xl">
        Manage your links in one place and share with the world.
      </Text>

      <Button size="lg" variant="light" onClick={() => navigate('/login')}>
        Go to Login
      </Button>
    </Container>
  );
}

export default HomePage;
