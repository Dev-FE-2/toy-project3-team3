import { useEffect, useRef, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import * as S from './VideoPlayer.styles';
import { useFetchPlaylistVideoByPlaylistId } from '@/hooks/usePlaylistVideo';

const VideoPlayer = () => {
  const { playlistId } = useParams<string>();
  const loc = useLocation();
  const searchParams = new URLSearchParams(loc.search);
  const order = searchParams.get('order') || '0';
  const playerRef = useRef<HTMLDivElement>(null);
  const playerInstanceRef = useRef<YT.Player | null>(null);
  const [isAPIReady, setIsAPIReady] = useState(false);

  const { data: playlistVideoData } = useFetchPlaylistVideoByPlaylistId(
    playlistId || '',
  );

  const playingVideo = playlistVideoData?.find(
    (data) => data.order.toString() === order,
  );

  useEffect(() => {
    if (!window.YT) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);
    }

    window.onYouTubeIframeAPIReady = () => {
      setIsAPIReady(true);
    };

    if (window.YT && window.YT.Player) {
      setIsAPIReady(true);
    }

    return () => {
      window.onYouTubeIframeAPIReady = () => {};
    };
  }, []);

  useEffect(() => {
    if (!isAPIReady || !playerRef.current || !playingVideo?.video_id) return;

    if (!playerInstanceRef.current) {
      playerInstanceRef.current = new window.YT.Player('youtube-player', {
        height: '100%',
        width: '100%',
        videoId: playingVideo.video_id,
        playerVars: {
          autoplay: 1,
          controls: 1,
          rel: 0,
        },
      }) as unknown as YT.Player;
    } else {
      playerInstanceRef.current.loadVideoById(playingVideo.video_id);
    }
  }, [isAPIReady, playingVideo]);

  return (
    <S.PlayerWrapper>
      <div id="youtube-player" ref={playerRef} />
    </S.PlayerWrapper>
  );
};

export default VideoPlayer;
