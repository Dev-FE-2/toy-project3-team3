import styled from 'styled-components';
import { GRAM_LOGO } from '@/constants';

export const HeaderContainer = styled.header.withConfig({
  shouldForwardProp: (prop) => !['$isShow'].includes(prop),
})<{ $isShow: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: fixed;
  top: ${({ $isShow }) => ($isShow ? '0' : 'calc(-1 * var(--header-height))')};
  left: 0;
  right: 0;
  height: var(--header-height);
  padding: 0 ${({ theme }) => theme.space.md};
  background: ${({ theme }) => theme.colors.background};
  z-index: 2;
  transition: 0.5s;
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
