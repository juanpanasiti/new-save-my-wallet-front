import { Alert, AlertTitle, Typography } from '@mui/material';
import { useExpenses } from '../hooks/useExpenses';
import { ExpenseModalForm, ExpenseTable } from '../components/expenses';
import { useCreditCards, useFilterExpenses, useModal } from '../hooks';
import { Fab } from '../../common/components';
import { ReceiptLong } from '@mui/icons-material';
import { ExpensesFilterForm } from '../components/expenses/ExpensesFilterForm';

export const ExpensesPage = () => {
	const { expensesQuery } = useExpenses();
	const { creditCardsQuery } = useCreditCards();
	const { filteredExpenses, ...restFilterData } = useFilterExpenses({ originalExpenses: expensesQuery.data || [] });
	const { open, handleOpen } = useModal();
	return (
		<>
			<Typography variant='h2'>Expenses</Typography>
			<ExpensesFilterForm creditCards={creditCardsQuery.data || []} {...restFilterData} />
			{filteredExpenses.length === 0 && (
				<Alert severity='info'>
					<AlertTitle>Nothing to show</AlertTitle>
					There are no expenses to show!
				</Alert>
			)}
			{filteredExpenses.length > 0 && (
				<ExpenseTable expenses={filteredExpenses} creditCards={creditCardsQuery.data || []} />
			)}

			<Fab handleClick={handleOpen} icon={<ReceiptLong />} color='primary' />
			<ExpenseModalForm open={open} handleOpen={() => handleOpen()} />
		</>
	);
};
