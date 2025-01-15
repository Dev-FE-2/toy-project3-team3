import { useState } from 'react';
import * as S from './VideoSearchBar.styles';
import { Button, Input } from '@/components/common';

type SearchBarProps = {
  handleSearch: (q: string) => void;
};

const VideoSearchBar = ({ handleSearch }: SearchBarProps) => {
  const [currentQuery, setCurrentQuery] = useState('');

  const handleSearchQuery = () => {
    handleSearch(currentQuery);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSearchQuery();
    }
  };

  return (
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
      <Button type="button" color="secondary" onClick={handleSearchQuery}>
        검색
      </Button>
    </S.InputAndButtonWrapper>
  );
};

export default VideoSearchBar;
