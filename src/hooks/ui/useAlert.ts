import { useContext } from 'react';
import { AlertContext } from '@/components';

const useAlert = () => {
  const context = useContext(AlertContext);
  if (!context) {
    throw new Error('useAlertContext는 AlertProvider 안에서 쓰여야 합니다');
  }

  return {
    success: (text: string) => context.addAlert(text, 'success'),
    error: (text: string) => context.addAlert(text, 'error'),
  };
};

export default useAlert;
