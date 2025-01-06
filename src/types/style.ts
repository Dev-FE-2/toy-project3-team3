import { DefaultTheme } from 'styled-components';

export type CSSValue =
  | string
  | number
  | ((props: { theme: DefaultTheme }) => string | number)
  | null
  | undefined;

export interface MediaQueryProps {
  [key: string]: number;
}
