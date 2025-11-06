import { List, Text } from '@mantine/core';
import classes from './account.module.css';
import { IconKey, IconMail, IconUserPentagon } from '@tabler/icons-react';
import { useState } from 'react';
import ChangePasswordModal from './ChangePasswordModal';
import ChangeEmailModal from './ChangeEmailModal';
import ChangeUsernameModal from './ChangeUsernameModal';

const MODAL_STATE_KEYS = {
  CLOSE: 0,
  PASSWORD: 1,
  USERNAME: 2,
  EMAIL: 3,
};

function ListSection() {
  const [modalKey, setModalKey] = useState(MODAL_STATE_KEYS.CLOSE);

  const handlePasswordClick = () => {
    setModalKey(MODAL_STATE_KEYS.PASSWORD);
  };
  const handleUsernameClick = () => {
    setModalKey(MODAL_STATE_KEYS.USERNAME);
  };
  const handleEmailClick = () => {
    setModalKey(MODAL_STATE_KEYS.EMAIL);
  };

  return (
    <>
      <List center spacing="lg" size="xl">
        <List.Item
          className={classes.listItem}
          icon={<IconKey size={24} />}
          onClick={handlePasswordClick}
        >
          <Text size="lg">Change password.</Text>
        </List.Item>
        <List.Item
          className={classes.listItem}
          icon={<IconUserPentagon size={24} />}
          onClick={handleUsernameClick}
        >
          <Text size="lg">Chnage username.</Text>
        </List.Item>
        <List.Item
          className={classes.listItem}
          icon={<IconMail size={24} />}
          onClick={handleEmailClick}
        >
          <Text size="lg">Change log in email.</Text>
        </List.Item>
      </List>
      <ChangePasswordModal
        opened={MODAL_STATE_KEYS.PASSWORD === modalKey}
        onClose={() => setModalKey(MODAL_STATE_KEYS.CLOSE)}
      />
      <ChangeUsernameModal
        opened={MODAL_STATE_KEYS.USERNAME === modalKey}
        onClose={() => setModalKey(MODAL_STATE_KEYS.CLOSE)}
      />

      <ChangeEmailModal
        opened={MODAL_STATE_KEYS.EMAIL === modalKey}
        onClose={() => setModalKey(MODAL_STATE_KEYS.CLOSE)}
      />
    </>
  );
}

export default ListSection;
