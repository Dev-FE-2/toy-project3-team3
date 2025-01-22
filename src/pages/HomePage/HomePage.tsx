import { useEffect, useRef, useState } from 'react';
import * as S from './HomePage.styles';
import { useGetPlayListByCategory } from '@/hooks/usePlaylist';
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
import { useAuth } from '@/hooks';

const HomePage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { currCategory } = useCategoryContext();
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(
    null,
  );
  const [page, setPage] = useState(1);
  const {
    data: playLists,
    isLoading,
    error,
    hasMore,
  } = useGetPlayListByCategory(selectedCategoryId, page, 5);
  const observer = useRef<IntersectionObserver | null>(null);
  const lastElementRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (isLoading) return;
    if (observer.current) observer.current.disconnect();

    observer.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prevPage) => prevPage + 1);
        }
      },
      { threshold: 1.0 }, // 요소가 100% 보일 때 트리거
    );

    if (lastElementRef.current) {
      observer.current.observe(lastElementRef.current);
    }
  }, [isLoading, hasMore]);

  const { data: categoryData } = useFetchCategoryByCategoryNameEn(
    currCategory !== 'all' ? currCategory : null,
  );

  useEffect(() => {
    if (currCategory === 'all') {
      setSelectedCategoryId(null);
    } else if (categoryData && categoryData.length > 0) {
      setSelectedCategoryId(categoryData[0].category_id);
    }
  }, [currCategory, categoryData]);

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
    <S.HomePageContainer>
      {playLists?.map((data, idx) => {
        const isLast = idx === playLists.length - 1;
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
            ref={isLast ? lastElementRef : null}
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
      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
    </S.HomePageContainer>
  );
};

export default HomePage;
