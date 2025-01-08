import { useAtom } from 'jotai';
import { playListAtom } from '@/atoms';
import type { Video } from '@/types';

export const usePlayListVideoEdit = () => {
  const [playList, setPlayList] = useAtom(playListAtom);

  const addToPlayList = (video: Video) => {
    setPlayList((prev) => {
      const isDuplicate = prev.some((item) => item.id === video.id);

      if (isDuplicate) return prev;

      return [...prev, video];
    });
  };

  const removeFromPlayList = (videoId: string) => {
    setPlayList((prev) => prev.filter((item) => item.id !== videoId));
  };

  return {
    playList,
    setPlayList,
    addToPlayList,
    removeFromPlayList,
  };
};
