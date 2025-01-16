import { useNavigate } from 'react-router-dom';
import * as S from './UserProfile.styles';
import { Avatar } from '@/components/common';

interface UserProfileProps {
  profileImageUrl: string | null;
  nickname: string;
}

const UserProfile = ({ profileImageUrl, nickname }: UserProfileProps) => {
  const nav = useNavigate();
  return (
    <S.UserWrapper onClick={() => nav(`/${nickname}`)}>
      <Avatar size="small" imageUrl={profileImageUrl || undefined} />
      <S.UserNickname>{nickname}</S.UserNickname>
    </S.UserWrapper>
  );
};

export default UserProfile;
