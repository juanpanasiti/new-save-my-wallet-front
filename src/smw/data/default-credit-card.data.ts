import { CreditCard } from '../interfaces';

export const defaultCreditCard: CreditCard = {
	id: '',
	name: '',
	mainCreditCard: null,
	limit: 0,
	nextClosingDate: '',
	nextExpiringDate: '',
	owner: '',
	extensions: [],
};
