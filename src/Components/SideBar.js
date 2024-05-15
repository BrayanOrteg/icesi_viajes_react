import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import PlaceIcon from '@mui/icons-material/Place';
import PeopleIcon from '@mui/icons-material/People';
import BadgeIcon from '@mui/icons-material/Badge';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd';
import Logo from '../Commons/logo_icesi.png'
import { useNavigate } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';

const drawerWidth = 240;

export default function SideBar() {
    
    const navigate = useNavigate();

    return (
        <Box sx={{ display: 'flex', zIndex: 1, color: 'white' }}>
        <Drawer
            sx={{
            width: drawerWidth,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
                width: drawerWidth,
                boxSizing: 'border-box',
                backgroundColor: '#55B8A1',
                color: 'white'
            },
            }}
            variant="permanent"
            anchor="left"
        >
            <Toolbar>
                <img src={Logo} alt="logo" style={{ maxWidth: '100%', height: 'auto' }} />
            </Toolbar>

            <Divider />

            <Toolbar/>

            <List>

            <ListItem>
                    <ListItemButton onClick={() => navigate('/home')}>
                        <ListItemIcon>
                            <HomeIcon sx={{color:"white"}}/>
                        </ListItemIcon>
                        <ListItemText primary={"Home"} />
                    </ListItemButton>
                </ListItem>

                <ListItem style={{paddingTop:"10%"}}>
                    <ListItemButton>
                        <ListItemIcon>
                            <PlaceIcon sx={{color:"white"}}/>
                        </ListItemIcon>
                        <ListItemText primary={"Destinos"} />
                    </ListItemButton>
                </ListItem>
                <ListItem style={{paddingTop:"10%"}}>
                    <ListItemButton onClick={() => navigate('/clients')}>
                        <ListItemIcon>
                            <PeopleIcon sx={{color:"white"}}/>
                        </ListItemIcon>
                        <ListItemText primary={"Clientes"} />
                    </ListItemButton>
                </ListItem>
                <ListItem style={{paddingTop:"10%"}}>
                    <ListItemButton>
                        <ListItemIcon>
                            <BadgeIcon sx={{color:"white"}}/>
                        </ListItemIcon>
                        <ListItemText primary={"Empleados"} />
                    </ListItemButton>
                </ListItem>
                <ListItem style={{paddingTop:"10%"}}>
                    <ListItemButton>
                        <ListItemIcon>
                            <AnalyticsIcon sx={{color:"white"}}/>
                        </ListItemIcon>
                        <ListItemText primary={"Analíticas"} />
                    </ListItemButton>
                </ListItem>
                <ListItem style={{paddingTop:"10%"}}>
                    <ListItemButton>
                        <ListItemIcon>
                            <BookmarkAddIcon sx={{color:"white"}}/>
                        </ListItemIcon>
                        <ListItemText primary={"Añadir Reserva"} />
                    </ListItemButton>
                </ListItem>
            </List>
        </Drawer>
        </Box>
  );
}
