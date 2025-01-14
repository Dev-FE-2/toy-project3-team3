import styled from 'styled-components';
import { StyledAlertProps } from '@/types';

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
`;

export const AlertContainer = styled.div<StyledAlertProps>`
  background: ${({ theme, $status }) =>
    $status === 'success' ? theme.colors.success : theme.colors.error};
  padding: ${({ theme }) => theme.space.lg};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: center;
  /* text-align: center; */

  animation: ${({ $show }) => ($show ? 'fadeIn' : 'fadeOut')} 0.3s;
  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @keyframes fadeOut {
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
    }
  }
`;
