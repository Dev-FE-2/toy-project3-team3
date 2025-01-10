import { supabase } from '@/apis';
import { useAuthStateChange } from '@/hooks';

const useCheckDuplicate = () => {
  const { user } = useAuthStateChange();

  const checkDuplicate = async (field: string, value: string) => {
    if (field === 'nickname' && user?.nickname === value)
      return { data: false };

    const { data, error } = await supabase
      .from('USERS')
      .select('*')
      .eq(field, value);

    if (error) throw error;

    return { data: data?.length > 0 };
  };

  return { checkDuplicate };
};

export default useCheckDuplicate;
