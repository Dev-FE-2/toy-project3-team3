import { useLocation, Navigate } from 'react-router-dom';
import { ROUTES, PUBLIC_PATHS } from '@/constants';
import { AuthProps } from '@/types';
import { useAuth } from '@/hooks';

// user에 따라 컴포넌트 보호
const Auth = ({ children }: AuthProps) => {
  const { SIGN_IN, SIGN_UP, HOME } = ROUTES;
  const { user } = useAuth();
  const { pathname } = useLocation();
  const isPublicRoute = PUBLIC_PATHS.includes(pathname);
  const AUTH_PATHS = [SIGN_IN, SIGN_UP];
  const isAuthPath = AUTH_PATHS.includes(pathname);

  // // 디버깅용
  // console.log({
  //   nickname: user?.nickname,
  //   shortIntro: user?.shortIntro,
  // });

  if (!user && !isPublicRoute) return <Navigate to={SIGN_IN} replace />;
  if (user && isAuthPath) {
    return <Navigate to={HOME} replace />;
  }

  return children;
};

export default Auth;
