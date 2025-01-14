import { useMutation } from '@tanstack/react-query';
import { UseFormSetError } from 'react-hook-form';
import { supabase } from '@/apis';
import { SignInFormValues } from '@/schemas/user/signInSchema';
import { isApiError } from '@/utils';
import { useErrorHandler } from '@/hooks';

const useSignIn = (setError: UseFormSetError<SignInFormValues>) => {
  const handleError = useErrorHandler();

  const { mutateAsync: signIn, isPending } = useMutation<
    void,
    Error,
    SignInFormValues
  >({
    mutationFn: async ({ email, password }: SignInFormValues) => {
      // Supabase 로그인
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;
    },
    onError: (error) => {
      if (isApiError(error) && error.status >= 400 && error.status < 500) {
        // 400번재 에러는 폼에 에러 메시지 표시
        setError('email', {
          message: '',
        });
        setError('password', {
          message: '이메일과 비밀번호를 다시 확인해주세요',
        });
        return;
      }
      handleError('로그인', error);
    },
  });

  return { signIn, isPending };
};

export default useSignIn;
