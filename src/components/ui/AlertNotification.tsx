import { Container, Notification, Progress } from '@mantine/core';
import { IconAlertTriangle, IconCircleCheck } from '@tabler/icons-react';
import { useEffect, useState } from 'react';

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
  const [progressValue, setProgressValue] = useState(100);
  const color = notificationType === 'error' ? 'red' : 'green';

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
    const duration = 5000;
    const interval = 20;
    const decrement = (interval / duration) * 100;
    const timer = setInterval(() => {
      setProgressValue((prev) => {
        const next = prev - decrement;
        if (next <= 0) {
          setTimeout(() => {
            onClose();
          }, 100);
        }
        return next;
      });
    }, interval);

    return () => clearInterval(timer);
  }, []);
  return (
    <Container fluid styles={{ root: { padding: 0 } }}>
      <Notification
        px="xl"
        fw="bold"
        icon={
          notificationType === 'error' ? (
            <IconAlertTriangle size={20} />
          ) : (
            <IconCircleCheck size={23} />
          )
        }
        onClose={onClose}
        styles={{
          root: {
            backgroundColor: `var(--mantine-color-${color}-light)`,
            borderRadius: '0px',
          },

          description: {
            color: `var(--mantine-color-${color}-light-color)`,
          },
          icon: {
            backgroundColor: 'transparent',
            color: `var(--mantine-color-${color}-light-color)`,
          },
          closeButton: {
            color: `var(--mantine-color-${color}-light-color)`,
          },
        }}
      >
        {message}
      </Notification>

      <Progress
        value={progressValue}
        size={'xs'}
        styles={{
          root: { borderRadius: '0px' },
          section: {
            borderRadius: '0px',
            backgroundColor: `var(--mantine-color-${color}-light-color)`,
          },
        }}
        transitionDuration={100}
      />
    </Container>
  );
}

export default AlertNotification;
