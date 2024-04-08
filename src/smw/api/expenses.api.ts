import smwApiClient from '../../api/smwClient';
import { ApiEndpoints } from '../../common/enums';
import { ExpenseType } from '../enums/expense-types.enum';
import { ApiResponse } from '../interfaces';
import { Expense } from '../interfaces/expense.interface';
type Params = {
    limit: number;
    offset: number;
    creditCardId?: number;
    expenseType?: ExpenseType;
}
export const apiExpensesList = async (params:Params): Promise<Expense[]> => {
	const { data } = await smwApiClient.get<ApiResponse<Expense[]>>(ApiEndpoints.EXPENSES, { params });

	return data.data;
}