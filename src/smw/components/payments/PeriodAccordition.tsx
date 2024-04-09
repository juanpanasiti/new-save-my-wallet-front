import { ExpandMore } from '@mui/icons-material';
import { Accordion, AccordionDetails, AccordionSummary, Typography } from '@mui/material';
import { Period } from '../../interfaces';
import { parseCurrency } from '../../helpers';
import { PaymentTable } from './PaymentTable';

interface Props {
	period: Period;
	handleChange: (periodName: string) => void;
	selectedPanel: string | null;
}

export const PeriodAccordition = ({ period, handleChange, selectedPanel }: Props) => {
	const total: number = period.payments.reduce((sum, payment) => sum + payment.amount, 0);

	return (
		<Accordion expanded={selectedPanel === period.name} onChange={() => handleChange(period.name)}>
			<AccordionSummary
				expandIcon={<ExpandMore />}
				aria-controls={`${period.name}-bh-content`}
				id={`${period.name}-bh-header`}
			>
				<Typography sx={{ width: '75%', flexShrink: 0 }}>{period.label}</Typography>
				<Typography sx={{ color: 'text.secondary' }}>{parseCurrency(total)}</Typography>
			</AccordionSummary>
			<AccordionDetails>
				<PaymentTable payments={period.payments} />
			</AccordionDetails>
		</Accordion>
	);
};
