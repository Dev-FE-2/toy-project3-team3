import { useAtom, useSetAtom } from 'jotai';
import { playListAtom, playlistErrorAtom } from '@/atoms';
import { useCreatePlaylistVideo } from '@/hooks';
import { formatPlaylistVideos } from '@/utils';

export const useHandleCreatePlaylistVideo = () => {
  const [playlists] = useAtom(playListAtom);
  const setPlaylistError = useSetAtom(playlistErrorAtom);
  const { mutate: createPlaylistVideo } = useCreatePlaylistVideo();

  const handleCreatePlaylistVideo = async (playlistId: string) => {
    if (playlists.length === 0) {
      setPlaylistError('영상을 추가해주세요.');
      return;
    }

    try {
      const formattedPlaylists = formatPlaylistVideos(playlistId, playlists);
      const createPlaylistVideoPromise = formattedPlaylists.map((playlist) =>
        createPlaylistVideo(playlist, {
          onSuccess: (data) => {
            console.log(data);
          },
          onError: (data) => {
            console.error(data);
          },
        }),
      );

      await Promise.all(createPlaylistVideoPromise);
      console.log('playlistvideo 성공!!!!!!!!!!!!');
    } catch (error) {
      console.error('PLAYLIST_VIDEO 저장 오류: ', error);
    }
  };

  return { handleCreatePlaylistVideo };
};
