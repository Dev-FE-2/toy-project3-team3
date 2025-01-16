import * as S from './CommentReply.styles';
import { Icon } from '@/components/common';
import CommentItems from '@/components/playlist/common/CommentItems/CommentItems';
import {
  useFetchCommentById,
  useFetchCommentByTargetCommentId,
} from '@/hooks/useComment';
import { useFetchUsers } from '@/hooks/useUser';
import { Database } from '@/types';
import { useNavigate } from 'react-router-dom';

interface CommentReplyProps {
  target: string;
  comments: Database['public']['Tables']['COMMENTS']['Row'][];
}

const CommentReply = ({ target, comments }: CommentReplyProps) => {
  const nav = useNavigate();
  const { data: replyData } = useFetchCommentByTargetCommentId(target);
  const { data: currentCommentData } = useFetchCommentById(target);
  const { data: userData } = useFetchUsers();

  if (!replyData) return;
  if (!currentCommentData) return;

  const handleLikeClick = () => {};

  const handleCommentClick = () => {};

  const getTaggedUserNickname = (targetCommentId: string | null) => {
    const targetComment = comments.find(
      (comment) => comment.comments_id === targetCommentId,
    );

    const taggedUser = userData?.find(
      (data) => data.user_id === targetComment?.user_id,
    );

    return taggedUser?.nickname;
  };

  return (
    <>
      <S.BackWardIconWrapper>
        <Icon type="backward" onClick={() => nav(-1)} />
      </S.BackWardIconWrapper>
      <CommentItems
        key={`reply-target-${currentCommentData[0].comments_id}`}
        comment={currentCommentData[0]}
        hasReply={replyData?.length > 0}
        isLike={false}
        handleLikeClick={handleLikeClick}
        handleCommentClick={handleCommentClick}
      />
      {replyData.map((data) => {
        const taggedUserNickname = getTaggedUserNickname(
          data.target_comments_id,
        );

        return (
          <S.ReplyWrapper key={data.comments_id}>
            <CommentItems
              comment={data}
              isLike={false}
              taggedUserNickname={taggedUserNickname}
              handleLikeClick={handleLikeClick}
              handleCommentClick={handleCommentClick}
            />
          </S.ReplyWrapper>
        );
      })}
    </>
  );
};

export default CommentReply;
