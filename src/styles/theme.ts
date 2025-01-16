import { DefaultTheme } from 'styled-components';
import mediaQuery from './mediaQuery';
import { SAFE_AREA } from '@/constants';

export const theme: DefaultTheme = {
  colors: {
    black: '#000',
    white: '#fff',
    background: '#F6F3EC',
    primary: '#B39977',
    secondary: '#694F36',
    accent: '#332518',
    error: '#DE0000',
    warning: '#FFE28B',
    success: '#B3E7BB',
    highlight: '#0090FF',
    opacity: {
      darken1: 'rgba(0, 0, 0, 0.12)',
      darken2: 'rgba(0, 0, 0, 0.18)',
    },
    gray: {
      extraLight: '#CCC',
      light: '#BBB',
      medium: '#999',
      dark: '#777',
      extraDark: '#555',
    },
    text: '#333',
  },

  fontWeight: {
    bold: 700,
    regular: 400,
    thin: 100,
  },

  lineHeight: {
    md: 1.5,
  },

  fontSize: {
    xxlg: 'clamp(4rem, 4.5vw, 6rem)',
    xlg: 'clamp(2rem, 4vw, 4rem)',
    lg: 'clamp(1.25rem, 1.5vw, 2rem)',
    md: 'clamp(1rem, 1.3vw, 1.25rem)',
    sm: 'clamp(0.875rem, 1.5vw, 1rem)',
    xsm: 'clamp(0.75rem, 1vw, 0.875rem)',
  },

  borderRadius: {
    sm: '5px',
    md: '10px',
    lg: '20px',
    xlg: '50%',
  },

  boxShadow: '4px 8px 16px rgba(0, 0, 0, 0.5)',

  space: {
    xxsm: '2px',
    xsm: '4px',
    sm: '8px',
    md: '16px',
    lg: '32px',
    xlg: '64px',
    xxlg: '128px',
  },
  layout: {
    nav: {
      baseHeight: '50px',
      withSafeArea: `max(50px, calc(50px + ${SAFE_AREA.bottom}))`,
    },
    header: {
      baseHeight: '40px',
      withSafeArea: `max(40px, calc(40px + ${SAFE_AREA.top}))`,
    },
    width: '768px',
  },
  ...mediaQuery,
} as const;

export type Theme = typeof theme;
