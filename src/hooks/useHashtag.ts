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
const hashtagsQueryKey = QUERY_KEYS.HASHTAGS;

export const useFetchHashtags = () =>
  useFetchDataAll<Database['public']['Tables']['HASHTAGS']['Row']>(
    [hashtagsQueryKey],
    HASHTAGS.BASE,
  );

export const useFetchHashtagByPlaylistId = (playlistId: string) =>
  useFetchDataByOneId<Database['public']['Tables']['HASHTAGS']['Row']>(
    [hashtagsQueryKey, playlistId],
    HASHTAGS.BY_PLAYLIST_ID,
    playlistId,
  );

export const useCreateHashtag = () =>
  useCreateData<'HASHTAGS'>([hashtagsQueryKey], HASHTAGS.BASE);

export const useUpdateHashtagById = () =>
  useUpdateDataByOneId<'HASHTAGS'>([hashtagsQueryKey], HASHTAGS.BY_ID);

export const useDeleteHashtagById = () =>
  useDeleteDataByOneId([hashtagsQueryKey], HASHTAGS.BY_ID);
