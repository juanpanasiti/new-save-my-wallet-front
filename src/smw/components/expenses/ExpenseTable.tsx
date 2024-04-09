import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { ExpenseTableRow } from './ExpenseTableRow';
import { CreditCard, Expense } from '../../interfaces';

interface Props {
	expenses: Expense[];
    creditCards: CreditCard[];
}
export const ExpenseTable = ({ expenses, creditCards }: Props) => {
	return (
		<TableContainer component={Paper}>
			<Table>
				<TableHead>
					<TableRow>
						<TableCell>Title</TableCell>
						<TableCell>Credit Card</TableCell>
						<TableCell>Type</TableCell>
						<TableCell>Amount</TableCell>
						<TableCell>Status</TableCell>
						<TableCell>Acquired At</TableCell>
						<TableCell>Actions</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{expenses.map((expense) => (
						<ExpenseTableRow key={expense.id} expense={expense} creditCards={creditCards} />
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);
};
