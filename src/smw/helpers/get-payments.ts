import { Expense, Payment } from '../interfaces';

export const getPayments = (expenses: Expense[]): Payment[] => {
	return expenses.map((expense) => expense.payments).flat();
};
