import { useAuth } from '@/hooks/auth';
import {
  useCreateLike,
  useDeleteLikeByCommentIdAndUserId,
  useFetchLikeByCommentId,
} from '@/hooks/useLike';
import { useEffect, useState } from 'react';

export const useOptimisticLikeToComment = (comment_id: string) => {
  const { user } = useAuth();
  const { data: likeData } = useFetchLikeByCommentId(comment_id);

  const [localLike, setLocalLike] = useState({
    isUserLike: false,
    isInitialized: false,
  });

  useEffect(() => {
    if (likeData && user && !localLike.isInitialized) {
      setLocalLike({
        isUserLike:
          likeData.filter((data) => data.user_id === user.userId).length > 0,
        isInitialized: true,
      });
    }
  }, [likeData, user, localLike.isInitialized]);

  const { mutate: createLike } = useCreateLike();
  const { mutate: deleteLike } = useDeleteLikeByCommentIdAndUserId();

  if (!user) {
    return {
      handleClickLike: () => {},
      isUserLikeLocal: false,
    };
  }

  const handleClickLike = () => {
    const newLike = {
      comments_id: comment_id,
      user_id: user.userId,
    };

    setLocalLike((prev) => ({
      ...prev,
      isUserLike: !prev.isUserLike,
    }));

    if (localLike.isUserLike) {
      deleteLike(
        { firstId: comment_id, secondId: user.userId },
        {
          onError: () => {
            setLocalLike((prev) => ({
              ...prev,
              isUserLike: !prev.isUserLike,
            }));
          },
        },
      );
    } else {
      createLike(newLike, {
        onError: () => {
          setLocalLike((prev) => ({
            ...prev,
            isUserLike: !prev.isUserLike,
          }));
        },
      });
    }
  };

  return {
    handleClickLike,
    isUserLikeLocal: localLike.isUserLike,
  };
};
