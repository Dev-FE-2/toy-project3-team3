import styled from 'styled-components';

export const SearchContainer = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.space.md};
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

export const SearchInput = styled.input`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.gray.medium};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  outline: none;
  border: none;
  transition: background-color 0.3s;
  &::placeholder {
    color: ${({ theme }) => theme.colors.white};
  }
  &:focus {
    background-color: ${({ theme }) => theme.colors.gray.light};
  }
  padding: ${({ theme }) => theme.space.sm};
`;

export const SearchWordZone = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.space.sm};
`;

export const TapZone = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  margin: ${({ theme }) => theme.space.sm} 0;
  gap: ${({ theme }) => theme.space.sm};
`;

export const TapContent = styled.div<{ $isActive: boolean }>`
  padding: ${({ theme }) => theme.space.xsm};
  color: ${({ theme }) => theme.colors.accent};
  box-sizing: border-box;
  border-bottom: ${({ $isActive }) => ($isActive ? '2px' : '0')} solid
    ${({ theme }) => theme.colors.accent};
`;
