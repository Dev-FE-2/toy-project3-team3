import * as S from './ContentsInfo.styles';
import UserProfile from '@/components/playlist/common/UserProfile/UserProfile';
import {
  Button,
  Category,
  HashTag,
  LikeAndSubscribe,
} from '@/components/common';
import {
  useFetchCommentByTargetPlaylistId,
  useFetchHashtagByPlaylistId,
  useFetchLikeByPlaylistId,
  useFetchPlaylistById,
  useFetchPlaylistVideoByPlaylistId,
  useFetchSubscribeByPlaylistId,
  useFetchUserById,
} from '@/hooks';
import { getRelativeTime } from '@/utils';

interface ContentsInfoProps {
  playlistId: string;
}

const ContentsInfo = ({ playlistId }: ContentsInfoProps) => {
  const { data: playlistData } = useFetchPlaylistById(playlistId || '');
  const { data: commentData } = useFetchCommentByTargetPlaylistId(
    playlistId || '',
  );
  const { data: playlistVideoData } = useFetchPlaylistVideoByPlaylistId(
    playlistId || '',
  );
  const { data: userData } = useFetchUserById(playlistData?.[0]?.user_id || '');
  const { data: hashtagData } = useFetchHashtagByPlaylistId(playlistId || '');
  const { data: likeData } = useFetchLikeByPlaylistId(playlistId || '');
  const { data: subscribeData } = useFetchSubscribeByPlaylistId(
    playlistId || '',
  );

  if (
    !playlistData ||
    !commentData ||
    !playlistVideoData ||
    !userData ||
    !hashtagData ||
    !likeData ||
    !subscribeData
  )
    return <div>에러</div>; // 📌 로딩 처리 필요~~

  const relativeTime = getRelativeTime(playlistData[0].created_at);

  const handleClickLike = () => {};
  const handleClickSubscribe = () => {};

  return (
    <>
      <S.FlexContainer>
        <S.Title>{playlistData[0].title}</S.Title>
        <S.RelativeTime>{relativeTime}</S.RelativeTime>
      </S.FlexContainer>
      <S.ShortIntro>{playlistData[0].short_intro}</S.ShortIntro>
      <S.FlexContainer hasMargin>
        <Category type="mark" content={playlistData?.[0]?.category || ''} />
        <LikeAndSubscribe
          likeCnt={likeData.length}
          subscribeCnt={subscribeData.length}
          isLiked={false}
          isSubscribed={false}
          onLikeClick={handleClickLike}
          onSubscribeClick={handleClickSubscribe}
        />
      </S.FlexContainer>
      <S.HashtagWrapper>
        {hashtagData.map((data) => (
          <HashTag content={data.hashtag_name} />
        ))}
      </S.HashtagWrapper>
      <S.FlexContainer hasMargin>
        <UserProfile
          profileImageUrl={userData[0].profile_image || null}
          nickname={userData[0].nickname}
        />
        <S.ButtonContainer>
          {/* 📌 현재 로그인한 userId로 검증하여 버튼 렌더링 분기처리 필요 */}
          <Button borderType="round" size="small">
            팔로잉
          </Button>
          <Button color="gray" borderType="round" size="small">
            수정
          </Button>
          <Button color="gray" borderType="round" size="small">
            삭제
          </Button>
        </S.ButtonContainer>
      </S.FlexContainer>
    </>
  );
};

export default ContentsInfo;
