import { Session } from '@supabase/supabase-js';
import { ReactNode } from 'react';

export interface AuthContextType {
  session: Session | null;
  user: User | null;
}

export interface AuthProviderProps {
  children: ReactNode;
}

export interface User {
  userId: string;
  nickname: string;
  email: string;
  profileImage: string;
  shortIntro: string;
}

export interface SupabaseUserData {
  user_id: string;
  email: string;
  nickname: string;
  profile_image: string;
  short_intro: string;
}

export interface EditProfileRequestValues {
  password?: string;
  data: {
    nickname?: string;
    profile_image?: string | null;
    short_intro?: string | null;
  };
}

export interface AuthProps {
  children: React.ReactNode;
}

export interface CheckDuplicateProps {
  field: 'nickname' | 'email';
  value: string;
}
