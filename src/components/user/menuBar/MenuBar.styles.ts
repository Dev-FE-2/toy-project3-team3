import styled from 'styled-components';

export const MenuBarContainer = styled.div<{ $show: boolean }>`
  position: fixed;
  background: ${({ theme }) => theme.colors.opacity.darken1};
  z-index: 2;
  margin-top: var(--header-height);
  margin-bottom: var(--nav-height);
  backdrop-filter: blur(1px);
  width: 100%;
  height: calc(100vh - var(--header-height) - var(--nav-height));
  animation: ${({ $show }) => $show && 'fadeIn'} 0.3s ease-in-out;
  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

export const Menubar = styled.div<{ $show: boolean }>`
  position: fixed;
  right: 0;
  height: 100%;
  background: ${({ theme }) => theme.colors.gray.medium};
  padding: ${({ theme }) => theme.space.md};
  color: ${({ theme }) => theme.colors.white};
  display: flex;
  align-items: flex-start;
  flex-direction: column;

  animation: ${({ $show }) => $show && 'slideIn'} 0.3s ease-in-out;

  @keyframes slideIn {
    from {
      transform: translateX(100%);
    }
    to {
      transform: translateX(0);
    }
  }
`;

export const MenuBarItem = styled.button`
  &:first-of-type {
    margin-top: ${({ theme }) => theme.space.md};
  }

  padding: ${({ theme }) => theme.space.md};
  background: none;
  font-size: ${({ theme }) => theme.fontSize.md};
  color: ${({ theme }) => theme.colors.gray.extraDark};
  transition: color 0.3s;
  &:hover {
    color: ${({ theme }) => theme.colors.white};
  }
`;
