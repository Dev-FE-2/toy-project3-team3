import { hashtagAtom, playListAtom } from '@/atoms';
import { useFetchCategoryById } from '@/hooks/useCategory';
import { useFetchHashtagByPlaylistId } from '@/hooks/useHashtag';
import { useFetchPlaylistById } from '@/hooks/usePlaylist';
import { useFetchPlaylistVideoByPlaylistId } from '@/hooks/usePlaylistVideo';
import { PlayListEditFormValues } from '@/types';
import { formatPlaylistsOrigin, formatPlaylistVideosOrigin } from '@/utils';
import { useSetAtom } from 'jotai';
import { useState } from 'react';
import { UseFormSetValue } from 'react-hook-form';
import { useParams } from 'react-router-dom';

export const useInitialPlaylistData = (
  setValue: UseFormSetValue<PlayListEditFormValues>,
) => {
  const { playListId } = useParams();
  const [isInitialized, setIsInitialized] = useState(false);
  const setPlaylists = useSetAtom(playListAtom);
  const setHashtags = useSetAtom(hashtagAtom);
  const { data: playlistData } = useFetchPlaylistById(playListId || '');
  const { data: playlistVideoData } = useFetchPlaylistVideoByPlaylistId(
    playListId || '',
  );
  const { data: hashtagData } = useFetchHashtagByPlaylistId(playListId || '');
  const { data: categoryData } = useFetchCategoryById(
    (playlistData && playlistData[0].category_id) || '',
  );

  if (
    !isInitialized &&
    playlistData &&
    playlistVideoData &&
    hashtagData &&
    categoryData
  ) {
    console.log('호출됨!');
    setPlaylists(formatPlaylistVideosOrigin(playlistVideoData));
    setHashtags(hashtagData.map((data) => data.hashtag_name));
    setValue('category', categoryData[0].category_name_en);

    const formattedPlaylist = formatPlaylistsOrigin(playlistData);
    setValue('title', formattedPlaylist.title);
    setValue('description', formattedPlaylist.description || '');

    setIsInitialized(true);
  }

  return {
    isLoading:
      !playlistData || !playlistVideoData || !hashtagData || !categoryData,
    isInitialized,
  };
};
