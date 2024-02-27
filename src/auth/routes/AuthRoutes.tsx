import { Routes, Route, Navigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query'

import { LoginPage, RegisterPage } from '../pages';

export const AuthRoutes = () => {

  const queryClient = useQueryClient()
  if (queryClient.getQueryData(['isLoggedIn'])) return <Navigate to='/' />

  return (
    <Routes>
      <Route path='signin' element={<LoginPage />} />
      <Route path='signup' element={<RegisterPage />} />

      <Route path='/*' element={<Navigate to='/auth/signin' />} />
    </Routes>
  );
};
