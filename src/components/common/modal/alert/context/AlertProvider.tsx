import { ReactNode, useState } from 'react';
import AlertContext from './AlertContext';
import Alert from '../Alert';
import { AlertStatus } from '@/types';

const AlertProvider = ({ children }: { children: ReactNode }) => {
  const [alert, setAlert] = useState<{
    id: string;
    text: string;
    status: AlertStatus;
  } | null>(null);

  const addAlert = (text: string, status: AlertStatus) => {
    // 이전 alert가 있다면 제거
    if (alert) {
      removeAlert(alert.id);
    }

    const id = Date.now().toString();
    setAlert({ id, text, status });
    setTimeout(() => removeAlert(id), 3500); // 3.5초 후 제거
  };

  const removeAlert = (id: string) => {
    setAlert((prev) => (prev?.id === id ? null : prev));
  };

  return (
    <AlertContext.Provider value={{ addAlert, removeAlert }}>
      {children}
      <div id="alert-container">
        {alert && (
          <Alert key={alert.id} text={alert.text} status={alert.status} />
        )}
      </div>
    </AlertContext.Provider>
  );
};

export default AlertProvider;
