import * as S from './ErrorFallback.styles';
import { useErrorBoundary } from 'react-error-boundary';
import { Button } from '@/components/common';

const ErrorFallback = ({ error }: { error: Error }) => {
  const { resetBoundary } = useErrorBoundary();

  return (
    <S.ErrorContainer role="alert" aria-live="assertive" aria-atomic="true">
      <S.ErrorText>에러가 발생했습니다</S.ErrorText>
      <S.ErrorDetailText aria-label="에러 상세 내용">
        {error.message}
      </S.ErrorDetailText>
      <Button onClick={resetBoundary}>다시 시도</Button>
    </S.ErrorContainer>
  );
};

export default ErrorFallback;
