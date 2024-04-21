import { Alert, AlertTitle, Box, Divider, Typography } from '@mui/material';
import { useExpenses } from '../hooks/useExpenses';
import { PeriodStatus } from '../enums';
import { PeriodList } from '../components/payments';

export const PaymentsPage = () => {
	const { periods } = useExpenses();
	const pendingOnes = periods.filter((period) => period.status === PeriodStatus.pending);
	const doneOnes = periods.filter((period) => period.status === PeriodStatus.done);
	return (
		<Box>
			<Typography variant='h2'>Payments</Typography>
			<Divider>
				<Typography variant='h4'>Payments Pending</Typography>
			</Divider>
			{pendingOnes.length === 0 && (
				<Alert severity='info'>
					<AlertTitle>Nothing to show</AlertTitle>
					There are no expenses to show!
				</Alert>
			)}
			<PeriodList periods={pendingOnes} />

			<Divider>
				<Typography variant='h4'>Payments Done</Typography>
			</Divider>
			{doneOnes.length === 0 && (
				<Alert severity='info'>
					<AlertTitle>Nothing to show</AlertTitle>
					There are no expenses to show!
				</Alert>
			)}
			<PeriodList periods={doneOnes} />
		</Box>
	);
};
