import { supabaseDB } from '../apis/supabase';
import type { TablesInsert, TablesUpdate } from '@/types';
import { API_ENDPOINTS } from '@/constants';

const { PLAYLISTS } = API_ENDPOINTS;

export const fetchPlaylists = async () => {
  const response = await supabaseDB.get(PLAYLISTS.BASE);
  return response.data;
};

export const fetchPlaylistById = async (playlistId: string) => {
  const response = await supabaseDB.get(PLAYLISTS.BY_PLAYLIST_ID(playlistId));
  return response.data[0];
};

export const createPlaylist = async (
  playlistData: TablesInsert<'PLAYLISTS'>,
) => {
  const response = await supabaseDB.post(PLAYLISTS.BASE, playlistData);
  return response.data;
};

export const updatePlaylist = async (
  playlistId: string,
  playlistData: TablesUpdate<'PLAYLISTS'>,
) => {
  const response = await supabaseDB.patch(
    PLAYLISTS.BY_PLAYLIST_ID(playlistId),
    playlistData,
  );
  return response.data;
};

export const deletePlaylist = async (playlistId: string) => {
  const response = await supabaseDB.delete(
    PLAYLISTS.BY_PLAYLIST_ID(playlistId),
  );
  return response.data;
};
