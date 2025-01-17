import { useAtom } from 'jotai';
import { hashtagAtom } from '@/atoms';
import {
  useCreateHashtag,
  useDeleteHashtagById,
  useFetchHashtagByPlaylistId,
} from '@/hooks';
import { formatHashtags } from '@/utils';

export const useHandleUpdateHashtag = (playlistId: string) => {
  const [hashtags] = useAtom(hashtagAtom);
  const { data: hashtagData } = useFetchHashtagByPlaylistId(playlistId);
  const { mutate: createHashtag } = useCreateHashtag();
  const { mutate: deleteHashtag } = useDeleteHashtagById();

  const newHashtags = hashtags.filter(
    (tag) => !hashtagData?.some((data) => data.hashtag_name === tag),
  );
  const deletedHashtags = hashtagData?.filter(
    (data) => !hashtags.includes(data.hashtag_name),
  );

  const handleUpdateHashtag = async () => {
    try {
      if (newHashtags.length > 0) {
        const formattedHashtags = formatHashtags(playlistId, newHashtags);
        const createHashtagPromise = formattedHashtags.map((hashtag) =>
          createHashtag(hashtag),
        );
        await Promise.all(createHashtagPromise);
      }

      if (deletedHashtags && deletedHashtags.length > 0) {
        const deleteHashtagPromise = deletedHashtags.map((data) =>
          deleteHashtag(data.hashtag_id),
        );
        await Promise.all(deleteHashtagPromise);
      }
    } catch (error) {
      console.error('해시태그 업데이트 오류:', error);
    }
  };

  return { handleUpdateHashtag };
};
