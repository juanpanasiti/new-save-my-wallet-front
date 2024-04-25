import { Button, ButtonGroup, TableCell, TableRow } from '@mui/material';
import { Expense, CreditCard } from '../../interfaces';
import { parseCurrency, parseDate } from '../../helpers';
import { ExpenseType } from '../../enums';
import { DeleteForever, Edit, Visibility } from '@mui/icons-material';
import { getExpenseStatus } from '../../helpers/get-expense-status.helper';
import { useExpenses, useModal } from '../../hooks';
import { ExpenseModalForm } from './ExpenseModalForm';
import { ExpenseDeleteDialog } from './ExpenseDeleteDialog';
import { ExpenseShowDialog } from './ExpenseShowDialog';

interface Props {
	expense: Expense;
	creditCards: CreditCard[];
}

export const ExpenseTableRow = ({ expense, creditCards }: Props) => {
	const { deleteMutation } = useExpenses();
	const creditCard = creditCards.find((card) => card.id === expense.creditCard);
	const creditCardName = creditCard?.name || '';
	const expenseType = expense.type === ExpenseType.PURCHASE ? 'Purchase' : 'Subscription';
	const { open: openModalForm, handleOpen: handleOpenModalForm } = useModal();
	const { open: openDialogShow, handleOpen: handleOpenDialogShow } = useModal();
	const { open: openDialogDelete, handleOpen: handleOpenDialogDelete } = useModal();

	const handleDelete = () => {
		deleteMutation.mutate(expense.id);
	};
	const handleConfirmDelete = () => {
		handleOpenDialogDelete();
	};
	return (
		<>
			<TableRow key={expense.id}>
				<TableCell>{expense.title}</TableCell>
				<TableCell>{creditCardName}</TableCell>
				<TableCell>{expenseType}</TableCell>
				<TableCell>{parseCurrency(expense.amount)}</TableCell>
				<TableCell>{getExpenseStatus(expense)}</TableCell>
				<TableCell>{parseDate(expense.acquiredAt)}</TableCell>
				<TableCell>
					<ButtonGroup variant='contained' aria-label='Basic button group'>
						<Button color='warning' onClick={handleOpenModalForm}>
							<Edit />
						</Button>
						<Button color='info' onClick={handleOpenDialogShow}>
							<Visibility />
						</Button>
						<Button color='error' onClick={handleConfirmDelete}>
							<DeleteForever />
						</Button>
					</ButtonGroup>
				</TableCell>
			</TableRow>
			<ExpenseModalForm expense={expense} open={openModalForm} handleOpen={() => handleOpenModalForm()} />
			<ExpenseShowDialog
				expense={expense}
				open={openDialogShow}
				handleClose={handleOpenDialogShow}
				creditCardName={creditCardName}
			/>
			<ExpenseDeleteDialog
				expenseTitle={expense.title}
				handleClose={handleOpenDialogDelete}
				open={openDialogDelete}
				handleAgree={handleDelete}
			/>
		</>
	);
};
