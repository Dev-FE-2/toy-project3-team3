import { supabaseDB } from '@/apis/supabase';
import { API_ENDPOINTS } from '@/constants';
import { TablesInsert } from '@/types';

const { SUBSCRIBES } = API_ENDPOINTS;

export const fetchSubscribes = async () => {
  const response = await supabaseDB.get(SUBSCRIBES.BASE);
  return response.data;
};

export const fetchSubscribeByUserId = async (userId: string) => {
  const response = await supabaseDB.get(SUBSCRIBES.BY_USER_ID(userId));
  return response.data;
};

export const fetchSubscribeLengthByPlaylistId = async (playlistId: string) => {
  const response = await supabaseDB.get(SUBSCRIBES.BY_PLAYLIST_ID(playlistId));
  return response.data.length;
};

export const createSubscribe = async (
  subscribeData: TablesInsert<'SUBSCRIBES'>,
) => {
  const response = await supabaseDB.post(SUBSCRIBES.BASE, subscribeData);
  return response.data;
};

export const deleteSubscribe = async (playlistId: string, userId: string) => {
  const response = await supabaseDB.delete(
    SUBSCRIBES.BY_PLAYLIST_ID_AND_USER_ID(playlistId, userId),
  );
  return response.data;
};
