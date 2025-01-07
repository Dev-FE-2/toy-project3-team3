import styled from 'styled-components';

export const ErrorContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space.lg};
  align-items: center;
  text-align: center;
`;

export const ErrorText = styled.h1`
  color: ${({ theme }) => theme.colors.error};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
`;

export const ErrorDetailText = styled.p`
  font-size: ${({ theme }) => theme.fontSize.lg};
`;
