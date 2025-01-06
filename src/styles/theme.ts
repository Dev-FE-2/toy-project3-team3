import { DefaultTheme } from 'styled-components';
import { mediaQuery } from './mediaQuery';

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
    grayscale: {
      500: '#555',
      400: '#777',
      300: '#999',
      200: '#CCC',
      100: '#F0F0F0',
    },
    text: '#333',
  },

  fontWeight: {
    bold: 700,
    regular: 400,
    thin: 100,
  },

  lineHeight: {
    m: 1.5,
  },

  fontSize: {
    xxl: 'clamp(4rem, 4.5vw, 6rem)',
    xl: 'clamp(2rem, 4vw, 4rem)',
    l: 'clamp(1.25rem, 1.5vw, 2rem)',
    m: 'clamp(1rem, 1.3vw, 1.25rem)',
    s: 'clamp(0.875rem, 1.5vw, 1rem)',
    xs: 'clamp(0.75rem, 1vw, 0.875rem)',
  },

  borderRadius: {
    s: '5px',
    m: '10px',
    l: '20px',
    xl: '50%',
  },

  boxShadow: '4px 8px 16px rgba(0, 0, 0, 0.5)',

  space: {
    xxs: '2px',
    xs: '4px',
    s: '8px',
    m: '16px',
    l: '32px',
    xl: '64px',
    xxl: '128px',
  },
  ...mediaQuery,
} as const;
