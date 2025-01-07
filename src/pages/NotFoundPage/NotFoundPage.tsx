import * as S from './NotFoundPage.styles';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components';

const NotFound = () => {
  const navigate = useNavigate();

  const handleToHome = useCallback(() => {
    navigate('/', { replace: true }); // 홈으로 이동하면서 히스토리 스택을 덮어씀
  }, [navigate]);

  return (
    <S.NotFoundContainer>
      <S.Inner>
        <S.Title>PAGE NOT FOUND</S.Title>
        <S.Description>
          페이지의 주소가 잘못 입력되었거나,
          <br />
          요청하신 페이지의 주소가 변경 혹은 삭제되어 찾을 수 없습니다.
        </S.Description>
        <Button
          color="gray"
          size="small"
          onClick={handleToHome}
          aria-label="홈으로 이동"
        >
          홈으로
        </Button>
      </S.Inner>
    </S.NotFoundContainer>
  );
};

export default NotFound;
