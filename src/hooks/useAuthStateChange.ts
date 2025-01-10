import { useEffect, useState, useCallback } from 'react';
import { supabase } from '@/apis';
import { queryClient } from '@/apis';
import { Session } from '@supabase/supabase-js';
import { User, SupabaseUserData } from '@/types';
import { fetchUserProfile } from '@/services';

const useAuthStateChange = () => {
  // localStorage.clear()

  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);

  const updateUser = (session: Session | null, userData?: SupabaseUserData) => {
    if (!session) {
      setUser(null);
      return;
    }

    const userInfo = {
      userId: session.user.id,
      email: session.user.email ?? '',
      nickname: userData?.nickname ?? '',
      profileImg: userData?.profile_image ?? '',
    };
    // user 정보를 로컬 스토리지에 저장
    localStorage.setItem('user', JSON.stringify(userInfo));
    setUser(userInfo);
  };

  const handleAuthChange = useCallback(
    async (event: string, currentSession: Session | null) => {
      console.log('Event type:', event);
      setSession(() => currentSession);
      switch (event) {
        case 'SIGNED_IN':
        case 'USER_UPDATED':
        case 'TOKEN_REFRESHED': {
          // 프로필 데이터 새로 가져오기
          if (!session?.user) return;
          const userData = await queryClient.fetchQuery({
            queryKey: ['userProfile', session.user.id],
            queryFn: () => fetchUserProfile(session.user.id),
            staleTime: Infinity,
          });
          if ('error' in userData) {
            console.error('user data 가져오기 실패:', userData);
            return;
          }
          updateUser(session, userData as SupabaseUserData);
          break;
        }

        case 'SIGNED_OUT': {
          updateUser(null);
          queryClient.clear();
          localStorage.removeItem('user');
          break;
        }
      }
    },
    [session], // 의존성 배열은 여기에 위치해야 함
  );

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    // 로컬 스토리지에서 세션 복원
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      setSession(() => session);
      if (session?.user) {
        const userData = await queryClient.fetchQuery({
          queryKey: ['userProfile', session.user.id],
          queryFn: () => fetchUserProfile(session.user.id),
        });
        if ('error' in userData) {
          console.error('user data 가져오기 실패:', userData);
          return;
        }
        updateUser(session, userData as SupabaseUserData);
      }
    });

    // const initAuth = async () => {
    //   try {
    //     const {
    //       data: { session }
    //     } = await supabase.auth.getSession()
    //     console.log('Initial session:', session)

    //     if (session?.user) {
    //       setSession(session)
    //       const userData = await queryClient.fetchQuery({
    //         queryKey: ['userProfile', session.user.id],
    //         queryFn: () => fetchUserProfile(session.user.id)
    //       })
    //       updateUser(session, userData as SupabaseUserData)
    //     }
    //   } catch (error) {
    //     console.error('Auth initialization error:', error)
    //   }
    // }

    // initAuth()

    // 세션 변경 구독
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(handleAuthChange);
    return () => subscription.unsubscribe();
  }, [handleAuthChange]);

  return { session, user };
};

export default useAuthStateChange;
