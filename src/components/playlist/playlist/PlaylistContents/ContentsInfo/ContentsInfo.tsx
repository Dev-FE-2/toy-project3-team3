import * as S from './ContentsInfo.styles';
import UserProfile from '@/components/playlist/common/UserProfile/UserProfile';
import {
  Button,
  Category,
  HashTag,
  LikeAndSubscribe,
} from '@/components/common';
import {
  useAuth,
  useFetchCommentByTargetPlaylistId,
  useFetchHashtagByPlaylistId,
  useFetchLikeByPlaylistId,
  useFetchPlaylistById,
  useFetchPlaylistVideoByPlaylistId,
  useFetchSubscribeByPlaylistId,
  useFetchUserById,
  useLikeHandling,
  useSubscribeHandling,
} from '@/hooks';
import { getRelativeTime } from '@/utils';
import { useNavigate, useParams } from 'react-router-dom';

const ContentsInfo = () => {
  const { user } = useAuth();
  const { playlistId } = useParams();
  const nav = useNavigate();
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
  const { handleClickLike, isUserLikeLocal, likeCntLocal } = useLikeHandling();
  const { handleClickSubscribe, isUserSubscribeLocal, subscribeCntLocal } =
    useSubscribeHandling();

  if (
    !playlistId ||
    !user ||
    !playlistData ||
    !commentData ||
    !playlistVideoData ||
    !userData ||
    !hashtagData ||
    !likeData ||
    !subscribeData
  )
    return <div>에러</div>; // 📌 로딩 처리 필요~~

  const isPlaylistCreator = playlistData[0].user_id === user.userId;

  const relativeTime = getRelativeTime(playlistData[0].created_at);

  const handleDeletePlaylist = () => {};
  const handleFollowPlaylistCreator = () => {};

  console.log(likeCntLocal);
  console.log(subscribeCntLocal);
  console.log(isUserLikeLocal);
  console.log(isUserSubscribeLocal);

  return (
    <>
      <S.FlexContainer>
        <S.Title>{playlistData[0].title}</S.Title>
        <S.RelativeTime>{relativeTime}</S.RelativeTime>
      </S.FlexContainer>
      <S.ShortIntro>{playlistData[0].short_intro}</S.ShortIntro>
      <S.FlexContainer hasMargin>
        <Category type="mark" content={playlistData[0].category_id || ''} />
        <LikeAndSubscribe
          likeCnt={likeCntLocal}
          subscribeCnt={subscribeCntLocal}
          isLiked={isUserLikeLocal}
          isSubscribed={isUserSubscribeLocal}
          onLikeClick={() =>
            handleClickLike(playlistId, user.userId, 'playlist')
          }
          onSubscribeClick={() => handleClickSubscribe(playlistId, user.userId)}
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
          {isPlaylistCreator && (
            <>
              <Button
                onClick={() => nav(`/playlist/${playlistId}/edit`)}
                color="gray"
                borderType="round"
                size="small"
              >
                수정
              </Button>
              <Button
                onClick={handleDeletePlaylist}
                color="gray"
                borderType="round"
                size="small"
              >
                삭제
              </Button>
            </>
          )}
          {isPlaylistCreator || (
            <Button
              onClick={handleFollowPlaylistCreator}
              borderType="round"
              size="small"
            >
              팔로잉
            </Button>
          )}
        </S.ButtonContainer>
      </S.FlexContainer>
    </>
  );
};

export default ContentsInfo;
