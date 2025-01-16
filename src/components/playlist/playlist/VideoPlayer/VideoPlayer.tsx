import { useEffect, useRef } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import * as S from './VideoPlayer.styles';
import { useFetchPlaylistVideoByPlaylistId } from '@/hooks/usePlaylistVideo';

const VideoPlayer = () => {
  const { playlistId } = useParams<string>();
  const loc = useLocation();
  const searchParams = new URLSearchParams(loc.search);
  const order = searchParams.get('order');
  const playerRef = useRef<HTMLDivElement>(null);
  const playerInstanceRef = useRef<YT.Player | null>(null);

  const { data: playlistVideoData } = useFetchPlaylistVideoByPlaylistId(
    playlistId || '',
  );

  const playingVideo = playlistVideoData?.find(
    (data) => data.order.toString() === order,
  );

  console.log(order);

  useEffect(() => {
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);

    window.onYouTubeIframeAPIReady = () => {
      if (!playerRef.current || !playingVideo?.video_id) return;

      playerInstanceRef.current = new window.YT.Player('youtube-player', {
        height: '100%',
        width: '100%',
        videoId: playingVideo?.video_id,
        playerVars: {
          autoplay: 1,
          controls: 1,
          rel: 0,
        },
      }) as unknown as YT.Player;
    };

    return () => {
      window.onYouTubeIframeAPIReady = () => {};
    };
  }, [playingVideo]);

  useEffect(() => {
    if (playerInstanceRef.current && playingVideo?.video_id) {
      playerInstanceRef.current.loadVideoById(playingVideo.video_id);
    }
  }, [playingVideo]);

  return (
    <S.PlayerWrapper>
      <div id="youtube-player" ref={playerRef} />
    </S.PlayerWrapper>
  );
};

export default VideoPlayer;
