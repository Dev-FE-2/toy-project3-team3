import styled from 'styled-components';

export const InputAndButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.space.md};
  margin-bottom: ${({ theme }) => theme.space.lg};
`;

export const ButtonContainer = styled.div`
  min-width: 41px;
`;

export const Error = styled.div`
  font-size: ${({ theme }) => theme.fontSize.xsm};
  color: ${({ theme }) => theme.colors.error};
  text-align: center;
`;
