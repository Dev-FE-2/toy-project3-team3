import * as S from './EachPlaylist.styles';
import { Avatar, LikeAndSubscribe } from '@/components/common';
import { EachPlaylistProps } from '@/types/common';

const EachPlaylist = ({
  thumbnailUrl,
  videoCnt,
  avatarUrl,
  userName,
  updateDate,
  likeCnt,
  subscribeCnt,
  isLiked,
  isSubscribed,
  playListTitle,
  onLikeClick,
  onSubscribeClick,
}: EachPlaylistProps) => {
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
    thumbnailUrl={data.thumbnailUrl}
    videoCnt={data.videoCnt}
    avatarUrl={data.avatarUrl}
    userName={data.userName}
    updateDate={data.updateDate}
    likeCnt={data.likeCnt}
    subscribeCnt={data.subscribeCnt}
    isLiked={data.isLiked}
    isSubscribed={data.isSubscribed}
    playListTitle={data.playListTitle}
    onLikeClick={handleLikeClick}
    onSubscribeClick={handleSubscribeClick}
  />
 */
