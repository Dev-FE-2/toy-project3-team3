// src/services/userService.ts
import { API_ENDPOINTS } from '@/constants';
import { supabaseDB } from '../apis/supabase';
import type { TablesInsert, TablesUpdate } from '@/types';

const { USERS } = API_ENDPOINTS;

export const fetchUsers = async () => {
  const response = await supabaseDB.get(USERS.BASE);
  return response.data;
};

export const fetchUserByUserId = async (userId: string) => {
  const response = await supabaseDB.get(USERS.BY_USER_ID(userId));
  return response.data[0];
};

export const createUser = async (userData: TablesInsert<'USERS'>) => {
  const response = await supabaseDB.post(USERS.BASE, userData);
  return response.data;
};

export const updateUser = async (
  userId: string,
  userData: TablesUpdate<'USERS'>,
) => {
  const response = await supabaseDB.patch(USERS.BY_USER_ID(userId), userData);
  return response.data;
};

export const deleteUser = async (userId: string) => {
  const response = await supabaseDB.delete(USERS.BY_USER_ID(userId));
  return response.data;
};

export const fetchUserIdByNickname = async (nickname: string) => {
  const response = await supabaseDB.get(
    `${USERS.BASE}?nickname=eq.${nickname}`,
  );
  if (response.data.length === 0)
    throw new Error('존재하지 않는 사용자입니다.');

  return response.data[0].user_id;
};
