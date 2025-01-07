import * as S from './HashTag.styles';
import { HashTagProps } from '@/types/common';

const HashTag = ({ content, onClick }: HashTagProps) => (
  <S.HashTag onClick={onClick} aria-label={`해시태그 ${content}`}>
    #{content}
  </S.HashTag>
);

export default HashTag;

/**
 * 사용 예시
 * <HashTag 
    content={hastagContent} 
    // onClick={handleHashTagClick} 
  />
 */
