import styled from 'styled-components';
import { GRAM_LOGO } from '@/constants';

export const HeaderContainer = styled.header.withConfig({
  shouldForwardProp: (prop) => !['$show'].includes(prop),
})<{ $show: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: fixed;
  top: ${({ $show }) => ($show ? '0' : 'calc(-2 * var(--header-height))')};
  left: 0;
  right: 0;
  padding: 0 ${({ theme }) => theme.space.md};
  background: ${({ theme }) => theme.colors.background};
  z-index: 2;
  transition: 0.5s;
  flex-direction: column;
`;

export const RightSection = styled.section`
  flex: 1;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

export const Logo = styled.img.attrs({
  src: GRAM_LOGO,
  alt: 'Gram Logo',
})`
  height: var(--header-height);
  width: auto;
`;

export const Row = styled.div`
  width: 100%;
  display: flex;
`;

export const CategoryList = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.space.md};
  overflow: auto;
  white-space: nowrap;

  &::-webkit-scrollbar {
    display: none;
  }
`;
