import { ExpenseType } from '../enums';
import { Expense } from '../interfaces';

export const defaultExpense: Expense = {
	id: '',
	title: '',
	ccName: '',
	acquiredAt: '',
	creditCard: '',
	type: ExpenseType.PURCHASE,
	amount: 0,
	installments: 0,
	firstPaymentDate: '',
	payments: [],
	isDone: false,
};
