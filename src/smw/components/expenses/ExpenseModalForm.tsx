import { Box, Modal, SxProps, Theme, Typography } from '@mui/material';
import { Expense } from '../../interfaces';
import { defaultExpense } from '../../data';
import { ExpenseForm } from './ExpenseForm';

interface Props {
	open: boolean;
	handleOpen: () => void;
	style?: SxProps<Theme>;
	expense?: Expense;
}

export const ExpenseModalForm = ({ open, handleOpen, style = {}, expense = defaultExpense }: Props) => {
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
	const title = expense.id ? `Edit ${expense.title}` : 'New Expense';
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
				<ExpenseForm expense={expense} afterSubmit={handleOpen} />
			</Box>
		</Modal>
	);
};
