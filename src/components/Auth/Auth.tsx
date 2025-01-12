import { useLocation, useNavigate } from 'react-router-dom';
import { ROUTES } from '@/constants';
import { AuthProps } from '@/types';
import { PROTECTED_PATHS } from '@/constants';
import { useAuthStateChange } from '@/hooks';
import { useEffect } from 'react';

// session에 따라 컴포넌트 보호
const Auth = ({ children }: AuthProps) => {
  const { SIGN_IN } = ROUTES;
  const { user } = useAuthStateChange();
  const { pathname } = useLocation();
  const navigate = useNavigate();

  console.log({
    user,
    pathname,
    lastPath: localStorage.getItem('lastPath') ?? '/',
  });

  useEffect(() => {
    const lastPath = localStorage.getItem('lastPath');
    // 세션이 있고 lastPath가 있으면 이전 경로로 리다이렉트
    if (user && lastPath) {
      navigate(lastPath, { replace: true });
      localStorage.removeItem('lastPath'); // 사용 후 제거
    }
    // session이 없고 /signin으로 이동하기 전이면
    if (!user && pathname !== SIGN_IN) {
      localStorage.setItem('lastPath', pathname);
    }
    // 보호된 경로에서 세션이 없는 경우
    if (
      !user &&
      PROTECTED_PATHS.includes(pathname as (typeof PROTECTED_PATHS)[number])
    ) {
      navigate(SIGN_IN, { replace: true });
    }
  }, [user, pathname, navigate, SIGN_IN]);

  return children;
};

export default Auth;
