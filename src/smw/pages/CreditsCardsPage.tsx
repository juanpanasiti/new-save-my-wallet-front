import { Fab, Grid, SxProps, Typography } from '@mui/material';
import { useCreditCards, useModal } from '../hooks';
import { CreditCardCard, CreditCardModal } from '../components/credit-cards';
import { AddCard } from '@mui/icons-material';

export const CreditsCardsPage = () => {
	const { mainCreditCards } = useCreditCards();
	const { open, handleOpen } = useModal();
	const fabStyle: SxProps = {
		position: 'absolute',
		bottom: 25,
		right: 25,
	};

	const fab = {
		icon: <AddCard />,
		label: 'Edit',
	};
	return (
		<>
			<Typography variant='h2'>Credit Cards</Typography>
			<Grid container spacing={2}>
				{mainCreditCards.map((creditCard) => (
					<Grid item xs={12} sm={6} md={6} lg={4} key={creditCard.id}>
						<CreditCardCard creditCard={creditCard} />
					</Grid>
				))}
			</Grid>

			{/* Credit Card Modal Form */}
			<Fab sx={fabStyle} aria-label={fab.label} color='primary' onClick={handleOpen}>
				{fab.icon}
			</Fab>
			<CreditCardModal open={open} handleOpen={() => handleOpen()} />
		</>
	);
};
