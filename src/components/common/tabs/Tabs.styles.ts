import styled from 'styled-components';

export const TabsContainer = styled.section`
  display: flex;
  flex-direction: column;
`;

export const ListContainer = styled.header`
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray.extraLight};
  position: relative;
`;

export const PanelContainer = styled.section`
  padding: ${({ theme }) => theme.space.sm};
`;

// Trigger
export const Btn = styled.button`
  cursor: pointer;
  background-color: transparent;
`;

export const TabText = styled.p<{ $isActive: boolean }>`
  color: ${({ $isActive, theme }) => $isActive && theme.colors.secondary};
  font-weight: ${({ $isActive, theme }) => $isActive && theme.fontWeight.bold};
  padding: ${({ theme }) => theme.space.sm};
  border-bottom: 1.5px solid
    ${({ $isActive, theme }) =>
      $isActive ? theme.colors.secondary : 'transparent'};
  margin-bottom: -1px;
  position: relative;
  z-index: 1;
`;
