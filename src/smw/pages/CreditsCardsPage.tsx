import { Alert, AlertTitle, Grid, Typography } from '@mui/material';
import { useCreditCards, useModal } from '../hooks';
import { CreditCardCard, CreditCardModal } from '../components/credit-cards';
import { AddCard } from '@mui/icons-material';
import { Fab } from '../../common/components';

export const CreditsCardsPage = () => {
	const { mainCreditCards } = useCreditCards();
	const { open, handleOpen } = useModal();
	return (
		<>
			<Typography variant='h2'>Credit Cards</Typography>
			{mainCreditCards.length === 0 && (
				<Alert severity='info'>
					<AlertTitle>Nothing to show</AlertTitle>
					There are no credit cards to show, but you can <b><a onClick={handleOpen}>add a new one</a></b>.
				</Alert>
			)}
			<Grid container spacing={2}>
				{mainCreditCards.map((creditCard) => (
					<Grid item xs={12} sm={6} md={6} lg={4} key={creditCard.id}>
						<CreditCardCard creditCard={creditCard} />
					</Grid>
				))}
			</Grid>

			{/* Credit Card Modal Form */}
			<Fab handleClick={handleOpen} icon={<AddCard />} label='' color='primary' />
			<CreditCardModal open={open} handleOpen={() => handleOpen()} />
		</>
	);
};
