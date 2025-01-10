import Header from '@/components/layout/Header/Header';
import Nav from '@/components/layout/Nav/Nav';
import { Outlet } from 'react-router-dom';
import * as S from './Layout.styles';
import gramLogo from '@/assets/img/logo/gramLogo.webp';

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
        <S.Logo src={gramLogo} />
        <Outlet />
      </S.OutletContainer>
    </main>
  );
};
