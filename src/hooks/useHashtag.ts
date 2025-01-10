import { API_ENDPOINTS, QUERY_KEYS } from '@/constants';
import {
  useCreateData,
  useDeleteDataByOneId,
  useFetchDataAll,
  useFetchDataByOneId,
  useUpdateDataByOneId,
} from '@/hooks/useSupabaseCrud';
import type { Database } from '@/types';

const { HASHTAGS } = API_ENDPOINTS;
const queryKey = [QUERY_KEYS.HASHTAGS];

export const useFetchHashtags = () =>
  useFetchDataAll<Database['public']['Tables']['HASHTAGS']['Row']>(
    queryKey,
    HASHTAGS.BASE,
  );

export const useFetchHashtagByPlaylistId = (playlistId: string) =>
  useFetchDataByOneId<Database['public']['Tables']['HASHTAGS']['Row']>(
    [QUERY_KEYS.HASHTAGS, playlistId],
    HASHTAGS.BY_PLAYLIST_ID,
    playlistId,
  );

export const useCreateHashtag = () =>
  useCreateData<'HASHTAGS'>(queryKey, HASHTAGS.BASE);

export const useUpdateHashtagByPlaylistId = () =>
  useUpdateDataByOneId<'HASHTAGS'>(queryKey, HASHTAGS.BY_PLAYLIST_ID);

export const useDeleteHashtagByPlaylistId = () =>
  useDeleteDataByOneId(queryKey, HASHTAGS.BY_PLAYLIST_ID);
