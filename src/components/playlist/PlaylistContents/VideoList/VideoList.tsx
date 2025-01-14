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

  return (
    <>
      {/* 📌 playlistVideo 테이블에 더 많은 데이터 필요 */}
      {playlistVideoData?.map((data) => (
        <div
          onClick={() => handleOrderChange(data.order.toString())}
          key={data.playlist_videos_id}
        >
          {data.video_id}
        </div>
      ))}
    </>
  );
};

export default VideoList;
