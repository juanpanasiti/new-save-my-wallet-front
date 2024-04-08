import { useQuery } from '@tanstack/react-query';
import { Expense } from '../interfaces/expense.interface';
import { apiExpensesList } from '../api';
import { useAuth } from '../../auth/hooks';
import { useEffect, useState } from 'react';
import { ExpenseType } from '../enums/expense-types.enum';
import { useCreditCards } from './useCreditCards';

const EXPENSES_QUERY_KEY = 'expenses';
export const useExpenses = () => {
	const [purchases, setPurchases] = useState<Expense[]>([]);
	const [subscriptions, setSubscriptions] = useState<Expense[]>([]);
	const { authQuery } = useAuth();
	const { creditCardsQuery } = useCreditCards();
    const isEnabled = authQuery.data?.isAuthenticated && !!creditCardsQuery.data;
	const expensesQuery = useQuery<Expense[]>({
		queryKey: [EXPENSES_QUERY_KEY],
		queryFn: async () => await apiExpensesList({ limit: 100, offset: 0 }), // TODO: implement pagination
		staleTime: Infinity,
		placeholderData: [],
		enabled: isEnabled,
	});
	useEffect(() => {
		if (expensesQuery.data) {
			setPurchases(expensesQuery.data?.filter((expense) => expense.type === ExpenseType.PURCHASE));
			setSubscriptions(expensesQuery.data?.filter((expense) => expense.type === ExpenseType.SUBSCRIPTION));
		}
	}, [expensesQuery.data]);

	return {
		expensesQuery,
		purchases,
		subscriptions,
	};
};