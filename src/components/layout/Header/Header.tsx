import * as S from './Header.styles';
import { useLocation } from 'react-router-dom';
import { memo } from 'react';
import { Icon } from '@/components';
import { ROUTES } from '@/constants';

const Header = memo(() => {
  const { pathname } = useLocation();
  const { USER } = ROUTES;
  const handleMenuClick = () => {
    console.log('Hamburger Menu Clicked');
  };

  return (
    <S.HeaderContainer>
      <S.Logo />
      <S.RightSection>
        {pathname === USER ? (
          <Icon type="menu" onClick={handleMenuClick} />
        ) : null}
      </S.RightSection>
    </S.HeaderContainer>
  );
});

export default Header;
