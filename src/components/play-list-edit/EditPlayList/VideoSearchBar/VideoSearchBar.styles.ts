import styled from 'styled-components';

export const InputAndButtonWrapper = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.space.md};
`;

export const ButtonContainer = styled.div`
  min-width: 41px;
`;

export const Error = styled.div`
  font-size: ${({ theme }) => theme.fontSize.xsm};
  color: ${({ theme }) => theme.colors.error};
  text-align: center;
`;
