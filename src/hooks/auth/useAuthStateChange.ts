import { useEffect, useState, useCallback } from 'react';
import { supabase } from '@/apis';
import { queryClient } from '@/apis';
import { Session } from '@supabase/supabase-js';
import { User } from '@/types';
import { fetchUserProfile } from '@/services';

const useAuthStateChange = () => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(() => {
    // 초기값을 localStorage에서 가져오기
    const storedUSer = localStorage.getItem('user');
    return storedUSer ? JSON.parse(storedUSer) : null;
  });

  const updateUser = useCallback(async (session: Session | null) => {
    if (!session) {
      setUser(null);
      localStorage.removeItem('user');
      return;
    }

    try {
      const userData = await queryClient.fetchQuery({
        queryKey: ['userProfile', session.user.id],
        queryFn: () => fetchUserProfile(session.user.id),
        staleTime: 0,
      });

      if ('error' in userData) throw userData.error;
      const userInfo = {
        userId: session.user.id,
        email: session.user.email ?? '',
        nickname: userData.nickname,
        profileImage: userData.profile_image ?? '',
        shortIntro: userData.short_intro ?? '',
      };

      localStorage.setItem('user', JSON.stringify(userInfo));
      setUser(userInfo);
    } catch (error) {
      console.error('user 업데이트 에러:', error);
    }
  }, []);

  const handleAuthChange = useCallback(
    async (event: string, currSession: Session | null) => {
      // console.log('Event type:', event); //디버깅용
      setSession(() => currSession);
      switch (event) {
        case 'INITIAL_SESSION':
        case 'SIGNED_IN':
        case 'TOKEN_REFRESHED':
        case 'USER_UPDATED': {
          // 프로필 데이터 새로 가져오기
          if (!currSession?.user) return;
          updateUser(currSession);
          break;
        }

        case 'SIGNED_OUT': {
          localStorage.removeItem('user');
          updateUser(null);
          queryClient.clear();
          break;
        }
      }
    },
    [updateUser],
  );

  useEffect(() => {
    // 로컬 스토리지에서 세션 복원
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      setSession(session);
      if (session?.user) {
        updateUser(session);
      }
    });

    // 세션 변경 구독
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(handleAuthChange);

    return () => subscription.unsubscribe();
  }, [handleAuthChange, updateUser]);

  return { session, user };
};

export default useAuthStateChange;
