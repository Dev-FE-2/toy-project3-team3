import { useRef } from 'react';

export const useBottomSheetDragAndDrop = (onCloseBottomSheet?: () => void) => {
  const bottomSheetRef = useRef<HTMLDivElement>(null);
  const startY = useRef(0);
  const isDraggingBottomSheet = useRef(false);

  const handleBottomSheetDragStart = (
    e: React.MouseEvent | React.TouchEvent,
  ) => {
    isDraggingBottomSheet.current = true;
    startY.current =
      'touches' in e ? e.touches[0].clientY : (e as React.MouseEvent).clientY;
  };

  const handleBottomSheetDragMove = (
    e: React.MouseEvent | React.TouchEvent,
  ) => {
    if (!isDraggingBottomSheet.current || !bottomSheetRef.current) return;

    const currentY =
      'touches' in e ? e.touches[0].clientY : (e as React.MouseEvent).clientY;
    const deltaY = currentY - startY.current;

    if (deltaY > 0) {
      bottomSheetRef.current.style.transform = `translateY(${deltaY}px)`;
    }
  };
  const handleBottomSheetDragEnd = () => {
    if (!isDraggingBottomSheet.current || !bottomSheetRef.current) return;

    const deltaY = parseFloat(
      bottomSheetRef.current.style.transform
        .replace('translateY(', '')
        .replace('px)', ''),
    );

    if (deltaY > 100 && onCloseBottomSheet) {
      onCloseBottomSheet();
    }

    bottomSheetRef.current.style.transform = 'translateY(0)';
    isDraggingBottomSheet.current = false;
  };

  return {
    bottomSheetRef,
    handleBottomSheetDragStart,
    handleBottomSheetDragMove,
    handleBottomSheetDragEnd,
  };
};
