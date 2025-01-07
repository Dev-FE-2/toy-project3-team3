import { supabase } from '@/apis/supabase';
import imageCompression from 'browser-image-compression';
import { v4 as uuid } from 'uuid';
import type { FilePath } from '@/types';

const isImageFile = (file: File): boolean => {
  return file.type.startsWith('image/');
};

const generateFileName = (file: File): string => {
  const fileExtension = file.name.slice(
    ((file.name.lastIndexOf('.') - 1) >>> 0) + 2,
  );
  const fileName = uuid();

  const newFileName = `${fileName}.${fileExtension}`;

  console.log(fileName);
  console.log(newFileName);

  return newFileName;
};

const compressImage = async (file: File): Promise<File> => {
  const options = {
    maxSizeMB: 1,
    maxWidthOrHeight: 1024,
    useWebWorker: true,
  };

  return await imageCompression(file, options);
};

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
