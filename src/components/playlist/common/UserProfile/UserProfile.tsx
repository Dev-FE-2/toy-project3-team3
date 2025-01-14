import * as S from './UserProfile.styles';
import { Avatar } from '@/components/common';

interface UserProfileProps {
  profileImageUrl: string | null;
  nickname: string;
}

const UserProfile = ({ profileImageUrl, nickname }: UserProfileProps) => {
  return (
    <S.UserWrapper>
      <Avatar size="small" imageUrl={profileImageUrl || undefined} />
      <S.UserNickname>{nickname}</S.UserNickname>
    </S.UserWrapper>
  );
};

export default UserProfile;
