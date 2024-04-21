import { Box, Button, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from '@mui/material';
import { Expense } from '../../interfaces';
import { useForm } from 'react-hook-form';
import { ExpenseType } from '../../enums';
import { useCreditCards, useExpenses } from '../../hooks';

interface Props {
	expense: Expense;
	afterSubmit?: () => void;
}

export const ExpenseForm = ({ expense, afterSubmit }: Props) => {
	const { register, handleSubmit, setValue } = useForm<Expense>({ defaultValues: expense });
	const { createMutation, updateMutation } = useExpenses();
	const isNew = expense.id === '';
	const { creditCardsQuery } = useCreditCards();
	const onSubmit = (data: Expense) => {
		try {
			if (data.id === '') {
				createMutation.mutate(data);
			} else {
				updateMutation.mutate(data);
			}
			afterSubmit && afterSubmit();
		} catch (error) {
			console.error(error);
		}
	};
	const handleSelectChangeType = ({ target }: SelectChangeEvent) => {
		setValue('type', target.value as ExpenseType);
	};
	const handleSelectChangeCreditCard = ({ target }: SelectChangeEvent) => {
		setValue('creditCard', target.value);
	};
	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<Box>
				{/* creditCard */}
				<FormControl fullWidth>
					<InputLabel htmlFor='credit-card-select'>Credit Card</InputLabel>
					<Select
						id='credit-card-select'
						onChange={handleSelectChangeCreditCard}
						sx={{ mb: 2 }}
						defaultValue={expense.creditCard}
					>
						{creditCardsQuery.data?.map((cc) => (
							<MenuItem key={cc.id} value={cc.id}>
								{cc.name}
							</MenuItem>
						))}
					</Select>
				</FormControl>

				{/* type */}
				<FormControl fullWidth>
					<InputLabel htmlFor='expense-type-select'>Type</InputLabel>
					<Select
						id='main-credit-card-select'
						onChange={handleSelectChangeType}
						sx={{ mb: 2 }}
						defaultValue={expense.type}
					>
						<MenuItem value={ExpenseType.PURCHASE}>Purchase</MenuItem>
						<MenuItem value={ExpenseType.SUBSCRIPTION}>Subscription</MenuItem>
					</Select>
				</FormControl>
				{/* title */}
				<TextField
					label='Title'
					type='text'
					fullWidth
					sx={{ mb: 2 }}
					{...register('title', { required: true })}
				/>

				{/* ccName */}
				<TextField
					label='Name in Credit Card Resume'
					type='text'
					fullWidth
					sx={{ mb: 2 }}
					{...register('ccName', { required: true })}
				/>

				{/* amount */}
				<TextField
					label='Cost'
					type='number'
					inputProps={{
						step: '0.01',
					}}
					fullWidth
					sx={{ mb: 2 }}
					{...register('amount', { required: true, valueAsNumber: true })}
				/>
				{/* installments */}
				<TextField
					label='Installments'
					type='number'
					fullWidth
					sx={{ mb: 2 }}
					{...register('installments', { required: true, valueAsNumber: true, min: 1 })}
				/>

				{/* acquiredAt */}
				<FormControl fullWidth>
					<InputLabel htmlFor='acquired-at-date'>Type</InputLabel>
					<TextField
						id='acquired-at-date'
						type='date'
						fullWidth
						{...register('acquiredAt', { required: true })}
						sx={{ mb: 2 }}
					/>
				</FormControl>

				{/* firstPaymentDate */}
				<FormControl fullWidth>
					<TextField
						type='date'
						fullWidth
						{...register('firstPaymentDate', { required: true })}
						sx={{ mb: 2 }}
					/>
				</FormControl>

				<Button type='submit' color='primary' variant='outlined'>
					{isNew ? 'Create' : 'Save'}
				</Button>
			</Box>
		</form>
	);
};
