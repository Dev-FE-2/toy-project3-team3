import { Database } from '@/types';
import * as S from './CommentItems.styles';
import { Confirm, Icon } from '@/components/common';
import { useFetchLikeByCommentId } from '@/hooks/useLike';
import { useNavigate } from 'react-router-dom';
import { getRelativeTime } from '@/utils';
import {
  useFetchUserById,
  useOptimisticLikeToComment,
  useFetchCommentByTargetCommentId,
  useDeleteCommentByIdAndUserId,
  useAuth,
} from '@/hooks';
import UserProfile from '@/components/playlist/common/UserProfile/UserProfile';
import { useState } from 'react';

interface CommentItemsProps {
  comment: Database['public']['Tables']['COMMENTS']['Row'];
  hasReply?: boolean;
  taggedUserNickname?: string;
  handleCommentClick: (targetComment: string, hasReplies: boolean) => void;
}

const CommentItems = ({
  comment,
  hasReply,
  taggedUserNickname,
  handleCommentClick,
}: CommentItemsProps) => {
  const { user } = useAuth();
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const nav = useNavigate();
  const { data: likeData } = useFetchLikeByCommentId(comment.comments_id);
  const { data: replyData } = useFetchCommentByTargetCommentId(
    comment.comments_id,
  );
  const { data: userData } = useFetchUserById(comment.user_id);
  const { mutate: deleteComment } = useDeleteCommentByIdAndUserId();

  const { handleClickLike, isUserLikeLocal } = useOptimisticLikeToComment(
    comment.comments_id,
  );

  const relativeTime = getRelativeTime(comment.created_at);

  const handleClickTaggedUserNickname = (nickname: string | undefined) => {
    nav(`/${nickname}`);
  };

  const handleDeleteComment = () => {
    if (comment.user_id !== user?.userId) return;

    deleteComment({
      firstId: comment.comments_id,
      secondId: user?.userId || '',
    });
  };

  return (
    <S.Wrapper>
      <S.CommentWrapper key={comment.comments_id}>
        <div>
          <UserProfile
            profileImageUrl={userData?.[0]?.profile_image || ''}
            nickname={userData?.[0]?.nickname || ''}
          />
          <S.CommentContainer>
            <S.TaggedUserNickname
              onClick={() => handleClickTaggedUserNickname(taggedUserNickname)}
            >
              {taggedUserNickname && `@${taggedUserNickname}`}
            </S.TaggedUserNickname>
            <S.Comment>{comment.comment}</S.Comment>
          </S.CommentContainer>
        </div>
        <S.IconWrapper>
          <S.IconContainer>
            <Icon
              type="like"
              isActive={isUserLikeLocal}
              onClick={() => handleClickLike()}
            />
            <div>{likeData?.length}</div>
          </S.IconContainer>
          <S.IconContainer>
            <Icon
              type="comment"
              isActive={hasReply}
              onClick={() => handleCommentClick(comment.comments_id, hasReply!)}
            />
            <div>{replyData?.length}</div>
          </S.IconContainer>
        </S.IconWrapper>
      </S.CommentWrapper>
      <S.TimeAndEditContainer>
        <S.RelativeTime>{relativeTime}</S.RelativeTime>
        <S.EditContainer>
          {user?.userId === comment.user_id && (
            <>
              <S.Edit>수정</S.Edit>
              <S.Edit onClick={() => setIsConfirmOpen(true)}>삭제</S.Edit>
            </>
          )}
        </S.EditContainer>
      </S.TimeAndEditContainer>
      {isConfirmOpen && (
        <Confirm
          content={{
            text: '플레이리스트를 삭제하시겠습니까?',
            leftBtn: '확인',
            rightBtn: '취소',
          }}
          onClickLeftBtn={handleDeleteComment}
          onClickRightBtn={() => setIsConfirmOpen(false)}
        />
      )}
    </S.Wrapper>
  );
};

export default CommentItems;
