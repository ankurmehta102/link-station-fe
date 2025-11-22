import { Button, Flex, Modal, Title } from '@mantine/core';

type ConfirmModalProps = {
  opened: boolean;
  onClose: () => void;
  onYes: () => void;
};
function ConfirmModal({ opened, onClose, onYes }: ConfirmModalProps) {
  return (
    <Modal opened={opened} onClose={onClose} centered>
      <Title ta="center" order={2}>
        Do you want to delete this?
      </Title>
      <Flex justify="center" mt="lg">
        <Button size="md" variant="light" onClick={onYes}>
          Yes
        </Button>
        <Button size="md" variant="light" color="red" ml="md" onClick={onClose}>
          No
        </Button>
      </Flex>
    </Modal>
  );
}

export default ConfirmModal;
