import { useAtom } from 'jotai';
import { playListAtom } from '@/atoms';
import {
  useCreatePlaylistVideo,
  useDeletePlaylistVideoById,
  useFetchPlaylistVideoByPlaylistId,
  useUpdatePlaylistVideoById,
} from '@/hooks';
import { formatPlaylistVideos } from '@/utils';

export const useHandleUpdatePlaylistVideo = (playlistId: string) => {
  const [playlists] = useAtom(playListAtom);
  const { data: playlistVideoData } =
    useFetchPlaylistVideoByPlaylistId(playlistId);
  const { mutate: createPlaylistVideo } = useCreatePlaylistVideo();
  const { mutate: updatePlaylistVideo } = useUpdatePlaylistVideoById();
  const { mutate: deletePlaylistVideo } = useDeletePlaylistVideoById();

  const formattedPlaylists = formatPlaylistVideos(playlistId, playlists);

  const newPlaylistVideos = formattedPlaylists.filter((item) => {
    const existingVideo = playlistVideoData?.find(
      (data) => data.video_id === item.video_id,
    );
    return !existingVideo;
  });

  const updatedPlaylistVideos = formattedPlaylists
    .filter((item) => {
      const existingVideo = playlistVideoData?.find(
        (data) => data.video_id === item.video_id,
      );
      return existingVideo && existingVideo.order !== item.order;
    })
    .map((item) => {
      const existingVideo = playlistVideoData?.find(
        (data) => data.video_id === item.video_id,
      );
      return {
        ...item,
        playlist_videos_id: existingVideo?.playlist_videos_id,
      };
    });

  const deletedPlaylistVideos = playlistVideoData?.filter(
    (data) => !playlists.some((video) => video.id === data.video_id),
  );

  const handleUpdatePlaylistVideo = async () => {
    try {
      if (newPlaylistVideos.length > 0) {
        console.log('새로운 PLAYLIST_VIDEOS:', newPlaylistVideos);
        const createPlaylistVideoPromise = newPlaylistVideos.map((video) =>
          createPlaylistVideo(video, {
            onSuccess: (data) => {
              console.log('PLAYLIST_VIDEOS 생성 성공:', data);
            },
            onError: (error) => {
              console.error('PLAYLIST_VIDEOS 생성 실패:', error);
            },
          }),
        );
        await Promise.all(createPlaylistVideoPromise);
      }

      if (updatedPlaylistVideos.length > 0) {
        console.log('업데이트된 PLAYLIST_VIDEOS:', updatedPlaylistVideos);
        const updatePlaylistVideoPromise = updatedPlaylistVideos.map((video) =>
          updatePlaylistVideo(
            { id: video.playlist_videos_id || '', payload: video },
            {
              onSuccess: (data) => {
                console.log('PLAYLIST_VIDEOS 업데이트 성공:', data);
              },
              onError: (error) => {
                console.error('PLAYLIST_VIDEOS 업데이트 실패:', error);
              },
            },
          ),
        );
        await Promise.all(updatePlaylistVideoPromise);
      }

      if (deletedPlaylistVideos && deletedPlaylistVideos.length > 0) {
        const deletePlaylistVideoPromise = deletedPlaylistVideos.map((data) =>
          deletePlaylistVideo(data.playlist_videos_id, {
            onSuccess: () => {
              console.log('PLAYLIST_VIDEOS 삭제 성공:', data);
            },
            onError: (error) => {
              console.error('PLAYLIST_VIDEOS 삭제 실패:', error);
            },
          }),
        );
        await Promise.all(deletePlaylistVideoPromise);
      }

      console.log('PLAYLIST_VIDEOS 업데이트 성공!');
    } catch (error) {
      console.error('PLAYLIST_VIDEOS 업데이트 오류:', error);
    }
  };

  return { handleUpdatePlaylistVideo };
};
