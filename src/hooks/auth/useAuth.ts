import { useContext } from 'react';
import { AuthContext } from '@/contexts/auth';

const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error(
      '❌useAuth를 사용하려면 AuthProvider의 내부에 작성해야 합니다.',
    );
  }
  return context;
};

export default useAuth;
