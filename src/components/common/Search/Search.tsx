import * as S from './Search.styles';
import { useRef } from 'react';
import { useQueryState } from 'nuqs';
import { Icon } from '@/components/common';
import { SearchProps } from '@/types/common';

const Search = ({
  queryKey,
  placeholder = '사용자, 플레이리스트를 검색해보세요',
}: SearchProps) => {
  const [query, setQuery] = useQueryState(queryKey);
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <S.SearchContainer>
      <S.SearchInput
        type="text"
        ref={inputRef}
        value={query ?? ''}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={placeholder}
      />
      <Icon type="search" />
    </S.SearchContainer>
  );
};

export default Search;

/**
 * 사용 예시
 * <Search queryKey="search" />
 */
