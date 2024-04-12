import { Typography } from '@mui/material';
import { useExpenses } from '../hooks/useExpenses';
import { ExpenseTable } from '../components/expenses';
import { useCreditCards } from '../hooks';

export const ExpensesPage = () => {
	const { expensesQuery } = useExpenses();
	const { creditCardsQuery } = useCreditCards();
	return (
		<>
			<Typography>Expenses Page</Typography>
			<ExpenseTable expenses={expensesQuery.data || []} creditCards={creditCardsQuery.data || []} />
		</>
	);
};
