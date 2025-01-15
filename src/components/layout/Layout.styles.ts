import styled from 'styled-components';

export const MainContainer = styled.main`
  min-height: 100vh; // 전체 높이 확보
  overflow: hidden; // 메인 컨테이너는 스크롤 방지
  max-width: ${({ theme }) => theme.layout.width};
  margin: 0 auto;
`;

export const OutletContainer = styled.section<{ $hasHeader: boolean }>`
  position: relative;
  padding: ${({ theme }) => theme.space.lg};
  margin-top: var(--header-height);
  margin-bottom: var(--nav-height);
  height: ${({ $hasHeader }) =>
    $hasHeader
      ? 'calc(100vh - var(--header-height) - var(--nav-height))'
      : 'calc(100vh - var(--nav-height))'};
  overflow-y: auto;
`;
