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

  console.log(hashtags);

  const newHashtags = hashtags.filter(
    (tag) => !hashtagData?.some((data) => data.hashtag_name === tag),
  );
  const deletedHashtags = hashtagData?.filter(
    (data) => !hashtags.includes(data.hashtag_name),
  );

  console.log(newHashtags);

  const handleUpdateHashtag = async () => {
    try {
      console.log(newHashtags);
      console.log(deletedHashtags);
      if (newHashtags.length > 0) {
        console.log('생성 호출됨!');
        const formattedHashtags = formatHashtags(playlistId, newHashtags);
        console.log(formattedHashtags);
        const createHashtagPromise = formattedHashtags.map((hashtag) =>
          createHashtag(hashtag, {
            onSuccess: (data) => {
              console.log('해시태그 생성 성공:', data);
            },
            onError: (error) => {
              console.error('해시태그 생성 실패:', error);
            },
          }),
        );
        await Promise.all(createHashtagPromise);
      }

      if (deletedHashtags && deletedHashtags.length > 0) {
        console.log('삭제 호출됨!');
        const deleteHashtagPromise = deletedHashtags.map((data) =>
          deleteHashtag(data.hashtag_id, {
            onSuccess: () => {
              console.log('해시태그 삭제 성공:', data.hashtag_id);
            },
            onError: (error) => {
              console.error('해시태그 삭제 실패:', error);
            },
          }),
        );
        await Promise.all(deleteHashtagPromise);
      }

      console.log('해시태그 업데이트 성공!');
    } catch (error) {
      console.error('해시태그 업데이트 오류:', error);
    }
  };

  return { handleUpdateHashtag };
};
