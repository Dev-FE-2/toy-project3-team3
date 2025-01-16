import * as S from './Header.styles';
import { useLocation } from 'react-router-dom';
import { memo, useEffect, useRef, useState } from 'react';
import { Icon } from '@/components';
import { ROUTES } from '@/constants';

const Header = memo(() => {
  const { pathname } = useLocation();
  const { USER } = ROUTES;
  const handleMenuClick = () => {
    console.log('Hamburger Menu Clicked');
  };

  const [isShow, setIsShow] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const scrollTarget = document.getElementById('outlet');

    const handleScroll = () => {
      const currentScrollY = scrollTarget?.scrollTop || 0;

      if (currentScrollY) {
        // 스크롤 내릴 때 헤더 숨기기
        if (currentScrollY > lastScrollY.current) {
          setIsShow(false);
        }
        // 스크롤 올릴 때 헤더 보이기
        else {
          setIsShow(true);
        }

        lastScrollY.current = currentScrollY;
      }
    };

    scrollTarget?.addEventListener('scroll', handleScroll);

    return () => {
      scrollTarget?.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <S.HeaderContainer $isShow={isShow}>
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
