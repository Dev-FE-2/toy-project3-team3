import * as S from './Nav.styles';
import { useLocation, useNavigate } from 'react-router-dom';
import { memo, useMemo } from 'react';
import { useAtom } from 'jotai';
import { showMenuBarAtom } from '@/atoms';
import { useAuth } from '@/hooks';
import { Icon } from '@/components';
import { ROUTES } from '@/constants';
import { IconType } from '@/types';

const Nav = memo(() => {
  const { pathname } = useLocation();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [, setShowMenuBar] = useAtom(showMenuBarAtom);

  const { HOME, PLAY_LIST_ADD, SEARCH, SIGN_IN, SIGN_UP, MY_FOLLOWING } =
    ROUTES;

  const navItems = useMemo(
    () => [
      {
        type: 'home',
        path: HOME,
        onClick: () => navigate(HOME),
      },
      {
        type: 'searchNav',
        path: SEARCH,
        onClick: () => navigate(SEARCH),
      },
      {
        type: 'signIn',
        path: SIGN_IN,
        onClick: () => navigate(SIGN_IN),
        hideIfUser: true,
      },
      {
        type: 'signUp',
        path: SIGN_UP,
        onClick: () => navigate(SIGN_UP),
        hideIfUser: true,
      },
      {
        type: 'plusBtnPos',
        showIfUser: true,
      },
      {
        type: 'following',
        path: MY_FOLLOWING,
        onClick: () => navigate(MY_FOLLOWING),
        showIfUser: true,
      },
      {
        type: 'profile',
        path: `/${user?.nickname}`,
        onClick: () => navigate(`/${user?.nickname}`),
        showIfUser: true,
      },
    ],
    [navigate, HOME, SEARCH, SIGN_IN, SIGN_UP, MY_FOLLOWING, user?.nickname],
  );

  return (
    <S.NavContainer onClick={() => setShowMenuBar(false)}>
      {user ? (
        <>
          {navItems.map((item) => {
            if (item.hideIfUser) return null;
            if (item.type === 'plusBtnPos') {
              return (
                <S.StyledPlusBtn
                  key={item.type}
                  borderType="circle"
                  onClick={() => navigate(PLAY_LIST_ADD)}
                />
              );
            }
            return (
              <Icon
                key={item.type}
                type={item.type as IconType}
                isActive={pathname === item.path}
                onClick={item.onClick}
              />
            );
          })}
        </>
      ) : (
        <>
          {navItems.map((item) => {
            if (item.showIfUser) return null;
            return (
              <Icon
                key={item.type}
                type={item.type as IconType}
                isActive={pathname === item.path}
                onClick={item.onClick}
              />
            );
          })}
        </>
      )}
    </S.NavContainer>
  );
});

export default Nav;
