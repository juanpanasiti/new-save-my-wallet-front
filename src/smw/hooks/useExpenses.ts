import { useMutation, useQuery } from '@tanstack/react-query';
import { Expense, Period } from '../interfaces';
import { apiDeleteExpense, apiExpensesList, apiNewExpense, apiUpdateExpense, apiUpdatePayment } from '../api';
import { useAuth } from '../../auth/hooks';
import { useEffect, useState } from 'react';
import { ExpenseType } from '../enums';
import { useCreditCards } from './';
import { getPeriods } from '../helpers';

const EXPENSES_QUERY_KEY = 'expenses';
export const useExpenses = () => {
	const [purchases, setPurchases] = useState<Expense[]>([]);
	const [subscriptions, setSubscriptions] = useState<Expense[]>([]);
	const [periods, setPeriods] = useState<Period[]>([]);
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
	const createMutation = useMutation({
		mutationFn: apiNewExpense,
		onSuccess: () => expensesQuery.refetch(),
	});
	const updateMutation = useMutation({
		mutationFn: apiUpdateExpense,
		onSuccess: () => expensesQuery.refetch(),
	});
	const deleteMutation = useMutation({
		mutationFn: apiDeleteExpense,
		onSuccess: () => expensesQuery.refetch(),
	});
	const updatePaymentMutation = useMutation({
		mutationFn: apiUpdatePayment,
		onSuccess: () => expensesQuery.refetch(),
	});
	useEffect(() => {
		if (expensesQuery.data) {
			setPurchases(expensesQuery.data?.filter((expense) => expense.type === ExpenseType.PURCHASE));
			setSubscriptions(expensesQuery.data?.filter((expense) => expense.type === ExpenseType.SUBSCRIPTION));
			setPeriods(getPeriods(expensesQuery.data));
		}
	}, [expensesQuery.data]);

	return {
		expensesQuery,
		purchases,
		subscriptions,
		periods,
		updateMutation,
		createMutation,
		updatePaymentMutation,
		deleteMutation,
	};
};
