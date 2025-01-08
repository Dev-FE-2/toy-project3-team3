import * as S from './ErrorFallback.styles';
import { useRouteError } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const ErrorFallback = ({ error: propsError }: { error?: Error }) => {
  const routeError = useRouteError();
  const error = propsError ?? routeError;
  const navigate = useNavigate();

  return (
    <S.ErrorContainer role="alert" aria-live="assertive" aria-atomic="true">
      <S.ErrorText>에러가 발생했습니다</S.ErrorText>
      <S.ErrorDetailText aria-label="에러 상세 내용">
        {error instanceof Error
          ? error.message
          : '알 수 없는 에러가 발생했습니다'}
      </S.ErrorDetailText>
      <S.BtnWrapper>
        <S.RetryBtn onClick={() => window.location.reload()}>
          다시 시도
        </S.RetryBtn>
        <S.HomeBtn onClick={() => navigate('/')}>홈으로</S.HomeBtn>
      </S.BtnWrapper>
    </S.ErrorContainer>
  );
};

export default ErrorFallback;
