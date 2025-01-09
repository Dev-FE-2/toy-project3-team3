// src/services/followService.ts
import { supabaseDB } from '../apis/supabase';
import type { TablesInsert } from '@/types/database.types';
import { API_ENDPOINTS } from '@/constants';

const { FOLLOWS } = API_ENDPOINTS;

export const fetchFollows = async () => {
  const response = await supabaseDB.get(FOLLOWS.BASE);
  return response.data;
};

export const fetchFollowersByUserId = async (userId: string) => {
  const response = await supabaseDB.get(FOLLOWS.FOLLOWERS_BY_USER_ID(userId));
  return response.data;
};

export const fetchFollowingsByUserId = async (userId: string) => {
  const response = await supabaseDB.get(FOLLOWS.FOLLOWINGS_BY_USER_ID(userId));
  return response.data;
};

export const createFollowing = async (followData: TablesInsert<'FOLLOW'>) => {
  const response = await supabaseDB.post(FOLLOWS.BASE, followData);
  return response.data;
};

export const deleteFollowing = async (
  followerUserId: string,
  followingUserId: string,
) => {
  const response = await supabaseDB.delete(
    FOLLOWS.FOLLOWING_AND_FOLLOWER_BY_USER_ID(followerUserId, followingUserId),
  );
  return response.data;
};
