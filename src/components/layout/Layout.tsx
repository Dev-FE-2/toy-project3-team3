import Header from '@/components/layout/Header/Header';
import Nav from '@/components/layout/Nav/Nav';
import { Outlet } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { theme } from '@/styles/theme';
import GlobalStyles from '@/styles/GlobalStyles';
import '@/styles/fonts.css';
import * as S from './Layout.styles';

const Layout = () => {
  return (
    <main>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <Header />
        <S.OutletContainer>
          <Outlet />
        </S.OutletContainer>
        <Nav />
      </ThemeProvider>
    </main>
  );
};

export default Layout;
