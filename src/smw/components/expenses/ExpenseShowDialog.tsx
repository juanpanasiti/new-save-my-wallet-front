import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider } from '@mui/material';
import { Expense } from '../../interfaces';
import { getExpenseStatus, getTotalRemaining, parseCurrency, parseDate } from '../../helpers';
import { PaymentTable } from '../payments';

interface Props {
	handleClose: () => void;
	open: boolean;
	expense: Expense;
	creditCardName: string;
}
export const ExpenseShowDialog = ({ open, handleClose, expense, creditCardName }: Props) => {
	const totalAmount = parseCurrency(expense.amount);
	const remainingAmount = parseCurrency(getTotalRemaining([expense]));
	return (
		<Dialog fullWidth maxWidth='md' open={open} onClose={handleClose}>
			<DialogTitle color='primary.light' variant='h4'>
				{expense.title} ({expense.ccName})
			</DialogTitle>
			<DialogContent>
				<DialogContentText>
					<b>Credit Card:</b> {creditCardName}
				</DialogContentText>
				<DialogContentText>
					<b>Acquired At:</b> {parseDate(expense.acquiredAt)}
				</DialogContentText>
				<DialogContentText>
					<b>Type:</b> {expense.type}
				</DialogContentText>
				<DialogContentText>
					<b>Total Amount:</b> {totalAmount}
				</DialogContentText>
				<DialogContentText>
					<b>Remaining Amount:</b> {remainingAmount}
				</DialogContentText>
				<DialogContentText>
					<b>Status:</b> {getExpenseStatus(expense)}
				</DialogContentText>
				<DialogContentText>
					<b>First Payment Date:</b> {parseDate(expense.firstPaymentDate)}
				</DialogContentText>
				<Divider>Payments</Divider>
				<PaymentTable payments={expense.payments} hideTitle hidePeriod={false} />
			</DialogContent>
			<DialogActions>
				<Button onClick={handleClose} color='warning'>
					Close
				</Button>
			</DialogActions>
		</Dialog>
	);
};
