import styled from 'styled-components';

export const HomePageContainer = styled.section`
  margin-top: ${({ theme }) => theme.space.lg};
  width: 100%;
`;

export const PlayListSet = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.space.sm};
  overflow: auto;
  white-space: nowrap;

  &::-webkit-scrollbar {
    display: none;
  }
`;

export const PlayListSetTitle = styled.div`
  font-size: ${({ theme }) => theme.fontSize.md};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  margin-bottom: ${({ theme }) => theme.space.sm};
`;

export const MainPlayLists = styled.div`
  margin-top: ${({ theme }) => theme.space.lg};
`;

export const OnePlayList = styled.div`
  margin-bottom: ${({ theme }) => theme.space.lg};
`;

export const Text = styled.div``;
