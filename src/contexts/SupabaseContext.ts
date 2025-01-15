import { createContext } from 'react';
import type { Session, User } from '@supabase/supabase-js';

type SupabaseContextType = {
  session: Session | null;
  user: User | null;
};

export const SupabaseContext = createContext<SupabaseContextType | null>(null);
