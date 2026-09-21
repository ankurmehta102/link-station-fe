import '@mantine/core/styles.css';
import './global.css';
import { createTheme, MantineProvider } from '@mantine/core';
import { Routes, Route } from 'react-router-dom';

import Signup from './pages/auth/Signup';
import Login from './pages/auth/Login';
import MainLayout from './components/layouts/MainLayout';
import Profile from './pages/profile/Profile';
import Links from './pages/links/Links';
import Account from './pages/account/Account';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import HomePage from './pages/homepage/HomePage';
import PublicProfilePage from './pages/public-profile/PublicProfilePage';

const queryClient = new QueryClient();

function App() {
  const theme = createTheme({
    primaryColor: 'green',

    colors: {
      primary: [
        '#17191a',
        '#1f2125',
        '#2a2c30',
        '#35373a',
        '#424242',
        '#3b3b3b',
        '#2e2e2e',
        '#242424',
        '#1f1f1f',
        '#141414',
      ],
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <MantineProvider defaultColorScheme="dark" theme={theme}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/u/:username" element={<PublicProfilePage />} />
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
