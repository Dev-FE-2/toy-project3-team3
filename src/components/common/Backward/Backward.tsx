import * as S from './Backward.styles';
import { Icon } from '@/components/common';
import { useNavigate } from 'react-router-dom';

const Backward = () => {
  const navigate = useNavigate();

  return (
    <S.BackwardWrapper>
      <Icon type="backward" onClick={() => navigate(-1)} />
    </S.BackwardWrapper>
  );
};

export default Backward;

/**
 * 사용 예시
 * <Backward />
 */
