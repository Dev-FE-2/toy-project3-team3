import styled from 'styled-components';
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
import { Link } from 'react-router-dom';
import { User } from '@/types';

const MyPageContainer = styled.div`
  width: 100%;
  margin: 0 auto;
`;

const MyPageProfile = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: stretch;
  border-bottom: 1px solid #555;

  padding-left: ${({ theme }) => theme.space.sm};
  padding-right: ${({ theme }) => theme.space.sm};
  padding-bottom: ${({ theme }) => theme.space.sm};
  margin-bottom: ${({ theme }) => theme.space.sm};
`;

const MyPageProfileUpper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.space.sm};
`;

const MyPageProfileLower = styled.div``;
const MyPageProfileImgDiv = styled.div`
  overflow: hidden;
  border-radius: ${({ theme }) => theme.borderRadius.xlg};
`;
const MyPageProfileImg = styled.img`
  width: 48px;
  height: 48px;
`;
const MyPageProfilePosts = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  & > span:first-child {
    font-weight: ${({ theme }) => theme.fontWeight.bold};
  }

  & > span:last-child {
    font-size: ${({ theme }) => theme.fontSize.xsm};
  }
`;
const MyPageProfileFollower = styled(Link)`
  color: inherit;
  text-decoration: none;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  & > span:first-child {
    font-weight: ${({ theme }) => theme.fontWeight.bold};
  }

  & > span:last-child {
    font-size: ${({ theme }) => theme.fontSize.xsm};
  }
`;
const MyPageProfileFollowing = styled(Link)`
  color: inherit;
  text-decoration: none;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  & > span:first-child {
    font-weight: ${({ theme }) => theme.fontWeight.bold};
  }

  & > span:last-child {
    font-size: ${({ theme }) => theme.fontSize.xsm};
  }
`;
const MyPageUserName = styled.h3`
  font-weight: ${({ theme }) => theme.fontWeight.bold};
`;
const MyPageUserDesc = styled.span`
  font-size: ${({ theme }) => theme.fontSize.xsm};
`;

const MyPageContents = styled.div``;

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
      <MyPageContainer>
        <MyPageProfile>
          <MyPageProfileUpper>
            <MyPageProfileImgDiv>
              <MyPageProfileImg src={user?.profileImage} alt="profile" />
            </MyPageProfileImgDiv>
            <MyPageProfilePosts>
              <span>{playlists.length}</span>
              <span>포스트</span>
            </MyPageProfilePosts>
            <MyPageProfileFollower to={`${ROUTES.USER_FOLLOW}?tab=followers`}>
              <span>{followers?.length}</span>
              <span>팔로워</span>
            </MyPageProfileFollower>
            <MyPageProfileFollowing to={`${ROUTES.USER_FOLLOW}?tab=followings`}>
              <span>{followings?.length}</span>
              <span>팔로잉</span>
            </MyPageProfileFollowing>
          </MyPageProfileUpper>
          <MyPageProfileLower>
            <MyPageUserName>{user?.nickname}</MyPageUserName>
            <MyPageUserDesc>
              {user?.shortIntro || '설명이 없습니다.'}
            </MyPageUserDesc>
          </MyPageProfileLower>
        </MyPageProfile>
        <MyPageContents>
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
        </MyPageContents>
      </MyPageContainer>
    </>
  );
};

export default UserPage;
