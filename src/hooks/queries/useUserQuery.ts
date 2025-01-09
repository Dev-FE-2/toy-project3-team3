import { useQuery } from '@tanstack/react-query';
import { fetchUserByUserId, fetchUsers } from '@/services';
import { QUERY_KEYS } from '@/constants';

// 📌 auth로 userId 가져오는 기능 구현 완료되면 아래 함수들에 추가

export const useUsers = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.USERS],
    queryFn: fetchUsers,
  });
};

export const useUser = (userId: string) => {
  return useQuery({
    queryKey: [QUERY_KEYS.USER, userId],
    queryFn: () => fetchUserByUserId(userId),
    enabled: !!userId,
  });
};
