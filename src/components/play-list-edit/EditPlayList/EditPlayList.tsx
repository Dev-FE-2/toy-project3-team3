import { useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import VideoSearchBar from '@/components/play-list-edit/EditPlayList/VideoSearchBar/VideoSearchBar';
import VideoItems from '@/components/play-list-edit/EditPlayList/VideoItems/VideoItems';
import { youtubeService } from '@/services/youtube';
import { QUERY_KEYS } from '@/constants';
import {
  // useAddedVideoIds,
  useDragAndDrop,
  // usePlayListVideoEdit,
} from '@/hooks';
import type { PlayListEditFormValues, Video } from '@/types';
import { useFormContext } from 'react-hook-form';

const EditPlayList = () => {
  const [searchedQuery, setSearchedQuery] = useState('');
  const { watch, setValue } = useFormContext<PlayListEditFormValues>();
  const playLists = watch('playLists');

  const {
    itemRefs,
    handleDragStart,
    handleDragOver,
    handleDrop,
    handleDragEnd,
  } = useDragAndDrop(playLists, (newPlayList) => {
    setValue('playLists', newPlayList);
  });

  const {
    data: videoData,
    isLoading,
    isError,
  } = useQuery<Video[], Error>({
    queryKey: [QUERY_KEYS.YOUTUBE_SEARCH, searchedQuery],
    queryFn: () => youtubeService.searchVideos(searchedQuery),
    enabled: !!searchedQuery,
  });

  const handleSearch = (q: string) => {
    if (q.trim()) {
      setSearchedQuery(q);
    }
  };

  const handleAddToPlayList = (video: Video) => {
    const updatedPlayList = [...playLists, video];
    setValue('playLists', updatedPlayList);
  };

  const handleRemoveFromPlayList = (e: React.MouseEvent, videoId: string) => {
    e.stopPropagation();
    const updatedPlayList = playLists.filter((video) => video.id !== videoId);
    setValue('playLists', updatedPlayList);
  };

  const filteredData = useMemo(() => {
    return (
      videoData?.filter((data) => !playLists.some((v) => v.id === data.id)) ||
      []
    );
  }, [videoData, playLists]);

  return (
    <div>
      {isLoading && <div>로딩</div>}
      {isError && <div>에러</div>}
      <VideoSearchBar handleSearch={handleSearch} />
      {filteredData.map((video) => (
        <VideoItems
          key={video.id}
          video={video}
          onVideoClick={handleAddToPlayList}
        />
      ))}
      <h2>Playlist</h2>
      {playLists.map((video, index) => (
        <VideoItems
          key={video.id}
          video={video}
          isPlayList
          onRemove={handleRemoveFromPlayList}
          dragProps={{
            ref: (el) => (itemRefs.current[index] = el),
            onDragStart: (e) => handleDragStart(e, index),
            onDragOver: (e) => handleDragOver(e, index),
            onDrop: (e) => handleDrop(e, index),
            onDragEnd: handleDragEnd,
          }}
        />
      ))}
    </div>
  );
};

export default EditPlayList;
