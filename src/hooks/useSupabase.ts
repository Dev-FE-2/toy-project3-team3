import { useContext } from 'react';
import { SupabaseContext } from '@/contexts/SupabaseContext';

export function useSupabase() {
  const context = useContext(SupabaseContext);
  if (!context) {
    throw new Error(
      '❌useSupabase를 사용하려면 SupabaseProvider의 내부에 작성해야 합니다.',
    );
  }

  return context;
}
