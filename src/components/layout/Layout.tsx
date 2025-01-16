import * as S from './Layout.styles';
import { Outlet } from 'react-router-dom';
import Header from './Header/Header';
import Nav from './Nav/Nav';
import { useAuth } from '@/hooks';
import { CategoryProvider } from '../common/Category/CategoryProvider';

export const Layout = () => {
  const { user } = useAuth();

  return (
    <S.MainContainer>
      <CategoryProvider>
        <Header />
        <S.OutletContainer id="outlet" $hasHeader={!!user}>
          <Outlet />
        </S.OutletContainer>
      </CategoryProvider>
      <Nav />
    </S.MainContainer>
  );
};
