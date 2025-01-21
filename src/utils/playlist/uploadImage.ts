import { v4 as uuid } from 'uuid';
import imageCompression from 'browser-image-compression';

export const isImageFile = (file: File): boolean => {
  return file.type.startsWith('image/');
};

export const generateFileName = (file: File): string => {
  const fileExtension = file.name.slice(
    ((file.name.lastIndexOf('.') - 1) >>> 0) + 2,
  );
  const fileName = uuid();

  const newFileName = `${fileName}.${fileExtension}`;

  return newFileName;
};

export const compressImage = async (file: File): Promise<File> => {
  const options = {
    maxSizeMB: 1,
    maxWidthOrHeight: 1024,
    useWebWorker: true,
  };

  return await imageCompression(file, options);
};
