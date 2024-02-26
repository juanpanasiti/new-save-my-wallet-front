import { Box, Button, Toolbar } from '@mui/material';
import { Navbar, Sidebar } from '../components';
import { useState } from 'react';

interface Props {
  children: React.ReactNode;
}

const drawerWidth = 240;

export const SmwLayout = ({ children }: Props) => {
  const [showSidebar, setShowSidebar] = useState(true);
  const handleToggle = () => {
    setShowSidebar(!showSidebar);
  };
  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      <Navbar drawerWidth={drawerWidth} isDrawerOpen={showSidebar} />
      <Sidebar drawerWidth={drawerWidth} drawerOpen={showSidebar} />

      <Box
        component='main'
        sx={{
          flexGrow: 1,
          p: 3,
        }}
      >
        <Toolbar />
        {/* <Button onClick={handleToggle}>Toggle Sidebar to {showSidebar ? 'OFF' : 'ON'}</Button> */}
        {children}
      </Box>
    </Box>
  );
};
