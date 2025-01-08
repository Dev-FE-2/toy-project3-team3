import { useState } from 'react';
import { Button } from '@/components/common';

type SearchBarProps = {
  onSearch: (q: string) => void;
};

const VideoSearchBar = ({ onSearch }: SearchBarProps) => {
  const [currentQuery, setCurrentQuery] = useState('');

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      onSearch(currentQuery);
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
      <Button
        type="button"
        color="secondary"
        onClick={() => onSearch(currentQuery)}
      >
        검색
      </Button>
    </div>
  );
};

export default VideoSearchBar;
