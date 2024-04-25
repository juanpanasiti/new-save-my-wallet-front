import { Done, DoneAll, QuestionMark } from '@mui/icons-material';
import { PaymentStatus } from '../enums';

export const getPaymentStatusIcon = (status: PaymentStatus) => {
	switch (status) {
		case PaymentStatus.unconfirmed:
			return <QuestionMark color='error' />;
		case PaymentStatus.confirmed:
			return <Done color='warning' />;
		case PaymentStatus.paid:
			return <DoneAll color='success' />;
		default:
			return <QuestionMark color='error' />;
	}
};
