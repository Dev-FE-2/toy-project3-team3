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
const usersQueryKey = QUERY_KEYS.USERS;

export const useFetchUsers = () =>
  useFetchDataAll<Database['public']['Tables']['USERS']['Row']>(
    [usersQueryKey],
    USERS.BASE,
  );

export const useFetchUserByUserId = (userId: string) =>
  useFetchDataByOneId<Database['public']['Tables']['USERS']['Row']>(
    [usersQueryKey],
    USERS.BY_ID,
    userId,
  );

export const useCreateUser = () =>
  useCreateData<'USERS'>([usersQueryKey], USERS.BASE);

export const useUpdateUserByUserId = () =>
  useUpdateDataByOneId<'USERS'>([usersQueryKey], USERS.BY_ID);

export const useDeleteUserByUserId = () =>
  useDeleteDataByOneId([usersQueryKey], USERS.BY_ID);
