import { useAuth } from '@/hooks/auth';

import {
  useCreateSubscribe,
  useDeleteSubscribeByPlaylistIdAndUserId,
  useFetchSubscribeByPlaylistId,
} from '@/hooks/useSubscribe';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export const useSubscribeHandling = () => {
  const { playlistId } = useParams();
  const { user } = useAuth();
  const { data: subscribeData } = useFetchSubscribeByPlaylistId(
    playlistId || '',
  );

  const [localSubscribe, setLocalSubscribe] = useState({
    isUserSubscribe: false,
    subscribeCnt: 0,
    isInitialized: false,
  });

  useEffect(() => {
    if (subscribeData && user && !localSubscribe.isInitialized) {
      setLocalSubscribe({
        isUserSubscribe:
          subscribeData.filter((data) => data.user_id === user.userId).length >
          0,
        subscribeCnt: subscribeData.length,
        isInitialized: true,
      });
    }
  }, [subscribeData, user, localSubscribe.isInitialized]);

  const { mutate: createSubscribe } = useCreateSubscribe();
  const { mutate: deleteSubscribe } = useDeleteSubscribeByPlaylistIdAndUserId();

  if (!user || !playlistId)
    return {
      handleClickSubscribe: () => {},
      isUserSubscribeLocal: false,
      subscribeCntLocal: 0,
    };

  const handleClickSubscribe = (playlist_id: string, user_id: string) => {
    const newSubscribe = { playlist_id, user_id };

    setLocalSubscribe((prev) => ({
      ...prev,
      isUserSubscribe: !prev.isUserSubscribe,
      subscribeCnt: prev.isUserSubscribe
        ? prev.subscribeCnt - 1
        : prev.subscribeCnt + 1,
    }));

    if (localSubscribe.isUserSubscribe) {
      deleteSubscribe(
        { firstId: playlistId, secondId: user.userId },
        {
          onError: () => {
            setLocalSubscribe((prev) => ({
              ...prev,
              isUserSubscribe: !prev.isUserSubscribe,
              subscribeCnt: prev.isUserSubscribe
                ? prev.subscribeCnt - 1
                : prev.subscribeCnt + 1,
            }));
          },
        },
      );
    } else {
      createSubscribe(newSubscribe, {
        onError: () => {
          setLocalSubscribe((prev) => ({
            ...prev,
            isUserSubscribe: !prev.isUserSubscribe,
            subscribeCnt: prev.isUserSubscribe
              ? prev.subscribeCnt - 1
              : prev.subscribeCnt + 1,
          }));
        },
      });
    }
  };

  return {
    handleClickSubscribe,
    isUserSubscribeLocal: localSubscribe.isUserSubscribe,
    subscribeCntLocal: localSubscribe.subscribeCnt,
  };
};
