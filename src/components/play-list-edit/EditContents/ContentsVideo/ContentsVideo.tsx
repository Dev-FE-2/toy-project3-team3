import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import * as S from './ContentsVideo.styles';
import { Button, Icon } from '@/components/common';
import { youtubeService } from '@/services';
import { QUERY_KEYS } from '@/constants';
import {
  useAddedVideoIds,
  useDragAndDrop,
  usePlayListVideoEdit,
} from '@/hooks';
import type { Video } from '@/types';

const ContentsVideo = () => {
  const [currentQuery, setCurrentQuery] = useState('');
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
  const { addedVideoIds, setAddedVideoIds } = useAddedVideoIds(
    playList,
    videoData,
  );

  const handleSearch = () => {
    if (currentQuery.trim()) {
      setSearchedQuery(currentQuery);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleAddToPlayList = (video: Video) => {
    addToPlayList(video);
    setAddedVideoIds((prev) => new Set(prev).add(video.id));
  };

  const handleRemoveFromPlayList = (e: React.MouseEvent, videoId: string) => {
    if (!videoData) return;

    e.stopPropagation();
    removeFromPlayList(videoId);

    if (videoData.some((data) => data.id === videoId)) {
      setAddedVideoIds((prev) => {
        const newSet = new Set(prev);
        newSet.delete(videoId);

        return newSet;
      });
    } else {
      setAddedVideoIds((prev) => {
        const newSet = new Set(prev);
        newSet.delete(videoId);
        return newSet;
      });
    }
  };

  const filteredData =
    videoData?.filter((data) => !addedVideoIds.has(data.id)) || [];

  return (
    <div>
      <input
        type="text"
        value={currentQuery}
        onChange={(e) => setCurrentQuery(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="검색어를 입력해주세요."
      />
      <Button type="button" color="secondary" onClick={handleSearch}>
        검색
      </Button>

      {isLoading && <div>로딩</div>}
      {isError && <div>에러</div>}

      <S.VideoWrapper>
        {filteredData?.map((video) => (
          <S.VideoContainer
            key={video.id}
            onClick={() => handleAddToPlayList(video)}
          >
            <S.VideoThumbnail src={video.thumbnail} alt={video.title} />
            <S.VideoInfoContainer>
              <S.VideoTitle>{video.title}</S.VideoTitle>
              <S.VideoChannel>{video.channelTitle}</S.VideoChannel>
            </S.VideoInfoContainer>
          </S.VideoContainer>
        ))}
      </S.VideoWrapper>

      <h2>Playlist</h2>
      <S.VideoWrapper>
        {playList.map((video, index) => (
          <S.VideoContainer
            key={video.id}
            ref={(el) => (itemRefs.current[index] = el)}
            draggable
            onDragStart={(e) => handleDragStart(e, index)}
            onDragOver={(e) => handleDragOver(e, index)}
            onDrop={(e) => handleDrop(e, index)}
            onDragEnd={handleDragEnd}
          >
            <S.VideoDragWrapper>
              <Icon type="drag" />
            </S.VideoDragWrapper>
            <S.VideoThumbnail src={video.thumbnail} alt={video.title} />
            <S.VideoInfoContainer>
              <S.VideoTitle>{video.title}</S.VideoTitle>
              <S.VideoChannel>{video.channelTitle}</S.VideoChannel>
            </S.VideoInfoContainer>
            <S.VideoDeleteWrapper
              onClick={(e) => handleRemoveFromPlayList(e, video.id)}
            >
              <Icon type="cancel" />
            </S.VideoDeleteWrapper>
          </S.VideoContainer>
        ))}
      </S.VideoWrapper>
    </div>
  );
};

export default ContentsVideo;
