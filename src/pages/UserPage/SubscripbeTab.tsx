import { supabase } from '@/apis';
import { EachPlaylist } from '@/components';
import { useFetchSubscribeByUserId } from '@/hooks/useSubscribe';
import { User } from '@/types';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

const EachSubscriptionWrapper = styled.div`
  margin-top: ${({ theme }) => theme.space.lg};
`;

type IPlaylist = {
  category_id: string;
  created_at: string;
  playlist_id: string;
  short_intro: string;
  thumbnail_image: string | null;
  title: string;
  updated_at: string;
  user_id: string;
};

export const SubscribeTab = ({ user }: { user: User }) => {
  const {
    data: subscriptions = [],
    isLoading,
    error,
  } = useFetchSubscribeByUserId(user.userId);

  const [playlists, setPlaylists] = useState<IPlaylist[]>([]);
  const [counts, setCounts] = useState<{
    videoCounts: { [key: string]: number };
    likeCounts: { [key: string]: number };
    subscribeCounts: { [key: string]: number };
  }>({
    videoCounts: {},
    likeCounts: {},
    subscribeCounts: {},
  });

  const [playlistOwners, setPlaylistOwners] = useState<{
    [key: string]: { userName: string; avatarUrl: string };
  }>({});

  useEffect(() => {
    const fetchPlaylists = async () => {
      if (subscriptions.length === 0) return;

      const playlistDetails = await Promise.all(
        subscriptions.map(async (subscription) => {
          const { data: playlist, error: playlistError } = await supabase
            .from('PLAYLISTS')
            .select('*')
            .eq('playlist_id', subscription.playlist_id)
            .single();

          if (playlistError) {
            console.error(
              `Failed to fetch playlist: ${subscription.playlist_id}`,
              playlistError,
            );
            return null;
          }

          return playlist;
        }),
      );

      setPlaylists(playlistDetails.filter((playlist) => playlist !== null));
    };

    fetchPlaylists();
  }, [subscriptions]);

  useEffect(() => {
    const fetchCountsAndOwners = async () => {
      if (playlists.length === 0) return;

      const videoCounts: { [key: string]: number } = {};
      const likeCounts: { [key: string]: number } = {};
      const subscribeCounts: { [key: string]: number } = {};
      const owners: { [key: string]: { userName: string; avatarUrl: string } } =
        {};

      for (const playlist of playlists) {
        const playlistId = playlist.playlist_id;

        // Fetch video counts
        const { data: videos, error: videoError } = await supabase
          .from('PLAYLIST_VIDEOS')
          .select('*')
          .eq('playlist_id', playlistId);

        if (!videoError) {
          videoCounts[playlistId] = videos.length;
        }

        // Fetch like counts
        const { data: likes, error: likeError } = await supabase
          .from('LIKES')
          .select('*')
          .eq('playlist_id', playlistId);

        if (!likeError) {
          likeCounts[playlistId] = likes.length;
        }

        // Fetch subscribe counts
        const { data: subscribes, error: subscribeError } = await supabase
          .from('SUBSCRIBES')
          .select('*')
          .eq('playlist_id', playlistId);

        if (!subscribeError) {
          subscribeCounts[playlistId] = subscribes.length;
        }

        // Fetch playlist owner's info
        const { data: owner, error: ownerError } = await supabase
          .from('USERS')
          .select('nickname, profile_image')
          .eq('user_id', playlist.user_id)
          .single();

        if (!ownerError && owner) {
          owners[playlistId] = {
            userName: owner.nickname,
            avatarUrl: owner.profile_image,
          };
        }
      }

      setCounts({ videoCounts, likeCounts, subscribeCounts });
      setPlaylistOwners(owners);
    };

    fetchCountsAndOwners();
  }, [playlists]);

  if (isLoading) {
    return <p>로딩 중...</p>;
  }

  if (error) {
    return <p>에러가 발생했습니다: {error.message}</p>;
  }

  if (subscriptions.length === 0) {
    return <p>구독한 플레이리스트가 없습니다.</p>;
  }

  return (
    <>
      {playlists.map((playlist) => (
        <EachSubscriptionWrapper key={playlist.playlist_id}>
          <EachPlaylist
            thumbnailUrl={playlist.thumbnail_image ?? ''}
            avatarUrl={playlistOwners[playlist.playlist_id]?.avatarUrl || ''}
            userName={playlistOwners[playlist.playlist_id]?.userName || ''}
            updateDate={new Date(playlist.updated_at).toLocaleDateString()}
            playListTitle={playlist.title}
            onSubscribeClick={() => console.log('구독 취소')}
            isSubscribed={true}
            videoCnt={counts.videoCounts[playlist.playlist_id] || 0}
            likeCnt={counts.likeCounts[playlist.playlist_id] || 0}
            subscribeCnt={counts.subscribeCounts[playlist.playlist_id] || 0}
            isLiked={false}
            onLikeClick={() => console.log('좋아요 클릭')}
          />
        </EachSubscriptionWrapper>
      ))}
    </>
  );
};
