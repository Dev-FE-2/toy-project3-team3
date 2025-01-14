import { useEffect, useState } from 'react';
import ModalPortal from '../ModalPortal/ModalPortal';
import * as S from './Alert.styles';
import { AlertProps } from '@/types';

const Alert = ({ text, status }: AlertProps) => {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShow(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  if (!show) return null;

  return (
    <ModalPortal>
      <S.AlertContainer $status={status} $show={show}>
        {text}
      </S.AlertContainer>
    </ModalPortal>
  );
};

export default Alert;
