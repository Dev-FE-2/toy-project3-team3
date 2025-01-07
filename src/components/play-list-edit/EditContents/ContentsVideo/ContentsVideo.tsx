import React from 'react';
import { useQuery } from '@tanstack/react-query';
import * as S from './ContentsVideo.styles';
import { Button, Icon } from '@/components/common';
import { youtubeService } from '@/services/youtube';
import { QUERY_KEYS } from '@/constants';
import { useDragAndDrop, usePlayListEdit } from '@/hooks';

const ContentsVideo = () => {
  const [currentQuery, setCurrentQuery] = React.useState('');
  const [searchedQuery, setSearchedQuery] = React.useState('');
  const { playList, addToPlayList, setPlayList } = usePlayListEdit();
  const {
    itemRefs,
    handleDragStart,
    handleDragOver,
    handleDrop,
    handleDragEnd,
  } = useDragAndDrop(playList, setPlayList);

  const { data, isLoading, isError } = useQuery({
    queryKey: [QUERY_KEYS.YOUTUBE_SEARCH, searchedQuery],
    queryFn: () => youtubeService.searchVideos(searchedQuery),
    enabled: !!searchedQuery,
  });

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
        {data?.map((video) => (
          <S.VideoContainer key={video.id} onClick={() => addToPlayList(video)}>
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
            <S.VideoDeleteWrapper>
              <Icon type="cancel" />
            </S.VideoDeleteWrapper>
          </S.VideoContainer>
        ))}
      </S.VideoWrapper>
    </div>
  );
};

export default ContentsVideo;
