import styled from 'styled-components';
import { Button } from '@/components';

export const NavContainer = styled.nav`
  display: flex;
  justify-content: space-between;
  gap: ${({ theme }) => theme.space.sm}; // 최소 gap
  align-items: center;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 2;
  border-top: 1px solid ${({ theme }) => theme.colors.gray.extraLight};
  background: ${({ theme }) => theme.colors.background};
  height: var(--nav-height); // 기본 높이 설정
`;

export const StyledPlusBtn = styled(Button)`
  transform: translateY(-30%);
`;
