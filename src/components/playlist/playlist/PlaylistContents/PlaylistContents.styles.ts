import * as TabsStyles from '@/components/common/tabs/Tabs.styles';
import styled from 'styled-components';

export const PlaylistContentsWrapper = styled.div`
  width: 100%;
  background-color: ${({ theme }) => theme.colors.white};
  padding: ${({ theme }) => theme.space.md};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  box-shadow: ${({ theme }) => theme.boxShadow};
`;

export const TabsContainer = styled(TabsStyles.TabsContainer)`
  margin-bottom: ${({ theme }) => theme.space.sm};
`;

export const VideoAndCommentContainer = styled.div`
  background-color: black;
`;

export const { Btn, TabText, ListContainer } = TabsStyles;
