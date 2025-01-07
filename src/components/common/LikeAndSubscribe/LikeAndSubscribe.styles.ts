import styled from 'styled-components';

export const IconContainer = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.space.xsm};
`;

export const Iconwapper = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.space.xxsm};
`;

export const Cnt = styled.div`
  color: ${({ theme }) => theme.colors.gray.medium};
`;
