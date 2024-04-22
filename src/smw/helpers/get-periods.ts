import { PeriodStatus, PaymentStatus } from '../enums';
import { Expense, Payment, Period } from '../interfaces';
import { getPayments } from './get-payments';

const getStatus = (payments: Payment[]): PeriodStatus => {
	if (payments.some((payment) => payment.status !== PaymentStatus.paid)) return PeriodStatus.pending;
	return PeriodStatus.done;
};

export const getPeriods = (expenses: Expense[]): Period[] => {
	const periodNames = new Set<string>();
	expenses.forEach((expense) =>
		expense.payments.forEach((payment) => periodNames.add(`${payment.year}-${payment.month}`))
	);
	const payments = getPayments(expenses);
	const periods: Period[] = [...periodNames].map((period) => {
		const label = period.split('-').reverse().join('/').padStart(7,'0');
		const periodPayments = payments.filter((payment) => period === `${payment.year}-${payment.month}`);
		const periodStatus = getStatus(periodPayments);
		return {
			name: period,
			label,
			payments: periodPayments,
			status: periodStatus,
		};
	});
	return periods.sort((a,b) => a.label.localeCompare(b.label));
};
