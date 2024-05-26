import * as React from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import './TopBar.css';
import { useNavigate } from 'react-router-dom';
import {setAuthHeader, getUser} from '../axios_helper';
import { alignProperty } from '@mui/material/styles/cssUtils';
import { AlignHorizontalLeft, AlignHorizontalRight } from '@mui/icons-material';

const drawerWidth = 240;



export default function TopBar({ children }) {

    const user = getUser();
    const navigate = useNavigate();

    const onExit = () => {
        setAuthHeader(null);
        navigate('/')
    };

    return (
        <Box sx={{ display: 'flex', zIndex: 2, color: 'white'}}>
        <CssBaseline />
        <AppBar
            position="fixed"
            id = "hola"
            sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px`, 
                    backgroundColor: '#55B8A1', boxShadow:"none", display:'flex', flexDirection:'row'}}
        >

            <Toolbar id= 'childrenItem' sx={{ width:'50%', display:'flex',  flexDirection:'row', alignItems:'flex-start', justifyContent:'flex-start'}}>

            { children }
            </Toolbar>
            
            <Toolbar sx={{ width:'50%', display:'flex',  flexDirection:'row', alignItems:'flex-end', justifyContent:'flex-end'}}>
                
                    <Typography variant="h6" noWrap component="div">
                        {user}
                    </Typography>
                    
                    
                    
                    <button className='exitBttn' onClick={() => onExit()}>
                    <ExitToAppIcon/>
                    </button>

            </Toolbar>

            
            

            <Divider />
        </AppBar>
        </Box>
  );
}
