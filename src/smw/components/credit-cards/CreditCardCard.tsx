import { Box, Button, Paper, Typography } from '@mui/material';
import { CreditCard } from '../../interfaces';
import { parseCurrency, parseDate } from '../../helpers';
import { Edit } from '@mui/icons-material';
import { useModal } from '../../hooks';
import { CreditCardModal } from './CreditCardModal';
interface Props {
	creditCard: CreditCard;
}

export const CreditCardCard = ({ creditCard }: Props) => {
	const limitStr = parseCurrency(creditCard.limit);
	const closesAt = parseDate(creditCard.nextClosingDate);
	const expiringAt = parseDate(creditCard.nextExpiringDate);
	const { open, handleOpen } = useModal();
	return (
		<Box component={Paper} sx={{ p: 2 }}>
			<Typography color={'secondary'} variant='h4'>
				{creditCard.name}
			</Typography>
			<Typography variant='h6'>Limit: {limitStr}</Typography>
			<Typography variant='h6'>Closes at: {closesAt}</Typography>
			<Typography variant='h6'>Exp. at: {expiringAt}</Typography>
			<Typography variant='h6'>Extensions: {creditCard.extensions.length}</Typography>

			<Box sx={{}}>
				<Button onClick={handleOpen} variant='outlined'>
					<Edit />
				</Button>
			</Box>
			<CreditCardModal creditCard={creditCard} open={open} handleOpen={() => handleOpen()} />
		</Box>
	);
};
