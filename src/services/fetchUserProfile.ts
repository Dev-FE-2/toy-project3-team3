import { supabase } from '@/apis';

const fetchUserProfile = async (userId: string) => {
  const { data, error } = await supabase
    .from('USERS')
    .select('email, nickname, profile_image, short_intro')
    .eq('user_id', userId)
    .single();

  if (error) throw error;
  return data;
};

export default fetchUserProfile;
