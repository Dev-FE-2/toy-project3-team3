import React, { createContext, ReactNode, useEffect, useState } from 'react';
import { supabase } from './client';
import { Session, User } from '@supabase/supabase-js';

type SupabaseContextType = {
  session: Session | null;
  user: User | null;
};

type SupabaseProviderProps = {
  children: ReactNode;
};

const SupabaseContext = createContext<SupabaseContextType | null>(null);

export function SupabaseProvider({ children }: SupabaseProviderProps) {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const getSession = async () => {
      const { data } = await supabase.auth.getSession();
      setSession(data?.session || null);
      setUser(data?.session?.user || null);
    };

    getSession();

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
        setUser(session?.user || null);
      },
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  return (
    <SupabaseContext.Provider value={{ session, user }}>
      {children}
    </SupabaseContext.Provider>
  );
}

export function useSupabase() {
  const context = React.useContext(SupabaseContext);
  if (!context) {
    throw new Error(
      '❌useSupabase를 사용하려면 SupabaseProvider의 내부에 작성해야 합니다.',
    );
  }
}
