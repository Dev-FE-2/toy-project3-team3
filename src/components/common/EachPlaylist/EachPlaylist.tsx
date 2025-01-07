import * as S from './EachPlaylist.styles';
import { Avatar, LikeAndSubscribe } from '@/components/common';
import { EachPlaylistProps } from '@/types';

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
    <S.PlayListContainer
      aria-label={`${userName}의 플레이리스트: ${playListTitle}`}
    >
      <S.ThumbnailWraper>
        <S.TumbnailLayer1 aria-hidden="true" />
        <S.TumbnailLayer2 aria-hidden="true" />
        <S.Tumbnail
          src={thumbnailUrl}
          alt={`${playListTitle} 플레이리스트 썸네일`}
        />
        <S.VideoCntWrapper aria-label={`동영상 ${videoCnt}개`}>
          <S.VideoIcon aria-hidden="true" />
          <S.VideoCnt>{videoCnt}</S.VideoCnt>
        </S.VideoCntWrapper>
      </S.ThumbnailWraper>
      <S.PlayListInfo>
        <S.PlayListInfoLeft>
          <Avatar
            imageUrl={avatarUrl}
            size={'small'}
            altText={`${userName}의 프로필`}
          />
          <S.UserName>{userName}</S.UserName>
          <S.UpdateDate aria-label={`업데이트 일자: ${updateDate}`}>
            {updateDate}
          </S.UpdateDate>
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
