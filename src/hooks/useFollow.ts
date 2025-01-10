import { API_ENDPOINTS, QUERY_KEYS } from '@/constants';
import {
  useCreateData,
  useDeleteDataByTwoId,
  useFetchDataAll,
  useFetchDataByOneId,
} from '@/hooks/useSupabaseCrud';
import type { Database } from '@/types';

const { FOLLOWS } = API_ENDPOINTS;
const queryKey = [QUERY_KEYS.FOLLOWS];

export const useFetchFollows = () =>
  useFetchDataAll<Database['public']['Tables']['FOLLOWS']['Row']>(
    queryKey,
    FOLLOWS.BASE,
  );

export const useFetchFollowersByUserId = (userId: string) =>
  useFetchDataByOneId<Database['public']['Tables']['FOLLOWS']['Row']>(
    [QUERY_KEYS.FOLLOWS, userId],
    FOLLOWS.FOLLOWERS_BY_USER_ID,
    userId,
  );

export const useFetchFollowingsByUserId = (userId: string) =>
  useFetchDataByOneId<Database['public']['Tables']['FOLLOWS']['Row']>(
    [QUERY_KEYS.FOLLOWS, userId],
    FOLLOWS.FOLLOWINGS_BY_USER_ID,
    userId,
  );

export const useCreateFollow = () =>
  useCreateData<'FOLLOWS'>(queryKey, FOLLOWS.BASE);

export const useDeleteFollowByTwoId = () =>
  useDeleteDataByTwoId(
    queryKey,
    FOLLOWS.BY_FOLLOWING_USER_ID_AND_FOLLOWER_USER_ID,
  );
