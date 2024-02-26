import { LogoutOutlined, MenuOutlined } from '@mui/icons-material';
import { AppBar, Grid, IconButton, Toolbar, Typography } from '@mui/material';
import { useEffect, useState } from 'react';

interface Props {
  drawerWidth: number;
  isDrawerOpen?: boolean;
}
export const Navbar = ({ drawerWidth, isDrawerOpen = true }: Props) => {
    const [spaceLeft, setSpaceLeft] = useState(0)
    useEffect(() => {
        setSpaceLeft(!isDrawerOpen ? 0 : drawerWidth)
    }, [drawerWidth, isDrawerOpen])
    
  return (
    <AppBar
      position='fixed'
      sx={{
        width: { sm: `calc(100% - ${spaceLeft}px)` },
        ml: { sm: `${drawerWidth}px` },
        backgroundColor: 'primary.main',
        opacity: 0.9,
        transition: 'all 0.3s ease',
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
          <Typography variant='h6' noWrap component='div'>
            SaveMyWallet
          </Typography>

          <IconButton color='secondary'>
            <LogoutOutlined />
          </IconButton>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};
