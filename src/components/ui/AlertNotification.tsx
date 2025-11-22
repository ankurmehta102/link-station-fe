import { Notification } from '@mantine/core';
import { IconAlertTriangle, IconCircleCheck } from '@tabler/icons-react';

type AlertNotificationProps = {
  notificationType: 'error' | 'success';
  message: string;
  onClose: () => void;
};

function AlertNotification({
  notificationType,
  message,
  onClose,
}: AlertNotificationProps) {
  const isError = notificationType === 'error';
  return (
    <Notification
      px="xl"
      fw="bold"
      icon={
        isError ? (
          <IconAlertTriangle size={20} />
        ) : (
          <IconCircleCheck size={23} />
        )
      }
      onClose={onClose}
      styles={{
        root: {
          backgroundColor: `var(--mantine-color-${
            isError ? 'red' : 'green'
          }-light)`,
          borderRadius: '0px',
        },

        description: {
          color: `var(--mantine-color-${
            isError ? 'red' : 'green'
          }-light-color)`,
        },
        icon: {
          backgroundColor: 'transparent',
          color: `var(--mantine-color-${
            isError ? 'red' : 'green'
          }-light-color)`,
        },
        closeButton: {
          color: `var(--mantine-color-${
            isError ? 'red' : 'green'
          }-light-color)`,
        },
      }}
    >
      {message}
    </Notification>
  );
}

export default AlertNotification;
