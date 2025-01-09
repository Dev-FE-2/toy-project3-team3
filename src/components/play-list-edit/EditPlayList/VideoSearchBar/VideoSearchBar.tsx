import { useState } from 'react';
import { Button } from '@/components/common';

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
      handleSearchQuery();
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
      <Button type="button" color="secondary" onClick={handleSearchQuery}>
        검색
      </Button>
    </div>
  );
};

export default VideoSearchBar;
