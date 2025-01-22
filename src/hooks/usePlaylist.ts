import { supabase } from '@/apis';
import { API_ENDPOINTS, QUERY_KEYS } from '@/constants';
import {
  useCreateData,
  useDeleteDataByTwoId,
  useFetchDataAll,
  useFetchDataByOneId,
  useFetchDataByOneIds,
  useUpdateDataByTwoId,
} from '@/hooks/useSupabaseCrud';
import type { Database } from '@/types';
import { useEffect, useState } from 'react';

const { PLAYLISTS } = API_ENDPOINTS;
const playlistsQueryKey = QUERY_KEYS.PLAYLISTS;
const playlistQueryKey = QUERY_KEYS.PLAYLIST;

export const useFetchPlaylists = () =>
  useFetchDataAll<Database['public']['Tables']['PLAYLISTS']['Row']>(
    [playlistsQueryKey],
    PLAYLISTS.BASE,
  );

export const useFetchPlaylistById = (playlistId: string) =>
  useFetchDataByOneId<Database['public']['Tables']['PLAYLISTS']['Row']>(
    [playlistQueryKey, playlistId],
    PLAYLISTS.BY_ID,
    playlistId,
  );

export const useFetchPlaylistByIds = (playlistIds: string[]) =>
  useFetchDataByOneIds<Database['public']['Tables']['PLAYLISTS']['Row']>(
    [QUERY_KEYS.PLAYLISTS, playlistIds.join(',')],
    PLAYLISTS.BY_IDS,
    playlistIds,
  );

export const useFetchPlaylistByUserId = (userId: string) =>
  useFetchDataByOneId<Database['public']['Tables']['PLAYLISTS']['Row']>(
    [playlistsQueryKey, userId],
    PLAYLISTS.BY_USER_ID,
    userId,
  );

export const useFetchPlaylistByCategoryId = (categoryId: string | null) =>
  useFetchDataByOneId<Database['public']['Tables']['PLAYLISTS']['Row']>(
    [playlistsQueryKey, categoryId || ''],
    PLAYLISTS.BY_CATEGORY_ID_LATEST_ORDER,
    categoryId || '',
  );

export const useCreatePlaylist = () =>
  useCreateData<'PLAYLISTS'>([playlistsQueryKey], PLAYLISTS.BASE);

export const useUpdatePlaylistByIdAndUserId = () =>
  useUpdateDataByTwoId<'PLAYLISTS'>(
    [playlistsQueryKey],
    PLAYLISTS.BY_ID_AND_USER_ID,
  );

export const useDeletePlaylistByIdAndUserId = () =>
  useDeleteDataByTwoId([playlistsQueryKey], PLAYLISTS.BY_ID_AND_USER_ID);

export const useGetPlayListByCategory = (
  categoryId: string | null,
  page: number = 1,
  itemCount: number = 5,
) => {
  const [data, setData] = useState<
    Database['public']['Tables']['PLAYLISTS']['Row'][]
  >([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    const fetchPlayList = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const fromIndex = (page - 1) * itemCount;
        const toIndex = fromIndex + itemCount - 1;

        const query = supabase
          .from('PLAYLISTS')
          .select('*')
          .order('created_at', { ascending: false })
          .range(fromIndex, toIndex);

        if (categoryId) {
          query.eq('category_id', categoryId);
        }

        const { data: fetchedData, error } = await query;
        if (error) throw error;

        setData((prevData) => {
          const combined = [...prevData, ...(fetchedData || [])];
          const unique = Array.from(
            new Map(combined.map((item) => [item.playlist_id, item])).values(),
          );
          return unique;
        });
        setHasMore(fetchedData.length === itemCount);
      } catch (err) {
        setError(
          err instanceof Error
            ? err
            : new Error('알 수 없는 오류가 발생했습니다.'),
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchPlayList();
  }, [categoryId, page, itemCount]);

  useEffect(() => {
    // 새로운 카테고리를 선택했거나 첫 페이지일 경우 데이터 초기화
    if (page === 1) {
      setData([]);
    }
  }, [categoryId, page]);

  return { data, isLoading, error, hasMore };
};

export const getLikedPlaylistById = async (
  userId?: string,
  maxCount: number = 5,
): Promise<Database['public']['Tables']['PLAYLISTS']['Row'][]> => {
  if (!userId) return [];

  try {
    const { data, error } = await supabase
      .from('LIKES')
      .select(
        `
            likes_id,
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
      .eq('user_id', userId)
      .not('playlist_id', 'is', null)
      .order('created_at', { ascending: false })
      .limit(maxCount);

    if (error) throw error;

    if (!data) return [];

    const playlists: Database['public']['Tables']['PLAYLISTS']['Row'][] =
      data.map((item) => {
        const playlist = Array.isArray(item.playlist_id)
          ? item.playlist_id[0]
          : item.playlist_id;

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

    return playlists;
  } catch (error) {
    console.error(error);
    return [];
  }
};
