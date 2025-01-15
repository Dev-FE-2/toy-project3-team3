import { useState, useRef } from 'react';

export const useDragAndDrop = <T extends { id: string }>(
  items: T[],
  setItems: (items: T[]) => void,
  onCloseBottomSheet?: () => void,
) => {
  const [draggingIndex, setDraggingIndex] = useState<number | null>(null);
  const [dropTargetIndex, setDropTargetIndex] = useState<number | null>(null);
  const [dropPosition, setDropPosition] = useState<'top' | 'bottom' | null>(
    null,
  );
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const bottomSheetRef = useRef<HTMLDivElement>(null);
  const startY = useRef(0);
  const isDraggingBottomSheet = useRef(false);

  const handleItemDragStart = (e: React.DragEvent, index: number) => {
    setDraggingIndex(index);
    e.currentTarget.classList.add('dragging');
  };

  const handleItemDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();

    if (e.currentTarget.classList.contains('dragging')) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const offsetY = e.clientY - rect.top;
    const isOffsetYHalf = offsetY < rect.height / 2;

    if (dropTargetIndex !== null) {
      const prevTarget = itemRefs.current[dropTargetIndex];
      if (prevTarget) {
        prevTarget.classList.remove('drop-target-top', 'drop-target-bottom');
      }
    }

    if (isOffsetYHalf) {
      e.currentTarget.classList.add('drop-target-top');
      setDropPosition('top');
    } else {
      e.currentTarget.classList.add('drop-target-bottom');
      setDropPosition('bottom');
    }

    setDropTargetIndex(index);
  };

  const handleItemDrop = (e: React.DragEvent, targetIndex: number) => {
    e.preventDefault();

    if (
      draggingIndex === null ||
      dropTargetIndex === null ||
      dropPosition === null
    )
      return;

    if (draggingIndex === targetIndex) {
      resetDragState();
      return;
    }

    const newIndex = calculateNewIndex(
      draggingIndex,
      targetIndex,
      dropPosition,
    );

    const newItems = reorderItems(items, draggingIndex, newIndex);
    setItems(newItems);

    resetDragState();
  };

  const handleItemDragEnd = () => {
    resetDragState();
  };

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

  const calculateNewIndex = (
    draggingIndex: number,
    targetIndex: number,
    dropPosition: 'top' | 'bottom' | null,
  ) => {
    if (draggingIndex < targetIndex) {
      return dropPosition === 'top' ? targetIndex - 1 : targetIndex;
    } else {
      return dropPosition === 'top' ? targetIndex : targetIndex + 1;
    }
  };

  const reorderItems = (items: T[], fromIndex: number, toIndex: number) => {
    const newItems = [...items];
    const [draggedItem] = newItems.splice(fromIndex, 1);
    newItems.splice(toIndex, 0, draggedItem);
    return newItems;
  };

  const resetDragState = () => {
    if (dropTargetIndex !== null) {
      const target = itemRefs.current[dropTargetIndex];
      if (target) {
        target.classList.remove('drop-target-top', 'drop-target-bottom');
      }
    }
    if (draggingIndex !== null) {
      itemRefs.current[draggingIndex]?.classList.remove('dragging');
    }
    setDraggingIndex(null);
    setDropTargetIndex(null);
    setDropPosition(null);
  };

  return {
    itemRefs,
    bottomSheetRef,
    handleItemDragStart,
    handleItemDragOver,
    handleItemDrop,
    handleItemDragEnd,
    handleBottomSheetDragStart,
    handleBottomSheetDragMove,
    handleBottomSheetDragEnd,
  };
};
