import Header from '@/components/layout/Header/Header';
import Nav from '@/components/layout/Nav/Nav';
import { Outlet } from 'react-router-dom';
import GlobalStyles from '@/styles/GlobalStyles';
import '@/styles/fonts.css';
import '@/styles/designToken.css';
import { S } from './Layout.styles';

const Layout = () => {
  return (
    <main>
      <GlobalStyles />
      <Header />
      <S.OutletContainer>
        <Outlet />
      </S.OutletContainer>
      <Nav />
    </main>
  );
};

export default Layout;
