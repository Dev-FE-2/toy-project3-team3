import { Session, User } from '@supabase/supabase-js';
import { ReactNode } from 'react';

export type SupabaseContextType = {
  session: Session | null;
  user: User | null;
};

export type SupabaseProviderProps = {
  children: ReactNode;
};
