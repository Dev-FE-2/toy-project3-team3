import { Navigate, useLocation } from 'react-router-dom';
import { ROUTES } from '@/constants';
import { AuthProps } from '@/types';
import { PROTECTED_PATHS } from '@/constants';
import { useAuthStateChange } from '@/hooks';

// session에 따라 컴포넌트 보호
const Auth = ({ children }: AuthProps) => {
  const { SIGN_IN } = ROUTES;
  const { session } = useAuthStateChange();
  const { pathname } = useLocation();

  console.log({
    session,
    pathname,
    'session?.user': session?.user,
    lastPath: localStorage.getItem('lastPath') ?? '/',
  });

  if (!session && pathname !== SIGN_IN) {
    // session이 없고 /signin으로 한 번 이동했다면
    localStorage.setItem('lastPath', pathname);
  }

  // 보호된 경로에서 세션이 없는 경우
  if (
    !session &&
    PROTECTED_PATHS.includes(pathname as (typeof PROTECTED_PATHS)[number])
  ) {
    return <Navigate to={SIGN_IN} replace />;
  }

  // 세션이 있고 /signin 페이지인 경우 이전 경로로 리다이렉트
  if (session && pathname === '/signin') {
    const lastPath = localStorage.getItem('lastPath') ?? '/';
    return <Navigate to={lastPath} replace />;
  }

  return children;
};

export default Auth;
