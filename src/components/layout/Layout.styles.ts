import styled from 'styled-components';

export const MainContainer = styled.main`
  min-height: 100vh; // 전체 높이 확보
  overflow: hidden; // 메인 컨테이너는 스크롤 방지

  --nav-height: ${({ theme }) => theme.layout.nav.baseHeight};
  --header-height: ${({ theme }) => theme.layout.header.baseHeight};

  // 아이폰 하단 safe area 대응
  // 브라우저가 max() 함수를 지원하는지 체크s
  @supports (height: max(0px)) {
    --nav-height: ${({ theme }) => theme.layout.nav.withSafeArea};
    --header-height: ${({ theme }) => theme.layout.header.withSafeArea};
  }
`;

export const OutletContainer = styled.section<{ $hasHeader: boolean }>`
  position: relative;
  padding: ${({ theme }) => theme.space.lg};
  margin-top: ${({ $hasHeader }) =>
    $hasHeader ? 'var(--header-height)' : '0'};
  margin-bottom: var(--nav-height);
  height: ${({ $hasHeader }) =>
    $hasHeader
      ? 'calc(100vh - var(--header-height) - var(--nav-height))'
      : 'calc(100vh - var(--nav-height))'};
`;
