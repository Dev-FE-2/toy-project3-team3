import styled from 'styled-components';

export const FollowLists = styled.ul``;
export const FollowItem = styled.li`
  display: flex;
  align-items: center;
`;
export const FollowUserProfile = styled.div`
  overflow: hidden;
  margin-right: ${({ theme }) => theme.space.sm};
  border-radius: ${({ theme }) => theme.borderRadius.xlg};
`;
export const FollowUserProfileImg = styled.img`
  width: 50px;
`;
export const FollowUserNameDiv = styled.div`
  flex-grow: 1;
`;
export const FollowUserName = styled.h3``;
export const FollowUserBtn = styled.button``;
