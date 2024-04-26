import { Box, Button, MenuItem, SelectChangeEvent, TextField } from '@mui/material';
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
        const selected = mainCreditCards?.find((cc) => cc.id === target.value);
        if (selected === undefined) return;
        setValue('limit', selected.limit);
        setValue('nextClosingDate', selected.nextClosingDate);
        setValue('nextExpiringDate', selected.nextExpiringDate);
    };
    if (mainCreditCards === undefined) return <div>Loading...</div>;

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Box>
                {/* mainCreditCard */}
                <TextField
                    select
                    label='Credit Card'
                    sx={{ mb: 2 }}
                    defaultValue={creditCard.mainCreditCard || undefined}
                    fullWidth
                    onChange={(e) => handleSelectChange(e as SelectChangeEvent)}
                >
                    {mainCreditCards?.map((cc) => (
                        <MenuItem key={cc.id} value={cc.id}>
                            {cc.name}
                        </MenuItem>
                    ))}
                    <MenuItem>None</MenuItem>
                </TextField>
                {/* name */}
                <TextField
                    label='Name'
                    type='text'
                    placeholder='Ej: VISA - ####'
                    fullWidth
                    sx={{ mb: 2 }}
                    {...register('name', { required: true })}
                />

                {/* limit */}
                <TextField label='Buy Limit' type='number' fullWidth sx={{ mb: 2 }} {...register('limit', { required: true, valueAsNumber: true })} />

                {/* nextClosingDate */}
                <TextField type='date' fullWidth {...register('nextClosingDate', { required: true, min: Date() })} sx={{ mb: 2 }} />

                {/* nextExpiringDate */}
                <TextField type='date' fullWidth {...register('nextExpiringDate', { required: true })} sx={{ mb: 2 }} />

                <Button type='submit' color='primary' variant='outlined'>
                    {isNew ? 'Create' : 'Save'}
                </Button>
            </Box>
        </form>
    );
};
