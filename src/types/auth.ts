export interface User {
  userId?: string;
  nickname: string;
  email: string;
  profileImg: string;
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
