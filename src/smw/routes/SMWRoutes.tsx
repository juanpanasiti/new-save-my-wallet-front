import { Routes, Route, Navigate } from 'react-router-dom';

import { HomePage } from '../pages';
import { useAuth } from '../../auth/hooks';

export const SMWRoutes = () => {
  const {authQuery} = useAuth()
  if (!authQuery.data?.isAuthenticated) return <Navigate to='/auth/login' />
  return (
    <Routes>
      <Route path='/' element={<HomePage />} />

      <Route path='/*' element={<Navigate to='/' />} />
    </Routes>
  );
};
