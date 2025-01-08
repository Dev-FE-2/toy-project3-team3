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

  return {
    addedVideoIds,
    setAddedVideoIds,
  };
};
