import styled from 'styled-components';

export const AlertPageContainer = styled.section``;

export const SingleAlert = styled.div`
  width: 100%;
  padding: ${({ theme }) => theme.space.sm} 0;
  display: flex;
  align-items: center;
`;

export const AlertText = styled.div`
  margin-left: ${({ theme }) => theme.space.sm};
`;

export const NoAlertText = styled.div`
  display: flex;
  justify-content: center;
`;
