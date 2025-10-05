import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';
import { Routes, Route } from 'react-router-dom';
import Signup from './pages/landing/Signup';
import Login from './pages/landing/Login';

function App() {
  return (
    <MantineProvider>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </MantineProvider>
  );
}

export default App;
