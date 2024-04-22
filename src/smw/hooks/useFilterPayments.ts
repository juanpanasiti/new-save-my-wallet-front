import { useEffect, useState } from 'react';
import { Expense, Payment } from '../interfaces';
import { PaymentStatus } from '../enums';
import { useExpenses } from './useExpenses';

interface Props {
	originalPayments: Payment[];
}
export const useFilterPayments = ({ originalPayments }: Props) => {
	const [filteredPayments, setFilteredPayments] = useState<Payment[]>(originalPayments);
	const { expensesQuery } = useExpenses();
	const [textFilter, setTextFilter] = useState<string>('');
	const [creditCardId, setCreditCardId] = useState<string>('');
	const [paymentStatus, setPaymentStatus] = useState<PaymentStatus | 'any'>('any');

	useEffect(() => {
		const filtered = originalPayments.filter((payment: Payment) => {
			const expense = expensesQuery.data?.find((expense: Expense) => expense.id === payment.expense);
			const expenseTitle = expense?.title || '';
			const expenseCcName = expense?.ccName || '';
			return (
				expense?.creditCard.includes(creditCardId) &&
				(paymentStatus === 'any' || payment.status === paymentStatus) &&
				(expenseTitle.toLocaleLowerCase().includes(textFilter.toLocaleLowerCase()) ||
					expenseCcName.toLocaleLowerCase().includes(textFilter.toLocaleLowerCase()))
			);
		});
		setFilteredPayments(filtered);
	}, [originalPayments, textFilter, creditCardId, paymentStatus, expensesQuery.data]);

	return {
		filteredPayments,
		textFilter,
		creditCardId,
		paymentStatus,
		setTextFilter,
		setCreditCardId,
		setPaymentStatus,
	};
};
