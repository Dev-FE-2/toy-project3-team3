import AuthContext from './AuthContext';
import { AuthProviderProps } from '@/types';
import { useAuthStateChange } from '@/hooks';

const AuthProvider = ({ children }: AuthProviderProps) => {
  const { session, user } = useAuthStateChange();

  return (
    <AuthContext.Provider value={{ session, user }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
