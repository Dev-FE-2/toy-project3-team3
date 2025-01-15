import { useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useAtom } from 'jotai';
import * as S from './EditPlayList.styles';
import VideoSearchBar from '@/components/play-list-edit/EditPlayList/VideoSearchBar/VideoSearchBar';
import VideoItems from '@/components/play-list-edit/EditPlayList/VideoItems/VideoItems';
import { Icon } from '@/components/common';
import type { Video } from '@/types';
import { youtubeService } from '@/services/youtube';
import { QUERY_KEYS } from '@/constants';
import { useDragAndDrop } from '@/hooks';
import { playListAtom } from '@/atoms';

const EditPlayList = () => {
  const [searchedQuery, setSearchedQuery] = useState('');
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const [playlists, setPlaylists] = useAtom(playListAtom);

  const {
    itemRefs,
    bottomSheetRef,
    handleItemDragStart,
    handleItemDragOver,
    handleItemDrop,
    handleItemDragEnd,
    handleBottomSheetDragStart,
    handleBottomSheetDragMove,
    handleBottomSheetDragEnd,
  } = useDragAndDrop(
    playlists,
    (newPlayList) => setPlaylists(newPlayList),
    () => setIsBottomSheetOpen(false),
  );

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

  return (
    <div>
      {isLoading && <div>로딩</div>}
      {isError && <div>에러</div>}
      <VideoSearchBar
        handleSearch={handleSearch}
        handleOpenBottomSheet={handleOpenBottomSheet}
      />
      <S.Overlay
        isOpen={isBottomSheetOpen}
        onClick={() => setIsBottomSheetOpen(false)}
      />
      <S.BottomSheet
        isOpen={isBottomSheetOpen}
        ref={bottomSheetRef}
        onMouseDown={handleBottomSheetDragStart}
        onMouseMove={handleBottomSheetDragMove}
        onMouseUp={handleBottomSheetDragEnd}
        onMouseLeave={handleBottomSheetDragEnd}
        onTouchStart={handleBottomSheetDragStart}
        onTouchMove={handleBottomSheetDragMove}
        onTouchEnd={handleBottomSheetDragEnd}
      >
        <S.BottomSheetHeader
          onMouseDown={handleBottomSheetDragStart}
          onTouchStart={handleBottomSheetDragStart}
        >
          <h2>검색 결과</h2>
          <S.BottomSheetIconContainer>
            <Icon type="bottomSheet" />
          </S.BottomSheetIconContainer>
          <Icon type="cancel" onClick={() => setIsBottomSheetOpen(false)} />
        </S.BottomSheetHeader>
        <S.BottomSheetContent>
          {filteredData.map((video) => (
            <VideoItems
              key={video.id}
              video={video}
              onVideoClick={handleAddToPlayList}
            />
          ))}
        </S.BottomSheetContent>
      </S.BottomSheet>
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
