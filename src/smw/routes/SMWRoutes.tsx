import { Routes, Route, Navigate } from 'react-router-dom';

import { CreditsCardsPage, ExpensesPage, HomePage, PaymentsPage } from '../pages';
import { useAuth } from '../../auth/hooks';
import { SmwLayout } from '../layout/SmwLayout';

export const SMWRoutes = () => {
	const { authQuery } = useAuth();
	if (!authQuery.data?.isAuthenticated) return <Navigate to='/auth/login' />;
	return (
		<>
			<SmwLayout>
				<Routes>
					<Route path='/' element={<HomePage />} />
					<Route path='/credit-cards' element={<CreditsCardsPage />} />
					<Route path='/expenses' element={<ExpensesPage />} />
					<Route path='/payments' element={<PaymentsPage />} />

					<Route path='/*' element={<Navigate to='/' />} />
				</Routes>
			</SmwLayout>
		</>
	);
};
