import { useState } from 'react';
import * as S from './VideoSearchBar.styles';
import { Button, Input } from '@/components/common';
import { useAtom } from 'jotai';
import { playlistErrorAtom } from '@/atoms';

type SearchBarProps = {
  handleSearch: (q: string) => void;
  handleOpenBottomSheet: (
    q: string,
    setError: (message: string) => void,
  ) => void;
};

const VideoSearchBar = ({
  handleSearch,
  handleOpenBottomSheet,
}: SearchBarProps) => {
  const [currentQuery, setCurrentQuery] = useState('');
  const [error, setError] = useState('');
  const [playlistError] = useAtom(playlistErrorAtom);

  const handleSearchQuery = () => {
    handleOpenBottomSheet(currentQuery, setError);
    handleSearch(currentQuery);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSearchQuery();
    }
  };

  return (
    <>
      <S.InputAndButtonWrapper>
        <Input
          type="text"
          placeholder="검색어를 입력해주세요."
          id="영상 검색어"
          label="검색어"
          value={currentQuery}
          onChange={(e) => setCurrentQuery(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <S.ButtonContainer>
          <Button type="button" color="secondary" onClick={handleSearchQuery}>
            검색
          </Button>
        </S.ButtonContainer>
      </S.InputAndButtonWrapper>
      <S.Error>{playlistError}</S.Error>
      <S.Error>{error}</S.Error>
    </>
  );
};

export default VideoSearchBar;
