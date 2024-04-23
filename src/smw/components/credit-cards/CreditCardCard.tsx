import { Button, Card, CardActions, CardContent, CardHeader, Typography } from '@mui/material';
import { CreditCard } from '../../interfaces';
import { filterExpenses, parseCurrency, parseDate } from '../../helpers';
import { DeleteForever, Edit, Visibility } from '@mui/icons-material';
import { useCreditCards, useExpenses, useModal } from '../../hooks';
import { CreditCardModal } from './CreditCardModal';
import { CreditCardDeleteDialog } from './CreditCardDeleteDialog';
import { CreditCardInfoDialog } from './CreditCardInfoDialog';
import { getTotalRemaining } from '../../helpers';

interface Props {
	creditCard: CreditCard;
}

export const CreditCardCard = ({ creditCard }: Props) => {
	const { deleteMutation } = useCreditCards();
	const { purchases, subscriptions } = useExpenses();
	const ccPurchases = filterExpenses(purchases, creditCard.id);
	const ccSubscriptions = filterExpenses(subscriptions, creditCard.id);
	const totalRemainingPurchases = parseCurrency(getTotalRemaining(ccPurchases));
	const totalRemainingSubscriptions = parseCurrency(getTotalRemaining(ccSubscriptions));
	const limitStr = parseCurrency(creditCard.limit);
	const closesAt = parseDate(creditCard.nextClosingDate);
	const expiringAt = parseDate(creditCard.nextExpiringDate);
	const { open: openModalForm, handleOpen: handleOpenModalForm } = useModal();
	const { open: openDialogDelete, handleOpen: handleOpenDialogDelete } = useModal();
	const { open: openDialogShow, handleOpen: handleOpenDialogShow } = useModal();

	const handleDelete = () => {
		deleteMutation.mutate(creditCard.id);
	};
	const handleConfirmDelete = () => {
		handleOpenDialogDelete();
	};
	return (
		<Card>
			<CardHeader
				sx={{ color: 'primary.main' }}
				title={creditCard.name}
				// subheader='September 14, 2016'
			/>
			<CardContent>
				<Typography>
					<b>Limit:</b> {limitStr}
				</Typography>
				<Typography>
					<b>Purchases:</b> {totalRemainingPurchases}
				</Typography>
				<Typography>
					<b>Subscriptions:</b> {totalRemainingSubscriptions}
				</Typography>

				<Typography>
					<b>Closes at:</b> {closesAt}
				</Typography>
				<Typography>
					<b>Exp. at:</b> {expiringAt}
				</Typography>
				<Typography>
					<b>Extensions:</b> {creditCard.extensions.length}
				</Typography>
			</CardContent>

			<CardActions>
				<Button onClick={handleOpenDialogShow} color='info'>
					<Visibility />
				</Button>
				<Button onClick={handleOpenModalForm} color='warning'>
					<Edit />
				</Button>
				<Button onClick={handleConfirmDelete} color='error' sx={{ ml: 2 }}>
					<DeleteForever />
				</Button>
			</CardActions>

			<CreditCardInfoDialog open={openDialogShow} handleClose={handleOpenDialogShow} creditCard={creditCard} />
			<CreditCardDeleteDialog
				creditCardName={creditCard.name}
				handleClose={handleOpenDialogDelete}
				open={openDialogDelete}
				handleAgree={handleDelete}
			/>
			<CreditCardModal creditCard={creditCard} open={openModalForm} handleOpen={() => handleOpenModalForm()} />
		</Card>
	);
};
