import { supabase } from '@/apis';
import { EachPlaylist } from '@/components';
import { useFetchPlaylistByUserId } from '@/hooks/usePlaylist';
import { User } from '@/types';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

const EachPlaylistWrapper = styled.div`
  margin-top: ${({ theme }) => theme.space.lg};
`;

const formatDate = (isoDate: string): string => {
  const date = new Date(isoDate);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}.${month}.${day}`;
};

export const PostTab = ({ user }: { user: User }) => {
  const {
    data: playlists = [],
    isLoading,
    error,
  } = useFetchPlaylistByUserId(user.userId);

  const [counts, setCounts] = useState<{
    videoCounts: { [key: string]: number };
    likeCounts: { [key: string]: number };
    subscribeCounts: { [key: string]: number };
  }>({
    videoCounts: {},
    likeCounts: {},
    subscribeCounts: {},
  });

  useEffect(() => {
    const fetchCounts = async () => {
      if (playlists.length === 0) return;

      const videoCounts: { [key: string]: number } = {};
      const likeCounts: { [key: string]: number } = {};
      const subscribeCounts: { [key: string]: number } = {};

      for (const playlist of playlists) {
        // Fetch video counts
        const { data: videos, error: videoError } = await supabase
          .from('PLAYLIST_VIDEOS')
          .select('*')
          .eq('playlist_id', playlist.playlist_id);

        if (videoError) {
          console.error(
            `Failed to fetch videos for playlist ${playlist.playlist_id}`,
            videoError,
          );
        } else {
          videoCounts[playlist.playlist_id] = videos.length;
        }

        // Fetch like counts
        const { data: likes, error: likeError } = await supabase
          .from('LIKES')
          .select('*')
          .eq('playlist_id', playlist.playlist_id);

        if (likeError) {
          console.error(
            `Failed to fetch likes for playlist ${playlist.playlist_id}`,
            likeError,
          );
        } else {
          likeCounts[playlist.playlist_id] = likes.length;
        }

        // Fetch subscribe counts
        const { data: subscribes, error: subscribeError } = await supabase
          .from('SUBSCRIBES')
          .select('*')
          .eq('playlist_id', playlist.playlist_id);

        if (subscribeError) {
          console.error(
            `Failed to fetch subscribes for playlist ${playlist.playlist_id}`,
            subscribeError,
          );
        } else {
          subscribeCounts[playlist.playlist_id] = subscribes.length;
        }
      }

      setCounts({ videoCounts, likeCounts, subscribeCounts });
    };

    fetchCounts();
  }, [playlists]);

  return (
    <>
      {isLoading ? (
        <p>로딩 중...</p>
      ) : error ? (
        <p>에러가 발생했습니다: {error.message}</p>
      ) : playlists.length === 0 ? (
        <p>플레이리스트가 없습니다.</p>
      ) : (
        playlists.map((playlist) => (
          <EachPlaylistWrapper key={playlist.playlist_id}>
            <EachPlaylist
              thumbnailUrl={playlist.thumbnail_image ?? ''}
              videoCnt={counts.videoCounts[playlist.playlist_id] || 0}
              avatarUrl={user.profileImage}
              userName={user.nickname}
              updateDate={formatDate(playlist.updated_at)}
              likeCnt={counts.likeCounts[playlist.playlist_id] || 0}
              subscribeCnt={counts.subscribeCounts[playlist.playlist_id] || 0}
              isLiked={false}
              isSubscribed={false}
              playListTitle={playlist.title}
              onLikeClick={() => console.log('좋아요')}
              onSubscribeClick={() => console.log('구독')}
            />
          </EachPlaylistWrapper>
        ))
      )}
    </>
  );
};
