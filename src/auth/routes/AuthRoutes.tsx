import { Routes, Route, Navigate } from 'react-router-dom';

import { LoginPage, RegisterPage } from '../pages';
import { useAuth } from '../hooks';

export const AuthRoutes = () => {
	const { authQuery } = useAuth();
	if (authQuery.data?.isAuthenticated) return <Navigate to='/' />;

	return (
		<Routes>
			<Route path='signin' element={<LoginPage />} />
			<Route path='signup' element={<RegisterPage />} />

			<Route path='/*' element={<Navigate to='/auth/signin' />} />
		</Routes>
	);
};
