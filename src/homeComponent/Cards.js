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
import DestinationCard from './DestinationCard'



export function Cards(){


    const [destinations, setDestinations] = useState([]);

    useEffect(() => {
        const fetchTypes = async () => {
            try {
                const destinationsData = await PlanService.getTopDestinations();
                setDestinations(destinationsData);
                console.log(destinationsData);

            } catch (error) {
                console.log(error);
            }
        };

        fetchTypes();
    }, []);
  
    
    return (

        <div className='cardsDiv'>
        { 
        destinations.map((destination) => (

            <DestinationCard  destination= {destination}/>
            
        ))}
        
        </div>
        
    );
    
  }

export default Cards;