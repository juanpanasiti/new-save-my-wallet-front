import { Expense } from '../interfaces';

interface ApiExpense extends Omit<Expense, 'creditCard'> {
	creditCardId: string;
}
export const cleanExpense = ({ creditCard, ...data }: Expense): Partial<ApiExpense> => {
	const response: Partial<ApiExpense> = { ...data };
	delete response.payments;
	delete response.id;
	delete response.isDone;
	if (data.id) {
		delete response.type;
	}
	if (creditCard) {
		response.creditCardId = creditCard;
	}
	return response;
};
