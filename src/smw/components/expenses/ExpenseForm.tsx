import { useEffect } from 'react';
import { Box, Button, FormControl, MenuItem, SelectChangeEvent, TextField } from '@mui/material';
import { Expense } from '../../interfaces';
import { useForm } from 'react-hook-form';
import { ExpenseType } from '../../enums';
import { useCreditCards, useExpenses } from '../../hooks';
import { getNextPaymentDate } from '../../helpers';

interface Props {
    expense: Expense;
    afterSubmit?: () => void;
}

export const ExpenseForm = ({ expense, afterSubmit }: Props) => {
    const { register, handleSubmit, setValue, watch } = useForm<Expense>({ defaultValues: expense });
    const { createMutation, updateMutation } = useExpenses();
    const isNew = expense.id === '';
    const { creditCardsQuery } = useCreditCards();
    const { acquiredAt } = watch()
    useEffect(() => {
        const today = new Date();
        setValue('acquiredAt', today.toISOString().slice(0, 10));
    }, [setValue]);

    useEffect(() => {
      setValue('firstPaymentDate', getNextPaymentDate(acquiredAt))
    }, [acquiredAt, setValue])
    

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
                <TextField
                    select
                    sx={{ mb: 2 }}
                    label='Credit Card'
                    defaultValue={expense.creditCard}
                    fullWidth
                    onChange={(e) => handleSelectChangeCreditCard(e as SelectChangeEvent)}
                >
                    {creditCardsQuery.data?.map((cc) => (
                        <MenuItem key={cc.id} value={cc.id}>
                            {cc.name}
                        </MenuItem>
                    ))}
                </TextField>

                {/* type */}
                <FormControl fullWidth>
                    <TextField
                        select
                        sx={{ mb: 2 }}
                        label='Type'
                        defaultValue={expense.type}
                        fullWidth
                        onChange={(e) => handleSelectChangeType(e as SelectChangeEvent)}
                    >
                        <MenuItem value={ExpenseType.PURCHASE}>Purchase</MenuItem>
                        <MenuItem value={ExpenseType.SUBSCRIPTION}>Subscription</MenuItem>
                    </TextField>
                </FormControl>
                {/* title */}
                <TextField label='Title' type='text' fullWidth sx={{ mb: 2 }} {...register('title', { required: true })} />

                {/* ccName */}
                <TextField label='Name in Credit Card Resume' type='text' fullWidth sx={{ mb: 2 }} {...register('ccName', { required: true })} />

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
                    <TextField
                        id='acquired-at-date'
                        label='Acquired At'
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
                        label='First Payment Date'
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
