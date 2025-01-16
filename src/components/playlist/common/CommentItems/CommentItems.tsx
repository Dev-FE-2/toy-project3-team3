import { Database } from '@/types';
import * as S from './CommentItems.styles';
import { Icon } from '@/components/common';
import { useFetchLikeByCommentId } from '@/hooks/useLike';
import { useNavigate } from 'react-router-dom';
import { getRelativeTime } from '@/utils';
import {
  useFetchUserById,
  useOptimisticLikeToComment,
  useFetchCommentByTargetCommentId,
} from '@/hooks';
import UserProfile from '@/components/playlist/common/UserProfile/UserProfile';

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
  const nav = useNavigate();
  const { data: likeData } = useFetchLikeByCommentId(comment.comments_id);
  const { data: replyData } = useFetchCommentByTargetCommentId(
    comment.comments_id,
  );
  const { data: userData } = useFetchUserById(comment.user_id);

  const { handleClickLike, isUserLikeLocal } = useOptimisticLikeToComment(
    comment.comments_id,
  );

  const relativeTime = getRelativeTime(comment.created_at);

  const handleClickTaggedUserNickname = (nickname: string | undefined) => {
    nav(`/${nickname}`);
  };

  return (
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
          <S.RelativeTime>{relativeTime}</S.RelativeTime>
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
  );
};

export default CommentItems;
