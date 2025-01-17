import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const EachPlaylistWrapper = styled.div`
  margin-top: ${({ theme }) => theme.space.lg};
`;

export const MyFollowingContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;
export const MyFollowingHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
export const MyFollowingHeaderName = styled.h2`
  font-weight: ${({ theme }) => theme.fontWeight.bold};
`;
export const MyFollowingViewAll = styled(Link)`
  color: ${({ theme }) => theme.colors.gray.dark};
  text-decoration: none;
`;

export const MyFollowingHeaderFollows = styled.ul`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const MyFollowingHeaderFollowsImgWrap = styled.li`
  overflow: hidden;
  border-radius: ${({ theme }) => theme.borderRadius.xlg};
`;

export const MyFollowingHeaderFollowsImg = styled.img`
  width: 50px;
`;

export const MyFollowingContents = styled.ul``;
