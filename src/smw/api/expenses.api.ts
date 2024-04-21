import smwApiClient from '../../api/smwClient';
import { ApiEndpoints } from '../../common/enums';
import { ExpenseType } from '../enums';
import { cleanExpense } from '../helpers/clean-expense.helper';
import { ApiResponse, Expense, Payment, PaymentUpdate } from '../interfaces';
type Params = {
	limit: number;
	offset: number;
	creditCardId?: number;
	expenseType?: ExpenseType;
};
export const apiExpensesList = async (params: Params): Promise<Expense[]> => {
	const { data } = await smwApiClient.get<ApiResponse<Expense[]>>(ApiEndpoints.EXPENSES, { params });
	const response = data.data.map((expense) => {
		return {
			...expense,
			acquiredAt: expense.acquiredAt && expense.acquiredAt.slice(0, 10),
			firstPaymentDate: expense.firstPaymentDate && expense.firstPaymentDate.slice(0, 10),
		};
	});
	return response;
};

export const apiNewExpense = async (newExpense: Expense): Promise<Expense> => {
	const { data } = await smwApiClient.post<ApiResponse<Expense>>(ApiEndpoints.EXPENSES, cleanExpense(newExpense));

	return data.data;
};

export const apiUpdateExpense = async (expense: Expense): Promise<Expense> => {
	const { data } = await smwApiClient.patch<ApiResponse<Expense>>(
		`${ApiEndpoints.EXPENSES}/${expense.id}`,
		cleanExpense(expense)
	);

	return data.data;
};

interface ApiUpdatePaymentParams {
	expenseId: string;
	paymentId: string;
	paymentData: PaymentUpdate;
}
export const apiUpdatePayment = async ({expenseId, paymentId, paymentData}: ApiUpdatePaymentParams): Promise<Payment> => {
	const { data } = await smwApiClient.patch<ApiResponse<Payment>>(
		`${ApiEndpoints.EXPENSES}/${expenseId}/payments/${paymentId}`,
		paymentData
	);

	return data.data;
};
