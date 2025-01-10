import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { PostgrestError } from '@supabase/supabase-js';
import { supabase } from '@/apis';
import { useErrorHandler } from '@/hooks';
import { ROUTES } from '@/constants';

const useDeactivateAccount = () => {
  const handleError = useErrorHandler();
  const navigate = useNavigate();
  const { SIGN_IN } = ROUTES;

  const { mutateAsync: deactivateAccount, isPending } = useMutation<
    void,
    PostgrestError
  >({
    mutationFn: async () => {
      // Supabase 사용자 삭제
      const { error } = await supabase.rpc('delete_user');

      if (error) {
        throw error as PostgrestError;
      }

      // 성공 시 로그인 페이지로 이동
      navigate(SIGN_IN, { replace: true });
    },
    onError: (error) => handleError('계정 해지', error),
  });

  return { deactivateAccount, isPending };
};

export default useDeactivateAccount;
