import * as S from './Category.styles';
import { CategoryProps } from '@/types/common';

const Category = ({ content, isActive = false, onClick }: CategoryProps) => (
  <S.Category $isActive={isActive} onClick={onClick}>
    {content}
  </S.Category>
);

export default Category;

/**
 * 사용 예시
 * <Category 
    content={categoryContent} 
    // isActive={categoryContent === currCategory}
    // onClick={handleCategoryClick} 
  />
 */
