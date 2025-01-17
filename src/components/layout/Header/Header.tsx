import * as S from './Header.styles';
import { useParams } from 'react-router-dom';
import { memo } from 'react';
import { useAtom } from 'jotai';
import { showMenuBarAtom } from '@/atoms';
import { Icon } from '@/components';
import { useAuth } from '@/hooks';
const Header = memo(({ showHeader }: { showHeader: boolean }) => {
  const { user } = useAuth();
  const params = useParams();
  const isUserPage = params.nickname && user?.nickname === params.nickname;

  const [showMenuBar, setShowMenuBar] = useAtom(showMenuBarAtom);

  const handleMenuClick = () => {
    setShowMenuBar(!showMenuBar);
  };

  return (
    <S.HeaderContainer $show={showHeader}>
      <S.Logo />
      <S.RightSection>
        {isUserPage ? <Icon type="menu" onClick={handleMenuClick} /> : null}
      </S.RightSection>
    </S.HeaderContainer>
  );
});

export default Header;
