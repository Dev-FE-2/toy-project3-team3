import styled from 'styled-components';
import { IoWarningOutline } from 'react-icons/io5';

export const ConfirmContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: ${({ theme }) => theme.colors.warning};
  padding: ${({ theme }) => theme.space.md} ${({ theme }) => theme.space.lg};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  white-space: nowrap;
  z-index: 3;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.space.md};
  text-align: center;
`;

export const WarningIcon = styled(IoWarningOutline)`
  font-size: ${({ theme }) => theme.fontSize.xxlg};
  color: ${({ theme }) => theme.colors.secondary};
`;

export const BtnContainer = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.space.sm};
`;
