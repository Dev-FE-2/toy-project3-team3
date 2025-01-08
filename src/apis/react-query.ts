import { QueryClient, QueryCache } from '@tanstack/react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 1000 * 60 * 5,
      refetchOnWindowFocus: false,
      refetchOnReconnect: true,
      refetchOnMount: true,
    },
    mutations: {
      retry: 0,
    },
  },
  queryCache: new QueryCache({
    // 백그라운드 리페치 alert로 표시
    onError: (error, query) => {
      if (query.state.data !== undefined) {
        alert(`에러가 발생했습니다: ${error.message}`);
      }
    },
  }),
});

export default queryClient;
