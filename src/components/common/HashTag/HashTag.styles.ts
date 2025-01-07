import styled from 'styled-components';

export const HashTag = styled.div`
  display: inline-block;
  color: ${({ theme }) => theme.colors.gray.medium};
  cursor: pointer;
  &:hover {
    color: ${({ theme }) => theme.colors.gray.dark};
  }
`;
