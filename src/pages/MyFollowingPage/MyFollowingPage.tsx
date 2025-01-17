import { Backward, EachPlaylist } from '@/components';
import profilePic from '@/assets/img/profile/default_profile.webp';
import { useAuth } from '@/hooks';
import { useEffect, useState } from 'react';
import { supabase } from '@/apis';
import { ROUTES } from '@/constants';
import { SupabaseUserData } from '@/types';
import * as S from './MyFollowingPage.styles';

type Playlist = {
  playlist_id: string; // 플레이리스트 ID
  thumbnail_image: string; // 썸네일 이미지
  video_count: number; // 비디오 개수
  updated_at: string; // 업데이트 날짜
  title: string; // 플레이리스트 제목
  user: {
    profile_image: string | null; // 유저 프로필 이미지
    nickname: string; // 유저 닉네임
  };
};

const MyFollowingPage = () => {
  const { user } = useAuth();

  const [followingUsers, setFollowingUsers] = useState<SupabaseUserData[]>([]);
  const [likeCounts, setLikeCounts] = useState<{ [key: string]: number }>({});
  const [subscribeCounts, setSubscribeCounts] = useState<{
    [key: string]: number;
  }>({});
  const [followingPlaylists, setFollowingPlaylists] = useState<Playlist[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLikeCounts = async () => {
      if (followingPlaylists.length > 0) {
        const counts: { [key: string]: number } = {};
        for (const playlist of followingPlaylists) {
          const { data: likes, error } = await supabase
            .from('LIKES') // Supabase 테이블 이름
            .select('*')
            .eq('playlist_id', playlist.playlist_id);

          if (error) {
            console.error(
              `Failed to fetch likes for playlist ${playlist.playlist_id}`,
              error,
            );
          } else {
            counts[playlist.playlist_id] = likes.length;
          }
        }
        setLikeCounts(counts);
      }
    };

    fetchLikeCounts();
  }, [followingPlaylists]);

  useEffect(() => {
    const fetchSubscribeCounts = async () => {
      if (followingPlaylists.length > 0) {
        const counts: { [key: string]: number } = {};
        for (const playlist of followingPlaylists) {
          const { data: subscribes, error } = await supabase
            .from('SUBSCRIBES') // Supabase 테이블 이름
            .select('*')
            .eq('playlist_id', playlist.playlist_id);

          if (error) {
            console.error(
              `Failed to fetch subscribes for playlist ${playlist.playlist_id}`,
              error,
            );
          } else {
            counts[playlist.playlist_id] = subscribes.length;
          }
        }
        setSubscribeCounts(counts);
      }
    };

    fetchSubscribeCounts();
  }, [followingPlaylists]);

  useEffect(() => {
    const fetchFollowingPlaylists = async () => {
      if (!user) return;

      setIsLoading(true);
      setError(null);

      try {
        // 현재 사용자가 팔로우 중인 사용자 ID 가져오기
        const { data: followingData, error: followingError } = await supabase
          .from('FOLLOWS')
          .select('following_user_id')
          .eq('follower_user_id', user.userId);

        if (followingError) throw followingError;

        const followingUserIds = followingData.map(
          (follow) => follow.following_user_id,
        );

        if (followingUserIds.length === 0) {
          setFollowingPlaylists([]);
          return;
        }

        // 팔로우 중인 유저들의 플레이리스트와 사용자 정보 가져오기
        const { data: playlistsData, error: playlistsError } = await supabase
          .from('PLAYLISTS')
          .select(
            `
            *,
            user:USERS (
              nickname,
              profile_image
            )
          `,
          )
          .in('user_id', followingUserIds);

        if (playlistsError) throw playlistsError;

        setFollowingPlaylists(playlistsData);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message || '데이터를 가져오는 중 에러가 발생했습니다.');
        } else {
          setError('알 수 없는 에러가 발생했습니다.');
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchFollowingPlaylists();
  }, [user]);

  useEffect(() => {
    const fetchFollowingUsers = async () => {
      if (!user) return; // 사용자 정보가 없으면 실행하지 않음

      setIsLoading(true);
      setError(null);

      try {
        // 1. FOLLOWS 테이블에서 following_user_id 가져오기
        const { data: followsData, error: followsError } = await supabase
          .from('FOLLOWS')
          .select('following_user_id')
          .eq('follower_user_id', user.userId); // 현재 사용자의 follower_user_id 기준으로 조회

        if (followsError) throw followsError;

        const followingUserIds = followsData.map(
          (follow) => follow.following_user_id,
        );

        if (followingUserIds.length === 0) {
          setFollowingUsers([]); // 팔로우 중인 유저가 없으면 빈 배열 설정
          return;
        }

        // 2. USERS 테이블에서 팔로우 중인 유저들의 정보 가져오기
        const { data: usersData, error: usersError } = await supabase
          .from('USERS')
          .select('user_id, profile_image, nickname') // 필요한 정보만 선택
          .in('user_id', followingUserIds); // following_user_id 기준으로 조회

        if (usersError) throw usersError;

        setFollowingUsers(usersData as SupabaseUserData[]);
      } catch (err) {
        if (err instanceof Error) {
          console.error('Supabase Error:', err);
          setError(err.message || '데이터를 가져오는 중 에러가 발생했습니다.');
        } else {
          console.error('Unknown Error:', err);
          setError('알 수 없는 에러가 발생했습니다.');
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchFollowingUsers();
    console.log(followingUsers);
  }, [user]);

  return (
    <>
      <Backward />
      <S.MyFollowingContainer>
        <S.MyFollowingHeader>
          <S.MyFollowingHeaderName>팔로잉</S.MyFollowingHeaderName>
          <S.MyFollowingViewAll
            to={`${`${ROUTES.USER_FOLLOW}?tab=followings`}`}
          >
            전체 보기
          </S.MyFollowingViewAll>
        </S.MyFollowingHeader>
        <S.MyFollowingHeaderFollows>
          {isLoading ? (
            <p>로딩 중...</p>
          ) : error ? (
            <p>에러가 발생했습니다: {error}</p>
          ) : followingUsers.length === 0 ? (
            <p>팔로잉 중인 사용자가 없습니다.</p>
          ) : (
            followingUsers.map((follow) => (
              <S.MyFollowingHeaderFollowsImgWrap key={follow.user_id}>
                <S.MyFollowingHeaderFollowsImg
                  src={follow?.profile_image || profilePic} // 프로필 이미지 가져오기
                  alt={follow?.nickname || '익명 사용자'}
                />
              </S.MyFollowingHeaderFollowsImgWrap>
            ))
          )}
        </S.MyFollowingHeaderFollows>
        <S.MyFollowingContents>
          {isLoading ? (
            <p>로딩 중...</p>
          ) : error ? (
            <p>에러가 발생했습니다: {error}</p>
          ) : followingPlaylists.length === 0 ? (
            <p>팔로우 중인 유저의 플레이리스트가 없습니다.</p>
          ) : (
            followingPlaylists.map((playlist) => (
              <S.EachPlaylistWrapper key={playlist.playlist_id}>
                <EachPlaylist
                  thumbnailUrl={playlist.thumbnail_image}
                  videoCnt={playlist.video_count || 0}
                  avatarUrl={playlist.user?.profile_image || profilePic}
                  userName={playlist.user?.nickname || '익명 사용자'}
                  updateDate={new Date(
                    playlist.updated_at,
                  ).toLocaleDateString()}
                  likeCnt={likeCounts[playlist.playlist_id] || 0}
                  subscribeCnt={subscribeCounts[playlist.playlist_id] || 0}
                  isLiked={false}
                  isSubscribed={false}
                  playListTitle={playlist.title}
                  onLikeClick={() => console.log('좋아요 클릭')}
                  onSubscribeClick={() => console.log('구독 클릭')}
                />
              </S.EachPlaylistWrapper>
            ))
          )}
        </S.MyFollowingContents>
      </S.MyFollowingContainer>
    </>
  );
};

export default MyFollowingPage;
