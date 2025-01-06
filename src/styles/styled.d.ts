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
        grayExtraLight: string;
        grayLight: string;
        grayMedium: string;
        grayDark: string;
        grayExtraDark: string;
      };
      text: string;
    };
    fontWeight: {
      bold: number;
      regular: number;
      thin: number;
    };
    lineHeight: {
      md: number;
    };
    fontSize: {
      xxlg: string;
      xlg: string;
      lg: string;
      md: string;
      sm: string;
      xsm: string;
    };
    borderRadius: {
      sm: string;
      md: string;
      lg: string;
      xlg: string;
    };
    boxShadow: string;
    space: {
      xxsm: string;
      xsm: string;
      sm: string;
      md: string;
      lg: string;
      xlg: string;
      xxlg: string;
    };
  }
}
