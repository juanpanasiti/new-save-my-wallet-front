import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'

import { Payment } from '../../interfaces'
import { PaymentTableRow } from './PaymentTableRow'

interface Props {
    payments: Payment[]
}
export const PaymentTable = ({payments}: Props) => {
  return (
    <TableContainer component={Paper}>
			<Table>
				<TableHead>
					<TableRow>
						<TableCell>Title</TableCell>
						<TableCell>Amount</TableCell>
						<TableCell>Installment</TableCell>
						<TableCell>Status</TableCell>
						<TableCell>Actions</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{payments.map((payment) => (
						<PaymentTableRow key={payment.id} payment={payment} />
					))}
				</TableBody>
			</Table>
		</TableContainer>
  )
}
