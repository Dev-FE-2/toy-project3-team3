import { API_ENDPOINTS, QUERY_KEYS } from '@/constants';
import {
  useCreateData,
  useDeleteDataByTwoId,
  useFetchDataAll,
  useFetchDataByOneId,
  useUpdateDataByTwoId,
} from '@/hooks/useSupabaseCrud';
import type { Database } from '@/types';

const { PLAYLISTS } = API_ENDPOINTS;
const queryKey = [QUERY_KEYS.PLAYLISTS];

export const useFetchPlaylists = () =>
  useFetchDataAll<Database['public']['Tables']['PLAYLISTS']['Row']>(
    queryKey,
    PLAYLISTS.BASE,
  );

export const useFetchPlaylistByPlaylistId = (playlistId: string) =>
  useFetchDataByOneId<Database['public']['Tables']['PLAYLISTS']['Row']>(
    [QUERY_KEYS.PLAYLIST, playlistId],
    PLAYLISTS.BY_PLAYLIST_ID,
    playlistId,
  );

export const useFetchPlaylistByUserId = (userId: string) =>
  useFetchDataByOneId<Database['public']['Tables']['PLAYLISTS']['Row']>(
    [QUERY_KEYS.PLAYLISTS, userId],
    PLAYLISTS.BY_USER_ID,
    userId,
  );

export const useCreatePlaylist = () =>
  useCreateData<'PLAYLISTS'>(queryKey, PLAYLISTS.BASE);

export const useUpdatePlaylistByPlaylistIdAndUserId = () =>
  useUpdateDataByTwoId<'PLAYLISTS'>(
    queryKey,
    PLAYLISTS.BY_PLAYLIST_ID_AND_USER_ID,
  );

export const useDeletePlaylistByPlaylistIdAndUserId = () =>
  useDeleteDataByTwoId(queryKey, PLAYLISTS.BY_PLAYLIST_ID_AND_USER_ID);
