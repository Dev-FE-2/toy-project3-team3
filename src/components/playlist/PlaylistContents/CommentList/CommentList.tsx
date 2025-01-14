import { useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import CommentItems from '@/components/playlist/common/CommentItems/CommentItems';
import CommentReply from '@/components/playlist/PlaylistContents/CommentList/CommentReply/CommentReply';
import { useFetchCommentByTargetPlaylistId } from '@/hooks';

const CommentList = () => {
  const [isLike, setIsLike] = useState(false); // 📌 각 댓글의 Like 테이블의 데이터와 연결 필요
  const { playlistId } = useParams();
  const loc = useLocation();
  const nav = useNavigate();
  const searchParams = new URLSearchParams(loc.search);
  const target = searchParams.get('target');

  const { data: commentData } = useFetchCommentByTargetPlaylistId(
    playlistId || '', // 📌 로딩 처리 필요
  );
  // 📌 현재 로그인한 userId로 좋아요 데이터 가져온 후 활성화 여부, 낙관적 UI 업데이트 추가

  if (!commentData) return <div>댓글이 없습니다</div>;

  const handleCommentClick = (targetComment: string, hasReplies: boolean) => {
    if (hasReplies) {
      searchParams.set('target', targetComment);
      nav(`${loc.pathname}?${searchParams.toString()}`);
    }
  };

  const handleLikeClick = () => {
    // 📌 낙관적 UI 업데이트 추가
    if (isLike) {
      setIsLike(false);
    } else {
      setIsLike(true);
    }
  };

  const comments = commentData.filter((comment) => !comment.target_comments_id);
  const replies = commentData.filter((reply) => reply.target_comments_id);

  const getReplies = (commentId: string) => {
    return replies.filter((reply) => reply.target_comments_id === commentId);
  };

  return (
    <>
      {target ? (
        <CommentReply target={target} comments={comments} />
      ) : (
        comments.map((comment) => {
          const replyLength = getReplies(comment.comments_id).length;

          return (
            <CommentItems
              key={comment.comments_id}
              comment={comment}
              hasReply={replyLength > 0}
              isLike={isLike}
              handleLikeClick={handleLikeClick}
              handleCommentClick={handleCommentClick}
            />
          );
        })
      )}
    </>
  );
};

export default CommentList;
