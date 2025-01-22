import { useLocation, useNavigate, useParams } from 'react-router-dom';
import CommentItems from '@/components/playlist/common/CommentItems/CommentItems';
import CommentReply from '@/components/playlist/playlist/PlaylistContents/CommentList/CommentReply/CommentReply';
import {
  useAuth,
  useCreateComment,
  useFetchCommentByTargetPlaylistId,
} from '@/hooks';
import { useState } from 'react';
import { Icon, Input } from '@/components/common';
import * as S from './CommentList.styles';

const CommentList = () => {
  const { playlistId } = useParams();
  const { user } = useAuth();
  const [openInputId, setOpenInputId] = useState<string | null>(null);
  const [newComment, setNewComment] = useState('');
  const loc = useLocation();
  const nav = useNavigate();
  const searchParams = new URLSearchParams(loc.search);
  const target = searchParams.get('target');

  const { data: commentData, refetch: refetchCommentData } =
    useFetchCommentByTargetPlaylistId(playlistId || '');
  const { mutate: createComment } = useCreateComment();

  if (!commentData) return <div>댓글이 없습니다</div>;

  const handleCommentClick = (targetComment: string, hasReplies: boolean) => {
    if (hasReplies) {
      searchParams.set('target', targetComment);
      nav(`${loc.pathname}?${searchParams.toString()}`);
    } else {
      setOpenInputId((prev) => (prev === targetComment ? null : targetComment));
    }
  };

  const handleCreateComment = () => {
    if (!newComment.trim()) return;
    createComment(
      {
        target_playlist_id: playlistId,
        user_id: user?.userId || '',
        comment: newComment,
      },
      {
        onSuccess: () => {
          refetchCommentData();
          setNewComment('');
        },
      },
    );
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleCreateComment();
    }
  };

  const comments = commentData.filter((comment) => !comment.target_comments_id);

  return (
    <>
      {!target && (
        <S.CommentInputAndButtonContainer>
          <Input
            type="text"
            id="comment"
            placeholder="새로운 댓글을 입력해주세요"
            label="댓글"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <Icon type="send" onClick={handleCreateComment} />
        </S.CommentInputAndButtonContainer>
      )}
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
