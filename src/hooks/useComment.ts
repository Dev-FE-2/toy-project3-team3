import { API_ENDPOINTS, QUERY_KEYS } from '@/constants';
import {
  useCreateData,
  useDeleteDataByTwoId,
  useFetchDataAll,
  useFetchDataByOneId,
  useUpdateDataByTwoId,
} from '@/hooks/useSupabaseCrud';
import type { Database } from '@/types';

const { COMMENTS } = API_ENDPOINTS;
const queryKey = [QUERY_KEYS.COMMENTS];

export const useFetchComments = () =>
  useFetchDataAll<Database['public']['Tables']['COMMENTS']['Row']>(
    queryKey,
    COMMENTS.BASE,
  );

export const useFetchCommentById = (commentId: string) =>
  useFetchDataByOneId<Database['public']['Tables']['COMMENTS']['Row']>(
    [QUERY_KEYS.COMMENTS, commentId],
    COMMENTS.BY_ID,
    commentId,
  );

export const useFetchCommentByUserId = (userId: string) =>
  useFetchDataByOneId<Database['public']['Tables']['COMMENTS']['Row']>(
    [QUERY_KEYS.COMMENTS, userId],
    COMMENTS.BY_USER_ID,
    userId,
  );

export const useFetchCommentByTargetPlaylistId = (targetPlaylistId: string) =>
  useFetchDataByOneId<Database['public']['Tables']['COMMENTS']['Row']>(
    [QUERY_KEYS.COMMENTS, targetPlaylistId],
    COMMENTS.BY_TARGET_PLAYLIST_ID,
    targetPlaylistId,
  );

export const useFetchCommentByTargetCommentId = (targetCommentId: string) =>
  useFetchDataByOneId<Database['public']['Tables']['COMMENTS']['Row']>(
    [QUERY_KEYS.COMMENTS, targetCommentId],
    COMMENTS.BY_TARGET_COMMENT_ID,
    targetCommentId,
  );

export const useCreateComment = () =>
  useCreateData<'COMMENTS'>(queryKey, COMMENTS.BASE);

export const useUpdateCommentByIdAndUserId = () =>
  useUpdateDataByTwoId<'COMMENTS'>(queryKey, COMMENTS.BY_ID_AND_USER_ID);

export const useDeleteCommentByIdAndUserId = () =>
  useDeleteDataByTwoId(queryKey, COMMENTS.BY_ID_AND_USER_ID);
