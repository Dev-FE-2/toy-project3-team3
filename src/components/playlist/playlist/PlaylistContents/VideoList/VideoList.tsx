import { VideoItems } from '@/components/playlist/common';
import { useFetchPlaylistVideoByPlaylistId } from '@/hooks/usePlaylistVideo';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

const VideoList = () => {
  const { playlistId } = useParams();
  const loc = useLocation();
  const nav = useNavigate();
  const searchParams = new URLSearchParams(loc.search);
  const order = searchParams.get('order');

  const { data: playlistVideoData } = useFetchPlaylistVideoByPlaylistId(
    playlistId || '',
  );

  const handleOrderChange = (newOrder: string) => {
    if (order !== newOrder) {
      searchParams.set('order', newOrder);
      nav(`${loc.pathname}?${searchParams.toString()}`);
    }
  };

  const sortedPlaylistVideoData = playlistVideoData?.sort(
    (a, b) => a.order - b.order,
  );

  return (
    <>
      {sortedPlaylistVideoData?.map((data) => {
        const formattedData = {
          id: data.video_id,
          title: data.video_title,
          thumbnail: data.video_thumbnail,
          channelTitle: data.video_channel_title,
        };

        return (
          <VideoItems
            key={data.playlist_videos_id}
            video={formattedData}
            onClick={() => handleOrderChange(data.order.toString())}
          />
        );
      })}
    </>
  );
};

export default VideoList;
