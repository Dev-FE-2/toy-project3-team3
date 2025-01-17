import * as S from './ContentsInfo.styles';
import UserProfile from '@/components/playlist/common/UserProfile/UserProfile';
import {
  Button,
  Category,
  Confirm,
  HashTag,
  LikeAndSubscribe,
} from '@/components/common';
import {
  useAuth,
  useDeletePlaylistByIdAndUserId,
  useFetchHashtagByPlaylistId,
  useFetchPlaylistById,
  useFetchUserById,
  useLikeHandling,
  useSubscribeHandling,
} from '@/hooks';
import { getRelativeTime } from '@/utils';
import { useNavigate, useParams } from 'react-router-dom';
import { useOptimisticFollowHandling } from '@/hooks/play-list/useOptimisticFollowHandling';
import { useState } from 'react';
import { useFetchCategoryById } from '@/hooks/useCategory';

const ContentsInfo = () => {
  const { user } = useAuth();
  const { playlistId } = useParams();
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const nav = useNavigate();
  const { data: playlistData } = useFetchPlaylistById(playlistId || '');
  const { data: userData } = useFetchUserById(playlistData?.[0]?.user_id || '');
  const { data: hashtagData } = useFetchHashtagByPlaylistId(playlistId || '');
  const { data: categoryData } = useFetchCategoryById(
    playlistData?.[0].category_id || '',
  );
  const { handleClickLike, isUserLikeLocal, likeCntLocal } = useLikeHandling();
  const { handleClickSubscribe, isUserSubscribeLocal, subscribeCntLocal } =
    useSubscribeHandling();
  const { handleClickFollow, isFollowLocal } = useOptimisticFollowHandling();
  const { mutate: deletePlaylist } = useDeletePlaylistByIdAndUserId();

  if (
    !playlistId ||
    !user ||
    !playlistData ||
    !userData ||
    !hashtagData ||
    !categoryData
  )
    return <div>에러</div>;

  const isPlaylistCreator = playlistData[0].user_id === user.userId;

  const relativeTime = getRelativeTime(playlistData[0].created_at);

  const handleDeletePlaylist = () => {
    if (playlistData[0].user_id !== user.userId) return;

    deletePlaylist({ firstId: playlistId, secondId: user.userId });
    nav('/');
  };

  return (
    <>
      <S.FlexContainer>
        <S.Title>{playlistData[0].title}</S.Title>
        <S.RelativeTime>{relativeTime}</S.RelativeTime>
      </S.FlexContainer>
      <S.ShortIntro>{playlistData[0].short_intro}</S.ShortIntro>
      <S.FlexContainer hasMargin>
        <S.CategoryContainer>
          <Category type="mark" content={categoryData[0].category_name_ko} />
        </S.CategoryContainer>
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
          <HashTag
            key={data.hashtag_id}
            onClick={() => nav(`/search?q=${data.hashtag_name}`)}
            content={data.hashtag_name}
          />
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
                onClick={() => setIsConfirmOpen(true)}
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
              onClick={() => handleClickFollow(user.userId)}
              borderType="round"
              size="small"
              color={isFollowLocal ? 'gray' : 'primary'}
            >
              {isFollowLocal ? '언팔로잉' : '팔로잉'}
            </Button>
          )}
        </S.ButtonContainer>
        {isConfirmOpen && (
          <Confirm
            content={{
              text: '플레이리스트를 삭제하시겠습니까?',
              leftBtn: '확인',
              rightBtn: '취소',
            }}
            onClickLeftBtn={handleDeletePlaylist}
            onClickRightBtn={() => setIsConfirmOpen(false)}
          />
        )}
      </S.FlexContainer>
    </>
  );
};

export default ContentsInfo;
