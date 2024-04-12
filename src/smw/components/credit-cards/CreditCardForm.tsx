import { Box, Button, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from '@mui/material';
import { CreditCard } from '../../interfaces';
import { useCreditCards } from '../../hooks';
import { useForm } from 'react-hook-form';

interface Props {
	creditCard: CreditCard;
	afterSubmit?: () => void;
}

export const CreditCardForm = ({ creditCard, afterSubmit }: Props) => {
	const { register, handleSubmit, setValue } = useForm<CreditCard>({ defaultValues: creditCard });

	const isNew = creditCard.id === '';
	const { mainCreditCards, createMutation, updateMutation } = useCreditCards();

	const onSubmit = (data: CreditCard) => {
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
	const handleSelectChange = ({ target }: SelectChangeEvent) => {
		setValue('mainCreditCard', target.value);
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<Box>
				{/* mainCreditCard */}
				<FormControl fullWidth>
					<InputLabel htmlFor='main-credit-card-select'>Main CC</InputLabel>
					<Select id='main-credit-card-select' onChange={handleSelectChange}>
						<MenuItem>None</MenuItem>
						{mainCreditCards.map((cc) => (
							<MenuItem key={cc.id} value={cc.id}>
								{cc.name}
							</MenuItem>
						))}
					</Select>
				</FormControl>
				{/* name */}
				<TextField
					label='Name'
					type='text'
					placeholder='Ej: VISA - ####'
					fullWidth
					{...register('name', { required: true })}
				/>

				{/* limit */}
				<TextField
					label='Buy Limit'
					type='number'
					fullWidth
					{...register('limit', { required: true, valueAsNumber: true })}
				/>

				{/* nextClosingDate */}
				<TextField type='date' fullWidth {...register('nextClosingDate', { required: true, min: Date() })} />

				{/* nextExpiringDate */}
				<TextField type='date' fullWidth {...register('nextExpiringDate', { required: true })} />

				<Button type='submit' color='secondary' sx={{ m: 2 }}>
					{isNew ? 'Create' : 'Save'}
				</Button>
			</Box>
		</form>
	);
};
