import { supabase } from '@/apis/supabase';

export const deleteImage = async (imageUrl: string | null): Promise<void> => {
  if (!imageUrl) throw new Error('삭제할 이미지 Url이 유효하지 않습니다');

  const filePath = imageUrl?.split('/').slice(-2).join('/');
  const { error } = await supabase.storage.from('GRAM').remove([filePath]);

  if (error) {
    throw error;
  }
};
