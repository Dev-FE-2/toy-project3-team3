import * as S from './Alert.styles';
import { useEffect, useState } from 'react';
import ModalPortal from '../ModalPortal/ModalPortal';
import { AlertProps } from '@/types';

const Alert = ({ text, status }: AlertProps) => {
  const [show, setShow] = useState(true);
  const [shouldRender, setShouldRender] = useState(true);

  useEffect(() => {
    const fadeOutTimer = setTimeout(() => {
      setShow(false);
    }, 2500); // fadeOut 시작 시점

    const unmountTimer = setTimeout(() => {
      setShouldRender(false);
    }, 3000); // 컴포넌트 제거 시점

    return () => {
      clearTimeout(fadeOutTimer);
      clearTimeout(unmountTimer);
    };
  }, []);

  if (!shouldRender) return null;

  return (
    <ModalPortal>
      <S.AlertContainer $status={status} $show={show}>
        {status === 'success' ? '✅' : '❌'} {text}
      </S.AlertContainer>
    </ModalPortal>
  );
};

export default Alert;

/** 사용법
 * alert.success('성공했습니다')
 * alert.error('실패했습니다')
 */
