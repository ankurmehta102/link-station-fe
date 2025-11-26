import '@mantine/core/styles.css';
import { MantineProvider, createTheme } from '@mantine/core';
import { Routes, Route } from 'react-router-dom';

import Signup from './pages/auth/Signup';
import Login from './pages/auth/Login';
import MainLayout from './components/layouts/MainLayout';
import Profile from './pages/profile/Profile';
import Links from './pages/links/Links';
import Account from './pages/account/Account';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import HomePage from './pages/homepage/HomePage';

const queryClient = new QueryClient();

function App() {
  const theme = createTheme({
    components: {
      NavLink: {
        styles: {
          root: {
            borderRadius: 'var(--mantine-radius-sm)',
          },
          label: {
            fontSize: 'var(--mantine-font-size-md)',
          },
        },
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <MantineProvider theme={theme} defaultColorScheme="dark">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/:userId" element={<MainLayout />}>
            <Route index element={<Profile />} />
            <Route path="links" element={<Links />} />
            <Route path="account" element={<Account />} />
          </Route>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </MantineProvider>
    </QueryClientProvider>
  );
}

export default App;
