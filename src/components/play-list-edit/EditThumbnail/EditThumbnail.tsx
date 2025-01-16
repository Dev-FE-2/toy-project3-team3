import { useRef } from 'react';
import * as S from './EditThumbnail.styles';
import { Button } from '@/components/common';
import { FILE_PATH } from '@/constants';
import { useThumbnail } from '@/hooks';
import { useAtom } from 'jotai';
import { playListAtom } from '@/atoms';

const EditThumbnail = () => {
  const [playlists] = useAtom(playListAtom);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { thumbnailUrl, isUploading, uploadFile, deleteFile } = useThumbnail();

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      uploadFile({ file, filePath: FILE_PATH.PLAY_LIST });
    }
  };

  const handleDelete = () => {
    deleteFile({ thumbnailUrl });
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const thumbnailPreview =
    thumbnailUrl ||
    playlists[0]?.thumbnail ||
    'https://sshfuyezplxjsinnfdzx.supabase.co/storage/v1/object/public/GRAM/PLAYLIST_THUMBNAIL_IMAGE/aa8c604d-93fb-4b18-8d93-69b2712b6af7.png';

  return (
    <S.ThumbnailWrapper>
      <S.ThumbnailPreviewWrapper>
        <S.ThumbnailPreview src={thumbnailPreview} alt="썸네일 미리보기" />
      </S.ThumbnailPreviewWrapper>
      <Button
        type="button"
        color="gray"
        borderType="round"
        size="small"
        onClick={thumbnailUrl ? handleDelete : handleButtonClick}
        disabled={isUploading}
      >
        {thumbnailUrl ? '썸네일 삭제' : '썸네일 등록'}
      </Button>
      <S.FileInput
        onChange={handleUpload}
        type="file"
        ref={fileInputRef}
        accept="image/*"
      />
    </S.ThumbnailWrapper>
  );
};

export default EditThumbnail;
