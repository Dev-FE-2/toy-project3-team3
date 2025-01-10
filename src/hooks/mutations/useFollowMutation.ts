import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createFollowing, deleteFollowing } from '@/services/followService';
import { QUERY_KEYS } from '@/constants';
import type { TablesInsert } from '@/types';
import { useSupabase } from '@/hooks/useSupabase';

export const useCreateFollowing = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (followData: TablesInsert<'FOLLOWS'>) =>
      createFollowing(followData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.FOLLOWS] });
    },
  });
};

export const useDeleteFollowing = () => {
  const queryClient = useQueryClient();
  const context = useSupabase();
  const currentUserId = context.user?.id;

  // 📌 나중에 지워도 괜찮을 수 있으니 확인
  if (!currentUserId) throw new Error('인증되지 않은 유저입니다!');

  return useMutation({
    mutationFn: (followerUserId: string) =>
      deleteFollowing(currentUserId, followerUserId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.FOLLOWS] });
    },
  });
};
