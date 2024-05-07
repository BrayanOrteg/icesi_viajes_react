import * as React from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';

const drawerWidth = 240;

export default function TopBar() {
    return (
        <Box sx={{ display: 'flex', zIndex: 1, color: 'white' }}>
        <CssBaseline />
        <AppBar
            position="fixed"
            sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px`, 
                    backgroundColor: '#55B8A1', boxShadow:"none"}}
        >
            <Toolbar>
                <Typography variant="h6" noWrap component="div">
                    Opciones
                </Typography>
            </Toolbar>
            <Divider />
        </AppBar>
        </Box>
  );
}
