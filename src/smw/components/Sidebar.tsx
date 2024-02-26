import { AttachMoney, CreditCard, Dashboard, ReceiptLong } from '@mui/icons-material';
import { Box, Divider, Drawer, List, Toolbar, Typography } from '@mui/material';
import { ListItemButtonWithIcon } from './';

interface Props {
  drawerWidth: number;
}

export const Sidebar = ({ drawerWidth }: Props) => {
  return (
    <Box component='nav' sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}>
      <Drawer
        variant='persistent'
        open={true}
        sx={{
          display: { xs: 'block' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
        }}
      >
        <Toolbar>
          <Typography variant='h6' noWrap component='div'>
            username
          </Typography>
        </Toolbar>
        <Divider />

        {/* Menu items */}
        <List>
          <ListItemButtonWithIcon icon={<Dashboard />} primary='Dashboard' />
          <ListItemButtonWithIcon icon={<CreditCard />} primary='Credit Cards' />
          <ListItemButtonWithIcon icon={<AttachMoney />} primary='Expenses' />
          <ListItemButtonWithIcon icon={<ReceiptLong />} primary='Payments' />
        </List>
      </Drawer>
    </Box>
  );
};
