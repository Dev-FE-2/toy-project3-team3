import * as S from './EachPlaylist.styles';
import { Avatar, LikeAndSubscribe } from '@/components/common';
import { EachPlaylistProps } from '@/types/common';
import TumbnailTest from '@/assets/img/test/tumbnailTest.webp';
import avatarTest from '@/assets/img/test/avatarTest.webp';

const EachPlaylist = ({
  userId,
  playListId,
  onLikeClick,
  onSubscribeClick,
}: EachPlaylistProps) => {
  // userId, playListId로 데이터 패치 필요
  // 임시 데이터
  const thumbnailUrl = TumbnailTest;
  const videoCnt = 10;
  const avatarUrl = avatarTest;
  const userName = '김';
  const updateDate = '2024.10.15';
  const likeCnt = 10;
  const subscribeCnt = 10;
  const isLiked = false;
  const isSubscribed = true;
  const playListTitle = '김의 플레이리스트';
  console.log(userId, playListId);

  return (
    <S.PlayListContainer>
      <S.ThumbnailWraper>
        <S.TumbnailLayer1 />
        <S.TumbnailLayer2 />
        <S.Tumbnail src={thumbnailUrl} />
        <S.VideoCntWrapper>
          <S.VideoIcon />
          <S.VideoCnt>{videoCnt}</S.VideoCnt>
        </S.VideoCntWrapper>
      </S.ThumbnailWraper>
      <S.PlayListInfo>
        <S.PlayListInfoLeft>
          <Avatar imageUrl={avatarUrl} size={'small'} />
          <S.UserName>{userName}</S.UserName>
          <S.UpdateDate>{updateDate}</S.UpdateDate>
        </S.PlayListInfoLeft>
        <LikeAndSubscribe
          likeCnt={likeCnt}
          subscribeCnt={subscribeCnt}
          isLiked={isLiked}
          isSubscribed={isSubscribed}
          onLikeClick={onLikeClick}
          onSubscribeClick={onSubscribeClick}
        />
      </S.PlayListInfo>
      <S.PlayListTitle>{playListTitle}</S.PlayListTitle>
    </S.PlayListContainer>
  );
};

export default EachPlaylist;

/**
 * 사용 예시
 * <EachPlaylist
      userId={userId}
      playListId={playListId}
      onLikeClick={onLikeClick}
      onSubscribeClick={onSubscribeClick}
    />
 */
