import { useEffect, useState } from 'react';
import { Expense } from '../interfaces';
import { ExpenseType } from '../enums';

interface Props {
	originalExpenses: Expense[];
}
export const useFilterExpenses = ({ originalExpenses }: Props) => {
	const [filteredExpenses, setFilteredExpenses] = useState<Expense[]>(originalExpenses);
	const [textFilter, setTextFilter] = useState<string>('');
	const [creditCardId, setCreditCardId] = useState<string>('');
	const [expenseType, setExpenseType] = useState<ExpenseType | 'any'>('any');

	useEffect(() => {
		const filtered = originalExpenses.filter((expense: Expense) => {
			return (
				expense.creditCard.includes(creditCardId) &&
				(expenseType === 'any' || expense.type === expenseType) &&
				(expense.title.toLocaleLowerCase().includes(textFilter.toLocaleLowerCase()) ||
					expense.ccName.toLocaleLowerCase().includes(textFilter.toLocaleLowerCase()))
			);
		});
		setFilteredExpenses(filtered);
	}, [originalExpenses, textFilter, creditCardId, expenseType]);

	return {
		filteredExpenses,
		textFilter,
		creditCardId,
		expenseType,
		setTextFilter,
		setCreditCardId,
		setExpenseType,
	};
};
