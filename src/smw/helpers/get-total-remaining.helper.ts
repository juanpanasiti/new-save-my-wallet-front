import { ExpenseType, PaymentStatus } from '../enums';
import { Expense } from '../interfaces';

export const getTotalRemaining = (expenses: Expense[]): number => {
	let total = 0;
	expenses.forEach((expense) => {
		if (expense.type === ExpenseType.PURCHASE) {
			expense.payments.forEach((payment) => {
				if (payment.status !== PaymentStatus.paid) total += payment.amount;
			});
		} else if (expense.type === ExpenseType.SUBSCRIPTION) {
			const pending = expense.payments.filter((payment) => payment.status !== PaymentStatus.paid);
			if (pending.length === 0) total += expense.amount;
			else total += pending.reduce((acc, payment) => acc + payment.amount, 0);
		}
	});

	return total;
};
