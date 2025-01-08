import { Video } from '@/types';
import { useCallback, useEffect, useState } from 'react';

export const useAddedVideoIds = (playList: Video[], videoData?: Video[]) => {
  const [addedVideoIds, setAddedVideoIds] = useState<Set<string>>(new Set());

  const updateAddedVideoIds = useCallback(() => {
    if (!videoData) return;

    const newAddedVideoIds = new Set<string>();
    playList.forEach((video) => {
      if (videoData.some((data) => data.id === video.id)) {
        newAddedVideoIds.add(video.id);
      }
    });
    setAddedVideoIds(newAddedVideoIds);
  }, [playList, videoData]);

  useEffect(() => {
    updateAddedVideoIds();
  }, [updateAddedVideoIds]);

  const addVideoId = (videoId: string) => {
    setAddedVideoIds((prev) => new Set(prev).add(videoId));
  };

  const removeVideoId = (videoId: string) => {
    setAddedVideoIds((prev) => {
      const newSet = new Set(prev);
      newSet.delete(videoId);
      return newSet;
    });
  };

  return {
    addedVideoIds,
    addVideoId,
    removeVideoId,
  };
};
