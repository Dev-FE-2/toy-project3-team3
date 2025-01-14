import styled from 'styled-components';

export const ConfirmContainer = styled.div`
  position: absolute;
  bottom: var(--nav-height);
  right: 0;
  background: ${({ theme }) => theme.colors.warning};
  padding: ${({ theme }) => theme.space.lg};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.space.md};
  /* text-align: center; */
`;

export const BtnContainer = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.space.sm};
`;
