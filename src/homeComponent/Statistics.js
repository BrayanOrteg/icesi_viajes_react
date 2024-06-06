import React from 'react';
import SideBar from '../Components/SideBar';
import TopBar from '../Components/TopBar';
import  {useState, useEffect} from 'react';
import { TextField, Container, Stack, Button, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import EmployeeService from '../service/EmployeeService';
import { useLocation } from "react-router-dom";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import PlanService from '../service/PlanService';

export function Statistics(){

    const style = {
        width: '100%',
        height:'100%',
        borderRadius: '5%',
        border: '1px solid',
        borderColor: 'divider',
        backgroundColor: 'background.paper'
    };

    const [sales, setSales] = useState("");
    const [clients, setClients] = useState("");
    const [money, setMoney] = useState("");


    useEffect(() => {
        const fetchSales = async () => {
            try {
                const salesData = await PlanService.getSalesNum();
                setSales(salesData);
                console.log(salesData);
            } catch (error) {
                console.log(error);
            }
        };

        const fetchClients = async () => {
            try {
                const clientsData = await PlanService.getClientsNum();
                setClients(clientsData);
                console.log(clientsData);
            } catch (error) {
                console.log(error);
            }
        };

        const fetchMoney = async () => {
            try {
                const moneyData = await PlanService.getMoney();
                setMoney(moneyData);
                console.log(moneyData);
            } catch (error) {
                console.log(error);
            }
        };

        fetchSales();
        fetchClients();
        fetchMoney();
    }, []);
  
    
    return (

        <div className='statisticsDiv'> 
 
            <List sx={style}>

                <ListItem>
                    <ListItemText primary="Planes vendidos" />
                    <ListItemText primary={sales} sx={{ 
                    textAlign: 'right', 
                    flex: 1, 
                    color: '#46ad95', 
                    marginRight:'10%',
                    }} />
                </ListItem>
                <Divider variant="middle" component="li" />

                <ListItem>
                    <ListItemText primary="Número de clientes" />
                    <ListItemText primary={clients}  sx={{ 
                    textAlign: 'right', 
                    flex: 1, 
                    color: '#46ad95', 
                    marginRight:'10%',
                    }} />
                </ListItem>
                <Divider variant="middle" component="li" />

                <ListItem>
                    <ListItemText primary="Ingresos" />
                    <ListItemText primary={money} sx={{ 
                    textAlign: 'right', 
                    flex: 1, 
                    color: '#46ad95', 
                    marginRight:'10%',
                    }} />
                </ListItem>

            </List>
        </div>
        
    );
    
  }

export default Statistics;