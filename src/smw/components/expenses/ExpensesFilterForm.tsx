import { Grid, MenuItem, TextField } from '@mui/material';
import { ExpenseType } from '../../enums';
import { CreditCard } from '../../interfaces';

interface Props {
	creditCards: CreditCard[];
	textFilter: string;
	creditCardId: string;
	expenseType: ExpenseType | 'any';
	setTextFilter: (value: string) => void;
	setCreditCardId: (value: string) => void;
	setExpenseType: (value: ExpenseType | 'any') => void;
}
export const ExpensesFilterForm = (props: Props) => {
	const { creditCards, textFilter, creditCardId, expenseType, setTextFilter, setCreditCardId, setExpenseType } =
		props;
	const defaultCreditCardId = creditCardId || 'any';
	const defaultExpenseType = expenseType || 'all';

	const onTextFilterChange = (text: string) => {
		setTextFilter(text);
	};
	const onCreditCardIdChange = (ccId: string) => {
		setCreditCardId(ccId === 'any' ? '' : ccId);
	};
	const onExpenseTypeChange = (expType: ExpenseType | 'any') => {
		setExpenseType(expType);
	};
	return (
		<Grid container spacing={2} sx={{ my: 1 }}>
			<Grid item xs={6}>
				<TextField
					label='Filter'
					fullWidth
					variant='outlined'
					defaultValue={textFilter}
					onChange={(e) => onTextFilterChange(e.target.value)}
				/>
			</Grid>
			<Grid item xs={3}>
				<TextField
					select
					label='Select'
					defaultValue={defaultCreditCardId}
					fullWidth
					onChange={(e) => onCreditCardIdChange(e.target.value)}
				>
					<MenuItem value='any'>Any</MenuItem>
					{creditCards.map((option) => (
						<MenuItem key={option.id} value={option.id}>
							{option.name}
						</MenuItem>
					))}
				</TextField>
			</Grid>
			<Grid item xs={3}>
				<TextField
					select
					label='Select'
					defaultValue={defaultExpenseType}
					fullWidth
					onChange={(e) => onExpenseTypeChange(e.target.value as ExpenseType | 'any')}
				>
					<MenuItem value='any'>Any</MenuItem>
					<MenuItem value={ExpenseType.PURCHASE}>Purchases</MenuItem>
					<MenuItem value={ExpenseType.SUBSCRIPTION}>Subscriptions</MenuItem>
				</TextField>
			</Grid>
		</Grid>
	);
};
