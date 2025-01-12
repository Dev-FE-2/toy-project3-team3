import { supabase } from '@/apis';
import { QueryData } from '@supabase/supabase-js';
import { useAuthStateChange } from '@/hooks';

const useCheckDuplicate = () => {
  const { user } = useAuthStateChange();

  const checkDuplicate = async (field: string, value: string) => {
    if (field === 'nickname' && user?.nickname === value)
      return { data: false };

    const query = supabase.from('USERS').select('*').eq(field, value);

    type Users = QueryData<typeof query>;

    console.log('데이터 가져오기');

    const { data, error } = await query;
    console.log('쿼리 결과:', { data, error });

    if (error) throw error;

    const users: Users = data ?? [];
    console.log('가져온 데이터:', users);

    return { data: users?.length > 0 };
  };

  return { checkDuplicate };
};

export default useCheckDuplicate;
