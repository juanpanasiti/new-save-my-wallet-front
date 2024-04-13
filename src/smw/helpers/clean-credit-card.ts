import { CreditCard } from '../interfaces';

export const cleanCreditCard = ({ name, limit, mainCreditCard, ...restData }: CreditCard): Partial<CreditCard> => {
	const response: Partial<CreditCard> = { name };
	if (mainCreditCard) response.mainCreditCard = mainCreditCard;
	if (mainCreditCard === '' && limit) response.limit = limit;
	if (mainCreditCard === '' && restData.nextClosingDate) response.nextClosingDate = restData.nextClosingDate;
	if (mainCreditCard === '' && restData.nextExpiringDate) response.nextExpiringDate = restData.nextExpiringDate;

	return response;
};
