import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const MyPageContainer = styled.div`
  width: 100%;
  margin: 0 auto;
`;

export const MyPageProfile = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: stretch;
  border-bottom: 1px solid #555;

  padding-left: ${({ theme }) => theme.space.sm};
  padding-right: ${({ theme }) => theme.space.sm};
  padding-bottom: ${({ theme }) => theme.space.sm};
  margin-bottom: ${({ theme }) => theme.space.sm};
`;

export const MyPageProfileUpper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.space.sm};
`;

export const MyPageProfileLower = styled.div``;
export const MyPageProfileImgDiv = styled.div`
  overflow: hidden;
  border-radius: ${({ theme }) => theme.borderRadius.xlg};
`;
export const MyPageProfileImg = styled.img`
  width: 48px;
  height: 48px;
`;
export const MyPageProfilePosts = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  & > span:first-child {
    font-weight: ${({ theme }) => theme.fontWeight.bold};
  }

  & > span:last-child {
    font-size: ${({ theme }) => theme.fontSize.xsm};
  }
`;
export const MyPageProfileFollower = styled(Link)`
  color: inherit;
  text-decoration: none;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  & > span:first-child {
    font-weight: ${({ theme }) => theme.fontWeight.bold};
  }

  & > span:last-child {
    font-size: ${({ theme }) => theme.fontSize.xsm};
  }
`;
export const MyPageProfileFollowing = styled(Link)`
  color: inherit;
  text-decoration: none;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  & > span:first-child {
    font-weight: ${({ theme }) => theme.fontWeight.bold};
  }

  & > span:last-child {
    font-size: ${({ theme }) => theme.fontSize.xsm};
  }
`;
export const MyPageUserName = styled.h3`
  font-weight: ${({ theme }) => theme.fontWeight.bold};
`;
export const MyPageUserDesc = styled.span`
  font-size: ${({ theme }) => theme.fontSize.xsm};
`;

export const MyPageContents = styled.div``;
