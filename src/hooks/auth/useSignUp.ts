import { useMutation } from '@tanstack/react-query';
import { supabase } from '@/apis';
import { SignUpFormValues } from '@/schemas/user/signUpSchema';
import { useErrorHandler } from '@/hooks';
import { isApiError } from '@/utils';

const useSignUp = (
  onError: (field: keyof SignUpFormValues, message: string) => void,
) => {
  const handleError = useErrorHandler();

  const { mutateAsync: signUp, isPending } = useMutation<
    void,
    Error,
    SignUpFormValues
  >({
    mutationFn: async ({ email, password, nickname }: SignUpFormValues) => {
      // Supabase 회원가입
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            nickname,
          },
        },
      });

      if (error) throw error; // onError에서 처리
    },
    onError: (error) => {
      if (isApiError(error) && error.status >= 400 && error.status < 500) {
        // 400번재 에러는 폼에 에러 메시지 표시
        onError('email', '이메일을 다시 확인해주세요');
        return;
      }
      handleError('회원가입', error);
    },
  });

  return { signUp, isPending };
};

export default useSignUp;
