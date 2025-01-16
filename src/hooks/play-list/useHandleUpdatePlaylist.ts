import { thumbnailUrlAtom } from '@/atoms';
import {
  useHandleUpdateHashtag,
  useHandleUpdatePlaylistVideo,
  useUpdatePlaylistByIdAndUserId,
} from '@/hooks';
import { PlayListEditFormValues } from '@/types';
import { formatPlaylists } from '@/utils';
import { useAtom } from 'jotai';
import { useState } from 'react';
import { useParams } from 'react-router-dom';

export const useHandleUpdatePlaylist = (userId: string) => {
  const { playListId } = useParams();
  const [thumbnailUrl] = useAtom(thumbnailUrlAtom);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { mutateAsync: updatePlaylist } = useUpdatePlaylistByIdAndUserId();
  const { handleUpdateHashtag } = useHandleUpdateHashtag(playListId || '');
  const { handleUpdatePlaylistVideo } = useHandleUpdatePlaylistVideo(
    playListId || '',
  );

  const handleUpdatePlaylist = async (playlistData: PlayListEditFormValues) => {
    const playlistDataWithThumbnailUrl = {
      ...playlistData,
      thumbnailUrl,
    };

    try {
      setIsSubmitting(true);
      const formattedPlaylist = formatPlaylists(
        userId,
        playlistDataWithThumbnailUrl,
      );

      await updatePlaylist({
        firstId: playListId || '',
        secondId: userId,
        payload: formattedPlaylist,
      });
      await handleUpdateHashtag();
      await handleUpdatePlaylistVideo();

      console.log('모두 저장 완료!');
    } catch (error) {
      console.error('PLAYLIST 저장 오류: ', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return { handleUpdatePlaylist, isSubmitting };
};
