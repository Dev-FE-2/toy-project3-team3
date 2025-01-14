import { ROUTES } from './routes';

const { AUTH_CALLBACK, SIGN_IN, SIGN_UP, SEARCH, HOME } = ROUTES;

export const PUBLIC_PATHS = [
  AUTH_CALLBACK,
  SIGN_IN,
  SIGN_UP,
  SEARCH,
  HOME,
] as const;
