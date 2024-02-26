import { BrowserRouter } from 'react-router-dom';
import { AppRouter } from './router/AppRouter';

export const SaveMyWalletApp = () => {
  return (
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
  );
};
