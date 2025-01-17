import styled from 'styled-components';

interface StyledBottomSheetProps {
  isOpen: boolean;
}

export const Overlay = styled.div<StyledBottomSheetProps>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
  display: ${({ isOpen }) => (isOpen ? 'block' : 'none')};
`;

export const BottomSheet = styled.div<StyledBottomSheetProps>`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: ${({ isOpen }) => (isOpen ? '70vh' : '0')};
  background-color: ${({ theme }) => theme.colors.white};
  box-shadow: ${({ theme }) => theme.boxShadow};
  transition: height 0.3s ease-in-out;
  overflow: hidden;
  z-index: 1000;
  touch-action: none;
`;

export const BottomSheetHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${({ theme }) => theme.space.md};
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray.extraLight};
  cursor: grab;
`;

export const BottomSheetContent = styled.div`
  padding: ${({ theme }) => theme.space.md};
  overflow-y: auto;
  height: calc(100% - 60px);
`;

export const BottomSheetIconContainer = styled.div`
  margin-right: ${({ theme }) => theme.space.lg};
`;
