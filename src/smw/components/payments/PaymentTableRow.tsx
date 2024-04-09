import { DeleteForever, Edit, Visibility } from '@mui/icons-material';
import { Button, ButtonGroup, TableCell, TableRow } from '@mui/material';
import { Payment } from '../../interfaces';
import { useExpenses } from '../../hooks/useExpenses';
import { ExpenseType } from '../../enums';
import { parseCurrency } from '../../helpers';

interface Props {
	payment: Payment;
}
export const PaymentTableRow = ({ payment }: Props) => {
	const { expensesQuery } = useExpenses();
	const expense = expensesQuery.data?.find((expense) => expense.id === payment.expense);
	const installment: string =
		expense?.type === ExpenseType.PURCHASE ? `${payment.noInstallment}/${expense?.installments}` : '---';
	return (
		<TableRow key={payment.id}>
			<TableCell>{expense?.title}</TableCell>
			<TableCell>{parseCurrency(payment.amount)}</TableCell>
			<TableCell>{installment}</TableCell>
			<TableCell>{payment.status}</TableCell>
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
