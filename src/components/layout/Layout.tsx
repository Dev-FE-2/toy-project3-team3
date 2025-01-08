import Header from '@/components/layout/Header/Header';
import Nav from '@/components/layout/Nav/Nav';
import { Outlet } from 'react-router-dom';
import * as S from './Layout.styles';

export const Layout = () => {
  return (
    <main>
      <Header />
      <S.OutletContainer>
        <Outlet />
      </S.OutletContainer>
      <Nav />
    </main>
  );
};

export const AuthLayout = () => {
  return (
    <main>
      <S.OutletContainer>
        <Outlet />
      </S.OutletContainer>
    </main>
  );
};
