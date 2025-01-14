import { useLocation, Navigate } from 'react-router-dom';
import { ROUTES } from '@/constants';
import { AuthProps } from '@/types';
// import { PUBLIC_PATHS } from '@/constants';
import { useAuthStateChange } from '@/hooks';
// import { useEffect } from 'react';

// session에 따라 컴포넌트 보호
const Auth = ({ children }: AuthProps) => {
  const { SIGN_IN } = ROUTES;
  const { user } = useAuthStateChange();
  const { pathname } = useLocation();
  // const navigate = useNavigate();

  console.log({
    user,
    pathname,
  });

  // useEffect(() => {
  //   // 퍼블릭 경로에서 세션이 없는 경우
  //   if (
  //     !user &&
  //     !PUBLIC_PATHS.includes(pathname as (typeof PUBLIC_PATHS)[number])
  //   ) {
  //     navigate(SIGN_IN, { replace: true });
  //   }
  //   // // 보호된 경로에서 세션이 있는 경우
  //   // if (
  //   //   user &&
  //   //   PUBLIC_PATHS.includes(pathname as (typeof PUBLIC_PATHS)[number])
  //   // ) {
  //   //   navigate(HOME, { replace: true });
  //   // }
  // }, [user, pathname, navigate, SIGN_IN]);

  if (!user) return <Navigate to={SIGN_IN} replace />;

  return children;
};

export default Auth;
