import { useState } from 'react';
import * as S from './Tabs.styles';
import { TabsContext } from './context/TabsContext';
import { TabsProps } from '@/types';
import List from './components/List';
import Panel from './components/Panel';
import Trigger from './components/Trigger';

const Tabs = ({ label, defaultValue, children }: TabsProps) => {
  const [selectedIndex, setSelectedIndex] = useState(defaultValue);

  const providerValue = {
    selectedIndex,
    setSelectedIndex,
    label,
  };

  return (
    <TabsContext.Provider value={providerValue}>
      <S.TabsContainer>{children}</S.TabsContainer>
    </TabsContext.Provider>
  );
};

Tabs.List = List;
Tabs.Trigger = Trigger;
Tabs.Panel = Panel;

export default Tabs;

/**
 * 사용 예시
 * <Tabs defaultValue={1} label="검색 탭">
    <Tabs.List>
      <Tabs.Trigger value={1} text="사용자" />
      <Tabs.Trigger value={2} text="플레이리스트" />
    </Tabs.List>
    <Tabs.Panel value={1}>
      <div>요소1</div>
    </Tabs.Panel>
    <Tabs.Panel value={2}>
      <div>요소2</div>
    </Tabs.Panel>
  </Tabs>
 */
