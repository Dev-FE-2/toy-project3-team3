import { useBottomSheetDragAndDrop } from '@/hooks';
import * as S from './BottomSheet.styles';
import { Icon } from '@/components/common';
import { ReactNode } from 'react';

interface BottomSheetProps {
  title: string;
  isOpen: boolean;
  handleBottomSheetClose: () => void;
  children: ReactNode;
}

const BottomSheet = ({
  title,
  isOpen,
  handleBottomSheetClose,
  children,
}: BottomSheetProps) => {
  const {
    bottomSheetRef,
    handleBottomSheetDragEnd,
    handleBottomSheetDragMove,
    handleBottomSheetDragStart,
  } = useBottomSheetDragAndDrop(handleBottomSheetClose);

  return (
    <>
      <S.Overlay isOpen={isOpen} onClick={handleBottomSheetClose} />
      <S.BottomSheet
        isOpen={isOpen}
        ref={bottomSheetRef}
        onMouseDown={handleBottomSheetDragStart}
        onMouseMove={handleBottomSheetDragMove}
        onMouseUp={handleBottomSheetDragEnd}
        onMouseLeave={handleBottomSheetDragEnd}
        onTouchStart={handleBottomSheetDragStart}
        onTouchMove={handleBottomSheetDragMove}
        onTouchEnd={handleBottomSheetDragEnd}
      >
        <S.BottomSheetHeader
          onMouseDown={handleBottomSheetDragStart}
          onTouchStart={handleBottomSheetDragStart}
        >
          <h2>{title}</h2>
          <S.BottomSheetIconContainer>
            <Icon type="bottomSheet" />
          </S.BottomSheetIconContainer>
          <Icon type="cancel" onClick={handleBottomSheetClose} />
        </S.BottomSheetHeader>
        <S.BottomSheetContent>{children}</S.BottomSheetContent>
      </S.BottomSheet>
    </>
  );
};

export default BottomSheet;
