import * as S from './Header.styles';
import { useLocation } from 'react-router-dom';
import { memo } from 'react';
import { Category, Icon } from '@/components';
import { CATEGORY_OPTIONS, ROUTES } from '@/constants';
import { useCategoryContext } from '@/components/common/Category/CategoryContext';
import { useParams } from 'react-router-dom';
import { useAtom } from 'jotai';
import { showMenuBarAtom } from '@/atoms';
import { useAuth } from '@/hooks';

const Header = memo(({ showHeader }: { showHeader: boolean }) => {
  const { pathname } = useLocation();
  const { HOME } = ROUTES;
  const { user } = useAuth();
  const params = useParams();
  const isUserPage = params.nickname && user?.nickname === params.nickname;

  const [showMenuBar, setShowMenuBar] = useAtom(showMenuBarAtom);
  const handleMenuClick = () => {
    setShowMenuBar(!showMenuBar);
  };

  const { currCategory, setCurrCategory } = useCategoryContext();

  return (
    <S.HeaderContainer $show={showHeader}>
      <S.Row>
        <S.Logo />
        <S.RightSection>
          {isUserPage ? <Icon type="menu" onClick={handleMenuClick} /> : null}
        </S.RightSection>
      </S.Row>
      <S.Row>
        {pathname === HOME && (
          <S.Row>
            <S.CategoryList>
              {Object.entries(CATEGORY_OPTIONS).map(([key, value]) => (
                <Category
                  key={key}
                  type="tab"
                  content={value}
                  isActive={key === currCategory}
                  onClick={() => setCurrCategory(key)}
                />
              ))}
            </S.CategoryList>
          </S.Row>
        )}
      </S.Row>
    </S.HeaderContainer>
  );
});

export default Header;
