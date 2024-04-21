import { Alert, AlertTitle, Typography } from '@mui/material';
import { useExpenses } from '../hooks/useExpenses';
import { ExpenseModalForm, ExpenseTable } from '../components/expenses';
import { useCreditCards, useModal } from '../hooks';
import { Fab } from '../../common/components';
import { ReceiptLong } from '@mui/icons-material';

export const ExpensesPage = () => {
	const { expensesQuery } = useExpenses();
	const { creditCardsQuery } = useCreditCards();
	const { open, handleOpen } = useModal();
	return (
		<>
			<Typography>Expenses Page</Typography>
			{expensesQuery.data?.length === 0 && (
				<Alert severity='info'>
					<AlertTitle>Nothing to show</AlertTitle>
					There are no expenses to show!
				</Alert>
			)}
			{
			expensesQuery.data && expensesQuery.data.length > 0 && (
				<ExpenseTable expenses={expensesQuery.data || []} creditCards={creditCardsQuery.data || []} />
			)}

			<Fab handleClick={handleOpen} icon={<ReceiptLong />} color='primary' />
			<ExpenseModalForm open={open} handleOpen={() => handleOpen()} />
		</>
	);
};
