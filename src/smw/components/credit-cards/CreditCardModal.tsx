import { Box, Modal, SxProps, Theme, Typography } from '@mui/material';
import { CreditCard } from '../../interfaces';
import { defaultCreditCard } from '../../data';
import { CreditCardForm } from './CreditCardForm';

interface Props {
	open: boolean;
	handleOpen: () => void;
	style?: SxProps<Theme>;
	creditCard?: CreditCard;
}
export const CreditCardModal = ({ open, handleOpen, style = {}, creditCard = defaultCreditCard }: Props) => {
	const defaultStyle: SxProps<Theme> = {
		position: 'absolute',
		top: '50%',
		left: '50%',
		transform: 'translate(-50%, -50%)',
		width: 400,
		bgcolor: 'background.paper',
		border: '2px solid #000',
		boxShadow: 24,
		p: 4,
	};

	const title = creditCard.id ? `Edit ${creditCard.name}` : 'New Credit Card';

	return (
		<Modal
			open={open}
			onClose={handleOpen}
			aria-labelledby='modal-modal-title'
			aria-describedby='modal-modal-description'
		>
			<Box sx={{ ...defaultStyle, ...style }}>
				<Typography id='modal-modal-title' variant='h5'>
					{title}
				</Typography>
				<CreditCardForm creditCard={creditCard} afterSubmit={handleOpen} />
			</Box>
		</Modal>
	);
};
