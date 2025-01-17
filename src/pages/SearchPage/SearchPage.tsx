import { Avatar, Button, EachPlaylist, Search } from '@/components';
import * as S from './SearchPage.styles';
import { useEffect, useState } from 'react';
import { supabase } from '@/apis';
import { Database } from '@/types';
import { useLocation, useNavigate } from 'react-router-dom';
import { ROUTES } from '@/constants';
import {
  getIsLiked,
  getIsSubscribed,
  getLikeCnt,
  getSubscribeCnt,
  getUserInfo,
  getVideoCnt,
} from '../HomePage/getEachPlayListInfo';
import { FromHashtagData, FromPlayListData } from '@/types/common';

const SearchPage = () => {
  const navigate = useNavigate();
  const { PLAY_LIST } = ROUTES;
  const { search } = useLocation(); // URL의 쿼리 파라미터 가져오기
  const params = new URLSearchParams(search); // 쿼리 파라미터를 다루기 위한 객체 생성
  const tabFromUrl = params.get('tab') || 'user';
  const qFromUrl = params.get('q') || '';
  const [q, setQ] = useState(qFromUrl);
  const [selectedTab, setSelectedTab] = useState(tabFromUrl);
  const [isTabChanged, setIsTabChanged] = useState(false);
  const [searchedUserList, setSearchedUserList] = useState<
    Database['public']['Tables']['USERS']['Row'][]
  >([]);
  const [searchedPlayListsList, setsearchedPlayListsList] = useState<
    Database['public']['Tables']['PLAYLISTS']['Row'][]
  >([]);

  const getSearchedUserList = async () => {
    const { data, error } = await supabase
      .from('USERS')
      .select('*')
      .like('nickname', `%${q}%`);

    if (error) {
      console.error(`Failed to fetch USERS for ${q}`, error);
    } else {
      setSearchedUserList(data);
    }
  };

  const getsearchedPlayListsList = async () => {
    const resultData: Database['public']['Tables']['PLAYLISTS']['Row'][] = [];

    const { data: playlistData, error: playlistError } = await supabase
      .from('PLAYLISTS')
      .select('*')
      .or(`title.ilike.%${q}%,short_intro.ilike.%${q}%`);

    if (playlistError) {
      console.error(`Failed to fetch PlayList for ${q}`, playlistError);
    } else {
      const fromPlaylistData: Database['public']['Tables']['PLAYLISTS']['Row'][] =
        playlistData.map((playlist: FromPlayListData) => {
          return {
            playlist_id: playlist.playlist_id,
            created_at: playlist.created_at,
            updated_at: playlist.updated_at,
            short_intro: playlist.short_intro,
            title: playlist.title,
            user_id: playlist.user_id,
            thumbnail_image: playlist.thumbnail_image,
            category_id: playlist.category_id,
          };
        });
      resultData.push(...fromPlaylistData);
    }

    const { data: hashtagData, error: hashtagError } = await supabase
      .from('HASHTAGS')
      .select(
        `
          hashtag_id,
          hashtag_name,
          playlist_id!inner (
            playlist_id,
            created_at,
            updated_at,
            short_intro,
            title,
            user_id,
            thumbnail_image,
            category_id
          )
        `,
      )
      .like(`hashtag_name`, `%${q}%`);

    if (hashtagError) {
      console.error(`Failed to fetch hashtag for ${q}`, hashtagError);
    } else {
      const fromHashtagData: Database['public']['Tables']['PLAYLISTS']['Row'][] =
        hashtagData.map((hashtag: FromHashtagData) => {
          const playlist = Array.isArray(hashtag.playlist_id)
            ? hashtag.playlist_id[0]
            : hashtag.playlist_id;
          console.log(playlist);

          return {
            playlist_id: playlist?.playlist_id,
            created_at: playlist?.created_at,
            updated_at: playlist?.updated_at,
            short_intro: playlist?.short_intro,
            title: playlist?.title,
            user_id: playlist?.user_id,
            thumbnail_image: playlist?.thumbnail_image,
            category_id: playlist?.category_id,
          };
        });

      const uniquePlaylistData = fromHashtagData.filter((playlist) => {
        return !resultData.some(
          (existingPlaylist) =>
            existingPlaylist.playlist_id === playlist.playlist_id,
        );
      });
      resultData.push(...uniquePlaylistData);
    }

    setsearchedPlayListsList(resultData);
  };

  useEffect(() => {
    if (selectedTab === 'user') {
      if (q) {
        getSearchedUserList();
      } else {
        setSearchedUserList([]);
      }
    } else {
      if (q) {
        getsearchedPlayListsList();
      } else {
        setsearchedPlayListsList([]);
      }
    }
  }, [q, selectedTab]);

  useEffect(() => {
    setIsTabChanged(false);
  }, [isTabChanged]);

  const handleAvatarClick = (nickname: string) => {
    navigate(`/${nickname}`);
  };

  const handleQueryChange = (query: string, tab: string) => {
    setQ(query);
    if (tab !== selectedTab) setIsTabChanged(true);
    setSelectedTab(tab);
  };

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

      for (const data of searchedPlayListsList) {
        try {
          const videoCnt = await getVideoCnt(data.playlist_id);
          const likeCnt = await getLikeCnt(data.playlist_id);
          const subscribeCnt = await getSubscribeCnt(data.playlist_id);
          const userInfo = await getUserInfo(data.user_id);
          const isLiked = await getIsLiked(data.playlist_id, data.user_id);
          const isSubscribed = await getIsSubscribed(
            data.playlist_id,
            data.user_id,
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

    if (searchedPlayListsList?.length) {
      fetchPlayListInfos();
    }
  }, [searchedPlayListsList]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ko-KR'); // 한국 형식으로 날짜를 표시
  };

  const onClickFollowBtn = () => {
    console.log('CLICK FOLLOW');
  };

  return (
    <S.SearchPageContainer>
      <Search queryKey="q" onQueryChange={handleQueryChange} />
      <S.ResultListZone>
        {selectedTab === 'user' && (
          <S.UserList>
            {searchedUserList?.map((user) => (
              <S.User key={user.user_id}>
                <S.UserInfo>
                  <Avatar
                    size="small"
                    imageUrl={
                      user.profile_image !== null
                        ? user.profile_image
                        : undefined
                    }
                    altText="User Profile"
                    onClick={() => handleAvatarClick(user.nickname)}
                  />
                  {user.nickname}
                </S.UserInfo>
                <Button
                  color="primary"
                  borderType="round"
                  size="small"
                  disabled={false}
                  onClick={onClickFollowBtn}
                >
                  팔로우
                </Button>
              </S.User>
            ))}
          </S.UserList>
        )}
        {selectedTab === 'playlists' && (
          <S.PlayListsList>
            {searchedPlayListsList?.map((playList) => {
              const {
                videoCnt,
                likeCnt,
                subscribeCnt,
                userInfo,
                isLiked,
                isSubscribed,
              } = playListInfos[playList.playlist_id] || {
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
                <S.PlayList
                  key={playList.playlist_id}
                  onClick={() =>
                    navigate(
                      PLAY_LIST.replace(':playListId', playList.playlist_id),
                    )
                  }
                >
                  <EachPlaylist
                    thumbnailUrl={playList.thumbnail_image}
                    videoCnt={videoCnt}
                    avatarUrl={userInfo.profile_image}
                    userName={userInfo.nickname}
                    updateDate={formatDate(playList.updated_at)}
                    likeCnt={likeCnt}
                    subscribeCnt={subscribeCnt}
                    isLiked={isLiked}
                    isSubscribed={isSubscribed}
                    playListTitle={playList.title}
                    onLikeClick={() => {}}
                    onSubscribeClick={() => {}}
                  />
                </S.PlayList>
              );
            })}
          </S.PlayListsList>
        )}
      </S.ResultListZone>
    </S.SearchPageContainer>
  );
};

export default SearchPage;
