import styled from 'styled-components';

export const Category = styled.div<{ $isActive: boolean }>`
  display: inline-block;
  padding: ${({ theme }) => theme.space.xsm};
  border: 1.3px solid
    ${({ $isActive, theme }) =>
      $isActive ? theme.colors.secondary : theme.colors.gray.dark};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  background-color: ${({ $isActive, theme }) =>
    $isActive && theme.colors.secondary};
  color: ${({ $isActive, theme }) =>
    $isActive ? theme.colors.white : theme.colors.gray.dark};
  &:hover {
    color: ${({ $isActive, theme }) => !$isActive && theme.colors.secondary};
    border: 1.3px solid ${({ theme }) => theme.colors.secondary};
  }
  cursor: pointer;
`;
