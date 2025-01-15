import { ApiError } from '@/types';

export const isApiError = (error: unknown): error is ApiError => {
  return error instanceof Error && 'status' in error;
};

export default isApiError;
