import styled from 'styled-components';
import { StyledAlertProps } from '@/types';

export const AlertContainer = styled.div<StyledAlertProps>`
  position: fixed;
  /* bottom: 50px; */
  bottom: var(--nav-height);
  margin-bottom: ${({ theme }) => theme.space.sm};
  right: ${({ theme }) => theme.space.sm};
  background: ${({ theme, $status }) =>
    $status === 'success' ? theme.colors.success : theme.colors.error};
  padding: ${({ theme }) => theme.space.sm};
  font-size: ${({ theme }) => theme.fontSize.xsm};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  z-index: 3;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;

  animation: ${({ $show }) => ($show ? 'fadeIn' : 'fadeOut')} 0.5s;

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateX(30px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  @keyframes fadeOut {
    from {
      opacity: 1;
      transform: translateX(0);
    }
    to {
      opacity: 0;
      transform: translateX(30px);
    }
  }
`;
