import * as S from './Select.styles';
import { SelectProps } from '@/types/common';
import {
  CATEGORY_OPTIONS,
  SORT_COMMENT_OPTIONS,
  SORT_ETC_OPTIONS,
} from '@/constants';
import { createOptions } from '@/utils';

export const Select = ({ type, value, onChange }: SelectProps) => {
  const options = {
    category: createOptions(CATEGORY_OPTIONS),
    sortComment: createOptions(SORT_COMMENT_OPTIONS),
    sortEtc: createOptions(SORT_ETC_OPTIONS),
  }[type];

  return (
    <S.Select value={value} onChange={(e) => onChange(e.target.value)}>
      {options.map(({ value, label }) => (
        <option key={value} value={value}>
          {label}
        </option>
      ))}
    </S.Select>
  );
};

export default Select;

/**
 * 사용 예시
 * const [category, setCategory] = useState<CategoryType>('all');
  <Select 
    type="category" 
    value={category} 
    onChange={(value: CategoryType) => setCategory(value)}
  />

  // 댓글 
  const [sortComment, setSortComment] = useState<SortCommentType>('latest');
  <Select 
    type="sortComment" 
    value={sortComment} 
    onChange={(value: SortCommentType) => setSortComment(value)}
  />

  // 팔로잉, 구독, 좋아요
  const [sortEtc, setSortEtc] = useState<SortEtcType>('latest');
  <Select 
    type="sortEtc" 
    value={sortEtc} 
    onChange={(value: SortEtcType) => setSortEtc(value)} 
  />
 */
