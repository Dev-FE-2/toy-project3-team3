import * as S from './UserProfile.styles';
import { Avatar } from '@/components/common';

interface UserProfileProps {
  profileImageUrl: string;
  nickname: string;
}

const UserProfile = ({ profileImageUrl, nickname }: UserProfileProps) => {
  return (
    <S.UserWrapper>
      <Avatar size="small" imageUrl={profileImageUrl || ''} />
      <S.UserNickname>{nickname}</S.UserNickname>
    </S.UserWrapper>
  );
};

export default UserProfile;
