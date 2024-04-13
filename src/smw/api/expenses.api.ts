import smwApiClient from '../../api/smwClient';
import { ApiEndpoints } from '../../common/enums';
import { ExpenseType } from '../enums';
import { ApiResponse, Expense } from '../interfaces';
type Params = {
	limit: number;
	offset: number;
	creditCardId?: number;
	expenseType?: ExpenseType;
};
export const apiExpensesList = async (params: Params): Promise<Expense[]> => {
	const { data } = await smwApiClient.get<ApiResponse<Expense[]>>(ApiEndpoints.EXPENSES, { params });

	return data.data;
};
