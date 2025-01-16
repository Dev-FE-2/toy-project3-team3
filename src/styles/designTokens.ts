import { css } from 'styled-components';
import { Theme } from './theme';

export const createLayoutTokens = (theme: Theme) => css`
  --nav-height: ${theme.layout.nav.baseHeight};
  --header-height: ${theme.layout.header.baseHeight};

  @supports (height: max(0px)) {
    --nav-height: ${theme.layout.nav.withSafeArea};
    --header-height: ${theme.layout.header.withSafeArea};
  }
`;
