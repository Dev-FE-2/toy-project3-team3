import styled from 'styled-components';
import { GRAM_LOGO } from '@/constants';

export const HeaderContainer = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: var(--header-height);
  padding: 0 ${({ theme }) => theme.space.md};
  background: ${({ theme }) => theme.colors.background};
  z-index: 2;
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
