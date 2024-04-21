import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	Divider,
	Typography,
} from '@mui/material';
import { CreditCard } from '../../interfaces';
import { ExtensionsSimpleTable } from './extensions';

interface Props {
	handleClose: () => void;
	open: boolean;
	creditCard: CreditCard;
}

export const CreditCardInfoDialog = ({ handleClose, open, creditCard }: Props) => {
	return (
		<Dialog
			open={open}
			onClose={handleClose}
			aria-labelledby='alert-dialog-title'
			aria-describedby='alert-dialog-description'
		>
			<DialogTitle id='alert-dialog-title'>{creditCard.name}</DialogTitle>
			<DialogContent>
				<DialogContentText component={'div'} id='alert-dialog-description'>
					<Typography>Replace data with total data</Typography>

					<Divider>
						<Typography component={'span'}>Extensions</Typography>
					</Divider>

					<ExtensionsSimpleTable creditCard={creditCard} />
				</DialogContentText>
			</DialogContent>
			<DialogActions>
				<Button onClick={handleClose} color='secondary'>
					Close
				</Button>
			</DialogActions>
		</Dialog>
	);
};
