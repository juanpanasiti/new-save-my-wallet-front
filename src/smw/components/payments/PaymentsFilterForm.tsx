import { Grid, MenuItem, TextField } from '@mui/material';
import { PaymentStatus } from '../../enums';
import { CreditCard } from '../../interfaces';

interface Props {
	creditCards: CreditCard[];
	textFilter: string;
	creditCardId: string;
	paymentStatus: PaymentStatus | 'any';
	setTextFilter: (value: string) => void;
	setCreditCardId: (value: string) => void;
	setPaymentStatus: (value: PaymentStatus | 'any') => void;
}
export const PaymentsFilterForm = (props: Props) => {
	const { creditCards, textFilter, creditCardId, paymentStatus, setTextFilter, setCreditCardId, setPaymentStatus } =
		props;
	const defaultCreditCardId = creditCardId || 'any';
	const defaultPaymentStatus = paymentStatus || 'any';

	const onTextFilterChange = (text: string) => {
		setTextFilter(text);
	};
	const onCreditCardIdChange = (ccId: string) => {
		setCreditCardId(ccId === 'any' ? '' : ccId);
	};
	const onPaymentStatusChange = (status: PaymentStatus | 'any') => {
		setPaymentStatus(status);
	};
	return (
		<Grid container spacing={2} sx={{ my: 1 }}>
			<Grid item xs={6}>
				<TextField
					label='Filter'
					fullWidth
					variant='outlined'
					defaultValue={textFilter}
					onChange={(e) => onTextFilterChange(e.target.value)}
				/>
			</Grid>
			<Grid item xs={3}>
				<TextField
					select
					label='Credit Card'
					defaultValue={defaultCreditCardId}
					fullWidth
					onChange={(e) => onCreditCardIdChange(e.target.value)}
				>
					<MenuItem value='any'>Any</MenuItem>
					{creditCards.map((option) => (
						<MenuItem key={option.id} value={option.id}>
							{option.name}
						</MenuItem>
					))}
				</TextField>
			</Grid>
			<Grid item xs={3}>
				<TextField
					select
					label='Status'
					defaultValue={defaultPaymentStatus}
					fullWidth
					onChange={(e) => onPaymentStatusChange(e.target.value as PaymentStatus | 'any')}
				>
					<MenuItem value='any'>Any</MenuItem>
					<MenuItem value={PaymentStatus.unconfirmed}>Unconfirmed</MenuItem>
					<MenuItem value={PaymentStatus.confirmed}>Confirmed</MenuItem>
					<MenuItem value={PaymentStatus.paid}>Paid</MenuItem>
				</TextField>
			</Grid>
		</Grid>
	);
};
