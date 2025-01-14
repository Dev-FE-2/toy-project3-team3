import { API_ENDPOINTS, QUERY_KEYS } from '@/constants';
import {
  useCreateData,
  useDeleteDataByTwoId,
  useFetchDataAll,
  useFetchDataByOneId,
} from '@/hooks/useSupabaseCrud';
import type { Database } from '@/types';

const { FOLLOWS } = API_ENDPOINTS;
const followsQueryKey = QUERY_KEYS.FOLLOWS;

export const useFetchFollows = () =>
  useFetchDataAll<Database['public']['Tables']['FOLLOWS']['Row']>(
    [followsQueryKey],
    FOLLOWS.BASE,
  );

export const useFetchFollowersByUserId = (userId: string) =>
  useFetchDataByOneId<Database['public']['Tables']['FOLLOWS']['Row']>(
    [followsQueryKey, userId],
    FOLLOWS.FOLLOWERS_BY_USER_ID,
    userId,
  );

export const useFetchFollowingsByUserId = (userId: string) =>
  useFetchDataByOneId<Database['public']['Tables']['FOLLOWS']['Row']>(
    [followsQueryKey, userId],
    FOLLOWS.FOLLOWINGS_BY_USER_ID,
    userId,
  );

export const useCreateFollow = () =>
  useCreateData<'FOLLOWS'>([followsQueryKey], FOLLOWS.BASE);

export const useDeleteFollowByFollowerUserIdAndFollowingUserId = () =>
  useDeleteDataByTwoId(
    [followsQueryKey],
    FOLLOWS.BY_FOLLOWER_USER_ID_AND_FOLLOWING_USER_ID,
  );
