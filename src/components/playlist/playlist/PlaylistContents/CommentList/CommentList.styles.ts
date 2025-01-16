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

export const Comment = styled.div`
  padding-left: ${({ theme }) => theme.space.sm};
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  word-break: break-all;
`;
