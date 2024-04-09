import { Button, ButtonGroup, TableCell, TableRow } from '@mui/material';
import { Expense, CreditCard } from '../../interfaces';
import { parseCurrency, parseDate } from '../../helpers';
import { ExpenseType } from '../../enums';
import { DeleteForever, Edit, Visibility } from '@mui/icons-material';
import { getExpenseStatus } from '../../helpers/get-expense-status';

interface Props {
	expense: Expense;
	creditCards: CreditCard[];
}

export const ExpenseTableRow = ({ expense, creditCards }: Props) => {
	const creditCard = creditCards.find((card) => card.id === expense.creditCard);
	const expenseType = expense.type === ExpenseType.PURCHASE ? 'Purchase' : 'Subscription';
	return (
		<TableRow key={expense.id}>
			<TableCell>{expense.title}</TableCell>
			<TableCell>{creditCard?.name}</TableCell>
			<TableCell>{expenseType}</TableCell>
			<TableCell>{parseCurrency(expense.amount)}</TableCell>
			<TableCell>{getExpenseStatus(expense)}</TableCell>
			<TableCell>{parseDate(expense.acquiredAt)}</TableCell>
			<TableCell>
				<ButtonGroup variant='contained' aria-label='Basic button group'>
					<Button color='warning'>
						<Edit />
					</Button>
					<Button color='info'>
						<Visibility />
					</Button>
					<Button color='error'>
						<DeleteForever />
					</Button>
				</ButtonGroup>
			</TableCell>
		</TableRow>
	);
};
