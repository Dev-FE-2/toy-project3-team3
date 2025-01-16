import { useLocation, useNavigate, useParams } from 'react-router-dom';
import CommentItems from '@/components/playlist/common/CommentItems/CommentItems';
import CommentReply from '@/components/playlist/playlist/PlaylistContents/CommentList/CommentReply/CommentReply';
import { useFetchCommentByTargetPlaylistId } from '@/hooks';

const CommentList = () => {
  const { playlistId } = useParams();
  const loc = useLocation();
  const nav = useNavigate();
  const searchParams = new URLSearchParams(loc.search);
  const target = searchParams.get('target');

  const { data: commentData } = useFetchCommentByTargetPlaylistId(
    playlistId || '',
  );

  if (!commentData) return <div>댓글이 없습니다</div>;

  const handleCommentClick = (targetComment: string, hasReplies: boolean) => {
    if (hasReplies) {
      searchParams.set('target', targetComment);
      nav(`${loc.pathname}?${searchParams.toString()}`);
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
              handleCommentClick={handleCommentClick}
            />
          );
        })
      )}
    </>
  );
};

export default CommentList;
