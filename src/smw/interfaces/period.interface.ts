import { PeriodStatus } from '../enums';
import { Payment } from './payments.interface';

export interface Period {
	name: string; // YYYY-MM
	label: string; // MM/YYYY
	payments: Payment[];
	status: PeriodStatus;
}
