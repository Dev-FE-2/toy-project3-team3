export interface User {
  userId: string;
  nickname: string;
  email: string;
  profileImage: string;
}

export interface SupabaseUserData {
  email: string;
  nickname: string;
  profile_image: string;
}

export interface EditProfileRequestValues {
  password?: string;
  data: {
    nickname?: string;
    profile_image?: string | undefined;
  };
}

export interface AuthProps {
  children: React.ReactNode;
}

export interface CheckDuplicateProps {
  field: 'nickname' | 'email';
  value: string;
}
