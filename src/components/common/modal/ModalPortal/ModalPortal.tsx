import * as S from './ModalPortal.styles';
import { createPortal } from 'react-dom';
import { ModalPortalProps } from '@/types';

const ModalPortal = ({ children, blockClick }: ModalPortalProps) => {
  const modalRoot = document.getElementById('modal') as HTMLElement;

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (blockClick) {
      e.stopPropagation();
    }
  };
  return createPortal(
    <S.Overlay $blockClick={blockClick} onClick={handleOverlayClick}>
      {children}
    </S.Overlay>,
    modalRoot,
  );
};

export default ModalPortal;
