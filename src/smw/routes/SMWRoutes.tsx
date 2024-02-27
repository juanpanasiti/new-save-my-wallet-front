import { Routes, Route, Navigate } from 'react-router-dom';

import { HomePage } from '../pages';
import { useQueryClient } from '@tanstack/react-query';

export const SMWRoutes = () => {
  const queryClient = useQueryClient()
  if (!queryClient.getQueryData(['isLoggedIn'])) return <Navigate to='/auth/login' />
  return (
    <Routes>
      <Route path='/' element={<HomePage />} />

      <Route path='/*' element={<Navigate to='/' />} />
    </Routes>
  );
};
