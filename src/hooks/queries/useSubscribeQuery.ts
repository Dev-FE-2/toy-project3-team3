// src/hooks/useFollowQuery.ts
import { useQuery } from '@tanstack/react-query';
import {
  fetchSubscribeByUserId,
  fetchSubscribeLengthByPlaylistId,
  fetchSubscribes,
} from '@/services';
import { QUERY_KEYS } from '@/constants';
import { useParams } from 'react-router-dom';
import { useSupabase } from '@/hooks/useSupabase';
import { fetchUserIdByNickname } from '@/services';

export const useSubscribes = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.SUBSCRIBES],
    queryFn: fetchSubscribes,
  });
};

export const useSubscribeByUserId = () => {
  const { nickname } = useParams<{ nickname: string }>();
  const context = useSupabase();
  const currentUserNickname = context.user?.user_metadata.nickname;
  const currentUserId = context.user?.id;

  return useQuery({
    queryKey: [QUERY_KEYS.FOLLOWS, nickname],
    queryFn: async () => {
      let targetUserId: string;

      if (nickname === currentUserNickname) {
        targetUserId = currentUserId!;
      } else {
        targetUserId = await fetchUserIdByNickname(nickname!);
      }

      return fetchSubscribeByUserId(targetUserId);
    },
    enabled: !!nickname,
  });
};

export const useSubscribeLegnthByPlaylistId = () => {
  const { playlistId } = useParams<{ playlistId: string }>();

  return useQuery({
    queryKey: [QUERY_KEYS.SUBSCRIBES, playlistId],
    queryFn: () => {
      if (!playlistId) throw new Error('playlistId가 필요합니다.');

      return fetchSubscribeLengthByPlaylistId(playlistId);
    },
    enabled: !!playlistId,
  });
};
