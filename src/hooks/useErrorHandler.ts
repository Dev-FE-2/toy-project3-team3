import { useErrorBoundary } from 'react-error-boundary';
import { isApiError } from '@/utils';

const useErrorHandler = () => {
  const { showBoundary } = useErrorBoundary();

  const handleError = (type: string, error: unknown) => {
    if (error instanceof Error) {
      console.error(`${type} 에러:`, error);

      if (isApiError(error)) {
        if (error.status >= 500) {
          showBoundary(
            new Error('서버 에러가 발생했습니다. 다시 시도해주세요.'),
          );
        }
      }
    }
  };

  return handleError;
};

export default useErrorHandler;
