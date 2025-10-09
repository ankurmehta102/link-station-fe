import '@mantine/core/styles.css';
import { MantineProvider, createTheme } from '@mantine/core';
import { Routes, Route } from 'react-router-dom';

import Signup from './pages/auth/Signup';
import Login from './pages/auth/Login';
import MainLayout from './components/layouts/MainLayout';
import Profile from './pages/profile/Profile';
import Links from './pages/links/Links';
import Account from './pages/account/Account';

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
    <MantineProvider theme={theme} defaultColorScheme="dark">
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Profile />} />
          <Route path="links" element={<Links />} />
          <Route path="account" element={<Account />} />
        </Route>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </MantineProvider>
  );
}

export default App;
