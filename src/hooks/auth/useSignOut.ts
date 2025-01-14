import { useMutation } from '@tanstack/react-query';
import { supabase } from '@/apis';
import { useErrorHandler } from '@/hooks';

const useSignOut = () => {
  const handleError = useErrorHandler();

  const { mutateAsync: signOut, isPending } = useMutation<void, Error>({
    mutationFn: async () => {
      // Supabase 로그아웃
      console.log('로그아웃 mutationFn 실행'); //디버깅
      const { error } = await supabase.auth.signOut();
      console.log('로그아웃 mutationFn error', error); //디버깅

      if (error) throw error;
    },
    onError: (error) => handleError('로그아웃', error),
  });

  return { signOut, isPending };
};

export default useSignOut;
