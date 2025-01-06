import styled, { keyframes } from 'styled-components';

const rotation = keyframes`
  0% {
      transform: rotate(0deg);
  }
  100% {
      transform: rotate(360deg);
  }
`;

export const LoadingContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 45%;
  transform: translate(-50%, -45%);

  width: 50px;
  height: 50px;
  border: 6px solid ${({ theme }) => theme.colors.primary};
  border-bottom-color: transparent;
  border-radius: 50%;
  display: inline-block;
  box-sizing: border-box;
  animation: ${rotation} 1s linear infinite;
`;
