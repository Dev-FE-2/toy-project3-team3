import { useNavigate } from 'react-router-dom';
import * as S from './HomePage.styles';
import { useEffect, useState } from 'react';
import { Database } from '@/types';
import { useAuth, getSubscribedPlaylistByUserId } from '@/hooks';
import {
  getIsLiked,
  getIsSubscribed,
  getLikeCnt,
  getSubscribeCnt,
  getUserInfo,
  getVideoCnt,
} from '@/services/getEachPlayListInfo';
import { EachPlaylist } from '@/components';

const SubscribedPlayList = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [playLists, setPlayLists] = useState<
    Database['public']['Tables']['PLAYLISTS']['Row'][]
  >([]);

  useEffect(() => {
    const fetchData = async () => {
      if (!user?.userId) return;
      const playlists = await getSubscribedPlaylistByUserId(user.userId);
      setPlayLists(playlists);
    };

    fetchData();
  }, [user?.userId]);

  const [playListInfos, setPlayListInfos] = useState<
    Record<
      string,
      {
        videoCnt: number;
        likeCnt: number;
        subscribeCnt: number;
        userInfo: Database['public']['Tables']['USERS']['Row'];
        isLiked: boolean;
        isSubscribed: boolean;
      }
    >
  >({});

  useEffect(() => {
    const fetchPlayListInfos = async () => {
      const infos: Record<
        string,
        {
          videoCnt: number;
          likeCnt: number;
          subscribeCnt: number;
          userInfo: Database['public']['Tables']['USERS']['Row'];
          isLiked: boolean;
          isSubscribed: boolean;
        }
      > = {};

      for (const data of playLists) {
        try {
          const videoCnt = await getVideoCnt(data.playlist_id);
          const likeCnt = await getLikeCnt(data.playlist_id);
          const subscribeCnt = await getSubscribeCnt(data.playlist_id);
          const userInfo = await getUserInfo(data.user_id);
          const isLiked = await getIsLiked(data.playlist_id, user?.userId);
          const isSubscribed = await getIsSubscribed(
            data.playlist_id,
            user?.userId,
          );

          infos[data.playlist_id] = {
            videoCnt,
            likeCnt,
            subscribeCnt,
            userInfo,
            isLiked,
            isSubscribed,
          };
        } catch (error) {
          console.error(
            'Error fetching data for playlist:',
            data.playlist_id,
            error,
          );
        }
      }
      setPlayListInfos(infos);
    };

    if (playLists?.length) {
      fetchPlayListInfos();
    }
  }, [playLists]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ko-KR'); // 한국 형식으로 날짜를 표시
  };

  return (
    <>
      <S.PlayListSetTitle onClick={() => navigate(`/subscribe`)}>
        구독한 플레이리스트
      </S.PlayListSetTitle>
      <S.PlayListSet>
        {playLists?.map((data) => {
          const {
            videoCnt,
            likeCnt,
            subscribeCnt,
            userInfo,
            isLiked,
            isSubscribed,
          } = playListInfos[data.playlist_id] || {
            videoCnt: 0,
            likeCnt: 0,
            subscribeCnt: 0,
            userInfo: {
              nickname: 'UNKOWN',
              avatarUrl: null,
            },
            isLiked: false,
            isSubscribed: false,
          };

          return (
            <S.OnePlayList
              key={data.playlist_id}
              onClick={() => navigate(`/playlist/${data.playlist_id}`)}
            >
              <EachPlaylist
                thumbnailUrl={data.thumbnail_image}
                videoCnt={videoCnt}
                avatarUrl={userInfo.profile_image}
                userName={userInfo.nickname}
                updateDate={formatDate(data.updated_at)}
                likeCnt={likeCnt}
                subscribeCnt={subscribeCnt}
                isLiked={isLiked}
                isSubscribed={isSubscribed}
                playListTitle={data.title}
                onLikeClick={() => {}}
                onSubscribeClick={() => {}}
              />
            </S.OnePlayList>
          );
        })}
        {playLists.length === 0 && (
          <S.Text>아직 좋아요를 누른 플레이리스트가 없습니다.</S.Text>
        )}
      </S.PlayListSet>
    </>
  );
};
export default SubscribedPlayList;
