import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

const GlobalStyles = createGlobalStyle`
  ${reset};

  * {
    box-sizing: border-box;
  }

  html {
    font-size: 100%; /* 16px */
  }

  body {
    font-family: 'Pretendard', sans-serif;
    line-height: var(--line-hight-m);
    font-weight: var(--font-bold);
    color: var(--colortext);
    background-color: var(--color-backgroud);
    font-size: var(--font-m);
  }

  p, h1, h2, h3, h4, div, span {
    word-break: keep-all; // 단어 단위 줄바꿈
  }

  img {
    display: block;
  }

  @media (max-width: 576px) {
    /* 모바일 디바이스 */
    html {
      font-size: var(--font-s);
    }
  }
`;

export default GlobalStyles;
