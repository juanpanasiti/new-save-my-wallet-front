import { Box, Toolbar } from '@mui/material';
import { Navbar, Sidebar } from '../components';

interface Props {
  children: React.ReactNode;
}

const drawerWidth = 240;

export const SmwLayout = ({ children }: Props) => {
  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      <Navbar drawerWidth={drawerWidth} />
      <Sidebar drawerWidth={drawerWidth} />

      <Box
        component='main'
        sx={{
          flexGrow: 1,
          p: 3,
        }}
      >
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
};
