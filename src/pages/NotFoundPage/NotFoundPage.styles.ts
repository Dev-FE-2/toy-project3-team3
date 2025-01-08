import styled from 'styled-components';

export const NotFoundContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Inner = styled.div`
  text-align: center;
  width: 80%;
`;

export const Title = styled.h1`
  font-size: ${({ theme }) => theme.fontSize.lg};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
`;

export const Description = styled.p`
  margin: ${({ theme }) => theme.space.lg} 0;
`;
