import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createPlaylist, updatePlaylist, deletePlaylist } from '@/services';
import { QUERY_KEYS } from '@/constants';
import type { TablesInsert, TablesUpdate } from '@/types';
import { useParams } from 'react-router-dom';

export const useCreatePlaylist = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (playlistData: TablesInsert<'PLAYLIST'>) =>
      createPlaylist(playlistData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.PLAYLISTS] });
    },
  });
};

export const useUpdatePlaylist = () => {
  const queryClient = useQueryClient();
  const { playlist_id } = useParams<{ playlist_id: string }>();

  return useMutation({
    mutationFn: (playlistData: TablesUpdate<'PLAYLIST'>) => {
      if (!playlist_id) throw new Error('playlist_id가 필요합니다.');

      return updatePlaylist(playlist_id, playlistData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.PLAYLISTS] });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.PLAYLIST, playlist_id],
      });
    },
  });
};

export const useDeletePlaylist = () => {
  const queryClient = useQueryClient();
  const { playlist_id } = useParams<{ playlist_id: string }>();

  return useMutation({
    mutationFn: () => {
      if (!playlist_id) throw new Error('playlist_id가 필요합니다.');

      return deletePlaylist(playlist_id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.PLAYLISTS] });
    },
  });
};
