import { ReactNode, useEffect, useState } from 'react';
import type { Session, User } from '@supabase/supabase-js';
import { supabaseAuth } from '../apis/supabase';
import { SupabaseContext } from '@/contexts/SupabaseContext';

type SupabaseProviderProps = {
  children: ReactNode;
};

export function SupabaseProvider({ children }: SupabaseProviderProps) {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const getSession = async () => {
      const { data } = await supabaseAuth.auth.getSession();
      setSession(data?.session || null);
      setUser(data?.session?.user || null);
    };

    getSession();

    const { data: listener } = supabaseAuth.auth.onAuthStateChange(
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
