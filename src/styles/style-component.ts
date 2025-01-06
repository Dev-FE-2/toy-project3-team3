import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      black: string;
      white: string;
      background: string;
      primary: string;
      secondary: string;
      accent: string;
      error: string;
      warning: string;
      success: string;
      highlight: string;
      opacity: {
        darken1: string;
        darken2: string;
      };
      grayscale: {
        '100': string;
        '200': string;
        '300': string;
        '400': string;
        '500': string;
      };
      text: string;
    };
    fontWeight: {
      bold: number;
      regular: number;
      thin: number;
    };
    lineHeight: {
      m: number;
    };
    fontSize: {
      xxl: string;
      xl: string;
      l: string;
      m: string;
      s: string;
      xs: string;
    };
    borderRadius: {
      s: string;
      m: string;
      l: string;
      xl: string;
    };
    boxShadow: string;
    space: {
      xxs: string;
      xs: string;
      s: string;
      m: string;
      l: string;
      xl: string;
      xxl: string;
    };
  }
}
