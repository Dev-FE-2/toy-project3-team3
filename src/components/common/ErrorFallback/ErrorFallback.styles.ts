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

export const RetryBtn = styled.button`
  position: relative;
  color: ${({ theme }) => theme.colors.white};
  padding: ${({ theme }) => theme.space.sm};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  background-color: ${({ theme }) => theme.colors.gray.extraLight};
  transition: background-color 0.3s;
  &:hover {
    overflow: hidden;
    &::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: ${({ theme }) => theme.colors.opacity.darken1};
      pointer-events: none;
    }
  }
`;
