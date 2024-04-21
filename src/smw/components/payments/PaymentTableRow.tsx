import { Done, DoneAll, MonetizationOn, QuestionMark } from '@mui/icons-material';
import { Button, ButtonGroup, TableCell, TableRow } from '@mui/material';
import { Payment, PaymentUpdate } from '../../interfaces';
import { useExpenses } from '../../hooks/useExpenses';
import { ExpenseType, PaymentStatus } from '../../enums';
import { getPaymentStatusIcon, parseCurrency } from '../../helpers';
import { PaymentUpdateAmountDialog } from './PaymentUpdateAmountDialog';
import { useModal } from '../../hooks';

interface Props {
	payment: Payment;
}
export const PaymentTableRow = ({ payment }: Props) => {
	const { expensesQuery, updatePaymentMutation } = useExpenses();
	const expense = expensesQuery.data?.find((expense) => expense.id === payment.expense);
	const installment: string =
		expense?.type === ExpenseType.PURCHASE ? `${payment.noInstallment}/${expense?.installments}` : '---';
	const statusIcon = getPaymentStatusIcon(payment.status);
	const handleUpdatePayment = (data: PaymentUpdate) => {
		updatePaymentMutation.mutate({ expenseId: payment.expense, paymentId: payment.id, paymentData: data });
	};
	const { open: openModalDialog, handleOpen: handleOpenModalDialog } = useModal();
	return (
		<TableRow key={payment.id}>
			<TableCell>{expense?.title}</TableCell>
			<TableCell>{parseCurrency(payment.amount)}</TableCell>
			<TableCell>{installment}</TableCell>
			<TableCell>{statusIcon}</TableCell>
			<TableCell>
				<ButtonGroup>
					<Button
						color='error'
						disabled={payment.status === PaymentStatus.unconfirmed}
						variant='outlined'
						onClick={() => handleUpdatePayment({ status: PaymentStatus.unconfirmed })}
					>
						<QuestionMark />
					</Button>
					<Button
						color='warning'
						disabled={payment.status === PaymentStatus.confirmed}
						variant='outlined'
						onClick={() => handleUpdatePayment({ status: PaymentStatus.confirmed })}
					>
						<Done />
					</Button>
					<Button
						color='success'
						disabled={payment.status === PaymentStatus.paid}
						variant='outlined'
						onClick={() => handleUpdatePayment({ status: PaymentStatus.paid })}
					>
						<DoneAll />
					</Button>
					<Button color='info' onClick={handleOpenModalDialog}>
						<MonetizationOn />
					</Button>
				</ButtonGroup>
				<PaymentUpdateAmountDialog payment={payment} handleClose={handleOpenModalDialog} open={openModalDialog} handleUpdate={handleUpdatePayment} />
			</TableCell>
		</TableRow>
	);
};
