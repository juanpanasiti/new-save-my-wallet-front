import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import { AppRouter } from './router/AppRouter';
import { AppTheme } from './theme';
import { apiGetUserInfo } from './auth/api/auth.endpoints';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});
await queryClient.prefetchQuery({
  queryKey: ['isLoggedIn'],
  queryFn: async () => {
    try {
      await apiGetUserInfo()
      return true;
    } catch {
      return false;
    }
  },
});

export const SaveMyWalletApp = () => {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <AppTheme>
          <AppRouter />
        </AppTheme>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </BrowserRouter>
  );
};
