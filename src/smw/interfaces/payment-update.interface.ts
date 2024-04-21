import { PaymentStatus } from '../enums';

export interface PaymentUpdate {
	status?: PaymentStatus;
	amount?: number;
}
