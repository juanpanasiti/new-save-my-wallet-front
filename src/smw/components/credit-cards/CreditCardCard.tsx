import { Box, Paper, Typography } from '@mui/material';
import { CreditCard } from '../../interfaces';
import { parseCurrency, parseDate } from '../../helpers';
interface Props {
	creditCard: CreditCard;
}

export const CreditCardCard = ({ creditCard }: Props) => {
	const limitStr = parseCurrency(creditCard.limit)
	const closesAt = parseDate(creditCard.nextClosingDate)
	const expiringAt = parseDate(creditCard.nextExpiringDate)
	return (
		<Box component={Paper} sx={{ p: 2 }}>
			<Typography color={'secondary'} variant='h4'>
				{creditCard.name}
			</Typography>
			<Typography variant='h6'>Limit: {limitStr}</Typography>
			<Typography variant='h6'>Closes at: {closesAt}</Typography>
			<Typography variant='h6'>Exp. at: {expiringAt}</Typography>
			<Typography variant='h6'>Extensions: {creditCard.extensions.length}</Typography>
		</Box>
	);
};
