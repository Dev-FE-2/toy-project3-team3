import styled from 'styled-components';

export const SearchContainer = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.space.md};
  align-items: center;
  justify-content: center;
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
