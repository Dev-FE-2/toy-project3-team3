import * as S from './Avatar.styles';
import { AvatarProps } from '@/types';
import { DEFAULT_PROFILE } from '@/constants';

const Avatar = ({
  size,
  imageUrl,
  altText = 'User Profile',
  onClick,
}: AvatarProps) => {
  return (
    <S.AvatarBtn
      size={size}
      onClick={onClick}
      aria-label={`${altText} 프로필 이미지`}
    >
      <S.AvatarImg
        src={imageUrl ?? DEFAULT_PROFILE}
        alt={altText}
        onError={(e) => {
          e.currentTarget.src = DEFAULT_PROFILE; // 폴백 이미지
        }}
        aria-hidden="true"
      />
    </S.AvatarBtn>
  );
};

export default Avatar;

/**
 * 사용 예시
 * <Avatar
 *  size="small"
 *  //imageUrl="defaultprofile" (명시 안하면 기본프로필사진)
 *  //altText="User Profile" (명시 안하면 "User Profile")
 *  //onClick={handleAvatarClick}/>
 */
