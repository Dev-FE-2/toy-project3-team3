import styled from 'styled-components';

export const Wrapper = styled.div`
  margin: ${({ theme }) => theme.space.xsm} 0;
  padding: ${({ theme }) => theme.space.sm} 0;
  border-bottom: 1px dashed ${({ theme }) => theme.colors.gray.extraLight};
`;

export const CommentWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
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
  margin-top: ${({ theme }) => theme.space.sm};
  padding-left: ${({ theme }) => theme.space.xsm};
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

export const TimeAndEditContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding-left: ${({ theme }) => theme.space.xsm};
  margin-top: ${({ theme }) => theme.space.sm};
`;

export const RelativeTime = styled.div`
  padding-top: ${({ theme }) => theme.space.xsm};
  font-size: ${({ theme }) => theme.fontSize.xsm};
  color: ${({ theme }) => theme.colors.gray.medium};
`;

export const EditContainer = styled.div`
  min-width: 80px;
  display: flex;
  justify-content: space-between;
  margin-right: ${({ theme }) => theme.space.md};
  padding-right: ${({ theme }) => theme.space.sm};
`;

export const Edit = styled.div`
  font-size: ${({ theme }) => theme.fontSize.sm};
  color: ${({ theme }) => theme.colors.primary};
  cursor: pointer;
`;

export const InputAndIconContainer = styled.div`
  width: 100%;
  margin-top: ${({ theme }) => theme.space.sm};
  display: flex;
  align-items: center;
`;

export const Input = styled.input`
  width: 100%;
`;
