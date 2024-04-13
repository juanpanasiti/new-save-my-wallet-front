import { CreditCard } from '../interfaces';

export const cleanCreditCard = ({ name, limit, ...restData }: CreditCard): Partial<CreditCard> => {
	const response: Partial<CreditCard> = { name, limit };
    if (restData.mainCreditCard) response.mainCreditCard = restData.mainCreditCard
    if (restData.nextClosingDate) response.nextClosingDate = restData.nextClosingDate
    if (restData.nextExpiringDate) response.nextExpiringDate = restData.nextExpiringDate

	return response;
};
