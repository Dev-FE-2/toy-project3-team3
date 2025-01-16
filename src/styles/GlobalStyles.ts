import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';
import mediaQuery from './mediaQuery';
import { createLayoutTokens } from './designTokens';

const GlobalStyles = createGlobalStyle`
  ${reset};

  :root {
    ${({ theme }) => createLayoutTokens(theme)}
  }

  * {
    box-sizing: border-box;

    &::-webkit-scrollbar {
      width: 8px;
    }

    &::-webkit-scrollbar-track {
      background: ${({ theme }) => theme.colors.gray.extraLight};
      border-radius: ${({ theme }) => theme.borderRadius.sm};
    }

    &::-webkit-scrollbar-thumb {
      background: ${({ theme }) => theme.colors.gray.medium};
      border-radius: ${({ theme }) => theme.borderRadius.sm};
    }

    &::-webkit-scrollbar-thumb:hover {
      background: ${({ theme }) => theme.colors.gray.dark};
      cursor: pointer;
    }
  }

  body {
    font-family: 'Pretendard', sans-serif;
    line-height: ${({ theme }) => theme.lineHeight.md};
    font-weight: ${({ theme }) => theme.fontWeight.regular};
    font-size: ${({ theme }) => theme.fontSize.md};
    color: ${({ theme }) => theme.colors.text};
    background: ${({ theme }) => theme.colors.background};

    font-synthesis: none;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    -webkit-overflow-scrolling: touch;
  }

  p, h1, h2, h3, h4, div, span {
    word-break: keep-all; // 단어 단위 줄바꿈
  }

  input {
    outline: none;
    border: none;
    background-color: transparent;
  }
  
  button {
    border: none;
    padding: 0;
    display: inline-block;
    cursor: pointer;
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
