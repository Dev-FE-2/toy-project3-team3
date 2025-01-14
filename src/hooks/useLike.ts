import { API_ENDPOINTS, QUERY_KEYS } from '@/constants';
import {
  useCreateData,
  useDeleteDataByTwoId,
  useFetchDataAll,
  useFetchDataByOneId,
  useFetchDataByTwoId,
  useUpdateDataByTwoId,
} from '@/hooks/useSupabaseCrud';
import type { Database } from '@/types';

const { LIKES } = API_ENDPOINTS;
const queryKey = [QUERY_KEYS.LIKES];

export const useFetchLikes = () =>
  useFetchDataAll<Database['public']['Tables']['LIKES']['Row']>(
    queryKey,
    LIKES.BASE,
  );

export const useFetchLikeByPlaylistId = (playlistId: string) =>
  useFetchDataByOneId<Database['public']['Tables']['LIKES']['Row']>(
    [QUERY_KEYS.LIKES, playlistId],
    LIKES.BY_PLAYLIST_ID,
    playlistId,
  );

export const useFetchLikeByCommentId = (commentId: string) =>
  useFetchDataByOneId<Database['public']['Tables']['LIKES']['Row']>(
    [QUERY_KEYS.LIKES, commentId],
    LIKES.BY_COMMENT_ID,
    commentId,
  );

export const useFetchLikeByPlaylistIdAndUserId = (
  playlistId: string,
  userId: string,
) =>
  useFetchDataByTwoId<Database['public']['Tables']['LIKES']['Row']>(
    [QUERY_KEYS.LIKE, userId, playlistId],
    LIKES.BY_PLAYLIST_ID_AND_USER_ID,
    playlistId,
    userId,
  );

export const useFetchLikeByCommentIdAndUserId = (
  commentId: string,
  userId: string,
) =>
  useFetchDataByTwoId<Database['public']['Tables']['LIKES']['Row']>(
    [QUERY_KEYS.LIKE, userId, commentId],
    LIKES.BY_COMMENT_ID_AND_USER_ID,
    commentId,
    userId,
  );

export const useCreateLike = () => useCreateData<'LIKES'>(queryKey, LIKES.BASE);

export const useUpdateLikeByIdAndUserId = () =>
  useUpdateDataByTwoId<'LIKES'>(queryKey, LIKES.BY_ID_AND_USER_ID);

export const useDeleteLikeByIdAndUserId = () =>
  useDeleteDataByTwoId(queryKey, LIKES.BY_ID_AND_USER_ID);
