import { Backward, Tabs } from '@/components';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import profileImage from '@/assets/img/profile/default_profile.webp';
import { useAuth } from '@/hooks';
import { supabase } from '@/apis';
import {
  useCreateFollow,
  useDeleteFollowByFollowerUserIdAndFollowingUserId,
} from '@/hooks/useFollow';
import * as S from './UserFollowPage.styles';

type FollowDetail = {
  follow_id: string;
  follower_user_id?: string; // 선택적 속성
  following_user_id?: string; // 선택적 속성
  user_id: string;
  nickname: string;
  profile_image: string | null;
  short_intro: string | null;
};

const UserFollowPage = () => {
  const { user } = useAuth();

  const [followers, setFollowers] = useState<FollowDetail[]>([]);
  const [followings, setFollowings] = useState<FollowDetail[]>([]);
  const [loadingFollowers, setLoadingFollowers] = useState(true);
  const [loadingFollowings, setLoadingFollowings] = useState(true);

  const createFollow = useCreateFollow();
  const deleteFollow = useDeleteFollowByFollowerUserIdAndFollowingUserId();

  const [searchParams, setSearchParams] = useSearchParams();
  const currentTab = searchParams.get('tab') || 'followers';

  const fetchFollowers = async () => {
    setLoadingFollowers(true);
    const { data: follows, error } = await supabase
      .from('FOLLOWS')
      .select('follow_id, follower_user_id')
      .eq('following_user_id', user?.userId || '');

    if (error) {
      console.error('Failed to fetch followers:', error);
      setFollowers([]);
    } else {
      const followerIds = follows.map((f) => f.follower_user_id);
      const { data: users, error: userError } = await supabase
        .from('USERS')
        .select('user_id, nickname, profile_image, short_intro')
        .in('user_id', followerIds);

      if (userError) {
        console.error('Failed to fetch follower details:', userError);
        setFollowers([]);
      } else {
        const details = follows.map((follow) => ({
          follow_id: follow.follow_id,
          ...(users.find((user) => user.user_id === follow.follower_user_id) ||
            {}),
        }));
        setFollowers(details as FollowDetail[]);
      }
    }
    setLoadingFollowers(false);
  };

  // Followings 목록 새로고침
  const fetchFollowings = async () => {
    setLoadingFollowings(true);
    const { data: follows, error } = await supabase
      .from('FOLLOWS')
      .select('follow_id, following_user_id')
      .eq('follower_user_id', user?.userId || '');

    if (error) {
      console.error('Failed to fetch followings:', error);
      setFollowings([]);
    } else {
      const followingIds = follows.map((f) => f.following_user_id);
      const { data: users, error: userError } = await supabase
        .from('USERS')
        .select('user_id, nickname, profile_image, short_intro')
        .in('user_id', followingIds);

      if (userError) {
        console.error('Failed to fetch following details:', userError);
        setFollowings([]);
      } else {
        const details = follows.map((follow) => ({
          follow_id: follow.follow_id,
          ...(users.find((user) => user.user_id === follow.following_user_id) ||
            {}),
        }));
        setFollowings(details as FollowDetail[]);
      }
    }
    setLoadingFollowings(false);
  };

  // 팔로우 처리
  const handleFollow = async (followingUserId: string) => {
    try {
      await createFollow.mutateAsync({
        follower_user_id: user?.userId || '', // 현재 사용자 ID
        following_user_id: followingUserId, // 팔로우할 사용자 ID
      });

      // 버튼 사라지게 하기 위해 상태 업데이트
      setFollowers((prevFollowers) =>
        prevFollowers.filter(
          (follower) => follower.user_id !== followingUserId,
        ),
      );

      // 새로고침
      await fetchFollowers(); // 팔로워 목록 새로고침
      await fetchFollowings(); // 팔로잉 목록 새로고침
    } catch (error) {
      console.error('팔로우 실패:', error);
    }
  };

  // 언팔로우 처리
  const handleUnfollow = async (followingUserId: string) => {
    try {
      await deleteFollow.mutateAsync({
        firstId: user?.userId || '',
        secondId: followingUserId,
      });

      // 새로고침
      fetchFollowers();
      fetchFollowings();
    } catch (error) {
      console.error('언팔로우 실패:', error);
    }
  };

  // 최초 렌더링 시 데이터 로드
  useEffect(() => {
    if (user) {
      fetchFollowers();
      fetchFollowings();
    }
  }, [user]);

  useEffect(() => {
    if (!searchParams.get('tab')) {
      setSearchParams({ tab: 'followers' });
    }
  }, [searchParams, setSearchParams]);

  const handleChangeTab = (tab: string) => {
    setSearchParams({ tab });
  };

  return (
    <>
      <Backward />
      <Tabs defaultValue={currentTab === 'followers' ? 1 : 2} label="팔로우">
        <Tabs.List>
          <Tabs.Trigger
            value={1}
            text="팔로워"
            onClick={() => handleChangeTab('followers')}
          />
          <Tabs.Trigger
            value={2}
            text="팔로잉"
            onClick={() => handleChangeTab('following')}
          />
        </Tabs.List>
        <Tabs.Panel value={1}>
          <S.FollowLists>
            {loadingFollowers ? (
              <p>로딩 중...</p>
            ) : (
              followers.map((follower) => (
                <S.FollowItem key={follower.follow_id}>
                  <S.FollowUserProfile>
                    <S.FollowUserProfileImg
                      src={follower.profile_image || profileImage}
                      alt="profile"
                    />
                  </S.FollowUserProfile>
                  <S.FollowUserNameDiv>
                    <S.FollowUserName>{follower.nickname}</S.FollowUserName>
                  </S.FollowUserNameDiv>
                  {!followings.some(
                    (following) => following.user_id === follower.user_id,
                  ) && (
                    <S.FollowUserBtn
                      onClick={() => handleFollow(follower.user_id)}
                    >
                      팔로우
                    </S.FollowUserBtn>
                  )}
                </S.FollowItem>
              ))
            )}
          </S.FollowLists>
        </Tabs.Panel>
        <Tabs.Panel value={2}>
          <S.FollowLists>
            {loadingFollowings ? (
              <p>로딩 중...</p>
            ) : (
              followings.map((following) => (
                <S.FollowItem key={following.follow_id}>
                  <S.FollowUserProfile>
                    <S.FollowUserProfileImg
                      src={following.profile_image || profileImage}
                      alt="profile"
                    />
                  </S.FollowUserProfile>
                  <S.FollowUserNameDiv>
                    <S.FollowUserName>{following.nickname}</S.FollowUserName>
                  </S.FollowUserNameDiv>
                  <S.FollowUserBtn
                    onClick={() => handleUnfollow(following.user_id)}
                  >
                    언팔로우
                  </S.FollowUserBtn>
                </S.FollowItem>
              ))
            )}
          </S.FollowLists>
        </Tabs.Panel>
      </Tabs>
    </>
  );
};

export default UserFollowPage;
