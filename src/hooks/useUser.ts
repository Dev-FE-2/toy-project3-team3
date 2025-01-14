import { API_ENDPOINTS, QUERY_KEYS } from '@/constants';
import { useFetchDataAll, useFetchDataByOneId } from '@/hooks/useSupabaseCrud';
import type { Database } from '@/types';

const { USERS } = API_ENDPOINTS;
const usersQueryKey = QUERY_KEYS.USERS;

export const useFetchUsers = () =>
  useFetchDataAll<Database['public']['Tables']['USERS']['Row']>(
    [usersQueryKey],
    USERS.BASE,
  );

export const useFetchUserById = (userId: string) =>
  useFetchDataByOneId<Database['public']['Tables']['USERS']['Row']>(
    [usersQueryKey],
    USERS.BY_ID,
    userId,
  );
