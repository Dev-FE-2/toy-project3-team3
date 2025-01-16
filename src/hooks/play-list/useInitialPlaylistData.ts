import {
  editModeAtom,
  hashtagAtom,
  playListAtom,
  thumbnailUrlAtom,
} from '@/atoms';
import { useFetchCategoryById } from '@/hooks/useCategory';
import { useFetchHashtagByPlaylistId } from '@/hooks/useHashtag';
import { useFetchPlaylistById } from '@/hooks/usePlaylist';
import { useFetchPlaylistVideoByPlaylistId } from '@/hooks/usePlaylistVideo';
import { PlayListEditFormValues } from '@/types';
import { formatPlaylistsOrigin, formatPlaylistVideosOrigin } from '@/utils';
import { useAtom, useSetAtom } from 'jotai';
import { useState } from 'react';
import { UseFormSetValue } from 'react-hook-form';
import { useParams } from 'react-router-dom';

export const useInitialPlaylistData = (
  setValue: UseFormSetValue<PlayListEditFormValues>,
) => {
  const [editMode] = useAtom(editModeAtom);
  const { playListId } = useParams();
  const [isInitialized, setIsInitialized] = useState(false);
  const setPlaylists = useSetAtom(playListAtom);
  const setHashtags = useSetAtom(hashtagAtom);
  const setThumbnailUrl = useSetAtom(thumbnailUrlAtom);
  const { data: playlistData } = useFetchPlaylistById(playListId || '');
  const { data: playlistVideoData } = useFetchPlaylistVideoByPlaylistId(
    playListId || '',
  );
  const { data: hashtagData } = useFetchHashtagByPlaylistId(playListId || '');
  const { data: categoryData } = useFetchCategoryById(
    (playlistData && playlistData[0].category_id) || '',
  );

  if (
    editMode === 'modify' &&
    !isInitialized &&
    playlistData &&
    playlistVideoData &&
    hashtagData &&
    categoryData
  ) {
    setPlaylists(formatPlaylistVideosOrigin(playlistVideoData));
    setHashtags(hashtagData.map((data) => data.hashtag_name));
    setValue('category', categoryData[0].category_name_en);

    const formattedPlaylist = formatPlaylistsOrigin(playlistData);
    setValue('title', formattedPlaylist.title);
    setValue('description', formattedPlaylist.description || '');
    setThumbnailUrl(formattedPlaylist.thumbnailUrl);

    setIsInitialized(true);
  }

  return {
    isLoading:
      editMode === 'modify' &&
      (!playlistData || !playlistVideoData || !hashtagData || !categoryData),
    isInitialized,
  };
};
