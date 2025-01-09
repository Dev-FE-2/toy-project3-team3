import { useQuery } from '@tanstack/react-query';
import { fetchPlaylists, fetchPlaylistById } from '@/services/playlistService';
import { QUERY_KEYS } from '@/constants';
import { useParams } from 'react-router-dom';

export const usePlaylists = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.PLAYLISTS],
    queryFn: fetchPlaylists,
  });
};

export const usePlaylist = () => {
  const { playlist_id } = useParams<{ playlist_id: string }>();

  return useQuery({
    queryKey: [QUERY_KEYS.PLAYLIST, playlist_id],
    queryFn: () => {
      if (!playlist_id) throw new Error('playlist_id가 필요합니다.');

      return fetchPlaylistById(playlist_id);
    },
    enabled: !!playlist_id,
  });
};
