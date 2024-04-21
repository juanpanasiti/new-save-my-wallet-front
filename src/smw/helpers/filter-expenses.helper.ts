import { Expense } from '../interfaces/expense.interface';
export const filterExpenses = (expenses: Expense[], creditCardId: string): Expense[] => {
    return expenses.filter(expense => expense.creditCard === creditCardId);
}