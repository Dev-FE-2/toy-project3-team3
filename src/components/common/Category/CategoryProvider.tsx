import { ReactNode, useState } from 'react';
import { CategoryContext } from './CategoryContext';

export const CategoryProvider = ({ children }: { children: ReactNode }) => {
  const [currCategory, setCurrCategory] = useState('all');

  return (
    <CategoryContext.Provider value={{ currCategory, setCurrCategory }}>
      {children}
    </CategoryContext.Provider>
  );
};
