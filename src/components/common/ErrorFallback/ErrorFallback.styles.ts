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
`;

export const ErrorDetailText = styled.p`
  font-size: ${({ theme }) => theme.fontSize.lg};
  color: ${({ theme }) => theme.colors.gray.dark};
`;

export const BtnWrapper = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.space.sm};
`;

const BaseBtn = styled.button`
  position: relative;
  color: ${({ theme }) => theme.colors.white};
  padding: ${({ theme }) => theme.space.sm};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
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

export const RetryBtn = styled(BaseBtn)`
  background-color: ${({ theme }) => theme.colors.primary};
`;

export const HomeBtn = styled(BaseBtn)`
  background-color: ${({ theme }) => theme.colors.gray.extraLight};
`;
