import * as S from './ErrorFallback.styles';
import { useErrorBoundary } from 'react-error-boundary';
import { Button } from '@/components/common';

const ErrorFallback = ({ error }: { error: Error }) => {
  const { resetBoundary } = useErrorBoundary();

  return (
    <S.ErrorContainer>
      <S.ErrorText>에러가 발생했습니다</S.ErrorText>
      <S.ErrorDetailText>{error.message}</S.ErrorDetailText>
      <Button onClick={resetBoundary}>다시 시도</Button>
    </S.ErrorContainer>
  );
};

export default ErrorFallback;
