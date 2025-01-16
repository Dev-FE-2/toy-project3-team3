import { useAtom } from 'jotai';
import { hashtagAtom } from '@/atoms';
import { useCreateHashtag } from '@/hooks';
import { formatHashtags } from '@/utils';

export const useHandleCreateHashtag = () => {
  const [hashtags] = useAtom(hashtagAtom);
  const { mutate: createHashtag } = useCreateHashtag();

  const handleCreateHashtag = async (playlistId: string) => {
    try {
      const formattedHashtags = formatHashtags(playlistId, hashtags);
      const createHashtagPromise = formattedHashtags.map((hashtag) =>
        createHashtag(hashtag),
      );

      await Promise.all(createHashtagPromise);
    } catch (error) {
      console.error('HASHTAGS 저장 오류: ', error);
    }
  };

  return { handleCreateHashtag };
};
