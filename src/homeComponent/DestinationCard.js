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
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';


export function DestinationCard({destination}){

    return (
        <div className='cardDiv'>

<Card sx={{ width:"80%", height:"50%"}}>
      <CardMedia
        sx={{ height: 140 }}
        image="https://static.vecteezy.com/vite/assets/photo-masthead-375-b8ae1548.webp"
        title="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {destination.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {destination.description}
        </Typography>
      </CardContent>
    </Card>

        </div>
        
    );
    
  }

export default DestinationCard;