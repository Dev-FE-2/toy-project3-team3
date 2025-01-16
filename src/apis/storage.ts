import { supabase } from '@/apis/supabase';
import type { FilePath } from '@/types';
import { compressImage, generateFileName, isImageFile } from '@/utils';

export const uploadImage = async (
  file: File,
  filePath: FilePath,
): Promise<string> => {
  if (!isImageFile(file)) throw new Error('이미지 파일만 업로드 가능합니다.');

  const fileName = generateFileName(file);
  const compressedFile = await compressImage(file);
  const storageFilePath = `${filePath}/${fileName}`;

  const { error } = await supabase.storage
    .from('GRAM')
    .upload(storageFilePath, compressedFile);

  if (error) throw error;

  const { data: url } = supabase.storage
    .from('GRAM')
    .getPublicUrl(storageFilePath);

  if (!url.publicUrl) throw new Error('이미지 URL 생성에 실패했습니다.');

  return url.publicUrl;
};

export const deleteImage = async (imageUrl: string | null): Promise<void> => {
  if (!imageUrl) throw new Error('삭제할 이미지 Url이 유효하지 않습니다');

  const filePath = imageUrl?.split('/').slice(-2).join('/');
  const { error } = await supabase.storage.from('GRAM').remove([filePath]);

  if (error) {
    throw error;
  }
};
