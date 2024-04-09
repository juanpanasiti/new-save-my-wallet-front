import { ExpenseStatus, ExpenseType } from '../enums';
import { PaymentStatus } from '../enums/payment-status.enum';
import { Expense } from '../interfaces';

export const getExpenseStatus = (expense: Expense): string => {
	if (expense.type === ExpenseType.SUBSCRIPTION) return ExpenseStatus.active;
	const paymentsDone = expense.payments.filter((p) => p.status === PaymentStatus.paid);
	if (expense.payments.length === paymentsDone.length) return ExpenseStatus.closed;
	return `${ExpenseStatus.pending} (${paymentsDone.length}/${expense.payments.length})`;
};
