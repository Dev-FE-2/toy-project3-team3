import { useEffect, useState } from 'react';
import * as S from './HomePage.styles';
import { useFetchPlaylistByCategoryId } from '@/hooks/usePlaylist';
import { useCategoryContext } from '@/components/common/Category/CategoryContext';
import { useFetchCategoryByCategoryNameEn } from '@/hooks/useCategory';
import { Database } from '@/types';
import {
  getIsLiked,
  getLikeCnt,
  getSubscribeCnt,
  getUserInfo,
  getVideoCnt,
  getIsSubscribed,
} from '@/services/getEachPlayListInfo';
import { EachPlaylist } from '@/components';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/constants';
import { useAuth } from '@/hooks';

const HomePage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { PLAY_LIST } = ROUTES;
  const { currCategory } = useCategoryContext();
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(
    null,
  );
  const [playLists, setPlayLists] = useState<
    Database['public']['Tables']['PLAYLISTS']['Row'][]
  >([]);

  const { data: categoryData } = useFetchCategoryByCategoryNameEn(
    currCategory !== 'all' ? currCategory : null,
  );
  const { data: playListsData } =
    useFetchPlaylistByCategoryId(selectedCategoryId);

  useEffect(() => {
    if (currCategory === 'all') {
      setSelectedCategoryId(null);
    } else if (categoryData && categoryData.length > 0) {
      setSelectedCategoryId(categoryData[0].category_id);
    }
  }, [currCategory, categoryData]);

  useEffect(() => {
    if (playListsData) {
      setPlayLists(playListsData);
    }
  }, [playListsData]);

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

  const handleLikeClick = () => {
    console.log('CLICK LIKE');
  };

  const handleSubscribeClick = () => {
    console.log('CLICK SUBSCRIBE');
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ko-KR'); // 한국 형식으로 날짜를 표시
  };

  return (
    <S.HomePageContainer>
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
            onClick={() =>
              navigate(PLAY_LIST.replace(':playListId', data.playlist_id))
            }
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
              onLikeClick={handleLikeClick}
              onSubscribeClick={handleSubscribeClick}
            />
          </S.OnePlayList>
        );
      })}
    </S.HomePageContainer>
  );
};

export default HomePage;
