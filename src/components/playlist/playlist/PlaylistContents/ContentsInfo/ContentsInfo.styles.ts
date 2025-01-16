import styled from 'styled-components';

export const Title = styled.div`
  font-size: ${({ theme }) => theme.fontSize.md};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const ShortIntro = styled.div`
  font-size: ${({ theme }) => theme.fontSize.sm};
  color: ${({ theme }) => theme.colors.gray.dark};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const RelativeTime = styled.div`
  padding-top: ${({ theme }) => theme.space.xsm};
  font-size: ${({ theme }) => theme.fontSize.xsm};
  color: ${({ theme }) => theme.colors.gray.medium};
  min-width: 60px;
  text-align: end;
`;

export const HashtagWrapper = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.space.sm};
  margin-bottom: ${({ theme }) => theme.space.sm};
  font-size: ${({ theme }) => theme.fontSize.sm};
`;

export const FlexContainer = styled.div<{ hasMargin?: boolean }>`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: ${({ theme, hasMargin }) => hasMargin && `${theme.space.sm} 0`};
`;

export const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: ${({ theme }) => theme.space.sm};
`;

export const CategoryContainer = styled.div`
  font-size: ${({ theme }) => theme.fontSize.sm};
`;
