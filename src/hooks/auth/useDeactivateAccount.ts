import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/apis';
import { useErrorHandler, useAlert } from '@/hooks';
import { ROUTES } from '@/constants';

const useDeactivateAccount = () => {
  const handleError = useErrorHandler();
  const navigate = useNavigate();
  const { SIGN_IN } = ROUTES;
  const alert = useAlert();

  const { mutateAsync: deactivateAccount, isPending } = useMutation<
    void,
    Error
  >({
    mutationFn: async () => {
      // Supabase 사용자 삭제
      // 사용자 삭제
      const { error: deleteError } = await supabase.rpc('delete_user');
      if (deleteError) throw deleteError;

      // 로그아웃 처리
      const { error: signOutError } = await supabase.auth.signOut();
      if (signOutError) throw signOutError;
    },
    onSuccess: () => {
      alert.success('회원 탈퇴되었어요');
      navigate(SIGN_IN, { replace: true });
    },
    onError: (error) => handleError('계정 해지', error),
  });

  return { deactivateAccount, isPending };
};

export default useDeactivateAccount;
