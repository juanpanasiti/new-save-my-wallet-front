import { AttachMoney, CreditCard, Dashboard, Person2Outlined, ReceiptLong } from '@mui/icons-material';
import { Box, Divider, Drawer, List, Toolbar, Typography } from '@mui/material';
import { ListItemButtonWithIcon } from './';
import { useAuth } from '../../auth/hooks';
import { SmwRoutes } from '../enums';

interface Props {
	drawerWidth: number;
	drawerOpen?: boolean;
}

export const Sidebar = ({ drawerWidth, drawerOpen = true }: Props) => {
	const { authQuery } = useAuth();
	return (
		<Box component='nav' sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}>
			<Drawer
				variant='persistent'
				open={drawerOpen}
				sx={{
					display: { xs: 'block' },
					'& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
				}}
			>
				<Toolbar
					sx={{
						alignItems: 'center',
					}}
				>
					<Person2Outlined sx={{ mr: 1 }} />
					<Typography variant='h6' noWrap component='div'>
						{authQuery.data?.username}
					</Typography>
				</Toolbar>
				<Divider />

				{/* Menu items */}
				<List>
					<ListItemButtonWithIcon icon={<Dashboard />} primary='Dashboard' pathTo={SmwRoutes.HOME} />
					<ListItemButtonWithIcon
						icon={<CreditCard />}
						primary='Credit Cards'
						pathTo={SmwRoutes.CREDIT_CARDS}
					/>
					<ListItemButtonWithIcon icon={<AttachMoney />} primary='Expenses' pathTo={SmwRoutes.EXPENSES} />
					<ListItemButtonWithIcon icon={<ReceiptLong />} primary='Payments' pathTo={SmwRoutes.PAYMENTS} />
				</List>
			</Drawer>
		</Box>
	);
};
