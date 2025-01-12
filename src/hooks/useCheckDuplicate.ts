import { supabase } from '@/apis';
import { useAuthStateChange } from '@/hooks';

const useCheckDuplicate = () => {
  const { user } = useAuthStateChange();

  const checkDuplicate = async (field: string, value: string) => {
    if (field === 'nickname' && user?.nickname === value)
      return { data: false };

    console.log('supabase 검색 결과', { field, value });
    const { data, error } = await supabase
      .from('USERS')
      .select('*')
      .eq(field, value);

    console.log('supabase 검색 결과', data);

    if (error) throw error;

    return { data: data?.length > 0 };
  };

  return { checkDuplicate };
};

export default useCheckDuplicate;
