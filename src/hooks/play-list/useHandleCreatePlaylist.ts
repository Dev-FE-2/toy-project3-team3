import { thumbnailUrlAtom } from '@/atoms';
import { useCreatePlaylist } from '@/hooks';
import { useHandleCreateHashtag } from '@/hooks/play-list/useHandleCreateHashtag';
import { useHandleCreatePlaylistVideo } from '@/hooks/play-list/useHandleCreatePlaylistVideo';
import { PlayListEditFormValues } from '@/types';
import { formatPlaylists } from '@/utils';
import { useAtom } from 'jotai';
import { useState } from 'react';

export const useHandleCreatePlaylist = (userId: string) => {
  const [thumbnailUrl] = useAtom(thumbnailUrlAtom);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { mutateAsync: createPlaylist } = useCreatePlaylist();
  const { handleCreateHashtag } = useHandleCreateHashtag();
  const { handleCreatePlaylistVideo } = useHandleCreatePlaylistVideo();

  const handleCreatePlaylist = async (playlistData: PlayListEditFormValues) => {
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

      const data = await createPlaylist(formattedPlaylist);

      if (!data[0].playlist_id) return;

      await handleCreateHashtag(data[0].playlist_id);
      await handleCreatePlaylistVideo(data[0].playlist_id);

      console.log('모두 저장 완료!');
    } catch (error) {
      console.error('PLAYLIST 저장 오류: ', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return { handleCreatePlaylist, isSubmitting };
};
