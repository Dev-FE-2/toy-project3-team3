import { Btn, TabText } from '../Tabs.styles';
import { TabTriggerProps } from '@/types';
import { useTabsContext } from '../context/TabsContext';

const Trigger = ({ value, text }: TabTriggerProps) => {
  const { selectedIndex, setSelectedIndex, label } = useTabsContext();
  const isActive = selectedIndex === value;

  const onSelect = () => {
    setSelectedIndex(value);
  };

  return (
    <Btn
      id={`${label}-trigger-${value}`}
      role="tab"
      aria-selected={isActive}
      aria-controls={`${label}-panel-${value}`}
      onClick={onSelect}
    >
      <TabText $isActive={isActive}>{text}</TabText>
    </Btn>
  );
};

export default Trigger;
