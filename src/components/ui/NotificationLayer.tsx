import { useUIStore } from '../../stores/uiStore';
import AlertNotification from '../ui/AlertNotification';

function NotificationLayer() {
  const errMsg = useUIStore((state) => state.errMsg);
  const successMsg = useUIStore((state) => state.successMsg);
  const setErrMsg = useUIStore((state) => state.setErrMsg);
  const setSuccessMsg = useUIStore((state) => state.setSuccessMsg);

  return (
    <>
      {errMsg && (
        <AlertNotification
          notificationType="error"
          message={errMsg}
          onClose={() => setErrMsg('')}
        />
      )}
      {successMsg && (
        <AlertNotification
          notificationType="success"
          message={successMsg}
          onClose={() => setSuccessMsg('')}
        />
      )}
    </>
  );
}

export default NotificationLayer;
