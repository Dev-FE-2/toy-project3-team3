import styled from 'styled-components';

export const SearchPageContainer = styled.section``;

export const ResultListZone = styled.div``;

export const UserList = styled.div``;

export const PlayListsList = styled.div`
  margin-top: ${({ theme }) => theme.space.md};
`;

export const User = styled.div`
  padding: ${({ theme }) => theme.space.xsm} 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.space.md};
`;

export const PlayList = styled.div`
  margin-bottm: ${({ theme }) => theme.space.md};
`;
