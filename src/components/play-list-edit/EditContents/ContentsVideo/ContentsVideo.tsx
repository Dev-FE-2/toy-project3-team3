import React, { useState } from 'react';
import { useAtom } from 'jotai';
import { playListAtom } from '@/atoms';
import { useQuery } from '@tanstack/react-query';
import * as S from './ContentsVideo.styles';
import { Button } from '@/components/common';
import { youtubeService } from '@/services/youtube';
import { QUERY_KEYS } from '@/constants';
import { Video } from '@/types';

const ContentsVideo = () => {
  const [currentQuery, setCurrentQuery] = useState('');
  const [searchedQuery, setSearchedQuery] = useState('');
  const [playList, setPlayList] = useAtom(playListAtom);

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

  const handleAddToPlayList = (video: Video) => {
    setPlayList((prev) => [...prev, video]);
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
        {playList.map((video) => (
          <S.VideoContainer key={video.id}>
            <S.VideoThumbnail src={video.thumbnail} alt={video.title} />
            <S.VideoInfoContainer>
              <S.VideoTitle>{video.title}</S.VideoTitle>
              <S.VideoChannel>{video.channelTitle}</S.VideoChannel>
            </S.VideoInfoContainer>
          </S.VideoContainer>
        ))}
      </S.VideoWrapper>
    </div>
  );
};

export default ContentsVideo;
