import * as S from './Layout.styles';
import { Outlet } from 'react-router-dom';
import Header from './Header/Header';
import Nav from './Nav/Nav';
import { MenuBar } from '../user';
import { useShowHeader } from '@/hooks';
import { useAtom } from 'jotai';
import { showMenuBarAtom } from '@/atoms';

export const Layout = () => {
  const showHeader = useShowHeader();
  const [showMenuBar] = useAtom(showMenuBarAtom);
  return (
    <S.MainContainer>
      <Header showHeader={showHeader} />
      <MenuBar show={showMenuBar} />
      <S.OutletContainer id="outlet" $showHeader={showHeader}>
        <Outlet />
      </S.OutletContainer>
      <Nav />
    </S.MainContainer>
  );
};
