import smwApiClient from '../../api/smwClient';
import { ApiEndpoints } from '../../common/enums';
import { cleanCreditCard } from '../helpers';
import { ApiResponse, CreditCard } from '../interfaces';

export const apiCreditCardList = async (
	limit: number = 10,
	offset: number = 0,
	onlyMain: boolean = false
): Promise<CreditCard[]> => {
	const params = {
		limit,
		offset,
		onlyMain: onlyMain ? true : null,
	};

	const { data } = await smwApiClient.get<ApiResponse<CreditCard[]>>(ApiEndpoints.CREDIT_CARDS, { params });
	const response = data.data.map(cc => {
		return {
			...cc,
			nextClosingDate: cc.nextClosingDate && cc.nextClosingDate.slice(0,10),
			nextExpiringDate: cc.nextExpiringDate && cc.nextExpiringDate.slice(0,10)
		}
	})
	return response;
};

export const apiNewCreditCard = async (newCreditCard: CreditCard): Promise<CreditCard> => {
	const { data } = await smwApiClient.post<ApiResponse<CreditCard>>(ApiEndpoints.CREDIT_CARDS, cleanCreditCard(newCreditCard));

	return data.data;
};

export const apiUpdateCreditCard = async (creditCard: CreditCard): Promise<CreditCard> => {
	const { data } = await smwApiClient.patch<ApiResponse<CreditCard>>(`${ApiEndpoints.CREDIT_CARDS}/${creditCard.id}`, cleanCreditCard(creditCard));

	return data.data;
};
