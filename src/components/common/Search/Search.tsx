import * as S from './Search.styles';
import { useState, useRef, useEffect } from 'react';
import { useQueryState } from 'nuqs';
import { Icon } from '@/components/common';
import { SearchProps } from '@/types';

const Search = ({
  queryKey,
  placeholder = '사용자, 플레이리스트를 검색해보세요',
}: SearchProps) => {
  const [query, setQuery] = useQueryState(queryKey);
  const [inputValue, setInputValue] = useState(query ?? '');
  const inputRef = useRef<HTMLInputElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value); // input 값은 즉시 업데이트

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      setQuery(value); // URL 쿼리 업데이트는 입력 끝나고 300ms 후에
    }, 300);
  };

  const handleSearchIconClick = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setQuery(inputValue); // 현재 input 값으로 즉시 쿼리 업데이트
  };

  return (
    <S.SearchContainer role="search" aria-label="검색">
      <S.SearchInput
        id="search-input"
        type="search"
        ref={inputRef}
        value={query ?? ''}
        onChange={handleChange}
        placeholder={placeholder}
        aria-label="검색어 입력"
      />
      <Icon type="search" onClick={handleSearchIconClick} />
    </S.SearchContainer>
  );
};

export default Search;

/**
 * 사용 예시
 * <Search queryKey="search" />
 */
