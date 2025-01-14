import { supabase } from '@/apis';
import { useMutation } from '@tanstack/react-query';
import { useErrorHandler, useAuth } from '@/hooks';
import { CheckDuplicateProps } from '@/types';

const useCheckDuplicate = () => {
  const { user } = useAuth();
  const handleError = useErrorHandler();

  const { mutateAsync: checkDuplicate, isPending } = useMutation<
    boolean,
    Error,
    CheckDuplicateProps
  >({
    mutationFn: async ({ field, value }) => {
      // 현재 사용자의 닉네임과 같으면 early return
      if (field === 'nickname' && user?.nickname === value) return false;

      const { data, error } = await supabase
        .from('USERS')
        .select(field)
        .eq(field, value);

      if (error) throw error;

      return data.length > 0;
    },
    onError: (error) => handleError('중복 확인', error),
  });

  return { checkDuplicate, isPending };
};

export default useCheckDuplicate;
