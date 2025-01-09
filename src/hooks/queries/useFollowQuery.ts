// src/hooks/useFollowQuery.ts
import { useQuery } from '@tanstack/react-query';
import {
  fetchFollowersByUserId,
  fetchFollowingsByUserId,
  fetchFollows,
} from '@/services/followService';
import { QUERY_KEYS } from '@/constants';
import { useParams } from 'react-router-dom';
import { useSupabase } from '@/hooks/useSupabase';
import { fetchUserIdByNickname } from '@/services';

export const useFollows = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.FOLLOWS],
    queryFn: fetchFollows,
  });
};

export const useFollowersByUserId = () => {
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

      return fetchFollowersByUserId(targetUserId);
    },
    enabled: !!nickname,
  });
};

export const useFollowingsByUserId = () => {
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

      return fetchFollowingsByUserId(targetUserId);
    },
    enabled: !!nickname,
  });
};
