import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import VideoSearchBar from '@/components/play-list-edit/EditContents/ContentsVideo/VideoSearchBar/VideoSearchBar';
import VideoItems from '@/components/play-list-edit/EditContents/ContentsVideo/VideoItems/VideoItems';
import { youtubeService } from '@/services/youtube';
import { QUERY_KEYS } from '@/constants';
import {
  useAddedVideoIds,
  useDragAndDrop,
  usePlayListVideoEdit,
} from '@/hooks';
import type { Video } from '@/types';

const ContentsVideo = () => {
  const [searchedQuery, setSearchedQuery] = useState('');
  const { playList, setPlayList, addToPlayList, removeFromPlayList } =
    usePlayListVideoEdit();
  const {
    itemRefs,
    handleDragStart,
    handleDragOver,
    handleDrop,
    handleDragEnd,
  } = useDragAndDrop(playList, setPlayList);
  const {
    data: videoData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: [QUERY_KEYS.YOUTUBE_SEARCH, searchedQuery],
    queryFn: () => youtubeService.searchVideos(searchedQuery),
    enabled: !!searchedQuery,
  });
  const { addedVideoIds, addVideoId, removeVideoId } = useAddedVideoIds(
    playList,
    videoData,
  );

  const handleSearch = (q: string) => {
    if (q.trim()) {
      setSearchedQuery(q);
    }
  };

  const handleAddToPlayList = (video: Video) => {
    addToPlayList(video);
    addVideoId(video.id);
  };

  const handleRemoveFromPlayList = (e: React.MouseEvent, videoId: string) => {
    e.stopPropagation();
    removeFromPlayList(videoId);
    removeVideoId(videoId);
  };

  const filteredData =
    videoData?.filter((data) => !addedVideoIds.has(data.id)) || [];

  return (
    <div>
      {isLoading && <div>로딩</div>}
      {isError && <div>에러</div>}
      <VideoSearchBar onSearch={handleSearch} />
      {filteredData.map((video) => (
        <VideoItems
          key={video.id}
          video={video}
          onVideoClick={handleAddToPlayList}
        />
      ))}
      <h2>Playlist</h2>
      {playList.map((video, index) => (
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

export default ContentsVideo;
