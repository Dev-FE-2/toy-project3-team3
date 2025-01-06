import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';
import { mediaQuery } from './mediaQuery';

const GlobalStyles = createGlobalStyle`
  ${reset};

  * {
    box-sizing: border-box;
  }

  body {
    font-family: 'Pretendard', sans-serif;
    line-height: ${({ theme }) => theme.lineHeight.md};
    font-weight: ${({ theme }) => theme.fontWeight.bold};
    font-size: ${({ theme }) => theme.fontSize.md};
    color: ${({ theme }) => theme.colors.text};
    background: ${({ theme }) => theme.colors.background};

    font-synthesis: none;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  p, h1, h2, h3, h4, div, span {
    word-break: keep-all; // 단어 단위 줄바꿈
  }

  img {
    display: block;
  }

  ${mediaQuery.mobile`
    body {
      font-size: ${({ theme }) => theme.fontSize.sm};
    }
  `}
`;

export default GlobalStyles;
