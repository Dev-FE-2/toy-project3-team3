import * as S from './Layout.styles';
import { Outlet } from 'react-router-dom';
import Header from './Header/Header';
import Nav from './Nav/Nav';
import { useShowHeader } from '@/hooks';

export const Layout = () => {
  const showHeader = useShowHeader();
  return (
    <S.MainContainer>
      <Header showHeader={showHeader} />
      <S.OutletContainer id="outlet" $showHeader={showHeader}>
        <Outlet />
      </S.OutletContainer>
      <Nav />
    </S.MainContainer>
  );
};
