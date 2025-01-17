import { useMutation } from '@tanstack/react-query';
import { deleteImage, uploadImage } from '@/apis';
import type { FilePath } from '@/types';
import { useAtom } from 'jotai';
import { thumbnailUrlAtom } from '@/atoms';

export const useThumbnail = () => {
  const [thumbnailUrl, setThumbnailUrl] = useAtom(thumbnailUrlAtom);

  const uploadFileMutation = useMutation<
    string,
    Error,
    { file: File; filePath: FilePath }
  >({
    mutationFn: ({ file, filePath }) => uploadImage(file, filePath),
    onSuccess: (imageUrl) => {
      setThumbnailUrl(imageUrl);
    },
  });

  const deleteFileMutation = useMutation<
    void,
    Error,
    { thumbnailUrl: string | null }
  >({
    mutationFn: ({ thumbnailUrl }) => deleteImage(thumbnailUrl),
    onSuccess: () => {
      setThumbnailUrl(null);
    },
  });

  return {
    thumbnailUrl,
    isUploading: uploadFileMutation.isPending || deleteFileMutation.isPending,
    uploadFile: uploadFileMutation.mutate,
    deleteFile: deleteFileMutation.mutate,
  };
};
