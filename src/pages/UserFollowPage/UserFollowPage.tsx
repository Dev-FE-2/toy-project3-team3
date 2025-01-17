import { Backward, Tabs } from '@/components';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import profileImage from '@/assets/img/profile/default_profile.webp';
import styled from 'styled-components';
import { useAuth } from '@/hooks';
import { supabase } from '@/apis';
import {
  useCreateFollow,
  useDeleteFollowByFollowerUserIdAndFollowingUserId,
} from '@/hooks/useFollow';
import Alert from '@/components/common/modal/alert/Alert';

const FollowLists = styled.ul``;
const FollowItem = styled.li`
  display: flex;
  align-items: center;
`;
const FollowUserProfile = styled.div`
  overflow: hidden;
  margin-right: ${({ theme }) => theme.space.sm};
  border-radius: ${({ theme }) => theme.borderRadius.xlg};
`;
const FollowUserProfileImg = styled.img`
  width: 50px;
`;
const FollowUserNameDiv = styled.div`
  flex-grow: 1;
`;
const FollowUserName = styled.h3``;
const FollowUserBtn = styled.button``;

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
  const [alertText, setAlertText] = useState<string | null>(null);
  const [alertStatus, setAlertStatus] = useState<'success' | 'error' | null>(
    null,
  );

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
      setAlertText('팔로우 완료!');
      setAlertStatus('success');

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
      setAlertText('팔로우에 실패했습니다.');
      setAlertStatus('error');
    }
  };

  // 언팔로우 처리
  const handleUnfollow = async (followingUserId: string) => {
    try {
      await deleteFollow.mutateAsync({
        firstId: user?.userId || '',
        secondId: followingUserId,
      });
      setAlertText('언팔로우 완료!');
      setAlertStatus('success');

      // 새로고침
      fetchFollowers();
      fetchFollowings();
    } catch (error) {
      console.error('언팔로우 실패:', error);
      setAlertText('언팔로우에 실패했습니다.');
      setAlertStatus('error');
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
      {alertText && alertStatus && (
        <Alert text={alertText} status={alertStatus} />
      )}
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
          <FollowLists>
            {loadingFollowers ? (
              <p>로딩 중...</p>
            ) : (
              followers.map((follower) => (
                <FollowItem key={follower.follow_id}>
                  <FollowUserProfile>
                    <FollowUserProfileImg
                      src={follower.profile_image || profileImage}
                      alt="profile"
                    />
                  </FollowUserProfile>
                  <FollowUserNameDiv>
                    <FollowUserName>{follower.nickname}</FollowUserName>
                  </FollowUserNameDiv>
                  {!followings.some(
                    (following) => following.user_id === follower.user_id,
                  ) && (
                    <FollowUserBtn
                      onClick={() => handleFollow(follower.user_id)}
                    >
                      팔로우
                    </FollowUserBtn>
                  )}
                </FollowItem>
              ))
            )}
          </FollowLists>
        </Tabs.Panel>
        <Tabs.Panel value={2}>
          <FollowLists>
            {loadingFollowings ? (
              <p>로딩 중...</p>
            ) : (
              followings.map((following) => (
                <FollowItem key={following.follow_id}>
                  <FollowUserProfile>
                    <FollowUserProfileImg
                      src={following.profile_image || profileImage}
                      alt="profile"
                    />
                  </FollowUserProfile>
                  <FollowUserNameDiv>
                    <FollowUserName>{following.nickname}</FollowUserName>
                  </FollowUserNameDiv>
                  <FollowUserBtn
                    onClick={() => handleUnfollow(following.user_id)}
                  >
                    언팔로우
                  </FollowUserBtn>
                </FollowItem>
              ))
            )}
          </FollowLists>
        </Tabs.Panel>
      </Tabs>
    </>
  );
};

export default UserFollowPage;
