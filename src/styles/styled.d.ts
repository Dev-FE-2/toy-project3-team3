import 'styled-components';
import { Theme } from './theme';

declare module 'styled-components' {
  export interface DefaultTheme extends Theme {
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
      gray: {
        extraLight: string;
        light: string;
        medium: string;
        dark: string;
        extraDark: string;
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
    layout: {
      nav: {
        baseHeight: string;
        withSafeArea: string;
      };
      header: {
        baseHeight: string;
        withSafeArea: string;
      };
      width: string;
    };
  }
}
