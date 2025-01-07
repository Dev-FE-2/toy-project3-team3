import { PanelContainer } from '../Tabs.styles';
import { useTabsContext } from '../context/TabsContext';
import { TabPanelProps } from '@/types';

const Panel = ({ value, children }: TabPanelProps) => {
  const { selectedIndex, label } = useTabsContext();

  if (value !== selectedIndex) return null;

  return (
    <PanelContainer
      id={`${label}-panel-${value}`}
      role="tabpanel"
      aria-labelledby={`${label}-trigger-${value}`}
    >
      {children}
    </PanelContainer>
  );
};

export default Panel;
