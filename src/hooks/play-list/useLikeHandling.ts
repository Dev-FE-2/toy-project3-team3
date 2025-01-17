import { useAuth } from '@/hooks/auth';
import {
  useCreateLike,
  useDeleteLikeByPlaylistIdAndUserId,
  useFetchLikeByPlaylistId,
} from '@/hooks/useLike';
import type { PlaylistOrComment } from '@/types/playlist';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export const useLikeHandling = () => {
  const { playlistId } = useParams();
  const { user } = useAuth();
  const { data: likeData } = useFetchLikeByPlaylistId(playlistId || '');

  const [localLike, setLocalLike] = useState({
    isUserLike: false,
    likeCnt: 0,
    isInitialized: false,
  });

  useEffect(() => {
    if (likeData && user && !localLike.isInitialized) {
      setLocalLike({
        isUserLike:
          likeData.filter((data) => data.user_id === user.userId).length > 0,
        likeCnt: likeData.length,
        isInitialized: true,
      });
    }
  }, [likeData, user, localLike.isInitialized]);

  const { mutate: createLike } = useCreateLike();
  const { mutate: deleteLike } = useDeleteLikeByPlaylistIdAndUserId();

  if (!user || !playlistId)
    return {
      handleClickLike: () => {},
      isUserLikeLocal: false,
      likeCntLocal: 0,
    };

  const handleClickLike = (
    target_id: string,
    user_id: string,
    type: PlaylistOrComment,
  ) => {
    const newLike =
      type === 'playlist'
        ? { playlist_id: target_id, user_id }
        : { comment_id: target_id, user_id };

    setLocalLike((prev) => ({
      ...prev,
      isUserLike: !prev.isUserLike,
      likeCnt: prev.isUserLike ? prev.likeCnt - 1 : prev.likeCnt + 1,
    }));

    if (localLike.isUserLike) {
      deleteLike(
        { firstId: playlistId, secondId: user.userId },
        {
          onError: () => {
            setLocalLike((prev) => ({
              ...prev,
              isUserLike: !prev.isUserLike,
              likeCnt: prev.isUserLike ? prev.likeCnt - 1 : prev.likeCnt + 1,
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
            likeCnt: prev.isUserLike ? prev.likeCnt - 1 : prev.likeCnt + 1,
          }));
        },
      });
    }
  };

  return {
    handleClickLike,
    isUserLikeLocal: localLike.isUserLike,
    likeCntLocal: localLike.likeCnt,
  };
};
