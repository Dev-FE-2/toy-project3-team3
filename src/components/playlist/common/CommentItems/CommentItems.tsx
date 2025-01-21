import { Database } from '@/types';
import * as S from './CommentItems.styles';
import { Confirm, Icon } from '@/components/common';
import { useFetchLikeByCommentId } from '@/hooks/useLike';
import { useNavigate, useParams } from 'react-router-dom';
import { getRelativeTime } from '@/utils';
import {
  useFetchUserById,
  useOptimisticLikeToComment,
  useFetchCommentByTargetCommentId,
  useDeleteCommentByIdAndUserId,
  useAuth,
  useCreateComment,
} from '@/hooks';
import UserProfile from '@/components/playlist/common/UserProfile/UserProfile';
import { useEffect, useRef, useState } from 'react';

interface CommentItemsProps {
  comment: Database['public']['Tables']['COMMENTS']['Row'];
  taggedUserNickname?: string;
  handleCommentClick: (targetComment: string, hasReply: boolean) => void;
  openInputId: string | null;
  setOpenInputId: (id: string | null) => void;
  showCommentIcon?: boolean;
}

const CommentItems = ({
  comment,
  taggedUserNickname,
  handleCommentClick,
  openInputId,
  setOpenInputId,
  showCommentIcon = true,
}: CommentItemsProps) => {
  const { playlists } = useParams();
  const { user } = useAuth();
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const nav = useNavigate();
  const { data: likeData } = useFetchLikeByCommentId(comment.comments_id);
  const { data: replyData, refetch: refetchReplyData } =
    useFetchCommentByTargetCommentId(comment.comments_id);
  const { data: userData } = useFetchUserById(comment.user_id);
  const { mutate: deleteComment } = useDeleteCommentByIdAndUserId();
  const { mutate: createComment } = useCreateComment();
  const { handleClickLike, isUserLikeLocal } = useOptimisticLikeToComment(
    comment.comments_id,
  );

  const relativeTime = getRelativeTime(comment.created_at);

  const handleClickTaggedUserNickname = (nickname: string | undefined) => {
    nav(`/${nickname}`);
  };

  const handleCreateComment = () => {
    if (!inputRef.current || !inputRef.current.value.trim()) return;

    const inputValue = inputRef.current.value;

    // 입력값을 먼저 초기화
    inputRef.current.value = '';
    setOpenInputId(null);

    createComment(
      {
        target_playlist_id: playlists,
        target_comments_id: comment.comments_id,
        user_id: user?.userId || '',
        comment: inputValue,
      },
      {
        onSuccess: () => {
          // 성공 시 데이터만 리페치
          refetchReplyData();
        },
      },
    );
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleCreateComment();
    }
  };

  const handleDeleteComment = () => {
    if (comment.user_id !== user?.userId) return;

    deleteComment({
      firstId: comment.comments_id,
      secondId: user?.userId || '',
    });
  };

  const handleClickComment = () => {
    const hasReplies = (replyData?.length ?? 0) > 0;
    handleCommentClick(comment.comments_id, hasReplies);
  };

  useEffect(() => {
    if (openInputId === comment.comments_id && inputRef.current) {
      inputRef.current.focus();
    }
  }, [openInputId, comment.comments_id]);

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
            {showCommentIcon && (
              <>
                <Icon
                  type="comment"
                  isActive={replyData && replyData?.length > 0}
                  onClick={handleClickComment}
                />
                <div>{replyData?.length}</div>
              </>
            )}
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
      {openInputId === comment.comments_id && (
        <S.InputAndIconContainer>
          <Icon type="cancel" onClick={() => setOpenInputId(null)} />
          <S.Input
            ref={inputRef}
            placeholder="댓글을 입력하세요"
            onKeyDown={handleKeyDown}
          />
          <Icon type="send" onClick={handleCreateComment} />
        </S.InputAndIconContainer>
      )}
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
