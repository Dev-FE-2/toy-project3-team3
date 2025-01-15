import styled from 'styled-components';

export const InputAndButtonWrapper = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.space.md};
`;

export const ButtonContainer = styled.div`
  min-width: 41px;
`;
