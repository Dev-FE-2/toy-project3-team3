import * as S from './Search.styles';
import { useState, useRef } from 'react';
import { useQueryState } from 'nuqs';
import { Icon } from '@/components/common';
import { SearchProps } from '@/types';

const Search = ({
  queryKey,
  placeholder = '사용자, 플레이리스트를 검색해보세요',
  onQueryChange = () => {},
}: SearchProps) => {
  const [query, setQuery] = useQueryState(queryKey);
  const [tab, setTab] = useQueryState('tab', { defaultValue: 'user' });
  const [inputValue, setInputValue] = useState(query ?? '');
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value); // input 값은 즉시 업데이트

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      setQuery(value); // URL 쿼리 업데이트는 입력 끝나고 300ms 후에
      onQueryChange(value, tab);
    }, 300);
  };

  const handleTabChange = (newTab: string) => {
    setTab(newTab); // URL에 tab 파라미터 추가
    onQueryChange(inputValue, newTab);
  };

  const handleSearchIconClick = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setQuery(inputValue); // 현재 input 값으로 즉시 쿼리 업데이트
    onQueryChange(inputValue, tab);
  };

  return (
    <S.SearchContainer role="search" aria-label="검색">
      <S.SearchWordZone>
        <S.SearchInput
          id="search-input"
          type="search"
          value={inputValue}
          onChange={handleChange}
          placeholder={placeholder}
          aria-label="검색어 입력"
          autoComplete="off"
        />
        <Icon type="search" onClick={handleSearchIconClick} />
      </S.SearchWordZone>
      <S.TapZone>
        <S.TapContent
          $isActive={tab === 'user'}
          onClick={() => handleTabChange('user')}
        >
          사용자
        </S.TapContent>
        <S.TapContent
          $isActive={tab === 'playlists'}
          onClick={() => handleTabChange('playlists')}
        >
          플레이리스트
        </S.TapContent>
      </S.TapZone>
    </S.SearchContainer>
  );
};

export default Search;

/**
 * 사용 예시
 * <Search queryKey="search" />
 */
