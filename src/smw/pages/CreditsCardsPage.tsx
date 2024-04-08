import { Grid, Typography } from '@mui/material';
import { useCreditCards } from '../hooks/useCreditCards';
import { CreditCardCard } from '../components/credit-cards';

export const CreditsCardsPage = () => {
	const { mainCreditCards } = useCreditCards();
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
		</>
	);
};
