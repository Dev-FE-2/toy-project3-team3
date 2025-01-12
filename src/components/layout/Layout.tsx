import * as S from './Layout.styles';
import { Outlet } from 'react-router-dom';
import Header from './Header/Header';
import Nav from './Nav/Nav';
import { useAuthStateChange } from '@/hooks';

export const Layout = () => {
  const { user } = useAuthStateChange();
  return (
    <S.MainContainer>
      {user ? <Header /> : null}
      <S.OutletContainer $hasHeader={!!user}>
        <Outlet />
      </S.OutletContainer>
      <Nav />
    </S.MainContainer>
  );
};
