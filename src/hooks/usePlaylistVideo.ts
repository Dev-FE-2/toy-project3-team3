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
const playlistVideosQueryKey = QUERY_KEYS.PLAYLIST_VIDEOS;

export const useFetchPlaylistVideos = () =>
  useFetchDataAll<Database['public']['Tables']['PLAYLIST_VIDEOS']['Row']>(
    [playlistVideosQueryKey],
    PLAYLIST_VIDEOS.BASE,
  );

export const useFetchPlaylistVideoByPlaylistId = (playlistId: string) =>
  useFetchDataByOneId<Database['public']['Tables']['PLAYLIST_VIDEOS']['Row']>(
    [playlistVideosQueryKey, playlistId],
    PLAYLIST_VIDEOS.BY_PLAYLIST_ID,
    playlistId,
  );

export const useCreatePlaylistVideo = () =>
  useCreateData<'PLAYLIST_VIDEOS'>(
    [playlistVideosQueryKey],
    PLAYLIST_VIDEOS.BASE,
  );

export const useUpdatePlaylistVideoById = () =>
  useUpdateDataByOneId<'PLAYLIST_VIDEOS'>(
    [playlistVideosQueryKey],
    PLAYLIST_VIDEOS.BY_ID,
  );

export const useDeletePlaylistVideoById = () =>
  useDeleteDataByOneId([playlistVideosQueryKey], PLAYLIST_VIDEOS.BY_ID);
