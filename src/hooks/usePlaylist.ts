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
