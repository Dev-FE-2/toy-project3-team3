import { useAuth } from '@/hooks/auth';
import {
  useCreateFollow,
  useDeleteFollowByFollowerUserIdAndFollowingUserId,
  useFetchFollowingsByUserId,
} from '@/hooks/useFollow';
import { useFetchPlaylistById } from '@/hooks/usePlaylist';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export const useOptimisticFollowHandling = () => {
  const { playlistId } = useParams();
  const { user } = useAuth();
  const { data: followingData } = useFetchFollowingsByUserId(
    user?.userId || '',
  );
  const { data: playlistData } = useFetchPlaylistById(playlistId || '');

  const [localFollow, setLocalFollow] = useState({
    isFollow: false,
    isInitialized: false,
  });

  useEffect(() => {
    if (followingData && user && !localFollow.isInitialized) {
      setLocalFollow({
        isFollow:
          followingData.filter((data) => data.follower_user_id === user.userId)
            .length > 0,
        isInitialized: true,
      });
    }
  }, [followingData, user, localFollow.isInitialized]);

  const { mutate: createFollow } = useCreateFollow();
  const { mutate: deleteFollow } =
    useDeleteFollowByFollowerUserIdAndFollowingUserId();

  if (!user || !playlistId || !playlistData)
    return {
      handleClickFollow: () => {},
      isFollowLocal: false,
    };

  const handleClickFollow = (user_id: string) => {
    const newFollow = {
      follower_user_id: user_id,
      following_user_id: playlistData[0].user_id,
    };

    setLocalFollow((prev) => ({
      ...prev,
      isFollow: !prev.isFollow,
    }));

    if (localFollow.isFollow) {
      deleteFollow(
        { firstId: user_id, secondId: playlistData[0].user_id },
        {
          onError: () => {
            console.log('delete 에러 발생');
            setLocalFollow((prev) => ({
              ...prev,
              isFollow: !prev.isFollow,
            }));
          },
        },
      );
    } else {
      createFollow(newFollow, {
        onError: () => {
          console.log('create 에러 발생');
          setLocalFollow((prev) => ({
            ...prev,
            isFollow: !prev.isFollow,
          }));
        },
      });
    }
  };

  return {
    handleClickFollow,
    isFollowLocal: localFollow.isFollow,
  };
};
