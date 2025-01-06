import { useContext } from 'react';

const useTabsContext = () => {
  const context = useContext(TabsContext);
  if (context === null) {
    throw new Error('useTabsContext는 Tabs 안에서 쓰여야 합니다');
  }
  return context;
};

export default useTabsContext;
