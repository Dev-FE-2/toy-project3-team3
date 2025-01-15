import { useCreatePlaylist } from '@/hooks';
import { useHandleCreateHashtag } from '@/hooks/play-list/useHandleCreateHashtag';
import { useHandleCreatePlaylistVideo } from '@/hooks/play-list/useHandleCreatePlaylistVideo';
import { PlayListEditFormValues } from '@/types';
import { formatPlaylists } from '@/utils';

export const useHandleCreatePlaylist = (userId: string) => {
  const { mutateAsync: createPlaylist } = useCreatePlaylist();
  const { handleCreateHashtag } = useHandleCreateHashtag();
  const { handleCreatePlaylistVideo } = useHandleCreatePlaylistVideo();

  const handleCreatePlaylist = async (playlistData: PlayListEditFormValues) => {
    try {
      const formattedPlaylist = formatPlaylists(userId, playlistData);

      const data = await createPlaylist(formattedPlaylist);

      if (!data[0].playlist_id) return;

      await handleCreateHashtag(data[0].playlist_id);
      await handleCreatePlaylistVideo(data[0].playlist_id);

      console.log('모두 저장 완료!');
    } catch (error) {
      console.error('PLAYLIST 저장 오류: ', error);
    }
  };

  return { handleCreatePlaylist };
};
