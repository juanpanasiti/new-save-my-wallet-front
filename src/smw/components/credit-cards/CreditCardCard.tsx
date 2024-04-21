import { Box, Button, Paper, Typography } from '@mui/material';
import { CreditCard } from '../../interfaces';
import { parseCurrency, parseDate } from '../../helpers';
import { DeleteForever, Edit } from '@mui/icons-material';
import { useCreditCards, useModal } from '../../hooks';
import { CreditCardModal } from './CreditCardModal';
import { CreditCardDeleteDialog } from './CreditCardDeleteDialog';

interface Props {
	creditCard: CreditCard;
}

export const CreditCardCard = ({ creditCard }: Props) => {
	const {deleteMutation} = useCreditCards()
	const limitStr = parseCurrency(creditCard.limit);
	const closesAt = parseDate(creditCard.nextClosingDate);
	const expiringAt = parseDate(creditCard.nextExpiringDate);
	const { open, handleOpen } = useModal();
	const { open: openDialog, handleOpen: handleOpenDialog } = useModal();

	const handleDelete = () => {
		deleteMutation.mutate(creditCard.id)
	}
	const handleConfirmDelete = () => {
		handleOpenDialog()
	}
	return (
		<Box component={Paper} sx={{ p: 2 }}>
			<Typography color={'primary'} variant='h4'>
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
				<Button onClick={handleConfirmDelete} variant='outlined' color='error' sx={{ml:2}}>
					<DeleteForever />
				</Button>
			</Box>
			<CreditCardDeleteDialog handleClose={handleOpenDialog} open={openDialog} handleAgree={handleDelete} />
			<CreditCardModal creditCard={creditCard} open={open} handleOpen={() => handleOpen()} />
		</Box>
	);
};
