import { TableCell, TableRow } from '@mui/material';
import { Expense } from '../../interfaces/expense.interface';
import { CreditCard } from '../../interfaces';
import { parseCurrency } from '../../helpers';
import { ExpenseType } from '../../enums/expense-types.enum';

interface Props {
	expense: Expense;
    creditCards: CreditCard[];
}

export const ExpenseTableRow = ({ expense ,creditCards }: Props) => {
    const creditCard = creditCards.find(card => card.id === expense.creditCard);
    const expenseType = expense.type === ExpenseType.PURCHASE ? 'Purchase' : 'Subscription'
	return (
		<TableRow key={expense.id}>
			<TableCell>{expense.title}</TableCell>
			<TableCell>{creditCard?.name}</TableCell>
			<TableCell>{expenseType}</TableCell>
			<TableCell>{parseCurrency(expense.amount)}</TableCell>
			<TableCell>status</TableCell>
			<TableCell>{expense.acquiredAt}</TableCell>
			<TableCell>
				<button>Edit</button>
				<button>Delete</button>
				<button>View</button>
			</TableCell>
		</TableRow>
	);
};
