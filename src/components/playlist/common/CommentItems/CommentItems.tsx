import { Database } from '@/types';
import * as S from './CommentItems.styles';
import { Avatar, Icon } from '@/components/common';
import { useFetchLikeByCommentId } from '@/hooks/useLike';
import { useFetchCommentByTargetCommentId } from '@/hooks/useComment';
import { useNavigate } from 'react-router-dom';

interface CommentItemsProps {
  comment: Database['public']['Tables']['COMMENTS']['Row'];
  hasReply?: boolean;
  isLike: boolean;
  taggedUserNickname?: string;
  handleLikeClick: () => void;
  handleCommentClick: (targetComment: string, hasReplies: boolean) => void;
}

const CommentItems = ({
  comment,
  hasReply,
  isLike,
  taggedUserNickname,
  handleLikeClick,
  handleCommentClick,
}: CommentItemsProps) => {
  const nav = useNavigate();
  const { data: likeData } = useFetchLikeByCommentId(comment.comments_id);
  const { data: replyData } = useFetchCommentByTargetCommentId(
    comment.comments_id,
  );

  const getRelativeTime = (createdAt: string): string => {
    const now = new Date();
    const writedAt = new Date(createdAt);
    const diffInMs = now.getTime() - writedAt.getTime();

    const diffInSeconds = Math.floor(diffInMs / 1000);
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    const diffInHours = Math.floor(diffInMinutes / 60);
    const diffInDays = Math.floor(diffInHours / 24);
    const diffInMonths = Math.floor(diffInDays / 30);

    if (diffInMonths > 0) {
      return `${diffInMonths}달 전`;
    }
    if (diffInDays > 0) {
      return `${diffInDays}일 전`;
    }
    if (diffInHours > 0) {
      return `${diffInHours}시간 전`;
    }
    if (diffInMinutes > 0) {
      return `${diffInMinutes}분 전`;
    }
    if (diffInSeconds > 0) {
      return `${diffInSeconds}초 전`;
    }
    return '방금';
  };

  const relativeTime = getRelativeTime(comment.created_at);

  const handleClickTaggedUserNickname = (nickname: string | undefined) => {
    nav(`/${nickname}`);
  };

  return (
    <S.CommentWrapper key={comment.comments_id}>
      <div>
        <S.UserWrapper>
          <Avatar size="small" />
          <S.UserNickname>userNickname</S.UserNickname>
        </S.UserWrapper>
        <S.CommentContainer>
          <S.TaggedUserNickname
            onClick={() => handleClickTaggedUserNickname(taggedUserNickname)}
          >
            {taggedUserNickname && `@${taggedUserNickname}`}
          </S.TaggedUserNickname>
          <S.Comment>{comment.comment}</S.Comment>
          <S.RelativeTime>{relativeTime}</S.RelativeTime>
        </S.CommentContainer>
      </div>

      <S.IconWrapper>
        <S.IconContainer>
          <Icon type="like" isActive={isLike} onClick={handleLikeClick} />
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
  );
};

export default CommentItems;
