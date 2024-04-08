import smwApiClient from '../../api/smwClient';
import { ApiEndpoints } from '../../common/enums';
import { ApiResponse, CreditCard } from '../interfaces';

export const apiCreditCardList = async (limit: number = 10, offset: number = 0, onlyMain: boolean = false): Promise<CreditCard[]> => {
	const params = {
		limit,
		offset,
        onlyMain: onlyMain ? true : null,
	};

	const { data } = await smwApiClient.get<ApiResponse<CreditCard[]>>(ApiEndpoints.CREDIT_CARDS, { params });

	return data.data;
};
