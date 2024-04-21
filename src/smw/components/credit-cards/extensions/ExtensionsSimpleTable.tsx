import { DeleteForever, Edit } from '@mui/icons-material';
import { Button, ButtonGroup, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { CreditCard } from '../../../interfaces';
import { useCreditCards, useModal } from '../../../hooks';
import { CreditCardDeleteDialog } from '../CreditCardDeleteDialog';
import { useEffect, useState } from 'react';
import { filterExtensions } from '../../../helpers';
import { CreditCardModal } from '../CreditCardModal';

interface Props {
	creditCard: CreditCard;
}

export const ExtensionsSimpleTable = ({ creditCard }: Props) => {
	const { extensions, deleteMutation } = useCreditCards();
	const { open: openDialogDelete, handleOpen: handleOpenDialogDelete } = useModal();
	const { open: openModalForm, handleOpen: handleOpenModalForm } = useModal();
	const [creditCards, setCreditCards] = useState<CreditCard[]>([]);
	const [selectedCard, setSelectedCard] = useState<CreditCard>();
	useEffect(() => {
		setCreditCards([creditCard, ...filterExtensions(extensions, creditCard.id)]);
	}, [creditCard, extensions]);

	const handleClickEdit = (creditCard: CreditCard) => {
		setSelectedCard(creditCard);
		handleOpenModalForm();
	};
	const handleDelete = (creditCardId: string) => {
		deleteMutation.mutate(creditCardId);
	};
	const handleConfirmDelete = (creditCard: CreditCard) => {
		setSelectedCard(creditCard);
		handleOpenDialogDelete();
	};
	return (
		<Table>
			<TableHead>
				<TableRow>
					<TableCell>Name</TableCell>
					<TableCell>Purchases</TableCell>
					<TableCell>Subscriptions</TableCell>
					<TableCell>Actions</TableCell>
				</TableRow>
			</TableHead>
			<TableBody>
				{creditCards.map((cc) => (
					<TableRow key={cc.id}>
						<TableCell>
							{cc.name} {!cc.mainCreditCard && '(main)'}
						</TableCell>
						<TableCell>{0}</TableCell>
						<TableCell>{0}</TableCell>
						<TableCell>
							<ButtonGroup variant='contained' aria-label='Basic button group'>
								<Button color='warning' onClick={() => handleClickEdit(cc)}>
									<Edit />
								</Button>
								<Button color='error' onClick={() => handleConfirmDelete(cc)}>
									<DeleteForever />
								</Button>
							</ButtonGroup>
						</TableCell>
					</TableRow>
				))}
				<CreditCardDeleteDialog
					handleClose={handleOpenDialogDelete}
					open={openDialogDelete}
					handleAgree={() => handleDelete(selectedCard?.id || 'no-card')}
					creditCardName={selectedCard?.name || 'no-card'}
				/>
				<CreditCardModal creditCard={selectedCard} open={openModalForm} handleOpen={handleOpenModalForm} />
			</TableBody>
		</Table>
	);
};
