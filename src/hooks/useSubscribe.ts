import { API_ENDPOINTS, QUERY_KEYS } from '@/constants';
import {
  useCreateData,
  useDeleteDataByTwoId,
  useFetchDataAll,
  useFetchDataByOneId,
  useUpdateDataByTwoId,
} from '@/hooks/useSupabaseCrud';
import type { Database } from '@/types';

const { SUBSCRIBES } = API_ENDPOINTS;
const queryKey = [QUERY_KEYS.SUBSCRIBES];

export const useFetchSubscribes = () =>
  useFetchDataAll<Database['public']['Tables']['SUBSCRIBES']['Row']>(
    queryKey,
    SUBSCRIBES.BASE,
  );

export const useFetchSubscribeByUserId = (userId: string) =>
  useFetchDataByOneId<Database['public']['Tables']['SUBSCRIBES']['Row']>(
    [QUERY_KEYS.SUBSCRIBES, userId],
    SUBSCRIBES.BY_USER_ID,
    userId,
  );

export const useFetchSubscribeByPlaylistId = (playlistId: string) =>
  useFetchDataByOneId<Database['public']['Tables']['SUBSCRIBES']['Row']>(
    [QUERY_KEYS.SUBSCRIBES, playlistId],
    SUBSCRIBES.BY_PLAYLIST_ID,
    playlistId,
  );

export const useCreateSubscribe = () =>
  useCreateData<'SUBSCRIBES'>(queryKey, SUBSCRIBES.BASE);

export const useUpdateSubscribeByPlaylistIdAndUserId = () =>
  useUpdateDataByTwoId<'SUBSCRIBES'>(
    queryKey,
    SUBSCRIBES.BY_PLAYLIST_ID_AND_USER_ID,
  );

export const useDeleteSubscribeByUserIdAndPlaylistId = () =>
  useDeleteDataByTwoId(queryKey, SUBSCRIBES.BY_PLAYLIST_ID_AND_USER_ID);
