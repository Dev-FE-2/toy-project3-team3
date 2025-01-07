import { useAtom } from 'jotai';
import { playListAtom } from '@/atoms';
import type { Video } from '@/types';

export const usePlayListEdit = () => {
  const [playList, setPlayList] = useAtom(playListAtom);

  const addToPlayList = (video: Video) => {
    setPlayList((prev) => [...prev, video]);
  };

  return {
    playList,
    addToPlayList,
    setPlayList,
  };
};
