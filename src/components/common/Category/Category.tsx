import * as S from './Category.styles';
import { CategoryProps } from '@/types';

const Category = ({
  type = 'tab',
  content,
  isActive = false,
  onClick,
}: CategoryProps) => {
  // tab으로 사용될 때의 props
  const tabProps = {
    role: 'tab',
    'aria-selected': isActive,
    'aria-controls': `panel-${content}`,
    id: `tab-${content}`,
  };
  // 정보 표시용으로 사용될 때의 props
  const markProps = {
    role: 'button',
  };

  const props = type === 'tab' ? tabProps : markProps;

  return (
    <S.Category $isActive={isActive} onClick={onClick} {...props}>
      {content}
    </S.Category>
  );
};

export default Category;

/**
 * 사용 예시
 * <Category 
 *  type = 'tab', // 메인 페이지에선 tab, 카테고리 표시 용도는 mark 
    content={categoryContent} 
    // isActive={categoryContent === currCategory}
    // onClick={handleCategoryClick} 
  />
 */
