import styled from 'styled-components';

export const CommentWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: ${({ theme }) => theme.space.xsm} 0;
  padding: ${({ theme }) => theme.space.sm} 0;
  border-bottom: 1px dashed ${({ theme }) => theme.colors.gray.extraLight};
`;

export const UserWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: ${({ theme }) => theme.space.sm};
`;

export const IconWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space.sm};
  min-width: 50px;
`;

export const IconContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: ${({ theme }) => theme.space.xsm};
`;

export const CommentContainer = styled.div`
  padding-left: ${({ theme }) => theme.space.sm};
`;

export const Comment = styled.div`
  font-size: ${({ theme }) => theme.fontSize.sm};
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  word-break: break-all;
`;

export const TaggedUserNickname = styled.div`
  color: ${({ theme }) => theme.colors.highlight};
  cursor: pointer;
`;

export const UserNickname = styled.div`
  font-size: ${({ theme }) => theme.fontSize.sm};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
`;

export const RelativeTime = styled.div`
  padding-top: ${({ theme }) => theme.space.xsm};
  font-size: ${({ theme }) => theme.fontSize.xsm};
  color: ${({ theme }) => theme.colors.gray.medium};
`;
