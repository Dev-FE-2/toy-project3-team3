import { API_ENDPOINTS, QUERY_KEYS } from '@/constants';
import {
  useCreateData,
  useDeleteDataByOneId,
  useFetchDataAll,
  useFetchDataByOneId,
  useUpdateDataByOneId,
} from '@/hooks/useSupabaseCrud';
import type { Database } from '@/types';

const { PLAYLIST_VIDEOS } = API_ENDPOINTS;
const queryKey = [QUERY_KEYS.PLAYLIST_VIDEOS];

export const useFetchPlaylistVideos = () =>
  useFetchDataAll<Database['public']['Tables']['PLAYLIST_VIDEOS']['Row']>(
    queryKey,
    PLAYLIST_VIDEOS.BASE,
  );

export const useFetchPlaylistVideoByPlaylistId = (playlistId: string) =>
  useFetchDataByOneId<Database['public']['Tables']['PLAYLIST_VIDEOS']['Row']>(
    [QUERY_KEYS.PLAYLIST_VIDEOS, playlistId],
    PLAYLIST_VIDEOS.BY_PLAYLIST_ID,
    playlistId,
  );

export const useCreatePlaylistVideo = () =>
  useCreateData<'PLAYLIST_VIDEOS'>(queryKey, PLAYLIST_VIDEOS.BASE);

export const useUpdatePlaylistVideoByPlaylistId = () =>
  useUpdateDataByOneId<'PLAYLIST_VIDEOS'>(
    queryKey,
    PLAYLIST_VIDEOS.BY_PLAYLIST_ID,
  );

export const useDeletePlaylistVideoByPlaylistId = () =>
  useDeleteDataByOneId(queryKey, PLAYLIST_VIDEOS.BY_PLAYLIST_ID);
