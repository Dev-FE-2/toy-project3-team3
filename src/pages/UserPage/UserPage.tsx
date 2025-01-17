import { useSearchParams } from 'react-router-dom';
import { PostTab } from './PostTab';
import { SubscribeTab } from './SubscripbeTab';
import { Tabs } from '@/components';
import { useAuth } from '@/hooks';
import { useFetchPlaylistByUserId } from '@/hooks/usePlaylist';
import {
  useFetchFollowersByUserId,
  useFetchFollowingsByUserId,
} from '@/hooks/useFollow';
import { ROUTES } from '@/constants';
import { User } from '@/types';
import * as S from './UserPage.styles';

const UserPage = () => {
  const [, setSearchParams] = useSearchParams();
  const { user } = useAuth();

  const { data: playlists = [] } = useFetchPlaylistByUserId(user?.userId ?? '');
  const { data: followers } = useFetchFollowersByUserId(user?.userId ?? '');
  const { data: followings } = useFetchFollowingsByUserId(user?.userId ?? '');

  const handleChangeTab = (tab: string) => {
    setSearchParams({ tab });
  };

  return (
    <>
      <S.MyPageContainer>
        <S.MyPageProfile>
          <S.MyPageProfileUpper>
            <S.MyPageProfileImgDiv>
              <S.MyPageProfileImg src={user?.profileImage} alt="profile" />
            </S.MyPageProfileImgDiv>
            <S.MyPageProfilePosts>
              <span>{playlists.length}</span>
              <span>포스트</span>
            </S.MyPageProfilePosts>
            <S.MyPageProfileFollower to={`${ROUTES.USER_FOLLOW}?tab=followers`}>
              <span>{followers?.length}</span>
              <span>팔로워</span>
            </S.MyPageProfileFollower>
            <S.MyPageProfileFollowing
              to={`${ROUTES.USER_FOLLOW}?tab=followings`}
            >
              <span>{followings?.length}</span>
              <span>팔로잉</span>
            </S.MyPageProfileFollowing>
          </S.MyPageProfileUpper>
          <S.MyPageProfileLower>
            <S.MyPageUserName>{user?.nickname}</S.MyPageUserName>
            <S.MyPageUserDesc>
              {user?.shortIntro || '설명이 없습니다.'}
            </S.MyPageUserDesc>
          </S.MyPageProfileLower>
        </S.MyPageProfile>
        <S.MyPageContents>
          <nav>
            <Tabs label="유저" defaultValue={1}>
              <Tabs.List>
                <Tabs.Trigger
                  value={1}
                  text="포스트"
                  onClick={() => handleChangeTab('posts')}
                />
                <Tabs.Trigger
                  value={2}
                  text="구독"
                  onClick={() => handleChangeTab('subscribes')}
                />
              </Tabs.List>
              <Tabs.Panel value={1}>
                <PostTab user={user as User} />
              </Tabs.Panel>
              <Tabs.Panel value={2}>
                <SubscribeTab user={user as User} />
              </Tabs.Panel>
            </Tabs>
          </nav>
        </S.MyPageContents>
      </S.MyPageContainer>
    </>
  );
};

export default UserPage;
