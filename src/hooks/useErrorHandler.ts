import { useErrorBoundary } from 'react-error-boundary';
import { isApiError } from '@/utils';

const useErrorHandler = () => {
  const { showBoundary } = useErrorBoundary();

  const handleError = (context: string, error: unknown) => {
    console.error(`[${context}] Error occurred:`, error);

    if (error instanceof Error) {
      if (isApiError(error)) {
        const { status, message } = error;

        if (status === 404) {
          showBoundary(new Error('요청한 데이터를 찾을 수 없습니다.'));
        } else if (status >= 500) {
          showBoundary(
            new Error('서버에서 문제가 발생했습니다. 다시 시도해주세요.'),
          );
        } else {
          console.error(`[${context}] API Error:`, message);
        }
        return;
      }
      // 기타 에러 처리
      showBoundary(
        new Error('알 수 없는 에러가 발생했습니다. 다시 시도해주세요.'),
      );
    } else {
      console.error(`[${context}] Unexpected error type:`, error);
      showBoundary(new Error('에러가 발생했습니다. 다시 시도해주세요.'));
    }
  };

  return handleError;
};

export default useErrorHandler;
