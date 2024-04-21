import { Box, Toolbar } from '@mui/material';
import { Navbar, Sidebar } from '../components';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

interface Props {
	children: React.ReactNode;
}

const drawerWidth = 240;

export const SmwLayout = ({ children }: Props) => {
	const [showSidebar] = useState(true);
	// const handleToggle = () => {
	// 	setShowSidebar(!showSidebar);
	// };
	const { pathname } = useLocation();
	useEffect(() => {
		localStorage.setItem('lastPath', pathname);
	}, [pathname]);
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
