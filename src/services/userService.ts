// src/services/userService.ts
import { API_ENDPOINTS } from '@/constants';
import { supabaseDB } from '../apis/supabase';
import type { TablesInsert, TablesUpdate } from '@/types/database.types';

const { USERS } = API_ENDPOINTS;

export const fetchUsers = async () => {
  const response = await supabaseDB.get(API_ENDPOINTS.USERS.BASE);
  return response.data;
};

export const fetchUserByUserId = async (userId: string) => {
  const response = await supabaseDB.get(USERS.BY_USER_ID(userId));
  return response.data[0];
};

export const createUser = async (userData: TablesInsert<'USER'>) => {
  const response = await supabaseDB.post(USERS.BASE, userData);
  return response.data;
};

export const updateUser = async (
  userId: string,
  userData: TablesUpdate<'USER'>,
) => {
  const response = await supabaseDB.patch(USERS.BY_USER_ID(userId), userData);
  return response.data;
};

export const deleteUser = async (userId: string) => {
  const response = await supabaseDB.delete(USERS.BY_USER_ID(userId));
  return response.data;
};
