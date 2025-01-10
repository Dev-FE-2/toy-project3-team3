import { useMutation, useQueryClient } from '@tanstack/react-query';
import { QUERY_KEYS } from '@/constants';
import type { TablesInsert } from '@/types';
import { useSupabase } from '@/hooks/useSupabase';
import { createSubscribe, deleteSubscribe } from '@/services';

export const useCreateSubscribe = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (subscribeData: TablesInsert<'SUBSCRIBES'>) =>
      createSubscribe(subscribeData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.SUBSCRIBES] });
    },
  });
};

export const useDeleteSubscribe = () => {
  const queryClient = useQueryClient();
  const context = useSupabase();
  const currentUserId = context.user?.id;

  return useMutation({
    mutationFn: async (playlistId: string) => {
      if (!currentUserId) throw new Error('인증되지 않은 유저입니다!');

      await deleteSubscribe(playlistId, currentUserId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.SUBSCRIBES] });
    },
  });
};
