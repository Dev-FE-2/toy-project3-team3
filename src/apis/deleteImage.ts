import { supabase } from '@/apis/supabase';

// 📌 수정 필요!
export const deleteImage = async (imageUrl: string): Promise<void> => {
  const filePath = imageUrl.split('/').slice(-2).join('/');
  console.log(filePath);
  const { error } = await supabase.storage.from('GRAM').remove([filePath]);

  if (error) {
    throw error;
  }
};
