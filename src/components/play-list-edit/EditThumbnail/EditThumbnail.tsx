import { useRef, useState } from 'react';
import { deleteImage, uploadImage } from '@/apis';
import { useMutation } from '@tanstack/react-query';
import * as S from './EditThumbnail.styles';
import { Button } from '@/components/common';
import type { PlayListEditFormValues, FilePath } from '@/types';
import { FILE_PATH } from '@/constants';
import { useFormContext } from 'react-hook-form';

const EditThumbnail = () => {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedImgUrl, setUploadedImgUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { setValue } = useFormContext<PlayListEditFormValues>();

  const uploadFileMutation = useMutation<
    string,
    Error,
    { file: File; filePath: FilePath }
  >({
    mutationFn: ({ file, filePath }) => uploadImage(file, filePath),
    onMutate: () => {
      setIsUploading(true);
    },
    onSuccess: (imageUrl) => {
      setUploadedImgUrl(imageUrl);
      setValue('thumbnailUrl', imageUrl);
    },
    onError: (error) => {
      console.error(error);
    },
    onSettled: () => {
      setIsUploading(false);
    },
  });

  const deleteMutationOnSuccess = () => {
    setUploadedImgUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const deleteFileMutation = useMutation<void, Error, string | null>({
    mutationFn: deleteImage,
    onSuccess: deleteMutationOnSuccess,
    onError: (error) => console.error('이미지 삭제 실패:', error),
  });

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file)
      uploadFileMutation.mutate({ file, filePath: FILE_PATH.PLAY_LIST });
  };

  const handleDelete = () => {
    deleteFileMutation.mutate(uploadedImgUrl);
  };

  return (
    <>
      <S.ThumbnailWrapper>
        <S.ThumbnailPreviewWrapper>
          <S.ThumbnailPreview
            src={
              uploadedImgUrl ||
              'https://image.dongascience.com/Photo/2021/04/58a7ec4d7269767313de6c8a37765421.png'
            }
            // 📌 기존 이미지 변경 필요
            alt="기본 이미지"
          />
        </S.ThumbnailPreviewWrapper>

        <Button
          color="gray"
          borderType="round"
          size="small"
          onClick={uploadedImgUrl ? handleDelete : handleButtonClick}
          disabled={isUploading}
        >
          {uploadedImgUrl ? '썸네일 삭제' : '썸네일 등록'}
        </Button>
        <S.FileInput
          onChange={handleUpload}
          type="file"
          ref={fileInputRef}
          accept="image/*"
        />
      </S.ThumbnailWrapper>
    </>
  );
};

export default EditThumbnail;
