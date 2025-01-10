import { API_ENDPOINTS, QUERY_KEYS } from '@/constants';
import {
  useCreateData,
  useDeleteDataByOneId,
  useFetchDataAll,
  useFetchDataByOneId,
  useUpdateDataByOneId,
} from '@/hooks/useSupabaseCrud';
import type { Database } from '@/types';

const { USERS } = API_ENDPOINTS;
const queryKey = [QUERY_KEYS.USERS];

export const useFetchUsers = () =>
  useFetchDataAll<Database['public']['Tables']['USERS']['Row']>(
    queryKey,
    USERS.BASE,
  );

export const useFetchUserByOneId = (userId: string) =>
  useFetchDataByOneId<Database['public']['Tables']['USERS']['Row']>(
    queryKey,
    USERS.BY_USER_ID,
    userId,
  );

export const useCreateUser = () => useCreateData<'USERS'>(queryKey, USERS.BASE);

export const useUpdateUserByOneId = () =>
  useUpdateDataByOneId<'USERS'>(queryKey, USERS.BY_USER_ID);

export const useDeleteUserByOneId = () =>
  useDeleteDataByOneId(queryKey, USERS.BY_USER_ID);
