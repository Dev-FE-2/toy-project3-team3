import * as S from './MenuBar.styles';
import { useNavigate } from 'react-router-dom';
import { useAtom } from 'jotai';
import { showMenuBarAtom } from '@/atoms';
import { Icon } from '@/components';
import { ROUTES } from '@/constants';
import { useSignOut } from '@/hooks';

const MenuBar = ({ show }: { show: boolean }) => {
  const [showMenuBar, setShowMenuBar] = useAtom(showMenuBarAtom);
  const navigate = useNavigate();

  const { MY_SUBSCRIBE, MY_LIKE, MY_COMMENT, MY_INFO_EDIT } = ROUTES;
  const { signOut, isPending } = useSignOut();

  if (!showMenuBar) return null;

  const handleSignOut = async () => {
    await signOut();
    setShowMenuBar(false);
  };

  return (
    <S.MenuBarContainer $show={show} onClick={() => setShowMenuBar(false)}>
      <S.Menubar $show={show}>
        <Icon type="cancel" onClick={() => setShowMenuBar(false)} />
        <S.MenuBarItem onClick={() => navigate(MY_SUBSCRIBE)}>
          나의 구독
        </S.MenuBarItem>
        <S.MenuBarItem onClick={() => navigate(MY_LIKE)}>
          나의 좋아요
        </S.MenuBarItem>
        <S.MenuBarItem onClick={() => navigate(MY_COMMENT)}>
          나의 댓글
        </S.MenuBarItem>
        <S.MenuBarItem onClick={() => navigate(MY_INFO_EDIT)}>
          내 정보 수정
        </S.MenuBarItem>
        <S.MenuBarItem onClick={handleSignOut}>
          {isPending ? '로그아웃 중...' : '로그아웃'}
        </S.MenuBarItem>
      </S.Menubar>
    </S.MenuBarContainer>
  );
};

export default MenuBar;
