import { CategoryContextType } from '@/types';
import { createContext, useContext } from 'react';

export const CategoryContext = createContext<CategoryContextType | null>(null);

export const useCategoryContext = () => {
  const context = useContext(CategoryContext);
  if (context === null) {
    throw new Error('useCategoryContext는 Category 안에서 쓰여야 합니다');
  }
  return context;
};
