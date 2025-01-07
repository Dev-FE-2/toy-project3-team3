import * as S from './LikeAndSubscribe.styles';
import { LikeAndSubscribeProps } from '@/types/common';
import { Icon } from '@/components/common';

const LikeAndSubscribe = ({
  likeCnt,
  subscribeCnt,
  isLiked,
  isSubscribed,
  onLikeClick,
  onSubscribeClick,
}: LikeAndSubscribeProps) => {
  return (
    <S.IconContainer>
      <S.Iconwapper>
        <Icon type="like" isActive={isLiked} onClick={onLikeClick} />
        <S.Cnt>{likeCnt}</S.Cnt>
      </S.Iconwapper>
      <S.Iconwapper>
        <Icon
          type="subscribe"
          isActive={isSubscribed}
          onClick={onSubscribeClick}
        />
        <S.Cnt>{subscribeCnt}</S.Cnt>
      </S.Iconwapper>
    </S.IconContainer>
  );
};

export default LikeAndSubscribe;

/**
 * 사용 예시
 * <LikeAndSubscribe
    likeCnt={10}
    subscribeCnt={1}
    isLiked={true}
    isSubscribed={false}
    onLikeClick={onLikeClick}
    onSubscribeClick={onSubscribeClick}
  />
 */
