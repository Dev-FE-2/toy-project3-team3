import { useLocation, useNavigate, useParams } from 'react-router-dom';
import CommentItems from '@/components/playlist/common/CommentItems/CommentItems';
import CommentReply from '@/components/playlist/playlist/PlaylistContents/CommentList/CommentReply/CommentReply';
import { useFetchCommentByTargetPlaylistId } from '@/hooks';
import { useState } from 'react';

const CommentList = () => {
  const { playlistId } = useParams();
  const [openInputId, setOpenInputId] = useState<string | null>(null);
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
    } else {
      setOpenInputId((prev) => (prev === targetComment ? null : targetComment));
    }
  };

  const comments = commentData.filter((comment) => !comment.target_comments_id);

  return (
    <>
      {target ? (
        <CommentReply target={target} comments={comments} />
      ) : (
        comments.map((comment) => {
          return (
            <CommentItems
              key={comment.comments_id}
              comment={comment}
              handleCommentClick={handleCommentClick}
              openInputId={openInputId}
              setOpenInputId={setOpenInputId}
            />
          );
        })
      )}
    </>
  );
};

export default CommentList;
