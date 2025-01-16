import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/constants';
import { supabase } from '@/apis';
import { useErrorHandler } from '@/hooks';

const useSignOut = () => {
  const handleError = useErrorHandler();
  const navigate = useNavigate();
  const { HOME } = ROUTES;

  const { mutateAsync: signOut, isPending } = useMutation<void, Error>({
    mutationFn: async () => {
      // Supabase 로그아웃
      const { error } = await supabase.auth.signOut();

      if (error) throw error;
    },
    onSuccess: () => {
      navigate(HOME, { replace: true });
    },
    onError: (error) => handleError('로그아웃', error),
  });

  return { signOut, isPending };
};

export default useSignOut;
