import { useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useAtom, useSetAtom } from 'jotai';
import type { Video } from '@/types';
import { youtubeService } from '@/services/youtube';
import { QUERY_KEYS } from '@/constants';
import { useItemDragAndDrop } from '@/hooks';
import { playListAtom, playlistErrorAtom } from '@/atoms';
import { VideoItems, BottomSheet } from '@/components/playlist/common';
import VideoSearchBar from '@/components/playlist/play-list-edit/EditPlayList/VideoSearchBar/VideoSearchBar';

const EditPlayList = () => {
  const [searchedQuery, setSearchedQuery] = useState('');
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const [playlists, setPlaylists] = useAtom(playListAtom);
  const setPlaylistError = useSetAtom(playlistErrorAtom);
  const {
    itemRefs,
    handleItemDragStart,
    handleItemDragOver,
    handleItemDrop,
    handleItemDragEnd,
  } = useItemDragAndDrop(playlists, (newPlayList) => setPlaylists(newPlayList));
  const {
    data: videoData,
    isLoading,
    isError,
  } = useQuery<Video[], Error>({
    queryKey: [QUERY_KEYS.YOUTUBE_SEARCH, searchedQuery],
    queryFn: () => youtubeService.searchVideos(searchedQuery),
    enabled: !!searchedQuery,
  });

  const handleSearch = async (q: string) => {
    if (q.trim()) {
      setSearchedQuery(q);
    }
  };

  const handleAddToPlayList = (video: Video) => {
    const updatedPlayList = [...playlists, video];
    setPlaylists(updatedPlayList);
    setPlaylistError('');
  };

  const handleRemoveFromPlayList = (e: React.MouseEvent, videoId: string) => {
    e.stopPropagation();
    const updatedPlayList = playlists.filter((video) => video.id !== videoId);
    setPlaylists(updatedPlayList);
  };

  const filteredData = useMemo(() => {
    return (
      videoData?.filter((data) => !playlists.some((v) => v.id === data.id)) ||
      []
    );
  }, [videoData, playlists]);

  const handleOpenBottomSheet = (
    query: string,
    setError: (message: string) => void,
  ) => {
    if (!query) {
      setError('검색어를 입력해주세요');
    } else {
      setIsBottomSheetOpen(true);
      setError('');
    }
  };

  const handleCloseBottomSheet = () => {
    setIsBottomSheetOpen(false);
  };

  return (
    <div>
      {isLoading && <div>로딩</div>}
      {isError && <div>에러</div>}
      <VideoSearchBar
        handleSearch={handleSearch}
        handleOpenBottomSheet={handleOpenBottomSheet}
      />
      <BottomSheet
        title="검색 결과"
        isOpen={isBottomSheetOpen}
        handleBottomSheetClose={handleCloseBottomSheet}
      >
        {filteredData.map((video) => (
          <VideoItems
            key={video.id}
            video={video}
            onVideoClick={handleAddToPlayList}
          />
        ))}
      </BottomSheet>
      {playlists.map((video, index) => (
        <VideoItems
          key={video.id}
          video={video}
          isPlayList
          onRemove={handleRemoveFromPlayList}
          dragProps={{
            ref: (el) => (itemRefs.current[index] = el),
            onDragStart: (e) => handleItemDragStart(e, index),
            onDragOver: (e) => handleItemDragOver(e, index),
            onDrop: (e) => handleItemDrop(e, index),
            onDragEnd: handleItemDragEnd,
          }}
        />
      ))}
    </div>
  );
};

export default EditPlayList;
