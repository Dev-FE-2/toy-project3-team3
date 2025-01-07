import { supabase } from '@/apis/supabase';

export const deleteImage = async (imageUrl: string): Promise<void> => {
  const filePath = imageUrl.split('/').slice(-2).join('/');
  const { error } = await supabase.storage.from('GRAM').remove([filePath]);

  if (error) {
    throw error;
  }
};
