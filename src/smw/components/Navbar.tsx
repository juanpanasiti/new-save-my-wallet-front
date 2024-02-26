import { LogoutOutlined, MenuOutlined } from '@mui/icons-material';
import { AppBar, Grid, IconButton, Toolbar, Typography } from '@mui/material';

interface Props {
  drawerWidth: number;
}
export const Navbar = ({ drawerWidth }: Props) => {
  return (
    <AppBar
      position='fixed'
      sx={{
        width: { sm: `calc(100% - ${drawerWidth}px)` },
        ml: { sm: `${drawerWidth}px` },
        backgroundColor: 'primary.main',
        opacity: 0.9,
        transition: 'all 0.3s ease-in-out',
      }}
    >
      <Toolbar>
        <IconButton
          color='inherit'
          edge='start'
          sx={{
            mr: 2,
            display: { sm: 'none' },
          }}
        >
          <MenuOutlined />
        </IconButton>

        <Grid container direction='row' justifyContent='space-between' alignItems='center'>
            <Typography variant='h6'noWrap component='div'>SaveMyWallet</Typography>

            <IconButton color='secondary'>
                <LogoutOutlined />
            </IconButton>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};
